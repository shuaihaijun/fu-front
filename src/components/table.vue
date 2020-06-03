<template>
  <div>
    <!--表格工具条-->
    <div class="table_topbar" v-if="topbar">
      <div class="table_topbar_l">
         <slot name="l"></slot>
      </div>
      <div class="table_topbar_r">
         <slot name="r"></slot>
      </div>
    </div>
    <!--表格-->
    <el-table v-loading="loading" ref="table" stripe @row-click="handleRowClick" :data="tableData" :height="tableHeight ? tableHeight : countHeight" :highlight-current-row="highlight" border style="width: 100%"
              row-key="id" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}" @selection-change="handleSelectionChange"
              :header-cell-style="{background:'#2b3348',color:'#ffffff',fontWeight:'250'}">
      <el-table-column
        type="selection"
        width="40"
        v-if="selection">
      </el-table-column>
      <el-table-column
        v-if="columnOperate" v-for="(r,index) in columnOperate"
        :key="index"
        align="center"
        :label="r.label ? r.label : '信息操作'"
        :width="r.width ? r.width : operateWidth">
        <template scope="scope">
            <span v-for="rc in r.children" v-if="rc.isBtn" class="operate_btn_default" :class="{operate_btn: btnShow}" @click="handleOperate(scope.row, index, rc.name)">
              <i :class="rc.iconClass" :title="rc.iconTitle ? rc.iconTitle : rc.name"></i>{{rc.name}}
            </span>
        </template>
      </el-table-column>
      <el-table-column type="index" align="center" width="50" label="序号" v-if="showIndex">
      </el-table-column>
      <el-table-column :showOverflowTooltip="showTip"  v-for="r in columnData" v-if="r.formatter" :column-key="r.columnKey" :prop="r.prop" :label="r.label" :width="r.width" :align="r.align" :fixed="r.fixed" :formatter="dicFormatter">
      </el-table-column>
      <el-table-column :showOverflowTooltip="showTip"  v-else-if="r.dateFormat" :column-key="r.format" :prop="r.prop" :label="r.label" :width="r.width" :align="r.align" :fixed="r.fixed" :formatter="dateFormatter">
      </el-table-column>
      <el-table-column :showOverflowTooltip="showTip" v-else :prop="r.prop" :label="r.label" :width="r.width" :align="r.align" :fixed="r.fixed">
        <el-table-column :showOverflowTooltip="showTip" v-if="r.children" v-for="rc in r.children" :prop="rc.prop" :label="rc.label" :width="rc.width" :fixed="rc.fixed" :align="rc.align">
        </el-table-column>
        <template scope="scope">
          <span v-html="scope.row[r.prop]">
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'os-table',
    props: {
      selection: {
        default() {
          return false
        }
      },
      showIndex: false,
      topbar: {
        default() {
          return true
        }
      },
      showTip: {
        default() {
          return true
        }
      },
      columnData: {
        default() {
          return ''
        }
      },
      columnOperate: {
        default() {
          return ''
        }
      },
      tableData: {
        default() {
          return ''
        }
      },
      loading: {
        default() {
          return false
        }
      },
      operate: false,
      operateWidth: {
        default() {
          return 140
        }
      },
      operateFixed: {
        default() {
          return 'right'
        }
      },
      searchHeight: '',
      highlight: false,
      btnShow: false,
      tableHeight: {
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        countHeight: '0'
      }
    },
    created () {
      setTimeout(() => {
        this.setThisRefs(this.$refs)
        let _h = document.documentElement.clientHeight
        this.countHeight = _h - 200 - this.searchHeight
      }, 0)
    },
    methods: {
      handleOperate(row, index, name) {
        this.$emit('click-operate', row, index, name)
      },
      handleSelectionChange(val) {
        this.$emit('change-selection', val)
      },
      handleRowClick(row, event, column) {
        this.$emit('row-click', row)
      },
      dicFormatter(row, column) {
        return this.$api.getDicValue(column.columnKey, row[column.property])
      },
      dateFormatter(row, column) {
        var date = row[column.property]
        if (date === undefined) {
          return '0'
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      setThisRefs(refs) {
        this.$emit('this-refs', refs)
      }
    }
  }
</script>
<style>
  .el-table{
    border: 1px solid #dcdfe6;
    border-width: 1px 1px 0 1px;
  }
  .el-table td, .el-table th.is-leaf{
    border: 1px solid #dcdfe6;
    border-width: 0 1px 1px 0;
  }
  .el-table__header-wrapper{
    border-bottom: 1px solid #ccc;

  }
  .table_topbar .el-button+.el-button{
    margin-left: 5px;
  }
  .table_topbar .el-dropdown .el-button+.el-button{
    margin-left: 0;
  }
  .table_topbar .el-dropdown .el-dropdown__caret-button::before{
    height: 20px;
  }
  .el-table thead.is-group th{
    border-bottom: 1px solid #ccc;
  }
  .el-table thead.is-group th{
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fcfcfc), to(#d9d9d9));
  }
  .el-table__fixed-right-patch{
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fcfcfc), to(#d9d9d9));
  }
  .operate_btn {
    cursor: pointer;
    color: #909399;
    background: #f4f4f5;
    border: 1px solid #d3d4d6;
    border-radius: 25px;
    padding: 2px 10px;
    margin: 0 3px;
    display: inline-block;
  }
  .el-table {
    border: 1px solid #dcdfe6;
    border-width: 1px 0 0 1px;
  }

  .os_table .queryForm .el-form-item {
    margin-bottom: 0;
  }
  .operate_btn_default{
    color: #0066FF;
    cursor: pointer;
    margin-left: 5px;
  }
  .operate_btn_default:first-child{
    margin: 0;
  }
  .operate_btn_default i{
    margin-right: 1.5px;
  }
  .el-table__fixed-right::before, .el-table__fixed::before{
    background:none
  }
</style>
