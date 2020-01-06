<template>
    <div>
      <label class="el-form-item__label">银行卡信息:</label>
      <!--<div class="form_box_table">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="bankName" label="银行名称" width="250" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bankName"   :disabled="disabled"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="hostName" label="户主名称" width="150" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.hostName"  :disabled="disabled"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="银行卡号" width="250" align="center">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.code" :disabled="disabled"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>-->
      <el-col :span="5">
        <el-form-item label="银行名称:" prop="bankName">
          <el-input v-model="dataForm.bankName" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="户主名称:" prop="hostName">
          <el-input v-model="dataForm.hostName" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="银行卡号:" prop="code">
          <el-input v-model="dataForm.code" :disabled="disabled"></el-input>
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
      },
      tableData: {
        default() {
          return []
        }
      }
    },
    data() {
      return {
        disabled: true,
        brokerName: '',
        serverName: ''
      }
    },
    created() {
      if (this.formType === 'edit') {
        this.disabled = false
      }
    },
    methods: {
    }
  }
</script>
