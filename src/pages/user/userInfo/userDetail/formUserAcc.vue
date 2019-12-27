<template>
    <div class="form_box_item">
      <label class="el-form-item__label">MT账户信息:</label>
      <div class="form_box_table">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="brokerName" label="经纪商"  width="120"  align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.brokerName" placeholder="请选择" :disabled="disabled">
                <el-option
                  v-for="item in brokerName"
                  :key="item.dicKey"
                  :label="item.dicValue"
                  :value="item.dicKey">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="serverId" label="服务器" width="150" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.serverName" :min="0" :controls="false" :disabled="disabled"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="mtAccId" label="MT账户ID" width="150" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mtAccId" :min="0" :controls="false" :disabled="disabled">></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="mtPasswordWatch" label="MT账户观摩密码" width="150" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mtPasswordWatch" :min="0" :controls="false" show-password ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="mtPasswordTrade" label="MT账户交易密码" width="150" align="center">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.mtPasswordTrade" :min="0" :controls="false"  show-password ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="accountType" label="MT账户类型"  width="120"  align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.accountType" placeholder="请选择" :disabled="disabled">
                <el-option
                  v-for="item in accountType"
                  :key="item.dicKey"
                  :label="item.dicValue"
                  :value="item.dicKey">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="accountState" label="MT账户状态"  width="120"  align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.accountState" placeholder="请选择" :disabled="disabled">
                <el-option
                  v-for="item in accountState"
                  :key="item.dicKey"
                  :label="item.dicValue"
                  :value="item.dicKey">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="platType" label="MT平台类型"  width="120"  align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.platType" placeholder="请选择" :disabled="disabled">
                <el-option
                  v-for="item in platType"
                  :key="item.dicKey"
                  :label="item.dicValue"
                  :value="item.dicKey">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="connectState" label="MT账户链接状态"  width="120"  align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.connectState" placeholder="未连接" disabled>
                <el-option
                  v-for="item in connectState"
                  :key="item.dicKey"
                  :label="item.dicValue"
                  :value="item.dicKey">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
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
        disabled: true,
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
              let tab = this.tableData[index]
              if (tab.passwordTradeChecked === 1) {
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
      getServerInfo() {
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          this.formData.formItem[1].value = userInfo.userId
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
