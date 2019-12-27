<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
        <!-- <input type="text"> -->
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @change-selection="selectionChange" @click-operate="viewAddTabUser">
      <div slot="r">
        <el-button @click="checkBinding(1)"><i class="el-icon-edit-outline"></i>审核通过</el-button>
        <el-button @click="checkBinding(0)"><i class="el-icon"></i>审核驳回</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :title="formTitle"></forms>
  </div>
</template>
<script>
  import api from '../../../api/'
  import forms from './form'
  import { MessageBox } from 'element-ui'

  export default {
    components: {
      'forms': forms
    },
    data() {
      return {
        show: false,
        LogWid: '',
        dialogVisible: false,
        formVisible: false,
        formTitle: '',
        dialogTitle: '更新日志',
        dialogWidth: '',
        dialogTop: '5%',
        disabled: true,
        userType: this.$api.getDicValues('user.userType'),
        selectionRows: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
            {
            key: 'userId',
            label: '',
            value: null,
            placeholder: '用户ID',
            width: 180,
            type: ''
          },
          {
            key: 'username',
            label: '',
            value: null,
            placeholder: '用户账号',
            width: 200,
            type: ''
          },
          {
            key: 'userType',
            label: '',
            value: null,
            placeholder: '用户类型',
            width: 100,
            type: 'select',
            option: this.userType
          },
          {
            key: 'introducer',
            label: '',
            value: null,
            placeholder: '介绍人',
            width: 100,
            type: ''
          }]
        },
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '80px',
            fixed: 'left',
            isBtn: true,
            children: [{
                iconClass: 'el-icon-view',
                name: '详情',
                show: 'IsBtn2',
                isBtn: true
              }
            ]
          }
        ],
        // 表头
        columnData: [
          {
            prop: 'id',
            label: '用户ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'username',
            label: '用户账号',
            width: '150',
            align: 'center'
          },
          {
            prop: 'userType',
            label: '用户类型',
            width: '80',
            formatter: true,
            columnKey: 'user.userType',
            align: 'center'
          },
          {
            prop: 'userState',
            label: '用户状态',
            width: '80',
            formatter: true,
            columnKey: 'user.userState',
            align: 'center'
          },
          {
            prop: 'refName',
            label: '用户昵称',
            width: '100',
            align: 'center'
          },
          {
            prop: 'mobile',
            label: '手机号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'isVerified',
            label: '是否已验证身份',
            width: '100',
            formatter: true,
            columnKey: 'com.yes',
            align: 'center'
          },
          {
            prop: 'isAccount',
            label: '是否已绑定MT',
            width: '100',
            formatter: true,
            columnKey: 'com.yes',
            align: 'center'
          },
          {
            prop: 'introducer',
            label: '介绍人',
            width: '80',
            align: 'center'
          },
          {
            prop: 'recommend',
            label: '推荐人数',
            width: '80',
            align: 'center'
          },
          {
            prop: 'createDate',
            label: '创建时间',
            width: '',
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          }
        ],
        // 表格
        tableData: [],
        tableDataTitle: {
          orderCount: 0,
          scatteredCount: 0,
          wholeCount: 0
        }
      }
    },
    created() {
      this.columnOperate.forEach((item, index) => {
        item.children.forEach((Citem, Cindex) => {
          if (Citem.show === 'IsBtn1' && this.IsBtn1) {
            item.isBtn = true
            Citem.isBtn = true
          }
          if (Citem.show === 'IsBtn2' && this.IsBtn2) {
            item.isBtn = true
            Citem.isBtn = true
          }
        })
      })
      this.getQuery()
      this.queryData.formItem[2].option = this.userType
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          // 判断用户权限
          let params = {
            operUserId: userInfo.userId, // 操作用户id
            userId: this.queryData.formData.userId, // 用户ID
            username: this.queryData.formData.username, // 名称
            userType: this.queryData.formData.userType, // 类型
            userState: 2, // 用户类型 ，2：待审核
            introducer: this.queryData.formData.introducer, // 介绍人
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          api.queryUserList(params, (res) => {
            this.tableData = res.content.records
            this.pageDataTotal = res.content.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 分页
      handlePage() {
        this.tableData = []
        this.getQuery()
      },
      // 查看or编辑
      handleOperate(row, index, name) {
        this.LogWid = row
        if (name === '详情') {
          setTimeout(() => {
            this.formVisible = true
          }, 0)
          this.dialogTitle = '信号源：' + row.signalName + ' 详情 '
          // this.show = 'forms'
          this.show = true
          this.disabled = true
          this.dialogWidth = 1000
          this.dialogTop = '10%'
        }
      },
      // 查看
      viewAddTabUser(row, index, name) {
        this.$store.dispatch('delTab', {id: 'm1_view'})
        let _data = {
          id: 'm1_view',
          name: '查看基础信息',
          url: 'userDetail',
          uid: {
            formType: 'view',
            id: row.id,
            wname: row.username
          }
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
          this.$store.dispatch('m1_form_state', this.$store.state.m1.m1_form_state + 1)
        }, 10)
      },
      selectionChange(rows) {
        this.selectionRows = rows
      },
      checkBinding(oper) {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        MessageBox.confirm('确定提交审核结果吗？', '审核提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let param = {
            userId: this.selectionRows[0].id,
            username: this.selectionRows[0].username,
            oper: oper,
            message: '审核！'
          }
          // 审核流程
          api.checkUserBinding(param, (res) => {
            if (res.status === 0 && res.content.data !== '') {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert('操作失败！')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          })
        })
      }
    },
    mounted() {
      this.queryFormHeight = this.$refs.search.offsetHeight
    }
  }
</script>
