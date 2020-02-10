<template>
  <div>
    <div>
      <div ref="search">
        <os-search :dataSource='queryData' @click-submit='getQuery'>
        </os-search>
      </div>
      <os-table :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData"  @change-selection="selectionChange">
        <div slot="r">
          <el-button @click="applyCheck"><i class="el-icon-check"></i> 提交</el-button>
          <el-button @click="applyAdd"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
          <el-button @click="applyEdit"><i class="el-icon-edit-outline"></i> 编辑</el-button>
          <el-button @click="applyDelete"><i class="el-icon-delete-solid"></i> 删除</el-button>
        </div>
      </os-table>
      <os-pag :pageTotal="pageDataTotal"></os-pag>
    </div>
    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :height="height" :title="formTitle"></forms>
  </div>
</template>
<script>
  import forms from './formCommissionApplyOper.vue'
  import { MessageBox } from 'element-ui'
  export default {
    components: {
      'forms': forms
    },
    props: {
      formType: {
        default() {
          return 'edit'
        }
      },
      currentUserId: 0
    },
    data() {
      return {
        tableDataLog: [],
        formVisible: false,
        formTitle: '佣金订流水生成日志',
        disabled: false,
        height: '100px',
        show: false,
        selectionRows: '',
        applyState: this.$api.getDicValues('com.applyState'),
        LogWid: {userId: 0},
        queryData: {
          formData: {},
          formItem: [
            {
              key: 'applyUserId',
              label: '',
              value: null,
              placeholder: '申请人ID',
              width: 180
            },
            {
              key: 'applyState',
              label: '',
              value: null,
              placeholder: '申请状态',
              width: 180,
              type: 'select',
              option: this.applyState
            },
            {
              key: 'applyUserId',
              label: '',
              value: null,
              placeholder: '申请人ID',
              width: 180
            },
            {
              key: 'applyDate',
              label: '',
              value: null,
              placeholder: '申请时间',
              width: 200,
              type: 'datetimerange'
            },
            {
              key: 'checkDate',
              label: '',
              value: null,
              placeholder: '审核时间',
              width: 200,
              type: 'datetimerange'
            }]
        },
        columnData: [
          {
            prop: 'userId',
            label: '用户ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'username',
            label: '用户账号',
            width: '90',
            align: 'center'
          },
          {
            prop: 'refName',
            label: '用户昵称',
            width: '90',
            align: 'center'
          },
          {
            prop: 'accountId',
            label: '账户ID',
            width: '150',
            align: 'center'
          },
          {
            prop: 'applyUserId',
            label: '申请人',
            width: '90',
            align: 'center'
          },
          {
            prop: 'applyState',
            label: '申请状态',
            width: '100',
            formatter: true,
            columnKey: 'com.applyState',
            align: 'center'
          },
          {
            prop: 'withdrawAmount',
            label: '提取金额',
            width: '100',
            align: 'center'
          },
          {
            prop: 'applyDate',
            label: '申请日期',
            width: '',
            dateFormat: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'checkDate',
            label: '审核日期',
            width: '100',
            dateFormat: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'bankName',
            label: '银行名称',
            width: '100',
            align: 'center'
          },
          {
            prop: 'bankCode',
            label: '银行卡号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'hostName',
            label: '户主',
            width: '100',
            align: 'center'
          },
          {
            prop: 'checkDesc',
            label: '审核说明',
            width: '100',
            align: 'center'
          }
        ],
        // 表格
        tableData: []
      }
    },
    created() {
      if (this.currentUserId !== undefined && this.currentUserId !== 0) {
      } else {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        this.currentUserId = userInfo.userId
      }
      this.getQuery()
      this.queryData.formItem[1].option = this.applyState
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          // 判断用户权限
          let params = {
            userId: this.currentUserId, // 操作用户id
            operUserId: this.UsInfo.userId,
            applyUserId: this.queryData.formData.applyUserId, //
            applyState: this.queryData.formData.applyState, //
            applyDate: this.queryData.formData.applyDate, //
            checkDate: this.queryData.formData.checkDate //
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          this.$api.commissonWithdrawApplyQuery(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.page.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      applyAdd() {
        this.LogWid.userId = this.currentUserId
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.formTitle = '信号源信息'
        this.show = 'forms'
        this.disabled = false
      },
      applyEdit() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        if (this.selectionRows[0].applyState !== 1 && this.selectionRows[0].applyState !== 3) {
          window.alert('当前状态不允许编辑！')
          return
        }
        this.LogWid = this.selectionRows[0]
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.formTitle = '信号源信息'
        this.show = 'forms'
        this.disabled = false
      },
      // 删除数据
      applyDelete() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        if (this.selectionRows[0].applyState !== 1 && this.selectionRows[0].applyState !== 3) {
          window.alert('当前状态不允许删除！')
          return
        }
        MessageBox.confirm('确定删除吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let params = {
            userId: this.currentUserId, // 操作用户id
            operUserId: this.UsInfo.userId,
            id: this.selectionRows[0].id
          }
          let data = {
            params
          }
          // 删除流程
          this.$api.commissonWithdrawApplyDelete(data, (res) => {
            if (res.status === 0 && res.content.data !== '') {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      // 提交数据
      applyCheck() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        if (this.selectionRows[0].applyState !== 1 && this.selectionRows[0].applyState !== 3) {
          window.alert('当前状态不允许操作！')
          return
        }
        MessageBox.confirm('确定提交吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let params = {
            userId: this.currentUserId, // 操作用户id
            operUserId: this.UsInfo.userId,
            id: this.selectionRows[0].id
          }
          let data = {
            params
          }
          this.$api.commissonWithdrawApplySubmit(data, (res) => {
            if (res.status === 0 && res.content.data !== '') {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert(res.message)
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
    }
  }
</script>

<style>
  .upload_zl {
    padding: 20px 0;
    border-bottom: #F7F7F7 solid 1px;
  }
  
  .upload_zl_title {
    float: left;
    width: 120px;
    line-height: 145px;
    text-align: center;
  }
  
  .upload_zl_list {
    margin-left: 120px;
  }
</style>
