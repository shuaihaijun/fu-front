<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>
    
    <os-table :showIndex="true" :searchHeight="queryFormHeight" :selection="true" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @click-operate="handleOperate">
      <div slot="r"><el-button @click="handleDis" v-if="IsBtn1"><i class="el-icon-check"></i> 重新处理</el-button></div>
    </os-table>
    
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <os-dialog :visible="dialogVisible" :title="dialogTitle" :visibleButton="false" :width="dialogWidth +'px'" :top="dialogTop">
      <log-table :pwid="LogWid"></log-table>
    </os-dialog>
    
  </div>
</template>
<script>
  import logTable from './logTable'
  export default {
    components: {
      'log-table': logTable
    },
    data() {
      return {
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
            option: [{
              label: 'ssss',
              value: 'aaaaaaa'
            }]
          },
          {
            key: 'wid',
            label: '',
            value: null,
            placeholder: '请选择发货仓库',
            width: 150,
            type: 'select',
            option: [{
              label: 'ssss',
              value: 'aaaaaaa'
            }]
          },
          {
            key: 'wid',
            label: '',
            value: null,
            placeholder: '请选择子单类型',
            width: 150,
            type: 'select',
            option: [{
              label: '销售订单',
              value: 0
            }, {
              label: '内领',
              value: 1
            }, {
              label: '内卖',
              value: 2
            }, {
              label: '折扣',
              value: 3
            }]
          },
           {
            key: 'exceptionType',
            label: '',
            value: null,
            placeholder: '请选择异常类型',
            width: 150,
            type: 'select',
            option: [{
              label: '打标',
              value: 0
            }, {
              label: '下传',
              value: 1
            }, {
              label: '匹配',
              value: 2
            }]
          },
          {
            key: 'exceptionState',
            label: '',
            value: null,
            placeholder: '请选择处理状态',
            width: 150,
            type: 'select',
            option: [{
              label: '失败',
              value: 0
            }, {
              label: '成功',
              value: 1
            }]
          },
          {
            key: 'orderTime',
            label: '',
            value: null,
            placeholder: '下单时间',
            width: 260,
            type: 'datetimerange'
          },
          {
            key: 'wmsOrderCode',
            label: '',
            value: null,
            placeholder: '请输入订单号',
            width: 180,
            type: ''
          }]
        },
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '150px',
            fixed: 'left',
            isBtn: false,
            children: [{
                iconClass: 'el-icon-refresh',
                name: '重新处理',
                show: 'IsBtn2',
                isBtn: false
              },
              {
                iconClass: 'el-icon-view',
                name: '日志',
                show: 'IsBtn1',
                isBtn: false
              }
            ]
          }
        ],
        // 表头
        columnData: [{
            prop: 'exceptionType',
            label: '异常类型',
            width: '70'
          },
          {
            prop: 'wmsOrderCode',
            label: '子单号',
            width: '90'
          },
          {
            prop: '1',
            label: '子单类型',
            width: '90'
          },
          {
            prop: 'orderTime',
            label: '下单时间',
            align: 'center'
          },
          {
            prop: 'exceptionStateStr',
            label: '处理状态',
            width: '100',
            align: 'center'
          },
          {
            prop: 'involvingSystems',
            label: '涉及系统',
            width: '100',
            align: 'center'
          },
          {
            prop: 'wname',
            label: '发货仓库',
            width: '120',
            align: 'center'
          },
          {
            prop: 'tryCount',
            label: '重试次数',
            width: '70',
            align: 'center'
          },
          {
            prop: 'exceptionContext',
            label: '最新异常信息',
            width: '100',
            align: 'center'
          }
        ],
        // 表格
        tableData: []
      }
    },
    created() {
      this.getWList()
      this.getQuery()
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
      getWList() {
        let params = {
        }
        this.$api.xsrwd.getinsert(params, (res) => {
          let _arr = {}
          _arr.branch = res.result.list.map(item => { return { label: item.branchName, value: item.branchId } })
          _arr._w = res.result.list.map(item => { return { label: item.wname, value: item.wid } })
          this.queryData.formItem[0].option = _arr.branch
          this.queryData.formItem[1].option = _arr._w
          console.log(res, 'getinsert')
        })
      },
      // 搜索获取表格数据
      getQuery() {
        let params = {
          branchId: this.queryData.formData.branchId, // 分公司id
          wid: this.queryData.formData.wid,
          exceptionState: this.queryData.formData.exceptionState, // 状态
          orderTimeArray: this.queryData.formItem.orderTimeStr, // 下单时间起
          wmsOrderCode: this.queryData.formData.wmsOrderCode,
          exceptionType: this.queryData.formData.exceptionType,
          pageSize: this.pageDataSize,
          pageNum: this.pageDataNum
        }
        console.log(this.queryData.formItem[5])
        console.log(this.queryData.formItem[5])
        this.$api.ycddjk.getfindList(params, (res) => {
          this.tableData = res.result.list
          this.pageDataTotal = res.result.total
          console.log(res)
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
      handleDis() {
        console.log('handleDis')
      },
      // 查看or编辑
      handleOperate(row, index, name) {
        this.LogWid = row
        if (name === '重新处理') {
          console.log('重新处理')
          let params = {
            exceptionType: row.exceptionType,
            wmsOrderCode: row.wmsOrderCode
          }
          this.$api.ycddjk.getDistributions(params, (res) => {
            console.log(res)
          })
        }
        if (name === '日志') {
          this.dialogVisible = true
          this.dialogTitle = '日志 '
          this.show = 'table'
          this.dialogWidth = 960
          this.dialogTop = '5%'
        }
      }
    },
    mounted() {
      this.queryFormHeight = this.$refs.search.offsetHeight
    }
  }
</script>
