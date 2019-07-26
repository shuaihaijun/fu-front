<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery' @change-item="changeItem">
        <!-- <input type="text"> -->
      </os-search>
    </div>

    <os-table :showIndex="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @click-operate="handleOperate">
      <div slot="l">本次共查询出订单总数：{{tableDataTitle.orderCount}} 单 ，整货件数： {{tableDataTitle.wholeCount}}  件，散货件数： {{tableDataTitle.scatteredCount}} 件</div>
    </os-table>
    
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <os-dialog :visible="dialogVisible" :title="dialogTitle" :visibleButton="false" :width="dialogWidth +'px'" :top="dialogTop">
      <forms v-if="show == 'forms'" :pwid="LogWid"></forms>
      <log-table v-if="show == 'table'" :pwid="LogWid"></log-table>
    </os-dialog>
    
  </div>
</template>
<script>
  import api from '../../../api/'
  import logTable from './logTable'
  import form from './form'
  export default {
    components: {
      'log-table': logTable,
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
              type: 'select',
              option: [{
                label: '接单成功',
                value: 0
              }, {
                label: '取消',
                value: 1
              }, {
                label: '仓库处理中',
                value: 2
              }, {
                label: '配送在途',
                value: 3
              }, {
                label: '完成',
                value: 4
              }]
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
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '110px',
            fixed: 'left',
            isBtn: false,
            children: [{
                iconClass: 'el-icon-view',
                name: '详情',
                show: 'IsBtn2',
                isBtn: false
              },
              {
                iconClass: 'el-icon-edit-outline',
                name: '日志',
                show: 'IsBtn1',
                isBtn: false
              }
            ]
          }
        ],
        // 表头
        columnData: [{
          prop: 'userId',
          label: '用户ID',
          width: '100',
          align: 'center'
          },
          {
            prop: 'mtId',
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
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderOpenDate',
            label: '开仓时间',
            width: '150',
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
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          let params = {
            userId: userInfo.userId, // 用户id
            orderId: this.queryData.formData.orderId, // 订单id
            orderSymbol: this.queryData.formData.orderSymbol, // 外汇产品
            orderOpenDate: this.queryData.formData.orderOpenDate, // 订单开仓时间
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          api.getOrderAlive(params, (res) => {
            console.log(res.content)
            this.tableData = res.content.data
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      getWList() {
        this.$api.xsrwd.getFindTotal({}, (res) => {
          this.tableDataTitle = res.result
        })
        this.$api.xsrwd.getinsert({}, (res) => {
          let _arr = {}
          _arr.branch = res.result.list.map(item => { return { label: item.branchName, value: item.branchId } })
          this.queryData.formItem[0].option = _arr.branch
        })
      },
      changeItem() {
        let branchIdParams = ''
        if (this.queryData.formItem[0].value !== null) {
          branchIdParams = this.queryData.formItem[0].value
        }
        let params = {
          branchId: branchIdParams
        }
        console.log(params, 'params')
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
        //   console.log(res, 'getinsert')
        })
      },
      // 分页
      handlePage() {
        this.tableData = []
        this.getQuery()
      },
      // 查看or编辑
      handleOperate(row, index, name) {
        console.log(row)
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
