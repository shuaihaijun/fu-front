<template>
  <div>
      <h3>基本信息</h3>
      <el-col :span="5">
        <el-form-item label="用户ID:" prop="id">
          <el-input v-model="dataForm.id" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
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
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="dataForm.sex" placeholder="请选择" :disabled="disabled">
            <el-option
              v-for="item in userSex"
              :key="item.dicKey"
              :label="item.dicValue"
              :value="item.dicKey">
            </el-option>
          </el-select>
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
          <el-form-item label="推荐码:" prop="introducer">
            <el-input v-model="dataForm.introducer" :disabled="true"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="推荐人数:" prop="recommend">
          <el-input v-model="dataForm.recommend" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="用户状态:" prop="userState">
          <el-select v-model="dataForm.userState" placeholder="请选择" :disabled="true">
            <el-option
              v-for="item in userState"
              :key="item.dicKey"
              :label="item.dicValue"
              :value="item.dicKey">
            </el-option>
          </el-select>
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
    watch: {
      dataForm: function(v1) {
        this.introducerUrl = this.$api.getIntroducerloadUrl(v1.id)
      }
    },
    data() {
      return {
        tableDataLog: [],
        dialogVisible: false,
        formTitle: '更新日志',
        disabled: true,
        userId: this.dataForm.id,
        introducerUrl: '',
        userSex: this.$api.getDicValues('user.sex'),
        userType: this.$api.getDicValues('user.userType'),
        userState: this.$api.getDicValues('user.userState'),
        LogWid: ''
      }
    },
    created() {
      if (this.formType === 'edit') {
        this.disabled = false
      }
      setTimeout(() => {
        this.introducerUrl = this.$api.getIntroducerloadUrl(this.dataForm.id)
      }, 0)
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
