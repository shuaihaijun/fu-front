<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
        <!-- <input type="text"> -->
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData" @change-selection="selectionChange">
      <div slot="r">
        <el-button @click="signalBook()"><i class="el-icon-circle-plus-outline"></i> 新增</el-button>
        <el-button @click="signalUpdate()"><i class="el-icon-circle-plus-outline"></i> 修改</el-button>
        <el-button @click="signalFollowChangeState(1)"><i class="el-icon-video-pause"></i> 暂停跟随</el-button>
        <el-button @click="signalFollowChangeState(0)"><i class="el-icon-video-pause"></i> 开启跟随</el-button>
        <el-button @click="signalFollowRemove()"><i class="el-icon-delete-solid"></i> 取消跟随</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled"></forms>
  </div>
</template>
<script>
  import api from '../../../api/'
  import form from './form'
  import { MessageBox } from 'element-ui'

  export default {
    components: {
      'forms': form
    },
    data() {
      return {
        show: false,
        LogWid: '',
        formVisible: false,
        dialogTitle: '更新日志',
        dialogWidth: '',
        dialogTop: '5%',
        selectionRows: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
            {
            key: 'userId',
            label: '',
            value: null,
            placeholder: '用户ID',
            width: 180,
            type: ''
          },
          {
            key: 'signalId',
            label: '',
            value: null,
            placeholder: '信号源ID',
            width: 200,
            type: ''
          }]
        },
        // 表格操作按钮
        // 表头
        columnData: [
          {
            prop: 'userId',
            label: '用户ID',
            width: '60',
            align: 'center'
          },
          {
            prop: 'userMtAccId',
            label: '用户账号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'userServerName',
            label: '用户服务器',
            width: '100',
            align: 'center'
          },
          {
            prop: 'signalId',
            label: '信号源ID',
            width: '70',
            align: 'center'
          },
          {
            prop: 'userConnectState',
            label: '用户监听状态',
            width: '100',
            formatter: true,
            columnKey: 'com.yes',
            align: 'center'
          },
          {
            prop: 'signalConnectState',
            label: '信号源监听状态',
            width: '100',
            formatter: true,
            columnKey: 'com.yes',
            align: 'center'
          },
          {
            prop: 'followState',
            label: '跟随状态',
            width: '80',
            formatter: true,
            columnKey: 'follow.ruleState',
            align: 'center'
          },
          {
            prop: 'followDirect',
            label: '跟随方向',
            width: '',
            formatter: true,
            columnKey: 'follow.direct',
            align: 'center'
          },
          {
            prop: 'followType',
            label: '规则类型',
            width: '100',
            formatter: true,
            columnKey: 'follow.ruleType',
            align: 'center'
          },
          {
            prop: 'followAmount',
            label: '数量/系数',
            width: '80',
            align: 'center'
          },
          {
            prop: 'createDate',
            label: '跟随时间',
            width: '140',
            dateFormat: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'modifyDate',
            label: '修改时间',
            width: '140',
            dateFormat: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'followMaxAmount',
            label: '最大跟单金额',
            width: '',
            align: 'center'
          },
          {
            prop: 'followMinAmount',
            label: '最小跟单金额',
            width: '',
            align: 'center'
          },
          {
            prop: 'followMaxHands',
            label: '最大跟单手数',
            width: '',
            align: 'center'
          },
          {
            prop: 'followMinHands',
            label: '最小跟单手数',
            width: '',
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
      this.getQuery()
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          let params = {
            operUserId: userInfo.userId,
            userId: this.queryData.formData.userId, // 用户id
            signalId: this.queryData.formData.signalId, // 申请id
            ruleState: 0 // 状态（0 正常，1  隐藏，2 废弃）
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          api.querySignalFollowState(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.content.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 暂停
      signalFollowChangeState(state) {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        MessageBox.confirm('确定提交吗？', '确认提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let param = {
            id: this.selectionRows[0].id,
            userId: this.selectionRows[0].userId,
            userMtAccId: this.selectionRows[0].userMtAccId,
            signalId: this.selectionRows[0].signalId,
            followState: state,
            message: '暂停！'
          }
          // 审核流程
          api.signalFollowsSaveOrUpdate(param, (res) => {
            if (res.status === 0 && res.content !== null && res.content.data !== '') {
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
            message: '已取消'
          })
        })
      },
      // 移除
      signalFollowRemove() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        MessageBox.confirm('确定提交吗？', '确认提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let param = {
            id: this.selectionRows[0].id,
            userId: this.selectionRows[0].userId,
            signalId: this.selectionRows[0].signalId,
            message: '退订！'
          }
          // 审核流程
          api.signalFollowsRemove(param, (res) => {
            if (res.status === 0 && res.content !== null && res.content.data !== '') {
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
          message: '已取消'
          })
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
      // 订阅
      signalBook() {
          setTimeout(() => {
            this.formVisible = true
          }, 0)
          this.dialogTitle = '信号源订阅'
          this.show = true
          this.disabled = false
          this.dialogWidth = 1700
          this.dialogTop = '10%'
      },
      signalUpdate() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        this.LogWid = this.selectionRows[0]
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.dialogTitle = '信号源订阅'
        this.show = true
        this.disabled = false
        this.dialogWidth = 1700
        this.dialogTop = '10%'
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
