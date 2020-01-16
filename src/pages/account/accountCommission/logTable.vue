<template>
  <div>
    <os-table :showTip="false" :showIndex="true" :topbar="false" :tableHeight="600" :columnData="columnData" :tableData="tableData"
       :operate="true">
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>
    
  </div>
</template>
<script>
  export default {
    props: {
      pwid: ''
    },
    data() {
      return {
        // 表头
        columnData: [{
            prop: 'sourceUserId',
            label: '源用户ID',
            width: '',
            align: 'center'
          },
          {
            prop: 'sourceOrderId',
            label: '源订单号',
            width: '',
            align: 'center'
          },
          {
            prop: 'sourceOrderOper',
            label: '原订单操作类型',
            width: '',
            formatter: true,
            columnKey: 'order.tradeType',
            align: 'center'
          },
          {
            prop: 'sourceOrderMoney',
            label: '源金额',
            width: '',
            align: 'center'
          },
          {
            prop: 'sourceOrderLots',
            label: '订单手数',
            width: '',
            align: 'center'
          },
          {
            prop: 'commissionDate',
            label: '发生佣金时间',
            width: '120',
            align: 'center'
          },
          {
            prop: 'commissionType',
            label: '佣金类型',
            width: '',
            formatter: true,
            columnKey: 'commissionLevel.commissionType',
            align: 'center'
          },
          {
            prop: 'commissionUserId',
            label: '收佣用户ID',
            width: '',
            align: 'center'
          },
          {
            prop: 'commissionUserType',
            label: '收佣用户类型',
            width: '',
            formatter: true,
            columnKey: 'user.userType',
            align: 'center'
          },
          {
            prop: 'commissionUserLevel',
            label: '收佣等级',
            width: '',
            formatter: true,
            columnKey: 'commissionLevel.userLevel',
            align: 'center'
          },
          {
            prop: 'commissionAccountId',
            label: '收佣账户ID',
            width: '',
            align: 'center'
          },
          {
            prop: 'commissionRateType',
            label: '计算类型',
            width: '',
            formatter: true,
            columnKey: 'commissionLevel.rateType',
            align: 'center'
          },
          {
            prop: 'commissionRate',
            label: '佣金比例',
            width: '',
            align: 'center'
          },
          {
            prop: 'commissionMoney',
            label: '返佣佣金',
            width: '',
            align: 'center'
          },
          {
            prop: 'commissionState',
            label: '返佣状态',
            width: '',
            formatter: true,
            columnKey: 'commission.commissionState',
            align: ''
          }
        ],
        // 表格操作按钮
        columnOperate: [{
          label: '操作',
          fixed: 'right',
          width: '100px',
          children: [{
            iconClass: 'el-icon-view',
            name: '查看详情'
          }]
        }],
        tableData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let params = {
          commissionUserId: this.wid.userId,
          commissionAccountId: this.wid.accountId,
          commissionDate: this.wid.commissionDate
        }
        let pageInfoHelper = {
          pageSize: this.pageDataSize,
          pageNo: this.pageDataNum
        }
        let data = {
          params,
          pageInfoHelper
        }
        this.$api.findCommissionCustomerByCondition(data, (res) => {
          this.tableData = res.content.data
          this.pageDataTotal = res.page.total
        })
      },
      // 分页
      handlePage() {
        this.tableData = []
        this.getList()
      }
    },
    computed: {
      wid() {
        return this.pwid
      }
    },
    watch: {
      wid(v) {
        this.getList()
      }
    }
  }
</script>
