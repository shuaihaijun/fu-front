<template>
  <div>

    <div class="form_topBar" :style="{'width': topWidth}">
      <div class="form_topBar_l">
        <b>用户MT账户信息</b>
      </div>
    </div>
    <el-form :model="dataForm" class="dataForm" label-width="100px">
      <el-row :gutter="15">
        <form-1 :dataForm="dataForm"></form-1>
      </el-row>
    </el-form>
    <os-table :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData" @change-selection="selectionChange" @click-operate="viewAddTabUser">
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

  </div>
</template>
<script>
  import form1 from './formMTInfo.vue'

  export default {
    components: {
      'form1': form1
    },
    data() {
      return {
        show: false,
        LogWid: '',
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
      selectionChange(rows) {
        this.selectionRows = rows
      }
    }
  }
</script>
