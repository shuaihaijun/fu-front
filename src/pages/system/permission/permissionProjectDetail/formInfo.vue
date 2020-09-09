<template>
  <div>
      <h3>基本信息</h3>
      <el-col :span="5">
        <el-form-item label="项目团队名称:" prop="projName">
          <el-input v-model="dataForm.projName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="项目团队key:" prop="projKey">
          <el-input v-model="dataForm.projKey" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="项目团队管理员:" prop="projAdmin">
          <el-input v-model="dataForm.projAdmin" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
          <el-form-item label="项目团队类型:" prop="projectType">
            <el-select v-model="dataForm.projType" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in projectType"
                :key="item.dicKey"
                :label="item.dicValue"
                :value="item.dicKey">
              </el-option>
            </el-select>
          </el-form-item>
      </el-col>
    <el-col :span="5">
      <el-form-item label="项目团队状态:" prop="projStatus">
        <el-select v-model="dataForm.projStatus" placeholder="请选择" :disabled="true">
          <el-option
            v-for="item in projStatus"
            :key="item.dicKey"
            :label="item.dicValue"
            :value="item.dicKey">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="创建人:" prop="creater">
        <el-input v-model="dataForm.creater" :disabled="disabled"></el-input>
      </el-form-item>
    </el-col>
      <el-col :span="5">
        <el-form-item label="项目团队标语:" prop="projSlogan">
          <el-input v-model="dataForm.projSlogan" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="项目团队描述:" prop="projDesc">
          <el-input v-model="dataForm.projDesc" :disabled="disabled"></el-input>
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
        projectType: this.$api.getDicValues('permission.projectType'),
        projStatus: this.$api.getDicValues('com.status'),
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
