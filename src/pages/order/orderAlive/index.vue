<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
        <!-- <input type="text"> -->
      </os-search>
    </div>

    <os-table :showIndex="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData"  :tableData="tableData" >
    </os-table>
    
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <os-dialog :visible="dialogVisible" :title="dialogTitle" :visibleButton="false" :width="dialogWidth +'px'" :top="dialogTop">
      <forms v-if="show == 'forms'" :pwid="LogWid"></forms>
    </os-dialog>
    
  </div>
</template>
<script>
  import api from '../../../api/'
  import form from './form'
  export default {
    components: {
      'forms': form
    },
    data() {
      return {
        show: '',
        LogWid: '',
        dialogVisible: false,
        dialogTitle: '更新日志',
        dialogWidth: '',
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
              key: 'orderOpenDate',
              label: '',
              value: null,
              placeholder: '建仓时间',
              width: 200,
              type: 'datetimerange'
            }]
        },
        // 表头
        columnData: [{
          prop: 'userId',
          label: '用户ID',
          width: '100',
          align: 'center'
          },
          {
            prop: 'mtAccId',
            label: 'MT账户ID',
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderId',
            label: '订单ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'orderSymbol',
            label: '产品',
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderTradeOperation',
            label: '操作',
            width: '100',
            formatter: true,
            columnKey: 'order.tradeOperation',
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
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderClosePrice',
            label: '当前价格',
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderOpenPrice',
            label: '开仓价格',
            width: '',
            align: 'center'
          },
          {
            prop: 'orderOpenDate',
            label: '开仓时间',
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
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        // 在仓订单查询 用户不能为空
        if (!this.queryData.formData.userId) {
          this.$message('用户信息不能为空！')
          return
        }
        if (!this.queryData.formData.orderOpenDate) {
          this.$message('查询时间段不能为空！')
          return
        }
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            userId: this.queryData.formData.userId, // 用户id
            orderId: this.queryData.formData.orderId, // 订单id
            orderSymbol: this.queryData.formData.orderSymbol, // 外汇产品
            orderOpenDate: this.queryData.formData.orderOpenDate, // 订单开仓时间
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          api.getOrderAlive(params, (res) => {
            if (res.status === 0 && res.content !== null && res.content.data !== '') {
              this.tableData = res.content.data
              // 保存成功
              window.alert('操作成功！')
            } else {
              if (res.message) {
                window.alert(res.message)
              }
            }
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 分页
      handlePage() {
        this.tableData = []
        this.getQuery()
      }
    },
    mounted() {
      this.queryFormHeight = this.$refs.search.offsetHeight
    }
  }
</script>
