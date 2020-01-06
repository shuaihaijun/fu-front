<template>
  <div>
    <div class="form_topBar" :style="{'width': topWidth}">
      <div class="form_topBar_l">
        <b>用户信息</b>
      </div>
    </div>
    <el-form :model="dataForm" class="dataForm"  ref="ruleForm" :class="{'dataForm_view': formType == 'view'}" label-width="100px">
      <el-row :gutter="15">
        <form-1 :dataForm="dataForm" :formType="formType"></form-1>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="MT账户信息" name="1">
            <form-2 :dataForm="dataForm" :formType="formType" :tableData="tableData1"></form-2>
          </el-collapse-item>
        </el-collapse>
        <div>
          <h3>用户订单</h3>
          <div ref="search">
            <os-search :dataSource='queryData' @click-submit='getQuery'>
            </os-search>
          </div>
          <os-table :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData">
            <div slot="r">
            </div>
          </os-table>
          <os-pag :pageTotal="pageDataTotal"></os-pag>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import form1 from './formUserInfo.vue'
  import form2 from './formUserAcc.vue'

  export default {
    components: {
      'form-1': form1,
      'form-2': form2
    },
    props: {
    },
    data() {
      return {
        formType: 'view',
        activeName: '1',
        dataForm: {
          modifyPersonName: '',
          wname: ''
        },
        userId: '',
        tableData1: [{}],
        disabled: false,
        orderType: this.$api.getDicValues('order.tradeType'),
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
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
              placeholder: '订单交易类型',
              width: 160,
              type: 'select',
              option: this.orderType
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
            label: '交易类型',
            width: '100',
            formatter: true,
            columnKey: 'order.tradeType',
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
            align: 'center'
          }
        ],
        // 表格
        tableData: []
      }
    },
    created() {
      this.queryData.formItem[2].option = this.orderType
      this.createdCom()
      this.getQuery()
    },
    methods: {
      createdCom() {
        this.dataForm.wid = this.$store.state.tab.uid.id
        this.userId = this.$store.state.tab.uid.id
        this.dataForm.wname = this.$store.state.tab.uid.wname
        let params = {
          id: this.userId,
          userId: this.userId,
          username: this.dataForm.wname
        }
        this.$api.getUserByIdOrName(params, (res) => {
          let _dataForm = res.content
          this.dataForm = _dataForm
        })
        this.$api.getUsersMtAccountByCondition(params, (res) => {
          if (res.content !== null) {
            if (res.content.data.length > 0) {
              this.tableData1 = res.content.data
            } else {
              this.initTable1()
            }
          } else {
            this.tableData1 = [{}]
          }
        })
      },
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          let params = {
            introducer: userInfo.userId, // 操作者userId
            userId: this.userId, // 用户ID
            orderId: this.queryData.formData.orderId, // 订单id
            orderType: this.queryData.formData.orderType, // 交易类型
            orderSymbol: this.queryData.formData.orderSymbol, // 外汇产品
            orderOpenDate: this.queryData.formData.orderOpenDate, // 订单开仓时间
            orderCloseDate: this.queryData.formData.orderCloseDate, // 订单平仓时间
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          this.$api.getOrderCustomer(params, (res) => {
            this.tableData = res.content.records
            this.pageDataTotal = res.content.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      initTable1() {
        this.tableData1 = [
          {
            'accountType': '',
            'brokerName': '',
            'serverName': '',
            'mtAccId': '',
            'mtPasswordWatch': '',
            'mtPasswordTrade': '',
            'connectState': ''
          }
        ]
      }
    },
    computed: {
      form_state () {
        return this.$store.state.m1.m1_form_state
      }
    },
    watch: {
      form_state (v) {
        // this.createdCom()
      }
    }
  }
</script>
