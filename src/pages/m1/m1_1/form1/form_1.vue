<template>
  <div>
      <el-col :span="5">
        <el-form-item label="最近更新人:">
          <span>{{dataForm.modifyPersonName}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="更新时间:">
          <span>{{dataForm.modifyTimeStr}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item>
          <span class="blue" @click="handleViewLog">更新日志</span>
        </el-form-item>
      </el-col>
      <h3>系统信息</h3>
      <el-col :span="8">
        <el-form-item label="配送类型:" required>
          <el-radio-group v-model="dataForm.distributionType" :disabled="disabled">
            <el-radio border :label="0">配送仓</el-radio>
            <el-radio border :label="1">非配送仓</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="温控类型:" required>
          <el-radio-group v-model="dataForm.temperatureControlType" :disabled="disabled">
            <el-radio border :label="0">冷链</el-radio>
            <el-radio border :label="1">常温</el-radio>
            <el-radio border :label="2">混合</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <h3>联系信息</h3>
      <el-col :span="5">
        <el-form-item label="联系人:" prop="contactsName">
          <el-input v-model="dataForm.contactsName" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="联系电话:" prop="contactsTelephone">
          <el-input v-model="dataForm.contactsTelephone" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="地址:" prop="address">
          <el-input v-model="dataForm.address" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      
      <os-dialog :visible="dialogVisible" :title="formTitle" :visibleButton="false" width="960px" top="4.5%">
        <log-table :tableData="tableDataLog" :pwid="LogWid"></log-table>
      </os-dialog>
  </div>
</template>
<script>
  import logTable from '../logTable'
  export default {
    components: {
      'log-table': logTable
    },
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