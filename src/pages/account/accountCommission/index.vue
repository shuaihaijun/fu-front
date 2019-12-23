<template>
  <div>
    <div class="form_topBar" style="width: 100%;">
      <div class="form_topBar_l">
        <b>佣金账户信息</b>
      </div>
    </div>
    <el-form :model="dataForm" class="dataForm" :class="{'dataForm_view': formType == 'view'}" label-width="100px">
      <el-row :gutter="15">
        <form-1 :dataForm="dataForm" :formType="formType"></form-1>
        <div>
          <h3>佣金账户流水</h3>
          <div ref="search">
            <os-search :dataSource='queryData' @click-submit='getQuery'>
            </os-search>
          </div>
          <os-table :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData"  @click-operate="handleOperate">
            <div slot="r">
            </div>
          </os-table>
          <os-pag :pageTotal="pageDataTotal"></os-pag>
        </div>
      </el-row>
    </el-form>
    <os-dialog :visible="dialogVisible" :title="formTitle" :visibleButton="false" width="960px" top="4.5%">
      <log-table :pwid="LogWid" @click-operate="handleOperate1"></log-table>
    </os-dialog>
  </div>
</template>
<script>
  import form1 from './formCommission.vue'
  export default {
    components: {
      'form-1': form1
    },
    data() {
      return {
        formType: 'view',
        activeName: '1',
        dialogVisible: false,
        formTitle: '佣金订流水生成日志',
        commissionType: this.$api.getDicValues('commissionLevel.commissionType'),
        orderType: this.$api.getDicValues('commissionLevel.orderType'),
        commissionUserType: this.$api.getDicValues('user.userType'),
        commissionUserLevel: this.$api.getDicValues('commissionLevel.userLevel'),
        rateType: this.$api.getDicValues('commissionLevel.rateType'),
        LogWid: '',
        dataForm: {
          modifyPersonName: '',
          wname: ''
        },
        queryData: {
          formData: {},
          formItem: [
            {
              key: 'commissionType',
              label: '',
              value: null,
              placeholder: '佣金类型',
              width: 180,
              type: 'select',
              option: this.commissionType
            },
            {
              key: 'commissionUserType',
              label: '',
              value: null,
              placeholder: '用户类型',
              width: 200,
              type: 'select',
              option: this.commissionUserType
            },
            {
              key: 'commissionUserLevel',
              label: '',
              value: null,
              placeholder: '返佣用户等级',
              width: 200,
              type: 'select',
              option: this.commissionUserLevel
            },
            {
              key: 'rateType',
              label: '',
              value: null,
              placeholder: '比率计算类型',
              width: 200,
              type: 'select',
              option: this.rateType
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
              name: '详情日志',
              show: 'IsBtn2',
              isBtn: true
            }
            ]
          }
        ],
        columnData: [
          {
            prop: 'userId',
            label: '用户ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'accountId',
            label: '账户ID',
            width: '150',
            align: 'center'
          },
          {
            prop: 'commissionDate',
            label: '返佣日期',
            width: '',
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'commissionType',
            label: '佣金类型',
            width: '100',
            formatter: true,
            columnKey: 'commissionLevel.commissionType',
            align: 'center'
          },
          {
            prop: 'commissionUserType',
            label: '用户类型',
            width: '100',
            formatter: true,
            columnKey: 'user.userType',
            align: 'center'
          },
          {
            prop: 'commissionMoney',
            label: '返佣佣金',
            width: '100',
            align: 'center'
          },
          {
            prop: 'commissionLevel',
            label: '收佣等级',
            width: '100',
            formatter: true,
            columnKey: 'commissionLevel.userLevel',
            align: 'center'
          },
          {
            prop: 'commissionRateType',
            label: '比率类型',
            width: '100',
            formatter: true,
            columnKey: 'commissionLevel.rateType',
            align: 'center'
          },
          {
            prop: 'commissionTate',
            label: '返佣比率',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sourceMoney',
            label: '源金额',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sourceLots',
            label: '源手数',
            width: '100',
            align: 'center'
          },
          {
            prop: 'coinType',
            label: '币种类型',
            width: '100',
            formatter: true,
            columnKey: 'account.coinType',
            align: 'center'
          }
        ],
        // 表格
        tableData: [],
        disabled: false
      }
    },
    created() {
      this.createdCom()
      this.queryData.formItem[0].option = this.commissionType
      this.queryData.formItem[1].option = this.commissionUserType
      this.queryData.formItem[2].option = this.commissionUserLevel
      this.queryData.formItem[3].option = this.rateType
    },
    methods: {
      createdCom() {
        if (window.localStorage.getItem('nice_user')) {
          let aUserId = 0
          if (this.$store.state.tab.uid !== undefined && this.$store.state.tab.uid.userId !== undefined) {
            aUserId = this.$store.state.tab.uid.userId
          } else {
            let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
            aUserId = userInfo.userId
          }
          let params = {
            userId: aUserId
          }
          let data = {
            params: params
          }
          this.$api.getAccountCommissonByUserId(data, (res) => {
            let _dataForm = res.content
            this.dataForm = _dataForm
          })
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          data = {
            params,
            pageInfoHelper
          }
          this.$api.getPageCommissonFlow(data, (res) => {
            if (res.content !== null) {
              this.tableData = res.content.data
              this.pageDataTotal = res.content.total
            } else {
              this.tableData = [{}]
            }
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          // 判断用户权限
          let params = {
            userId: userInfo.userId, // 操作用户id
            accountId: this.dataForm.accountId,
            commissionType: this.queryData.formData.commissionType, //
            commissionUserType: this.queryData.formData.commissionUserType, //
            commissionUserLevel: this.queryData.formData.commissionUserLevel, //
            rateType: this.queryData.formData.rateType //
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          this.$api.getPageCommissonFlow(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.content.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 对话框表格查看详情
      handleOperate1(v) {
        this.dialogVisible = false
        let _data = {
          id: 'm1_view',
          name: '查看流水日志',
          url: 'm1_1_form1',
          uid: {
            formType: 'view',
            id: v
          }
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
          this.$store.dispatch('m1_form_state', this.$store.state.m1.m1_form_state + 1)
        }, 10)
      },
      // 查看or编辑
      handleOperate(row, index, name) {
          this.dialogVisible = true
          this.LogWid = row.wid
      }
    },
    computed: {
      form_state () {
        return this.$store.state.m1.m1_form_state
      }
    },
    watch: {
      form_state (v) {
        // this.createdCom()
      }
    }
  }
</script>
