<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
        <!-- <input type="text"> -->
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @change-selection="selectionChange" @click-operate="handleOperate">
      <div slot="r">
        <el-button @click="applyCheck(3)"><i class="el-icon-back"></i> 审核驳回</el-button>
        <el-button @click="applyCheck(0)"><i class="el-icon-edit-outline"></i> 审核通过</el-button>
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
            label: '代理ID',
            width: '90',
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
            prop: 'userId',
            label: '申请人',
            width: '80',
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
      this.getQuery()
      this.queryData.formItem[2].option = this.applyType
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
            applyState: 2, // 类型
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          api.queryAgentApply(params, (res) => {
            this.tableData = res.content.records
            this.pageDataTotal = res.content.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 提交审核
      applyCheck(state) {
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
          let resultMsg = '审核通过'
          if (state > 0) {
            resultMsg = '审核驳回'
          }
          let param = {
            id: this.selectionRows[0].id,
            applyState: state,
            message: resultMsg
          }
          // 审核流程
          api.reviewAgentApply(param, (res) => {
            if (res.status === 0 && res.content !== null) {
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
      // 分页
      handlePage() {
        this.tableData = []
        this.getQuery()
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
