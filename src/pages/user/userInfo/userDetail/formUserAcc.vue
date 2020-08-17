<template>
    <div class="form_box_item">
      <label class="el-form-item__label">账户信息:</label>
      <div class="form_box_table">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="操作" width="100" align="center" v-if="formType == 'edit'">
            <template slot-scope="scope">
              <span v-if="scope.$index != tableData.length - 1" @click="delRow(scope.row, scope.$index)">
                      <i class="el-icon-remove-outline" style="font-size: 18px;cursor: pointer;"></i>
                    </span>
              <span @click="addRow(scope.row, scope.$index)" v-else>
                      <i class="el-icon-circle-plus-outline" style="font-size: 18px;cursor: pointer;"></i>
                    </span>
            </template>
          </el-table-column>
          <el-table-column prop="brokerName" label="经纪商"  width="120"  align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.brokerName" placeholder="请选择" :disabled="disabled" @change="getServerInfo">
                <el-option
                  v-for="item in brokerName"
                  :key="item.dicKey"
                  :label="item.dicValue"
                  :value="item.dicKey">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="serverName" label="服务器"  width="120"  align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.serverName" placeholder="请选择" :disabled="disabled" >
                <el-option
                  v-for="item in serverName"
                  :key="item.dicKey"
                  :label="item.dicValue"
                  :value="item.dicKey">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="mtAccId" label="MT账户ID" width="150" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mtAccId" :min="0" :controls="false" :disabled="disabled"></el-input>
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
          <el-table-column prop="accountState" label="MT账户状态"  width="120"  align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.accountState" placeholder="正常"  disabled>
                <el-option
                  v-for="item in accountState"
                  :key="item.dicKey"
                  :label="item.dicValue"
                  :value="item.dicKey">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="connectState" label="MT账户链接状态"  width="150"  align="center">
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
        if (v.userId !== null && v.userId !== undefined) {
          let params = {
            userId: v.userId,
            mtAccId: v.mtAccId
          }
          let data = {
            params
          }
          this.$api.mtAccRemoveCheck(data, (res) => {
            if (res.content !== null && res.content === true) {
              this.tableData.splice(index, 1)
            } else {
              this.$message(res.message)
              return
            }
          })
        } else {
          this.tableData.splice(index, 1)
        }
      },
      addRow(v, index) {
        if (index >= 4) {
          this.$message('最多可以绑定5个账号！')
          return
        }
        this.tableData.push({
          wid: this.dataForm.wid,
          wname: this.dataForm.wname
        })
      },
      getBrokerInfo() {
        if (window.localStorage.getItem('nice_user')) {
          let params = {}
          let pageInfoHelper = {
            pageSize: 1000,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
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
                object1.dicValue = res.content.data[index].brokerName
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
