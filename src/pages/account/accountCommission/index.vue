<template>
  <div>
    <div class="form_topBar" style="width: 80%;">
      <div class="form_topBar_l">
        <b>佣金账户信息</b>
      </div>
    </div>
    <el-form :model="dataForm" class="dataForm" :class="{'dataForm_view': formType == 'view'}" label-width="100px">
      <el-row :gutter="15">
        <form-1 :dataForm="dataForm" :formType="formType"></form-1>

        <!--<div>
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
        </div>-->
      </el-row>
      <div>
        <el-tabs type="border-card">
          <el-tab-pane label="佣金生成流水">
            <form-2 :currentUserId="currentUserId"></form-2>
          </el-tab-pane>
          <el-tab-pane label="佣金提取流水">
            <form-3 :currentUserId="currentUserId"></form-3>
          </el-tab-pane>
          <el-tab-pane label="佣金提取申请">
            <form-4 :currentUserId="currentUserId"></form-4>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-form>
  </div>
</template>
<script>
  import form1 from './formCommission.vue'
  import form2 from './formCommissionFlow.vue'
  import form3 from './formCommissionWithdraw.vue'
  import form4 from './formCommissionApply.vue'
  export default {
    components: {
      'form-1': form1,
      'form-2': form2,
      'form-3': form3,
      'form-4': form4
    },
    data() {
      return {
        formType: 'view',
        activeName: '1',
        currentUserId: 0,
        dialogVisible: false,
        formTitle: '佣金流水生成日志',
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
        disabled: false
      }
    },
    created() {
      if (this.$store.state.tab.uid !== undefined && this.$store.state.tab.uid.userId !== undefined) {
        this.currentUserId = this.$store.state.tab.uid.userId
      } else {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        this.currentUserId = userInfo.userId
      }
      this.createdCom()
    },
    methods: {
      createdCom() {
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            userId: this.currentUserId
          }
          let data = {
            params: params
          }
          this.$api.getAccountCommissonByUserId(data, (res) => {
            let _dataForm = res.content
            this.dataForm = _dataForm
          })
        } else {
          this.$message('获取用户信息失败！')
        }
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
