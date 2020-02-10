<template>
  <div>
    <div>
      <div ref="search">
        <os-search :dataSource='queryData' @click-submit='getQuery'>

        </os-search>
      </div>
      <os-table :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData"  @click-operate="handleOperate">
      </os-table>
      <os-pag :pageTotal="pageDataTotal"></os-pag>
    </div>
    <os-dialog :visible="dialogVisible" :title="formTitle" :visibleButton="false" width="1380px" top="4.5%">
      <log-table :pwid="LogWid" @click-operate="handleOperate1"></log-table>
    </os-dialog>
  </div>
</template>
<script>
  import logTable from './logTable.vue'
  export default {
    components: {
      'log-table': logTable
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
        dialogVisible: false,
        formTitle: '佣金订流水生成日志',
        disabled: false,
        accountState: this.$api.getDicValues('account.accountState'),
        commissionType: this.$api.getDicValues('commissionLevel.commissionType'),
        commissionUserLevel: this.$api.getDicValues('commissionLevel.userLevel'),
        rateType: this.$api.getDicValues('commissionLevel.rateType'),
        LogWid: '',
        queryData: {
          formData: {},
          formItem: [
            {
              key: 'commissionType',
              label: '',
              value: null,
              placeholder: '佣金类型',
              width: 180,
              type: 'select',
              option: this.commissionType
            },
            {
              key: 'commissionLevel',
              label: '',
              value: null,
              placeholder: '返佣用户等级',
              width: 200,
              type: 'select',
              option: this.commissionUserLevel
            },
            {
              key: 'rateType',
              label: '',
              value: null,
              placeholder: '比率计算类型',
              width: 200,
              type: 'select',
              option: this.rateType
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
            prop: 'accountId',
            label: '账户ID',
            width: '150',
            align: 'center'
          },
          {
            prop: 'commissionDate',
            label: '返佣日期',
            width: '',
            dateFormat: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'commissionType',
            label: '佣金类型',
            width: '100',
            formatter: true,
            columnKey: 'commissionLevel.commissionType',
            align: 'center'
          },
          {
            prop: 'commissionUserType',
            label: '用户类型',
            width: '100',
            formatter: true,
            columnKey: 'user.userType',
            align: 'center'
          },
          {
            prop: 'commissionMoney',
            label: '返佣佣金',
            width: '100',
            align: 'center'
          },
          {
            prop: 'commissionLevel',
            label: '收佣等级',
            width: '100',
            formatter: true,
            columnKey: 'commissionLevel.userLevel',
            align: 'center'
          },
          {
            prop: 'commissionRateType',
            label: '比率类型',
            width: '100',
            formatter: true,
            columnKey: 'commissionLevel.rateType',
            align: 'center'
          },
          {
            prop: 'commissionRate',
            label: '返佣比率',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sourceMoney',
            label: '源金额',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sourceLots',
            label: '源手数',
            width: '100',
            align: 'center'
          },
          {
            prop: 'coinType',
            label: '币种类型',
            width: '100',
            formatter: true,
            columnKey: 'account.coinType',
            align: 'center'
          }
        ],
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '100px',
            fixed: 'left',
            isBtn: true,
            children: [{
              iconClass: 'el-icon-view',
              name: '详情日志',
              show: 'IsBtn2',
              isBtn: true
            }
            ]
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
      this.createdCom()
      this.queryData.formItem[0].option = this.commissionType
      this.queryData.formItem[1].option = this.commissionUserLevel
      this.queryData.formItem[2].option = this.rateType
    },
    methods: {
      // 查看or编辑
      handleOperate(row, index, name) {
        this.dialogVisible = true
        this.LogWid = row
      },
      createdCom() {
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            userId: this.currentUserId
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          this.$api.getPageCommissonFlow(data, (res) => {
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
      },
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          // 判断用户权限
          let params = {
            userId: this.currentUserId, // 操作用户id
            commissionType: this.queryData.formData.commissionType, //
            commissionUserType: this.queryData.formData.commissionUserType, //
            commissionUserLevel: this.queryData.formData.commissionUserLevel, //
            rateType: this.queryData.formData.rateType //
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          this.$api.getPageCommissonFlow(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.page.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 对话框表格查看详情
      handleOperate1(v) {
        this.dialogVisible = false
        let _data = {
          id: 'm1_view',
          name: '查看流水日志',
          url: 'm1_1_form1',
          uid: {
            formType: 'view',
            id: v
          }
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
          this.$store.dispatch('m1_form_state', this.$store.state.m1.m1_form_state + 1)
        }, 10)
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
