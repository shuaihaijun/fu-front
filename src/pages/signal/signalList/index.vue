<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
        <!-- <input type="text"> -->
      </os-search>
    </div>
    <os-table :loading="loading" :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @change-selection="selectionChange" @click-operate="handleOperate">
      <div slot="r">
        <el-button @click="accConnectStart()"><i class="el-icon-check"></i> 启动监听</el-button>
        <el-button @click="accConnectClose()"><i class="el-icon-minus"></i> 关闭监听</el-button>
        <el-button @click="updateState(0)"><i class="el-icon-zoom-in"></i> 官网显示</el-button>
        <el-button @click="updateState(1)"><i class="el-icon-zoom-out"></i> 官网隐藏</el-button>
        <el-button @click="updateState(2)"><i class="el-icon-close"></i> 删除信号源</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled"></forms>
    <formOrder :_visible="formOrderVisible" v-if="orderShow" :pwid="LogWid" :disabled="orderDisabled"></formOrder>
  </div>
</template>
<script>
  import api from '../../../api/'
  import form from './form'
  import formOrder from './formSynOrder'
  import { MessageBox } from 'element-ui'

  export default {
    components: {
      'forms': form,
      'formOrder': formOrder
    },
    data() {
      return {
        orderShow: false,
        formOrderVisible: false,
        orderDisabled: false,
        show: false,
        disabled: false,
        LogWid: '',
        formVisible: false,
        dialogTitle: '更新日志',
        dialogWidth: '',
        dialogTop: '5%',
        loading: false,
        selectionRows: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
            {
            key: 'signalId',
            label: '',
            value: null,
            placeholder: '信号源ID',
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
          }]
        },
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '80px',
            fixed: 'left',
            isBtn: true,
            children: [{
                iconClass: 'el-icon-view',
                name: '详情',
                show: 'IsBtn1',
                isBtn: true
              }
            ]
          }
        ],
        // 表头
        columnData: [{
            prop: 'connectState',
            label: '监听状态',
            width: '80',
            formatter: true,
            columnKey: 'com.yes',
            align: 'center'
          },
          {
            prop: 'id',
            label: '信号源ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'signalName',
            label: '信号源名称',
            width: '90',
            align: 'center'
          },
          {
            prop: 'signalState',
            label: '信号源状态',
            width: '90',
            formatter: true,
            columnKey: 'signal.signalState',
            align: 'center'
          },
          {
            prop: 'projName',
            label: '所属团队',
            width: '90',
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
      this.getQuery()
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          this.loading = true
          let params = {
            operId: userInfo.userId, // 用户id
            signalId: this.queryData.formData.signalId, // 申请id
            signalName: this.queryData.formData.signalName, // 信号源名称
            mtAccId: this.queryData.formData.mtAccId, // MT账户
            signalState: '0,1'
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          api.querySignalInfos(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.page.total
          })
          this.loading = false
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      getWList2() {
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
        } else if (name === '同步订单') {
          setTimeout(() => {
            this.formOrderVisible = true
          }, 0)
          this.dialogTitle = '信号源：' + row.signalName + ' 订单同步 '
          // this.show = 'forms'
          this.orderShow = true
          this.orderDisabled = false
          this.dialogWidth = 500
          this.dialogTop = '10%'
        }
      },
      accConnectStart() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        MessageBox.confirm('确定启动吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: '连接需要几分钟  请耐心等待Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target: document.querySelector('.div1')
          })
          this.loading = true
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          let params = {
            operUserId: userInfo.userId, // 操作用户id
            signalId: this.selectionRows[0].id// 信号源ID
          }
          // 链接账号
          api.connectSignalMTAccount(params, (res) => {
            loading.close()
            if (res.status === 0 && res.content === true) {
              // 保存成功
              window.alert('操作成功！')
              this.$options.methods.getQuery.bind(this)()
            } else {
              window.alert(res.message)
            }
          })
          this.loading = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      accConnectClose() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        MessageBox.confirm('确定断开连接吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          this.loading = true
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          let params = {
            operUserId: userInfo.userId, // 操作用户id
            signalId: this.selectionRows[0].id// 信号源ID
          }
          // 审核流程
          api.disConnectSignalMTAccount(params, (res) => {
            if (res.status === 0 && res.content === true) {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert(res.message)
            }
          })
          this.loading = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      updateState(value) {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        if (value === this.selectionRows[0].signalState) {
          window.alert('已经是当前状态了！')
          return
        }
        MessageBox.confirm('确定操作吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          let params = {
            operUserId: userInfo.userId, // 操作用户id
            signalState: value, // 操作用户id
            signalId: this.selectionRows[0].id// 信号源ID
          }
          let data = {
            params
          }
          api.signalStateUpdate(data, (res) => {
            if (res.status === 0 && res.content === true) {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
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
