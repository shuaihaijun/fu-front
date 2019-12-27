<template>
  <div>
      <h3>角色信息</h3>
      <el-col :span="5">
        <el-form-item label="角色ID:" prop="id">
          <el-input v-model="dataForm.id" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="角色代码:" prop="roleCode">
          <el-input v-model="dataForm.roleCode" :disabled="true"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="5">
        <el-form-item label="角色名称:" prop="roleName">
          <el-input v-model="dataForm.roleName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="角色级别:" prop="roleLevel">
          <el-select v-model="dataForm.roleLevel" placeholder="请选择" :disabled="true">
            <el-option
              v-for="item in roleLevel"
              :key="item.dicKey"
              :label="item.dicValue"
              :value="item.dicKey">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    <el-col :span="5">
      <el-form-item label="角色标识:" prop="roleSign">
        <el-select v-model="dataForm.roleSign" placeholder="请选择" :disabled="true">
          <el-option
            v-for="item in roleSign"
            :key="item.dicKey"
            :label="item.dicValue"
            :value="item.dicKey">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
      <el-col :span="5">
        <el-form-item label="创建人:" prop="recommend">
          <el-input v-model="dataForm.creater" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="创建时间:" prop="province">
          <el-input v-model="dataForm.createDate" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="角色描述:" prop="introducer">
          <el-input v-model="dataForm.roleDesc" :disabled="true"></el-input>
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
        roleLevel: '',
        roleSign: '',
        LogWid: ''
      }
    },
    created() {
      if (this.formType === 'view') {
        this.disabled = true
      }
      this.roleLevel = this.$api.getDicValues('role.roleLevel')
      this.roleSign = this.$api.getDicValues('role.roleSign')
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
