<template>
  <div>
      <h3>基本信息</h3>
      <el-col :span="5">
        <el-form-item label="用户ID:" prop="id">
          <el-input v-model="dataForm.userId" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <!--<el-col :span="5">
        <el-form-item label="登录账号:" prop="username">
          <el-input v-model="dataForm.username" :disabled="true"></el-input>
        </el-form-item>
      </el-col>-->
      <el-col :span="5">
        <el-form-item label="昵称:" prop="refName">
          <el-input v-model="dataForm.refName" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="真实姓名:" prop="realName">
          <el-input v-model="dataForm.realName" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
          <el-form-item label="用户类型:" prop="userType">
            <el-select v-model="dataForm.userType" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in userType"
                :key="item.dicKey"
                :label="item.dicValue"
                :value="item.dicKey">
              </el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="代理名称:" prop="brokerName">
          <el-input v-model="dataForm.brokerName" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="服务器名称:" prop="serverName">
          <el-input v-model="dataForm.serverName" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="mt账号:" prop="mtAccId">
          <el-input v-model="dataForm.mtAccId" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="杠杆:" prop="leverage">
          <el-input v-model="dataForm.leverage" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="余额:" prop="balance">
          <el-input v-model="dataForm.balance" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="信用额:" prop="credit">
          <el-input v-model="dataForm.credit" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="收益:" prop="profit">
          <el-input v-model="dataForm.profit" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="净值:" prop="equity">
          <el-input v-model="dataForm.equity" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
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
        disabled: true,
        userId: this.dataForm.id,
        userType: this.$api.getDicValues('user.userType'),
        LogWid: ''
      }
    },
    created() {
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
