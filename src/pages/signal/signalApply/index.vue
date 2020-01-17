<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
        <!-- <input type="text"> -->
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @change-selection="selectionChange" @click-operate="handleOperate">
      <div slot="r">
        <el-button @click="applyNew()"><i class="el-icon-circle-plus-outline"></i> 新增</el-button>
        <el-button @click="applyEdit()"><i class="el-icon-edit-outline"></i> 编辑</el-button>
        <el-button @click="applyDelete()"><i class="el-icon-delete-solid"></i> 删除</el-button>
        <el-button @click="applywithdraw()"><i class="el-icon-back"></i> 撤回</el-button>
        <el-button @click="applyCheck()"><i class="el-icon-circle-check"></i> 提交</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

<!--    <os-dialog  :title="dialogTitle" :visibleButton="false" :width="dialogWidth +'px'" :top="dialogTop">
    </os-dialog>-->

    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :title="formTitle"></forms>
  </div>
</template>
<script>
  import api from '../../../api/'
  import forms from './form'
  import { MessageBox } from 'element-ui'

  export default {
    components: {
      'forms': forms
    },
    data() {
      return {
        show: false,
        LogWid: '',
        dialogVisible: false,
        formVisible: false,
        formTitle: '',
        dialogTitle: '更新日志',
        dialogWidth: '',
        dialogTop: '5%',
        disabled: true,
        selectionRows: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
            {
            key: 'applyId',
            label: '',
            value: null,
            placeholder: '申请ID',
            width: 180,
            type: ''
          },
          {
            key: 'signalName',
            label: '',
            value: null,
            placeholder: '信号源名称',
            width: 200,
            type: ''
          },
          {
            key: 'mtAccId',
            label: '',
            value: null,
            placeholder: 'MT账户ID',
            width: 200,
            type: ''
          },
          {
            key: 'applyDate',
            label: '',
            value: null,
            placeholder: '申请时间',
            width: 200,
            type: 'datetimerange'
          }]
        },
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '120px',
            fixed: 'left',
            isBtn: true,
            children: [{
                iconClass: 'el-icon-view',
                name: '详情',
                show: 'IsBtn2',
                isBtn: true
              }
            ]
          }
        ],
        // 表头
        columnData: [
          {
            prop: 'id',
            label: '申请ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'signalName',
            label: '信号源名称',
            width: '100',
            align: 'center'
          },
          {
            prop: 'applyState',
            label: '申请状态',
            width: '80',
            align: 'center'
          },
          {
            prop: 'monthlyAverageIncome',
            label: '月均收益',
            width: '80',
            align: 'center'
          },
          {
            prop: 'historyWithdraw',
            label: '最大回撤',
            width: '80',
            align: 'center'
          },
          {
            prop: 'signalTem',
            label: '团队信息',
            width: '',
            align: 'center'
          },
          {
            prop: 'signalDesc',
            label: '信号源简介',
            width: '',
            align: 'center'
          },
          {
            prop: 'email',
            label: '电子邮件',
            width: '100',
            align: 'center'
          },
          {
            prop: 'phone',
            label: '手机号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'qqNumber',
            label: 'QQ号码',
            width: '100',
            align: 'center'
          },
          {
            prop: 'userId',
            label: '申请人',
            width: '80',
            align: 'center'
          },
          {
            prop: 'applyDate',
            label: '申请时间',
            width: '150',
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
            operUserId: userInfo.userId, // 用户id
            userId: this.queryData.formData.userId, // 用户id
            applyId: this.queryData.formData.applyId, // 申请id
            signalName: this.queryData.formData.signalName, // 信号源名称
            mtAccId: this.queryData.formData.mtAccId, // MT账户
            applyDate: this.queryData.formData.applyDate, // 申请时间
            applyState: '1,3', // 申请状态（暂存,驳回）
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          api.getSignalApply(params, (res) => {
            this.tableData = res.content.records
            this.pageDataTotal = res.content.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 审核结果
      applyCheck() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        MessageBox.confirm('确定提交审核结果吗？', '审核提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let param = {
            id: this.selectionRows[0].id,
            state: '2',
            message: '提交申请'
          }
          // 审核流程
          api.submitSignalApply(param, (res) => {
            if (res.status === 0 && res.content.data !== '') {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert('操作失败！')
            }
          })
        }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消审核'
          })
        })
      },
      applyNew() {
        this.LogWid = ''
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.formTitle = '信号源信息'
        this.show = 'forms'
        this.disabled = false
      },
      applyEdit() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
         // 申请状态（0 正常，1 暂存，2 待审核，3 未通过）
        if (this.selectionRows[0].applyState !== 1 && this.selectionRows[0].applyState !== 3) {
          window.alert('当前状态不允许编辑！')
          return
        }
        this.LogWid = this.selectionRows[0]
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.formTitle = '信号源信息'
        this.show = 'forms'
        this.disabled = false
      },
      // 回撤审核
      applywithdraw() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        // 申请状态（0 正常，1 暂存，2 待审核，3 未通过）
        if (this.selectionRows[0].applyState !== 2) {
          window.alert('当前状态不允许回撤！')
          return
        }
        MessageBox.confirm('确定回撤吗？', '审核提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let param = {
            id: this.selectionRows[0].id,
            state: '1',
            message: '提交申请'
          }
          // 修改状态
          api.signalApplySaveOrUpdate(param, (res) => {
            if (res.status === 0 && res.content.data !== '') {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert('操作失败！')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          })
        })
      },
      // 删除数据
      applyDelete() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        // 申请状态（0 正常，1 暂存，2 待审核，3 未通过）
        if (this.selectionRows[0].applyState !== 1 && this.selectionRows[0].applyState !== 3) {
          window.alert('当前状态不允许删除！')
          return
        }
        MessageBox.confirm('确定删除吗？', '审核提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let param = {
            id: this.selectionRows[0].id
          }
          // 修改状态
          api.deleteDictionary(param, (res) => {
            if (res.status === 0 && res.content.data !== '') {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert('操作失败！')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          })
        })
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
          setTimeout(() => {
            this.formVisible = true
          }, 0)
          this.dialogTitle = '信号源：' + row.signalName + ' 详情 '
          // this.show = 'forms'
          this.show = true
          this.disabled = true
          this.dialogWidth = 1000
        }
      },
      selectionChange(rows) {
        this.selectionRows = rows
      }
    },
    mounted() {
      this.queryFormHeight = this.$refs.search.offsetHeight
    }
  }
</script>
