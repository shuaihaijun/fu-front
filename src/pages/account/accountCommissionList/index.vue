<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @change-selection="selectionChange" @click-operate="viewAddTabUser">
      <div slot="r">
        <el-button @click="commissionWithDraw()"><i class="el-icon-check"></i> 佣金提取</el-button>
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
            key: 'accountId',
            label: '',
            value: null,
            placeholder: '社区账户ID',
            width: 200,
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
            prop: 'userId',
            label: '用户ID',
            width: '',
            align: 'center'
          },
          {
            prop: 'accountId',
            label: '社区账户ID',
            width: '150',
            align: 'center'
          },
          {
            prop: 'commissionMoney',
            label: '佣金余额',
            width: '',
            align: 'center'
          },
          {
            prop: 'commissionPaid',
            label: '已提取佣金',
            width: '',
            align: 'center'
          },
          {
            prop: 'commissionTotal',
            label: '总佣金额',
            width: '',
            align: 'center'
          },
          {
            prop: 'commissionSourceMoney',
            label: '源发生金额',
            width: '100',
            align: 'center'
          },
          {
            prop: 'commissionSourceLots',
            label: '源发生手数',
            width: '100',
            align: 'center'
          },
          {
            prop: 'accountState',
            label: '佣金账户状态',
            width: '100',
            formatter: true,
            columnKey: 'account.accountState',
            align: 'center'
          },
          {
            prop: 'createDate',
            label: '创建时间',
            width: '',
            dateFormat: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'modifyDate',
            label: '修改时间',
            width: '',
            dateFormat: true,
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
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          let params = {
            operUserId: userInfo.userId, // 操作用户id
            userId: this.queryData.formData.userId, // 用户ID
            accountId: this.queryData.formData.accountId
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          api.getPageAccountCommisson(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.page.total
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
          id: 'commission_view',
          name: '查看基础信息',
          url: 'accountCommission',
          uid: {
            formType: 'view',
            userId: row.userId,
            accountId: row.accountId
          }
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
          this.$store.dispatch('m1_form_state', this.$store.state.m1.m1_form_state + 1)
        }, 10)
      },
      commissionWithDraw() {
        if (!window.localStorage.getItem('nice_user')) {
          this.$message('获取用户信息失败！')
        }
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        MessageBox.confirm('确定提取该账户所有佣金吗？', '审核提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let param = {
            operId: userInfo.userId,
            userId: this.selectionRows[0].userId,
            accountId: this.selectionRows[0].accountId,
            commissionMoney: this.selectionRows[0].commissionMoney
          }
          // 审核流程
          api.accountCommissonWithdraw(param, (res) => {
            if (res.status === 0 && res.content !== null) {
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
            message: '已取消操作'
          })
        })
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
