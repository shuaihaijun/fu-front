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
            key: 'branchId',
            label: '',
            value: null,
            placeholder: '请选择分公司',
            width: 180,
            type: 'select',
            option: []
          },
          {
            key: 'wid',
            label: '',
            value: null,
            placeholder: '请选择发货仓库',
            width: 150,
            type: 'select',
            option: []
          },
          {
            key: 'widTarget',
            label: '',
            value: null,
            placeholder: '请选择目的仓库',
            width: 150,
            type: 'select',
            option: []
          },
           {
            key: 'state',
            label: '',
            value: null,
            placeholder: '请选择主单状态',
            width: 150,
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
              value: 3
            }]
          },
          {
            key: 'orderTimeStr',
            label: '',
            value: null,
            placeholder: '下单时间',
            width: 260,
            type: 'datetimerange'
          },
          {
            key: 'customerCode',
            label: '',
            value: null,
            placeholder: '请输入客户编号',
            width: 160,
            type: ''
          },
          {
            key: 'customerName',
            label: '',
            value: null,
            placeholder: '请输入客户名称模糊查询',
            width: 200,
            type: ''
          },
          {
            key: 'wtcOrderCode',
            label: '',
            value: null,
            placeholder: '请输入主单号',
            width: 180,
            type: ''
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
            prop: 'wtcOrderCode',
            label: '主单遍号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'stateStr',
            label: '主单状态',
            width: '90',
            align: 'center'
          },
          {
            prop: 'branchName',
            label: '分公司',
            width: '90',
            align: 'center'
          },
          {
            prop: 'wname',
            label: '发货仓库',
            width: '80',
            align: 'center'
          },
          {
            prop: 'wnameTarget',
            label: '目的仓库',
            width: '100',
            align: 'center'
          },
          {
            prop: 'orderTimeStr',
            label: '下单时间',
            width: '',
            align: 'center'
          },
          {
            prop: 'customerCode',
            label: '客户编号',
            width: '120',
            align: 'center'
          },
          {
            prop: 'customerName',
            label: '客户名称',
            width: '120',
            align: 'center'
          },
          {
            prop: 'auditTimeStr',
            label: '审核时间',
            width: '100',
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
        if (this.queryData.formData.orderTimeStr) {
          let params = {
            branchId: this.queryData.formData.branchId, // 分公司id
            wid: this.queryData.formData.wid, // 仓库id
            state: this.queryData.formData.state, // 状态
            orderTimeArray: this.queryData.formData.orderTimeStr, // 下单时间起
            customerCode: this.queryData.formData.customerCode, // 客户编码
            customerName: this.queryData.formData.customerName, // 客户名称
            wtcOrderCode: this.queryData.formData.wtcOrderCode, // Oms单号
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          console.log(params)
          this.$api.xsrwd.getFindList(params, (res) => {
            this.tableData = res.result.list
            this.pageDataTotal = res.result.total
            console.log(res, 'getFindList')
          })
        } else {
          this.$message('请选择下单时间段')
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