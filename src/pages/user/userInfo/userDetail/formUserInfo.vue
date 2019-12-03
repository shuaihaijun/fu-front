<template>
  <div>
      <h3>基本信息</h3>
      <el-col :span="5">
        <el-form-item label="用户ID:" prop="id">
          <el-input v-model="dataForm.id" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="登录账号:" prop="username">
          <el-input v-model="dataForm.username" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="用户类型:" prop="useType">
          <el-input v-model="dataForm.useType" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="昵称:" prop="refName">
          <el-input v-model="dataForm.refName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="介绍人:" prop="introducer">
          <el-input v-model="dataForm.introducer" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="推荐人数:" prop="recommend">
          <el-input v-model="dataForm.recommend" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="真实姓名:" prop="realName">
          <el-input v-model="dataForm.realName" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="性别:" prop="sex">
          <el-input v-model="dataForm.sex" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="省份:" prop="province">
          <el-input v-model="dataForm.province" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="城市:" prop="city">
          <el-input v-model="dataForm.city" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="地址:" prop="address">
          <el-input v-model="dataForm.address" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="联系电话:" prop="mobile">
          <el-input v-model="dataForm.mobile" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="电子邮件:" prop="email">
          <el-input v-model="dataForm.email" :disabled="disabled"></el-input>
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
        disabled: false,
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
