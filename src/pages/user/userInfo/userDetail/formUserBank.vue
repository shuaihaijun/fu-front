<template>
    <div class="form_box_item">
      <label class="el-form-item__label">银行卡信息:</label>
      <div class="form_box_table">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="bankName" label="银行名称" width="250" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bankName" :min="0" :controls="false" :disabled="disabled">></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="hostName" label="户主名称" width="150" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.hostName" :min="0" :controls="false" :disabled="disabled">></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="银行卡号" width="250" align="center">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.code" :min="0" :controls="false" :disabled="disabled">></el-input>
            </template>
          </el-table-column>
          <!--<el-table-column prop="code" label="操作" width="250" align="center">
            <template slot-scope="scope">
              <a @click="saveBankCode()"> 保 存</a>
            </template>
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
        accountType: '',
        accountState: '',
        platType: '',
        connectState: '',
        brokerName: '',
        serverName: '',
        disCheck: true
      }
    },
    created() {
      this.accountType = this.$api.getDicValues('mt.accountType')
      this.accountState = this.$api.getDicValues('account.accountState')
      this.platType = this.$api.getDicValues('mt.platType')
      this.connectState = this.$api.getDicValues('com.connectState')
      setTimeout(() => {
        if (this.formType === 'edit') {
          if (this.tableData !== null && this.tableData.length > 0) {
            // 账户已绑定 不让修改
            for (let index = 0; index < this.tableData.length; index++) {
              if (this.tableData[index].passwordTradeChecked === 1) {
                this.disabled = true
                break
              }
            }
          }
        }
      }, 0)
      this.getBrokerInfo()
      this.getServerInfo()
    },
    methods: {
      delRow(v, index) {
        this.tableData.splice(index, 1)
      },
      addRow(v, index) {
        this.tableData.push({
          wid: this.dataForm.wid,
          wname: this.dataForm.wname
        })
      },
      getBrokerInfo() {
        if (window.localStorage.getItem('nice_user')) {
          let params = {}
          let data = {
            params
          }
          // 初始化账号
          this.$api.queryComBroker(data, (res) => {
            if (res.content !== null && res.content.data !== null) {
              if (res.content.data.length === 0) {
                this.$message('获取经纪商信息失败！')
              }
              let object = []
              // 重组数据
              for (let index = 0; index < res.content.data.length; index++) {
                let object1 = {}
                object1.dicValue = res.content.data[index].comment
                object1.dicKey = res.content.data[index].brokerName
                object[index] = object1
              }
              this.brokerName = object
            } else {
              this.$message('获取经纪商信息失败！')
            }
          })
        }
      },
      getServerInfo(brokerName) {
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            brokerName: brokerName
          }
          // 初始化账号
          this.$api.queryServer(params, (res) => {
            if (res.content !== null && res.content.records !== null) {
              if (res.content.records.length === 0) {
                this.$message('获取服务器信息失败！')
              }
              let object = []
              // 重组数据
              for (let index = 0; index < res.content.records.length; index++) {
                let object1 = {}
                object1.dicValue = res.content.records[index].serverName
                object1.dicKey = res.content.records[index].serverName
                object[index] = object1
              }
              this.serverName = object
            } else {
              this.$message('获取经纪商信息失败！')
            }
          })
        }
      },
      parkingSpace(value) {
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
