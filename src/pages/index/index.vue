<template>
  <div class="dashboard-editor-container">

    <div class="state-box">
        <div class="state-box-integral-state">
          <div :gutter="32" class="state-box-integral-state-login">
            <el-col :xs="24" :sm="24" :lg="6" align="center">
              <label>账&nbsp;&nbsp;&nbsp;户&nbsp;ID：</label>
              <span class="btn-red">{{this.userData.id}}</span>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="6" align="center">
              <label>客户状态：</label>
              <span class="btn-red">{{this.userState}}</span>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="6" align="center">
              <label>客户身份：</label>
              <span class="btn-red">{{this.userType}}</span>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="6" align="center">
              <label>开户链接：</label>
              <span class="btn-red"><a style="color: white" target="_blank" href="http://www.baidu.com">联准国际</a></span>
              <el-dropdown :hide-on-click="false">
                <span class="btn-red">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item  v-for="r in operComData" icon="el-icon-circle-check" style="background: #e7e7e7;border-radius: 3px">
                    <a style="color: white;background-color: #90352E;padding: 1px 8px 1px 5px;border-radius: 3px;" target="_blank"  :href=r.netUrl>{{r.netDesc}}</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </div>
          <div :gutter="32" class="state-box-integral-state-login">
            <el-col :xs="24" :sm="24" :lg="6" align="center">
              <label>邀请人数：</label>
              <span class="btn-red">{{this.userData.recommend}}</span>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="6" align="center">
              <label>&nbsp;邀&nbsp;请&nbsp;码：</label>
              <span class="btn-red">{{this.introducerCode}}</span>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="12" align="center">
              <label>邀请链接：</label>
              <span class="btn-red">{{this.introducerUrl}}</span>
            </el-col>
          </div>
          <div :gutter="32" class="state-box-integral-state-login" :style="{'display': agentDisabled}">
              <el-col :xs="24" :sm="24" :lg="6" align="center">
                <label>团队交易金额：</label>
                <span class="btn-red">{{this.dataForm3.commissionSourceMoney}}</span>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="6" align="center">
                <label>团队交易手数：</label>
                <span class="btn-red">{{this.dataForm3.commissionSourceLots}}</span>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="6" align="center">
                <label>佣金余额：</label>
                <span class="btn-red">{{this.dataForm3.commissionMoney}}</span>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="6" align="center">
                <label>佣金总额：</label>
                <span class="btn-red">{{this.dataForm3.commissionTotal}}</span>
              </el-col>
          </div>
        </div>
    </div>
    <br>
    <os-table :loading="loading"   tableHeight="200px" :operate="true" :columnData="columnData1" :tableData="tableData1" >
      <div slot="l" ><span style="font-size: 15px;font-weight: 600"> MT账户信息</span> </div>
    </os-table>
    <br>
    <os-table :loading="loading"  tableHeight="300px" :operate="true" :columnData="columnData2" :tableData="tableData2" >
      <div slot="l" ><span style="font-size: 15px;font-weight: 600"> 优秀信号源</span> </div>
    </os-table>
    <br><br>

    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->
   <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>-->

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PanelGroup from './deatails/PanelGroup'
import LineChart from './deatails/LineChart'
import RaddarChart from './deatails/RaddarChart'
import PieChart from './deatails/PieChart'
import BarChart from './deatails/BarChart'
import TodoList from './deatails/TodoList'
import BoxCard from './deatails/BoxCard'
import api from './../../api'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TodoList,
    BoxCard
  },
  data() {
    return {
      // 表头
      columnData1: [
        {
          prop: 'userId',
          label: '用户ID',
          width: '90',
          align: 'center'
        },
        {
          prop: 'brokerName',
          label: '经纪商',
          width: '',
          align: 'center'
        },
        {
          prop: 'serverName',
          label: '服务器',
          width: '',
          align: 'center'
        },
        {
          prop: 'mtAccId',
          label: '账号',
          width: '',
          align: 'center'
        },
        {
          prop: 'leverage',
          label: '杠杆',
          width: '',
          align: 'center'
        },
        {
          prop: 'balance',
          label: '余额',
          width: '',
          align: 'center'
        },
        {
          prop: 'profit',
          label: '收益',
          width: '',
          align: 'center'
        },
        {
          prop: 'equity',
          label: '净值',
          width: '',
          align: 'center'
        }
      ],
      // 表格
      tableData1: [],
      columnData2: [{
        prop: 'connectState',
        label: '监听状态',
        width: '80',
        formatter: true,
        columnKey: 'com.yes',
        align: 'center'
      },
        {
          prop: 'id',
          label: '信号源ID',
          width: '90',
          align: 'center'
        },
        {
          prop: 'signalName',
          label: '信号源名称',
          width: '90',
          align: 'center'
        },
        {
          prop: 'signalState',
          label: '信号源状态',
          width: '90',
          formatter: true,
          columnKey: 'signal.signalState',
          align: 'center'
        },
        {
          prop: 'projName',
          label: '所属团队',
          width: '90',
          align: 'center'
        },
        {
          prop: 'monthlyAverageIncome',
          label: '月均收益',
          width: '80',
          align: 'center'
        },
        {
          prop: 'historyWithdraw',
          label: '最大回撤',
          width: '80',
          align: 'center'
        },
        {
          prop: 'signalTem',
          label: '团队信息',
          width: '',
          align: 'center'
        },
        {
          prop: 'signalDesc',
          label: '信号源简介',
          width: '',
          align: 'center'
        },
        {
          prop: 'applyDate',
          label: '申请时间',
          width: '150',
          dateFormat: true,
          format: 'yyyy-MM-dd HH:mm:ss',
          align: 'center'
        }],
      agentDisabled: 'none',
      tableData2: [],
      dataForm3: {},
      userData: {},
      operComData: [],
      loading: false,
      userState: '',
      userType: '',
      introducerCode: '',
      introducerUrl: '',
      lineChartData: lineChartData.newVisitis
    }
  },
  watch: {
    userData: function(v1) {
      let theCode = this.introducerEncode(this.userData.id)
      this.introducerCode = theCode
      this.introducerUrl = this.$api.getIntroducerloadUrl(theCode)
      this.userState = this.$api.getDicValue('user.userState', this.userData.userState)
      this.userType = this.$api.getDicValue('user.userType', this.userData.userType)
      if (this.userData.userType === 10) {
        this.agentDisabled = 'block'
      }
    }
  },
  created() {
    this.getQuery1()
    this.getQuery2()
    this.getQuery3()
    this.getUserInfo()
    this.queryComNetByCondition()
  },
  methods: {
    getQuery1() { // 搜索获取表格数据
      if (window.localStorage.getItem('nice_user')) {
        this.loading = true
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        // 判断用户权限
        let params = {
          operUserId: userInfo.userId, // 操作用户id
          userId: userInfo.userId // 用户ID
        }
        let pageInfoHelper = {
          pageSize: this.pageDataSize,
          pageNo: this.pageDataNum
        }
        let data = {
          params,
          pageInfoHelper
        }
        api.queryUsersMtAccount(data, (res) => {
          this.tableData1 = res.content.data
        })
        this.loading = false
      } else {
        this.$message('获取用户信息失败！')
      }
    },
    getQuery2() { // 搜索获取表格数据
      if (window.localStorage.getItem('nice_user')) {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        this.loading = true
        let params = {
          operId: userInfo.userId // 用户id
        }
        let pageInfoHelper = {
          pageSize: this.pageDataSize,
          pageNo: this.pageDataNum
        }
        let data = {
          params,
          pageInfoHelper
        }
        api.querySignalAllowed(data, (res) => {
          this.tableData2 = res.content.data
        })
        this.loading = false
      } else {
        this.$message('获取用户信息失败！')
      }
    },
    getQuery3() { // 搜索获取表格数据
      if (window.localStorage.getItem('nice_user')) {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        let params = {
          userId: userInfo.userId // 用户id
        }
        let data = {
          params: params
        }
        this.$api.getAccountCommissonByUserId(data, (res) => {
          this.dataForm3 = res.content
        })
      } else {
        this.$message('获取用户信息失败！')
      }
    },
    getUserInfo() {
      if (window.localStorage.getItem('nice_user')) {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        let params = {
          id: userInfo.userId, // 用户id
          userId: userInfo.userId // 用户id
        }
        this.$api.getUserByIdOrName(params, (res) => {
          this.userData = res.content
        })
      } else {
        this.$message('获取用户信息失败！')
      }
    },
    queryComNetByCondition() {
      if (window.localStorage.getItem('nice_user')) {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        let params = {
          userId: userInfo.userId // 用户id
        }
        let data = {
          params: params
        }
        this.$api.queryComNetByCondition(data, (res) => {
          this.operComData = res.content.data
        })
      } else {
        this.$message('获取用户信息失败！')
      }
    },
    handleClick(command) {
      this.$message('button click' + command)
    },
    introducerEncode: function(value) {
      let Base64 = require('js-base64').Base64
      return Base64.encode(value)  // 5r2Y6auY
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  background-color: #fafafa;
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .state-box {
    width: 1120px;
    margin: 20px auto;
  }

    .state-box-integral-state {
      border: 1px solid #ccc;
      border-top: 2px solid #5a5a5a;
      padding: 20px 0;
      overflow: hidden;
      background-color: white;
    }

    .state-box-integral-state-login {
      padding: 12px 10px 8px;
      margin: 20px auto;
      width: 1000px;
      height: 25px;
      border-radius: 5px;
      background: #e7e7e7;
    }

  .btn-red {
    padding: 1px 8px;
    border-radius: 4px;
    font-size: 13px;
    height: 22px;
    line-height: 22px;
    color: #fff;
    background: #90352E;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
