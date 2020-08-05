<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
        <!-- <input type="text"> -->
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @change-selection="selectionChange" @click-operate="handleOperate">
      <div slot="r">
        <el-button @click="agentApplyNew()"><i class="el-icon-circle-plus-outline"></i> 新增</el-button>
        <el-button @click="agentApplyEdit()"><i class="el-icon-edit-outline"></i> 编辑</el-button>
        <el-button @click="agentApplywithdraw()"><i class="el-icon-back"></i> 撤回</el-button>
        <el-button @click="agentApplyDelete()"><i class="el-icon-delete-solid"></i> 删除</el-button>
        <el-button @click="agentApplySubmit()"><i class="el-icon-check"></i> 提交</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

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
        applyType: this.$api.getDicValues('agent.applyType'),
        selectionRows: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
            {
            key: 'id',
            label: '',
            value: null,
            placeholder: '代理ID',
            width: 180,
            type: ''
          },
          {
            key: 'agentName',
            label: '',
            value: null,
            placeholder: '代理名称',
            width: 200,
            type: ''
          },
          {
            key: 'applyType',
            label: '',
            value: null,
            placeholder: '申请类型',
            width: 150,
            type: 'select',
            option: this.applyType
          },
          {
            key: 'userId',
            label: '',
            value: null,
            placeholder: '用户ID',
            width: 200,
            type: ''
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
            label: '代理申请ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'userId',
            label: '申请人',
            width: '80',
            align: 'center'
          },
          {
            prop: 'agentName',
            label: '代理名称',
            width: '150',
            align: 'center'
          },
          {
            prop: 'applyState',
            label: '申请状态',
            width: '80',
            formatter: true,
            columnKey: 'agent.applyState',
            align: 'center'
          },
          {
            prop: 'applyType',
            label: '申请类型',
            width: '80',
            formatter: true,
            columnKey: 'agent.applyType',
            align: 'center'
          },
          {
            prop: 'applyReason',
            label: '申请原由',
            width: '',
            align: 'center'
          },
          {
            prop: 'applyDesc',
            label: '代理描述',
            width: '',
            align: 'center'
          },
          {
            prop: 'checkDesc',
            label: '审批说明',
            width: '',
            align: 'center'
          },
          {
            prop: 'createDate',
            label: '创建时间',
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
      if (window.localStorage.getItem('nice_user')) {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        if (userInfo.userType < 8 || userInfo.userType > 10) {
          // 管理者
          this.queryData.formItem[3].value = userInfo.userId
          this.queryData.formItem[3].readonly = true
        }
      } else {
        this.$message('获取用户信息失败！')
      }
      this.queryData.formItem[2].option = this.applyType
      this.getQuery()
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          let params = {
            operUserId: userInfo.userId, // 操作用户id
            applyId: this.queryData.formData.id, // 申请id
            agentName: this.queryData.formData.agentName, // 名称
            applyType: this.queryData.formData.applyType, // 类型
            userId: this.queryData.formData.userId, // 类型
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
          api.queryAgentApply(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.page.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 撤回申请
      agentApplywithdraw() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        if (this.selectionRows[0].applyState !== 2) {
          window.alert('只能回撤待审状态数据！')
          return
        }
        MessageBox.confirm('确定撤回申请吗？', '操作提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let param = {
            id: this.selectionRows[0].id,
            applyState: '1',
            checkDesc: '撤回申请'
          }
          // 审核流程
          api.updateAgentApply(param, (res) => {
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
      // 提交申请
      agentApplySubmit() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        MessageBox.confirm('确定提交申请吗？', '操作提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let param = {
            id: this.selectionRows[0].id,
            state: '1',
            message: '提交申请'
          }
          // 审核流程
          api.submitAgentApply(param, (res) => {
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
      agentApplyNew() {
        this.LogWid = ''
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.formTitle = '信号源信息'
        this.show = 'forms'
        this.disabled = false
      },
      agentApplyEdit() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
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
      // 删除数据
      agentApplyDelete() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        if (this.selectionRows[0].applyState !== 1 && this.selectionRows[0].applyState !== 3) {
          window.alert('当前状态不允许删除！')
          return
        }
        MessageBox.confirm('确定删除吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let param = {
            id: this.selectionRows[0].id
          }
          // 审核流程
          api.deleteAgentApply(param, (res) => {
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
            message: '已取消操作'
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
          this.dialogTop = '10%'
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
