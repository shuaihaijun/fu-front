<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>
    
    <el-table :data="tableData" :height="countHeight" :span-method="objectSpanMethod" border style="width: 100%;">
      <template v-for="(r,index) in columnOperate">
        <el-table-column
          :key="index"
          v-if="r.isBtn"
          :fixed="r.fixed ? r.fixed : operateFixed"
          align="center"
          :label="r.label ? r.label : '仓库信息操作'"
          :width="r.width ? r.width : operateWidth">
          <template scope="scope">
            <span v-if="rc.isBtn" class="operate_btn_default" v-for="rc in r.children" @click="handleOperate(scope.row, index, rc.name)">
              <i :class="rc.iconClass" :title="rc.iconTitle ? rc.iconTitle : rc.name"></i>{{rc.name}}
            </span>
          </template>
        </el-table-column>
      </template>
      <el-table-column align="center" prop="branchName" label="分公司"> </el-table-column>
      <el-table-column prop="wname" label="仓库名" width="90"> </el-table-column>
      <el-table-column align="center" prop="transportationTypeStr" label="运输类型" width="90"> </el-table-column>
      <el-table-column align="center" prop="distributionScopeStr" label="配送范围" width="80"> </el-table-column>
      <el-table-column align="center" prop="orderTimeSlot" label="下单时间段" width="100"> </el-table-column>
      <el-table-column align="center" prop="distributionBatchStr" label="配送批次" width="100"> </el-table-column>
      <el-table-column align="center" prop="distributionTimeSlot" label="应配送时间段" width="120"> </el-table-column>
      <el-table-column align="center" prop="distributionStateStr" label="状态" width="120"> </el-table-column>
      <el-table-column align="center" prop="updateName" label="更新人" width="100"> </el-table-column>
      <el-table-column align="center" prop="updateTime" label="更新时间"> </el-table-column>
    </el-table>

    <!-- <os-table :topbar="false" :searchHeight="queryFormHeight - 40" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @click-operate="handleOperate" @span-method="objectSpanMethod">
    </os-table> -->
    
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
        dialogTop: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [{
            key: 'branchId',
            label: '',
            value: null,
            placeholder: '选择分公司',
            width: 200,
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
            placeholder: '选择仓库',
            width: 100,
            type: 'select',
            option: [{
              label: 'ssss',
              value: 'aaaaaaa'
            }]
          },
          {
            key: 'distributionBatch',
            label: '',
            value: null,
            placeholder: '选择配送批次',
            width: 120,
            type: 'select',
            option: [{
              label: 'T+0',
              value: 0
            }, {
              label: 'T+1',
              value: 1
            }, {
              label: 'T+2',
              value: 2
            }, {
              label: 'T+3',
              value: 3
            }]
          }]
        },
        // 表格
        tableData: [],
        countHeight: '0',
        arr: [],
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '110px',
            fixed: 'left',
            isBtn: false,
            children: [{
                iconClass: 'el-icon-edit-outline',
                name: '编辑',
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
        ]
      }
    },
    created() {
      setTimeout(() => {
        let _h = document.documentElement.clientHeight
        this.countHeight = _h - 160 - this.queryFormHeight
      }, 0)
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
          branchId: this.queryData.formData.branchId,
          wid: this.queryData.formData.wid,
          distributionBatch: this.queryData.formData.distributionBatch,
          pageSize: this.pageDataSize,
          pageNum: this.pageDataNum
        }
        this.$api.pspc.getFindWtcList(params, (res) => {
          this.tableData = res.result.list
          this.pageDataTotal = res.result.total
          let newArr = []
          let newArr2 = []
          for (let i = 0; i < this.tableData.length; i++) {
            if (newArr.indexOf(this.tableData[i].wname) === -1) {
              newArr.push(this.tableData[i].wname)
            }
          }
          for (let t = 0; t < newArr.length; t++) {
            newArr2[t] = 0
          }
          for (let p = 0; p < newArr.length; p++) {
            for (let j = 0; j < this.tableData.length; j++) {
              if (newArr[p] === this.tableData[j].wname) {
                newArr2[p]++
              }
            }
          }
          for (let m = 0; m < newArr.length; m++) {
            this.arr.push({
              date: newArr[m],
              count: newArr2[m]
            })
          }
        })
      },
      // 分页
      handlePage() {
        this.tableData = []
        this.getQuery()
      },
      // 查看or编辑
      handleOperate(row, index, name) {
        console.log(row, 'row')
        console.log(index, 'index')
        console.log(name, 'name')
        this.LogWid = row
        if (name === '编辑') {
          this.dialogVisible = true
          this.dialogTitle = '编辑 ' + row.wid
          this.show = 'forms'
          this.dialogWidth = 860
          this.dialogTop = '2%'
        }
        if (name === '日志') {
          this.dialogVisible = true
          this.dialogTitle = '日志 '
          this.show = 'table'
          this.dialogWidth = 960
          this.dialogTop = '5%'
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // console.log(this.arr[2].count)
        for (var k = 0; k < this.arr.length; k++) {
          if (row.wname === this.arr[k].date) {
            if (columnIndex === 2 || columnIndex === 1) {
              // console.log(rowIndex % this.arr[k].count)
              if (rowIndex % this.arr[k].count === 0) {
                return {
                  rowspan: this.arr[k].count,
                  colspan: 1
                }
              } else {
                return [0, 0]
              }
            }
          }
        }
      }
    },
    mounted() {
      this.queryFormHeight = this.$refs.search.offsetHeight
    }
  }
</script>