<template>
  <div>
      <h3>基本信息</h3>
      <el-col :span="5">
        <el-form-item label="用户ID:" prop="userId">
          <el-input v-model="dataForm.userId" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
     <!-- <el-col :span="5">
        <el-form-item label="社区账号ID:" prop="accountId">
          <el-input v-model="dataForm.accountId" :disabled="true"></el-input>
        </el-form-item>
      </el-col>-->
      <el-col :span="5">
        <el-form-item label="佣金余额:" prop="commissionMoney">
          <el-input v-model="dataForm.commissionMoney" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="已提取佣金:" prop="commissionPaid">
          <el-input v-model="dataForm.commissionPaid" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
          <el-form-item label="总佣金额:" prop="commissionTotal">
            <el-input v-model="dataForm.commissionTotal" :disabled="true"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="团队交易金额:" prop="commissionSourceMoney">
          <el-input v-model="dataForm.commissionSourceMoney" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="团队交易手数:" prop="commissionSourceLots">
          <el-input v-model="dataForm.commissionSourceLots" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
    <!--<el-col :span="5">
      <el-form-item label="账户状态:" prop="accountState">
        <el-select v-model="dataForm.accountState" placeholder="请选择" :disabled="disabled">
          <el-option
            v-for="item in accountState"
            :key="item.dicKey"
            :label="item.dicValue"
            :value="item.dicKey">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>-->
  </div>
</template>
<script>
  export default {
    props: {
      formType: {
        default() {
          return 'edit'
        }
      },
      dataForm: {
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        tableDataLog: [],
        dialogVisible: false,
        formTitle: '更新日志',
        disabled: false,
        accountState: this.$api.getDicValues('account.accountState'),
        LogWid: ''
      }
    },
    created() {
      if (this.formType === 'view') {
        this.disabled = true
      }
    },
    methods: {
      // 查看日志
      handleViewLog() {
        this.dialogVisible = true
        this.LogWid = this.dataForm.wid
      }
    }
  }
</script>

<style>
  .upload_zl {
    padding: 20px 0;
    border-bottom: #F7F7F7 solid 1px;
  }
  
  .upload_zl_title {
    float: left;
    width: 120px;
    line-height: 145px;
    text-align: center;
  }
  
  .upload_zl_list {
    margin-left: 120px;
  }
</style>
