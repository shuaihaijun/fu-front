<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>
    <div>
      <os-table :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData"  @click-operate="handleOperate">
      </os-table>
      <os-pag :pageTotal="pageDataTotal"></os-pag>
    </div>
  </div>
</template>
<script>
  export default {
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
        dialogVisible: false,
        formTitle: '佣金订流水生成日志',
        disabled: false,
        LogWid: '',
        queryData: {
          formData: {},
          formItem: [
            {
              key: 'withdrawTime',
              label: '',
              value: null,
              placeholder: '提取时间',
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
            prop: 'operUserId',
            label: '操作人',
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
            prop: 'withdrawTime',
            label: '提取日期',
            width: '',
            dateFormat: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'withdrawAmount',
            label: '金额',
            width: '100',
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
            prop: 'accountBefore',
            label: '操作前余额',
            width: '90',
            align: 'center'
          },
          {
            prop: 'accountAfter',
            label: '操作后余额',
            width: '90',
            align: 'center'
          },
          {
            prop: 'comment',
            label: '备注',
            width: '90',
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
    },
    methods: {
      // 查看or编辑
      handleOperate(row, index, name) {
        this.dialogVisible = true
        this.LogWid = row
      },
      getQuery() {
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            userId: this.currentUserId,
            operId: this.UsInfo.userId,
            withdrawTime: this.queryData.formData.withdrawTime // 时间
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          this.$api.commissonWithdrawQuery(data, (res) => {
            if (res.content !== null) {
              this.tableData = res.content.data
              this.pageDataTotal = res.content.total
            } else {
              this.tableData = [{}]
            }
          })
        } else {
          this.$message('获取用户信息失败！')
        }
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
