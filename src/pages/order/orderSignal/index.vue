<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery' @change-item="changeItem">
        <!-- <input type="text"> -->
      </os-search>
    </div>

    <os-table :showIndex="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData">
    </os-table>

    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <os-dialog :visible="dialogVisible" :title="dialogTitle" :visibleButton="false" :width="dialogWidth +'px'" :top="dialogTop">
    </os-dialog>

  </div>
</template>
<script>
  import api from '../../../api/'
  export default {
    components: {
    },
    data() {
      return {
        show: '',
        LogWid: '',
        dialogVisible: false,
        dialogTitle: '更新日志',
        dialogWidth: '',
        orderType: this.$api.getDicValues('order.tradeType'),
        tradeOperation: this.$api.getDicValues('order.tradeOperation'),
        dialogTop: '5%',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [{
            key: 'userId',
            label: '',
            value: null,
            placeholder: '用户ID',
            width: 180,
            type: ''
          },
           {
              key: 'signalId',
              label: '',
              value: null,
              placeholder: '信号源ID',
              width: 180,
              type: ''
            },
            {
            key: 'orderId',
            label: '',
            value: null,
            placeholder: '订单号',
            width: 180,
            type: ''
          },
          {
            key: 'orderSymbol',
            label: '',
            value: null,
            placeholder: '交易产品',
            width: 160,
            type: ''
          },
            {
              key: 'orderType',
              label: '',
              value: null,
              placeholder: '订单类型',
              width: 160,
              type: 'select',
              option: this.orderType
            },
            {
              key: 'orderTradeOperation',
              label: '',
              value: null,
              placeholder: '交易类型',
              width: 160,
              type: 'select',
              option: this.tradeOperation
            },
          {
            key: 'orderOpenDate',
            label: '',
            value: null,
            placeholder: '建仓时间',
            width: 200,
            type: 'datetimerange'
          },
          {
            key: 'orderCloseDate',
            label: '',
            value: null,
            placeholder: '平仓时间',
            width: 200,
            type: 'datetimerange'
          }]
        },
        // 表头
        columnData: [{
          prop: 'userId',
          label: '用户ID',
          width: '80',
          align: 'center'
          },
          {
            prop: 'signalId',
            label: '信号源ID',
            width: '80',
            align: 'center'
          },
          {
            prop: 'mtServerName',
            label: '服务器',
            width: '150',
            align: 'center'
          },
          {
            prop: 'mtAccId',
            label: 'MT账户ID',
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderType',
            label: '订单类型',
            width: '100',
            formatter: true,
            columnKey: 'order.tradeType',
            align: 'center'
          },
          {
            prop: 'orderTradeOperation',
            label: '交易类型',
            width: '80',
            formatter: true,
            columnKey: 'order.tradeOperation',
            align: 'center'
          },
          {
            prop: 'orderId',
            label: '订单ID',
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderSymbol',
            label: '产品',
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderLots',
            label: '数量',
            width: '80',
            align: 'center'
          },
          {
            prop: 'orderProfit',
            label: '收益',
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderSwap',
            label: '库存费',
            width: '80',
            align: 'center'
          },
          {
            prop: 'orderStoploss',
            label: '止损',
            width: '80',
            align: 'center'
          },
          {
            prop: 'orderOpenPrice',
            label: '开仓价格',
            width: '80',
            align: 'center'
          },
          {
            prop: 'orderClosePrice',
            label: '平仓价格',
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderOpenDate',
            label: '开仓时间',
            width: '',
            dateFormat: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'orderCloseDate',
            label: '平仓时间',
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
      this.getWList()
      if (window.localStorage.getItem('nice_user')) {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        if (userInfo.userType < 8 || userInfo.userType > 10) {
          // 管理者
          this.queryData.formItem[0].value = userInfo.userId
          this.queryData.formItem[0].readonly = true
        }
      } else {
        this.$message('获取用户信息失败！')
      }
      this.getQuery()
      this.queryData.formItem[4].option = this.orderType
      this.queryData.formItem[5].option = this.tradeOperation
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            operUserId: this.UsInfo.userId,
            userId: this.queryData.formData.userId, // 订单id
            signalId: this.queryData.formData.signalId, // 订单id
            orderId: this.queryData.formData.orderId, // 订单id
            orderTradeOperation: this.queryData.formData.orderTradeOperation, // 交易类型
            orderType: this.queryData.formData.orderType, // 订单类型
            orderSymbol: this.queryData.formData.orderSymbol, // 外汇产品
            orderOpenDate: this.queryData.formData.orderOpenDate, // 订单开仓时间
            orderCloseDate: this.queryData.formData.orderCloseDate, // 订单平仓时间
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          api.querySignalOrder(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.content.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      getWList() {
      },
      changeItem() {
        let branchIdParams = ''
        if (this.queryData.formItem[0].value !== null) {
          branchIdParams = this.queryData.formItem[0].value
        }
        let params = {
          branchId: branchIdParams
        }
        branchIdParams = ''
        this.$api.xsrwd.getinsert(params, (res) => {
          let _arr = {}
          if (this.queryData.formItem[0].value !== null) {
            _arr._w = res.result.list.map(item => { return { label: item.wname, value: item.wid } })
            _arr.wT = res.result.list.map(item => { return { label: item.wname, value: item.wid } })
            this.queryData.formItem[1].option = _arr._w
            this.queryData.formItem[2].option = _arr.wT
          }
        })
      },
      getWList2() {
      },
      getWList3() {
        let params = {
          branchId: this.queryData.formData.wid
        }
        this.$api.xsrwd.getinsert(params, (res) => {
          let _arr = {}
          _arr.wT = res.result.list.map(item => { return { label: item.wnameTarget, value: item.widTarget } })
          this.queryData.formItem[2].option = _arr.wT
        })
      },
      // 分页
      handlePage() {
        this.tableData = []
        this.getQuery()
        this.pageDataNum = 1 // cur_page 当前页
        this.pageshow = false // 让分页隐藏
        this.$nextTick(() => { // 重新渲染分页
          this.pageshow = true
        })
      },
      // 查看or编辑
      handleOperate(row, index, name) {
        this.LogWid = row
        if (name === '详情') {
          this.dialogVisible = true
          this.dialogTitle = '主单：' + row.wtcOrderCode + ' 详情 '
          this.show = 'forms'
          this.dialogWidth = 1200
          this.dialogTop = '2%'
        }
        if (name === '日志') {
          this.dialogVisible = true
          this.dialogTitle = '日志 '
          this.show = 'table'
          this.dialogWidth = 700
          this.dialogTop = '5%'
        }
      }
    },
    mounted() {
      this.queryFormHeight = this.$refs.search.offsetHeight
    }
  }
</script>
