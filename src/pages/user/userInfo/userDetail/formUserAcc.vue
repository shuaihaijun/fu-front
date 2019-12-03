<template>
    <div class="form_box_item">

      <label class="el-form-item__label">MT账户信息:</label>
      <div class="form_box_table">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="accountType" label="MT账户类型"  width="200"  align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.accountType" placeholder="请选择" v-if="formType == 'edit'">
                <el-option label="MT4" value="0"></el-option>
                <el-option label="MT5" value="1"></el-option>
              </el-select>
              <span v-if="formType == 'view'">{{ scope.row.accountType }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="brokerId" label="经纪商" width="200" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.brokerId" :min="0" :controls="false" v-if="formType == 'edit'"></el-input>
              <span v-if="formType == 'view'">{{ scope.row.brokerId }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="serverId" label="服务器" width="150" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.serverId" :min="0" :controls="false" v-if="formType == 'edit'"></el-input>
              <span v-if="formType == 'view'">{{ scope.row.serverId }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mtAccId" label="MT账户ID" width="150" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mtAccId" :min="0" :controls="false" v-if="formType == 'edit'"></el-input>
              <span v-if="formType == 'view'">{{ scope.row.mtAccId }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mtPasswordWatch" label="MT账户观摩密码" width="150" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mtPasswordWatch" :min="0" :controls="false" v-if="formType == 'edit'" show-password ></el-input>
              <span v-if="formType == 'view'">{{ scope.row.mtPasswordWatch }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mtPasswordTrade" label="MT账户交易密码" width="150" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mtPasswordTrade" :min="0" :controls="false" v-if="formType == 'edit'" show-password ></el-input>
              <span v-if="formType == 'view'">{{ scope.row.mtPasswordTrade }}</span>
            </template>
          </el-table-column>
         <!-- <el-table-column prop="height" label="MT账户交易密码" width="150" align="center">
              <el-button @click="handleSave('ruleForm')"><i class="el-icon-check"></i> 绑定MT账户</el-button>
              <span v-if="formType == 'view'">{{ scope.row.height }}</span>
          </el-table-column>-->
        </el-table>
      </div>
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
        disabled: false,
        disCheck: false
      }
    },
    created() {
      if (this.formType === 'view') {
        this.disabled = true
        this.disCheck = true
      }
    },
    methods: {
      delRow(v, index) {
        console.log(v, index)
        this.tableData.splice(index, 1)
      },
      addRow(v, index) {
        this.tableData.push({
          wid: this.dataForm.wid,
          wname: this.dataForm.wname
        })
      },
      parkingSpace(value) {
        console.log('改变之后:', value)
        if (value === 0 || value === '0') {
          this.dataForm.loadingEmbryosInOut = 0
          this.dataForm.loadingPlatformSingleBilateral = 0
          this.dataForm.loadingPlatformType = 0
          this.dataForm.loadingPlatformCount = 1
          this.dataForm.loadingPlatformWidth = 1
          this.dataForm.loadingPlatformLength = 1
        }
      }
    }
  }
</script>
