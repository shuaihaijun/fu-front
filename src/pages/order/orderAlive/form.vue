<template>
  <div class="m2_1">
    <el-form :model="dataForm" class="dataForm dialogForm detailsForm" ref="ruleForm" :class="{'dataForm_view': formType == 'view'}" label-width="100px">
      <el-row :gutter="15">
        <el-col :span="6">
          <el-form-item label="主单编号:">
            {{dataForm.wtcOrderCode }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主单状态:">
            {{dataForm.stateStr}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分公司:">
            {{dataForm.branchName}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发货仓库:">
            {{dataForm.wname}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="目的仓库:">
            {{dataForm.wnameTarget}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="下单时间:">
            {{dataForm.orderTimeStr}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户编号:">
            {{dataForm.customerCode}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户名称:">
            {{dataForm.customerName}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审核时间:">
            {{dataForm.auditTimeStr}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原始单号:">
            {{dataForm.omsOrderCode}}
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="付款方式:">
            {{dataForm.aaaa}}
          </el-form-item>
        </el-col> -->
        <!-- <el-col :span="6">
          <el-form-item label="已付金额:">
            {{dataForm.aaaa}}
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="收货人:">
            {{dataForm.consigneeName}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务员:">
            {{dataForm.salesmanName}}
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="收货地址:">
            {{dataForm.consigneeAddress}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务员电话:">
            {{dataForm.salesmanPhone}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注:">
            {{dataForm.remark}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="os_tab">
      <ul>
        <li :class="{current: current == 0}" @click="handerSwitch(0)">WMS</li>
        <li :class="{current: current == 1}" @click="handerSwitch(1)">TMS</li>
      </ul>
    </div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="＋ 商品信息" name="1">
        <div class="form_box_table" style="margin: 0;">
          <el-table :data="tableData1" style="width: 100%;">
            <el-table-column prop="id" label="编号" align="center" width="50"></el-table-column>
            <el-table-column prop="wmsOrderCode" label="子单编号" align="center" width="90"></el-table-column>
            <el-table-column prop="skuId" label="物料编码" align="center" width="140"></el-table-column>
            <el-table-column prop="skuName" label="名称" align="center"></el-table-column>
            <el-table-column prop="specifications" label="规格" width="130" align="center"></el-table-column>
            <el-table-column prop="volume" label="单体积(mm3)" width="130" align="center"></el-table-column>
            <el-table-column prop="weight" label="单位重量(g)" width="120" align="center"></el-table-column>
            <el-table-column prop="contractRentAmount" label="条码" width="130" align="center"></el-table-column>
            <el-table-column prop="salesUnitName" label="销售单位" align="center"></el-table-column>
            <el-table-column prop="contractPropertyFee" label="套餐信息" align="center"></el-table-column>
            <el-table-column prop="scatterAttribute" label="整散标记" align="center"></el-table-column>
            <el-table-column prop="warehousePickName" label="拣货仓" align="center"></el-table-column>
            <el-table-column prop="orderQuantity" label="下单量" align="center"></el-table-column>
            <el-table-column v-if="current == 0" prop="pickQuantity" label="出库量" width="120" align="center"></el-table-column>
            <el-table-column  v-if="current == 1" prop="pickQuantity" label="实际收货量" width="120" align="center"></el-table-column>
          </el-table>
          <div class="os_tab1">
            <ul v-for="(item,index) in codeType" :key="index">
              <li :class="{current: current1 == index}" @click="handerSwitch1(index)">子单：{{item}}</li>
            </ul>
          </div>
          <el-form :model="dataForm1" style="clear: both;padding-top: 20px;" class="dataForm dialogForm detailsForm" ref="ruleForm1" :class="{'dataForm_view': formType == 'view'}" label-width="100px">
            <el-row :gutter="15">
              <el-col :span="6">
                <el-form-item label="子单编号:">
                  {{dataForm1.code}}
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="current1 == 0">
                <el-form-item label="子单类型:">
                  {{dataForm1.codeType}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发货仓库:">
                  {{dataForm1.fromWname}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="目的仓库:">
                  {{dataForm1.toWname}}
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="current1 == 1">
                <el-form-item label="运输类型:">
                  {{dataForm1.transportationType}}
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="current1 == 1">
                <el-form-item label="配送批次:">
                  {{dataForm1.distributionBatch}}
                </el-form-item>
              </el-col>
               <el-col :span="6" v-if="current1 == 1">
                <el-form-item label="应配送日期:">
                  {{dataForm1.distribution}}
                </el-form-item>
              </el-col>
               <el-col :span="6" v-if="current1 == 1">
                <el-form-item label="应配送时间段:">
                  {{dataForm1.distributionTimeSlot}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="整货件数:">
                  {{dataForm1.wholeCount}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="散货件数:">
                  {{dataForm1.scatteredCount}}
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="current1 == 0">
                <el-form-item label="出库类型:">
                  {{dataForm1.OutType}}
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="current1 == 0">
                <el-form-item label="拣货区域:">
                  {{dataForm1.pickingArea}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="下传WMS时间:">
                  {{dataForm1.toWmsTime}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item title="＋  WMS日志信息" name="2">
        <div class="form_box_table" style="margin: 0;">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="operationState" label="环节" align="center" v-if="formType == 'edit'"></el-table-column>
            <el-table-column prop="operationTimeStr" label="操作时间" align="center"></el-table-column>
            <el-table-column prop="operationUserName" label="操作人" width="140" align="center"></el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>
<script>
  export default {
    props: {
      pwid: '',
      formType: {
        default() {
          return 'edit'
        }
      }
    },
    data() {
      return {
        disabled: false,
        activeName: '0',
        current: 0,
        current1: 0,
        tableData: [],
        tableData1: [],
        codeType: [],
        dataForm: {
          wtcOrderCode: '',
          stateStr: '',
          branchName: '',
          wname: '',
          wnameTarget: '',
          orderTimeStr: '',
          customerCode: '',
          customerName: '',
          auditTimeStr: '',
          consigneeName: '',
          consigneeAddress: '',
          salesmanName: '',
          salesmanPhone: '',
          remark: '',
          omsOrderCode: ''
        },
        dataForm1: {
          code: '', // wms单号
          codeType: '', // 子单类型
          fromWname: '', // 出发仓库名称
          toWname: '', // 目的仓库名称
          transportationType: '', // 运输类型
          distributionBatch: '', // 配送批次
          distribution: '', // 应配送日期
          distributionTimeSlot: '', // 应配送时间段
          wholeCount: '', // 整货件数
          scatteredCount: '', // 散货件数
          OutType: '', // 出库类型
          pickingArea: '', // 拣货区域
          toWmsTime: '' // 下传WMS时间
        }
      }
    },
    computed: {
      wid() {
        return this.pwid
      }
    },
    watch: {
      wid(v) {
        this.getList()
      }
    },
    created() {
      this.getList()
      console.log(this.pwid, 'this.pwid')
      if (this.formType === 'view') {
        this.disabled = true
      }
    },
    methods: {
      getList() {
        let params = {
          id: this.pwid.id
        }
        console.log(params)
        this.$api.xsrwd.getFindOrderById(params, (res) => {
          console.log(res, '详情')
          this.dataForm = res.result
          this.handerSwitch(0)
        })
      },
      handerSwitch(v) {
        this.current = v
        let params = {
          wtcOrderCode: this.dataForm.wtcOrderCode
        }
        this.$api.xsrwd.getShopList(params, (res) => {
          console.log(res, '商品详情')
          this.tableData1 = res.result
        })
        let params2 = {
          wtcOrderCode: this.dataForm.wtcOrderCode,
          codeType: v
        }
        this.$api.xsrwd.getByWtcCode(params2, (res) => {
          console.log(res, '子单编号111111111111')
          this.codeType = res.result
          this.handerSwitch1(0)
        })
      },
      handerSwitch1(v) {
        this.current1 = v
        let params = {
          wtcOrderCode: this.dataForm.wtcOrderCode,
          code: this.codeType[v]
        }
        console.log(params, '子单详情params')
        this.$api.xsrwd.getDistributions(params, (res) => {
          console.log(res, '子单详情')
          this.dataForm1 = res.result
        })
        this.getfindWms(v)
      },
      getfindWms(v) {
        // console.log(params)
        let params = {
          wmsOrderCode: this.codeType[v]
        }
        this.$api.xsrwd.getfindWms(params, (res) => {
          console.log(res, 'WMS日志信息')
          this.tableData = res.result
        })
      }
    }
  }
</script>
<style>
  .m2_1{
    height:530px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .detailsForm {
    padding-top: 0;
    padding-bottom: 25px;
  }
  
  .detailsForm .el-col {
    height: 28px;
  }
  
  .os_tab {
    height: 34px;
    line-height: 34px;
    /*border-top: 1px solid #eee;*/
    /*border-bottom: 1px solid #eee;*/
  }
  
  .m2_1 .el-collapse-item__header {
    font-weight: bold;
    color: #409eff;
  }
  .m2_1 .el-collapse-item__content{
    padding: 0;
  }
  .os_tab li {
    float: left;
    padding: 0 50px;
    text-align: center;
    cursor: pointer;
  }
  
  .os_tab .current {
    background: #409eff;
    color: #fff;
    font-weight: bold;
  }
  
  .os_tab1 {
    margin: 20px 0 0 0;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
  
  .os_tab1 li {
    float: left;
    padding: 0 50px;
    cursor: pointer;
  }
  
  .os_tab1 .current {
    border-bottom: 2px solid #409eff;
    color: #409eff;
  }
</style>