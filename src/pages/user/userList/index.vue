<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
        <!-- <input type="text"> -->
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @change-selection="selectionChange" @click-operate="viewAddTabUser">
      <div slot="r">
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :title="formTitle"></forms>
  </div>
</template>
<script>
  import api from '../../../api/'
  import forms from './form'

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
        isVerified: this.$api.getDicValues('com.yes'),
        isAccount: this.$api.getDicValues('com.yes'),
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
            key: 'isVerified',
            label: '',
            value: null,
            placeholder: '是否已验证身份',
            width: 120,
            type: 'select',
            option: this.isVerified
          },
          {
            key: 'isAccount',
            label: '',
            value: null,
            placeholder: '是否已绑定MT',
            width: 120,
            type: 'select',
            option: this.isAccount
          },
          {
            key: 'introducer',
            label: '',
            value: null,
            placeholder: '推荐码',
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
            label: '推荐码',
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
      this.queryData.formItem[2].option = this.userType
      this.queryData.formItem[3].option = this.isVerified
      this.queryData.formItem[4].option = this.isAccount
      this.getQuery()
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
            isVerified: this.queryData.formData.isVerified, // 是否已校验身份
            isAccount: this.queryData.formData.isAccount, // 是否已校验账户
            introducer: this.queryData.formData.introducer, // 推荐码
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
      }
    },
    mounted() {
      this.queryFormHeight = this.$refs.search.offsetHeight
    }
  }
</script>
