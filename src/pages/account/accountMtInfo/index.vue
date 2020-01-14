<template>
  <div>

    <div class="form_topBar" style="width: 80%;">
      <div class="form_topBar_l">
        <b>用户MT账户信息</b>
      </div>
    </div>
    <el-form :model="dataForm" class="dataForm" label-width="100px">
      <el-row :gutter="15">
        <form-1 :dataForm="dataForm"></form-1>
      </el-row>
    </el-form>
    <os-table :loading="loading" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData" @change-selection="selectionChange" @click-operate="viewAddTabUser">
      <div slot="r">
       <!-- <el-button @click="accConnectStart()"><i class="el-icon-check"></i> 启动监听</el-button>
        <el-button @click="accConnectClose()"><i class="el-icon-close"></i> 关闭监听</el-button>-->
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

  </div>
</template>
<script>
  import form1 from './formMTInfo.vue'
  import { MessageBox } from 'element-ui'

  export default {
    components: {
      'form1': form1
    },
    data() {
      return {
        show: false,
        LogWid: '',
        loading: false,
        currentUserId: 0,
        dataForm: {
          wname: ''
        },
        disabled: true,
        // 表头
        columnData: [
          {
            prop: 'brokerName',
            label: '经纪商',
            width: '',
            align: 'center'
          },
          {
            prop: 'serverName',
            label: '服务器',
            width: '',
            align: 'center'
          },
          {
            prop: 'mtAccId',
            label: 'MT账户ID',
            width: '',
            align: 'center'
          },
          {
            prop: 'accountType',
            label: 'MT账户类型',
            width: '',
            formatter: true,
            columnKey: 'mt.accountType',
            align: 'center'
          },
          {
            prop: 'platType',
            label: 'MT平台类型',
            width: '',
            formatter: true,
            columnKey: 'mt.platType',
            align: 'center'
          },
          {
            prop: 'accountState',
            label: 'MT账户状态',
            width: '',
            formatter: true,
            columnKey: 'account.accountState',
            align: 'center'
          },
          {
            prop: 'passwordWatchChecked',
            label: '密码验证状态',
            width: '',
            formatter: true,
            columnKey: 'com.yes',
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
      if (this.$store.state.tab.uid !== undefined && this.$store.state.tab.uid.userId !== undefined) {
        this.currentUserId = this.$store.state.tab.uid.userId
      } else {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        this.currentUserId = userInfo.userId
      }
      this.getQuery()
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          // 判断用户权限
          let params = {
            userId: this.currentUserId
          }
          this.$api.getUsersMtAccountByCondition(params, (res) => {
            if (res.content !== null) {
              if (res.content.data.length > 0) {
                this.dataForm = res.content.data[0]
                this.tableData = res.content.data
              }
            } else {
              this.$message(res.measureText())
            }
          })
        } else {
          this.$message('获取用户信息失败！')
        }
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
      // 查看
      viewAddTabUser(row, index, name) {
        this.$store.dispatch('delTab', {id: 'm1_view'})
        let _data = {
          id: 'm1_view',
          name: '查看基础信息',
          url: 'userDetail',
          uid: {
            formType: 'view',
            id: row.id,
            wname: row.username
          }
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
          this.$store.dispatch('m1_form_state', this.$store.state.m1.m1_form_state + 1)
        }, 10)
      },
      accConnectStart() {
        // 判断数据
        MessageBox.confirm('确定启动吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          this.loading = true
          let param = {
            userId: this.dataForm.userId, // 用户ID
            username: this.dataForm.username, // 名称
            mtAccId: this.dataForm.mtAccId, // 类型
            serverName: this.dataForm.serverName // 服务器
          }
          // 审核流程
          this.$api.connectUserMTAccount(param, (res) => {
            if (res.status === 0 && res.content === true) {
              // 保存成功
              window.alert('操作成功！')
              this.$options.methods.getQuery.bind(this)()
            } else {
              window.alert('操作失败！')
            }
            this.loading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      accConnectClose() {
        MessageBox.confirm('确定断开连接吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          this.loading = true
          let param = {
            userId: this.dataForm.userId, // 用户ID
            username: this.dataForm.username, // 名称
            mtAccId: this.dataForm.mtAccId, // 类型
            serverName: this.dataForm.serverName // 服务器
          }
          // 审核流程
          this.$api.disConnectUserMTAccount(param, (res) => {
            if (res.status === 0 && res.content === true) {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert('操作失败！')
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
      selectionChange(rows) {
        this.selectionRows = rows
      }
    }
  }
</script>
