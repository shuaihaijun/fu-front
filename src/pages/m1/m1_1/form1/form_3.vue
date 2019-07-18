<template>
  <div>

    <el-col :span="6">
      <el-form-item label="租赁开始时间:" prop="leaseStartTime">
         <el-date-picker :disabled="disabled" type="date" :picker-options="pickerOptions" format="yyyy-MM-dd" placeholder="选择日期" v-model="dataForm.leaseStartTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="租赁结束时间:" prop="leaseEndTime">
        <el-date-picker :disabled="disabled" type="date" :picker-options="pickerOptions1" format="yyyy-MM-dd" placeholder="选择日期" v-model="dataForm.leaseEndTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="免租期:" prop="rentFreeDays">
        <el-input v-model="dataForm.rentFreeDays" :disabled="disabled">
          <template slot="append">天</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="租赁价格:" prop="leasePrice">
        <el-input v-model="dataForm.leasePrice" :disabled="disabled">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="租凭发票类型:" required>
        <el-radio-group v-model="dataForm.leaseInvoiceType" :disabled="disabled">
          <el-radio border :label="0">普票</el-radio>
          <el-radio border :label="1">增值税专用发票</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="发票税点:" prop="invoiceTaxPoint">
        <el-input v-model="dataForm.invoiceTaxPoint" :disabled="disabled">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="租赁违约金:" prop="leaseLiquidatedDamages">
        <el-input v-model="dataForm.leaseLiquidatedDamages" :disabled="disabled">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="年租递增率:" prop="annualRentIncreasingRate">
        <el-input v-model="dataForm.annualRentIncreasingRate" :disabled="disabled">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
    </el-col>

    <el-col :span="6" style="display: flex;">
      <el-form-item label="租金方式:" prop="rentModeDetain" style="width:70px;">
        <el-input v-model="dataForm.rentModeDetain" style="width:70px;" :disabled="disabled">
          <template slot="prepend">押</template>
        </el-input>
      </el-form-item>
      <el-form-item label=":" prop="rentModePayment" style="width:70px;">
        <el-input v-model="dataForm.rentModePayment" style="width:70px;" :disabled="disabled">
          <template slot="prepend">付</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="租赁押金:" prop="leaseDeposit">
        <el-input v-model="dataForm.leaseDeposit" :disabled="disabled">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="网络费用:" prop="networkCost">
        <el-input v-model="dataForm.networkCost" :disabled="disabled">
          <template slot="append">元/月</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="网络初装费:" prop="networkInstallationFee">
        <el-input v-model="dataForm.networkInstallationFee" :disabled="disabled">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="水费标准:" prop="waterFeeStandard">
        <el-input v-model="dataForm.waterFeeStandard" :disabled="disabled">
          <el-select v-if="formType == 'edit'" v-model="dataForm.waterFeeStandardType" slot="append" placeholder="请选择" style="width:90px;padding: 0 0 0 10px">
            <el-option label="元/吨" :value="0"></el-option>
            <el-option label="元/月" :value="1"></el-option>
            <el-option label="元/月/人" :value="2"></el-option>
          </el-select>
          <template slot="append" v-else>
            <span v-if="dataForm.waterFeeStandardType === 0">元/吨</span>
            <span v-if="dataForm.waterFeeStandardType === 1">元/月</span>
            <span v-if="dataForm.waterFeeStandardType === 2">元/月/人</span>
          </template>
        </el-input>
      </el-form-item>
    </el-col>
      <el-col :span="6">
        <el-form-item label="水费是否阶梯:" required>
          <el-radio-group v-model="dataForm.waterFeeIsStaircase" :disabled="disabled">
            <el-radio border :label="0">是</el-radio>
            <el-radio border :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="停车位是否收费:" label-width="120px" required>
          <el-radio-group v-model="dataForm.parkingSpaceIsCharged" :disabled="disabled">
            <el-radio border :label="0">是</el-radio>
            <el-radio border :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <template v-if="dataForm.parkingSpaceIsCharged == '0'">
          <el-form-item label="停车位收费标准:" label-width="120px" prop="parkingFeeStandard">
            <el-input v-model="dataForm.parkingFeeStandard" :disabled="disabled">
              <el-select v-if="formType == 'edit'" v-model="dataForm.parkingFeeStandardType" slot="append" placeholder="请选择" style="width:90px;padding: 0 0 0 10px">
                <el-option label="元/月" :value="0"></el-option>
                <el-option label="元/辆/月" :value="1"></el-option>
              </el-select>
              <template slot="append" v-else>
                  <span v-if="dataForm.parkingFeeStandardType === 0">元/月</span>
                  <span v-if="dataForm.parkingFeeStandardType === 1">元/辆/月</span>
              </template>
            </el-input>
          </el-form-item>
        </template>
        <template v-if="dataForm.parkingSpaceIsCharged == '1'">
            <el-form-item label="停车位收费标准:" label-width="120px">
            <el-input v-model="dataForm.parkingFeeStandard" :disabled="true">
              <el-select v-if="formType == 'edit'" :disabled="true" v-model="dataForm.parkingFeeStandardType" slot="append" placeholder="请选择" style="width:90px;padding: 0 0 0 10px">
                <el-option label="元/月" :value="0"></el-option>
                <el-option label="元/辆/月" :value="1"></el-option>
              </el-select>
              <template slot="append" v-else>
                  <span v-if="dataForm.parkingFeeStandardType === 0">元/月</span>
                  <span v-if="dataForm.parkingFeeStandardType === 1">元/辆/月</span>
              </template>
            </el-input>
          </el-form-item>
        </template>
      </el-col>
      <el-col :span="6">
        <el-form-item label="电费:" prop="electricityFee">
          <el-input v-model="dataForm.electricityFee" :disabled="disabled">
            <template slot="append">元/度</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="电费是否阶梯:" required>
          <el-radio-group v-model="dataForm.electricityFeeIsStaircase" :disabled="disabled">
            <el-radio border :label="0">是</el-radio>
            <el-radio border :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="是否收取暖气费:" label-width="120px" required>
          <el-radio-group v-model="dataForm.heatingFeeIsCollect" :disabled="disabled">
            <el-radio border :label="0">是</el-radio>
            <el-radio border :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <template v-if="dataForm.heatingFeeIsCollect == '0'">
          <el-form-item label="暖气费年度收取月数:" label-width="150px" prop="monthlyHeatingFee">
            <el-input v-model="dataForm.monthlyHeatingFee" :disabled="disabled">
              <template slot="append">月</template>
            </el-input>
          </el-form-item>
        </template>
        <template v-if="dataForm.heatingFeeIsCollect == '1'">
          <el-form-item label="暖气费年度收取月数:" label-width="150px">
            <el-input v-model="dataForm.monthlyHeatingFee" :disabled="true">
              <template slot="append">月</template>
            </el-input>
          </el-form-item>
        </template>
      </el-col>
      <el-col :span="6">
        <el-form-item label="垃圾处理费:" prop="wasteDisposalFee">
          <el-input v-model="dataForm.wasteDisposalFee" :disabled="disabled">
            <template slot="append">元/月</template>
          </el-input>
        </el-form-item>
      </el-col>

    <div class="form_box_item">
      <label class="el-form-item__label">合同租金周期:</label>
      <div class="form_box_table">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="操作" align="center" v-if="formType == 'edit'" width="50">
            <template slot-scope="scope">
              <span v-if="scope.$index != tableData.length - 1" @click="delRow(scope.row, scope.$index)">
                <i class="el-icon-remove-outline" style="font-size: 18px;cursor: pointer;"></i>
              </span>
              <span @click="addRow(scope.row, scope.$index)" v-else>
                <i class="el-icon-circle-plus-outline" style="font-size: 18px;cursor: pointer;"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" align="center" width="140">
            <template slot-scope="scope">
              <el-date-picker v-if="formType == 'edit'" type="date" :picker-options="pickerOptionsId" placeholder="选择日期" v-model="scope.row.startTime" @focus="dateChangeAfterTime(scope)" style="width: 100%;"></el-date-picker>
              <span v-if="formType == 'view'">{{ new Date(scope.row.startTime).toLocaleDateString().replace(/[/]/g,'-') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="140" align="center">
            <template slot-scope="scope">
               <el-date-picker v-if="formType == 'edit'" type="date" :picker-options="pickerOptions3" @focus="dateChangeBeginTime(scope)" placeholder="选择日期" v-model="scope.row.endTime" style="width: 100%;"></el-date-picker>
              <span v-if="formType == 'view'">{{ new Date(scope.row.endTime).toLocaleDateString().replace(/[/]/g,'-') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="contractLeaseArea" label="合同租赁面积(m²)" width="130" align="center">
            <template slot-scope="scope">
              <el-input-number style="width: 100%;" v-model="scope.row.contractLeaseArea" :min="0" :controls="false" v-if="formType == 'edit'"></el-input-number>
              <span v-if="formType == 'view'">{{ scope.row.contractLeaseArea }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="actualUseArea" label="实际使用面积(m²)" width="130" align="center">
            <template slot-scope="scope">
              <el-input-number style="width: 100%;" v-model="scope.row.actualUseArea" :min="0" :controls="false" v-if="formType == 'edit'"></el-input-number>
              <span v-if="formType == 'view'">{{ scope.row.actualUseArea }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="publicArea" label="公摊面积(m²)" width="120" align="center">
            <template slot-scope="scope">
              <el-input-number style="width: 100%;" v-model="scope.row.publicArea" :min="0" :controls="false" v-if="formType == 'edit'"></el-input-number>
              <span v-if="formType == 'view'">{{ scope.row.publicArea }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="contractRentAmount" label="合同租金金额(元)" width="130" align="center">
            <template slot-scope="scope">
              <el-input style="width: 100%;" v-model="scope.row.contractRentAmount" @change="(val, a) => { return contractPro(val, scope.row, scope.$index)}" :min="0" :max="10000000" :controls="false" v-if="formType == 'edit'"></el-input>
              <span v-if="formType == 'view'">{{ scope.row.contractRentAmount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="contractPropertyFee" label="合同物业费金额(元)" align="center">
            <template slot-scope="scope">
              <el-input style="width: 100%;" v-model="scope.row.contractPropertyFee" @change="(val, a) => { return contractPro(val, scope.row, scope.$index)}" :min="0" :max="10000000" :controls="false" v-if="formType == 'edit'"></el-input>
              <span v-if="formType == 'view'">{{ scope.row.contractPropertyFee }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        Type: Object,
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
        tableDataIndex: 0,
        tableId: 0,
        pickerOptions: {
          disabledDate: (time) => {
            return time.getTime() < time
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            let beginDateVal = this.dataForm.leaseStartTime
            if (beginDateVal) {
               return time.getTime() < beginDateVal
            }
          }
        },
        pickerOptionsId: {
          disabledDate: (time) => {
            if (this.tableId === 0) {
              return time.getTime() < time
            } else {
              let beginDateVal = this.tableData[(this.tableId - 1)].endTime
              if (beginDateVal) {
                return time.getTime() <= beginDateVal
              }
            }
          }
        },
        pickerOptions3: {
          disabledDate: (time) => {
            let beginDateVal = this.tableData[this.tableDataIndex].startTime
            if (beginDateVal) {
               return time.getTime() < beginDateVal
            }
          }
        }
      }
    },
    created() {
      console.log(this.tableData)
      if (this.formType === 'view') {
        this.disabled = true
      }
      this.tableData[0].wid = this.dataForm.wid
      this.tableData[0].wname = this.dataForm.wname
    },
    methods: {
      contractPro(v, r, i) {
        console.log('r', r)
        console.log('v', v)
        console.log('i', i)
        var reg = /(^[0-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/
        if (!r.contractPropertyFee || r.contractPropertyFee === 'undefined' || isNaN(r.contractPropertyFee)) {
          this.tableData[i].contractPropertyFee = 0
        } else if (!reg.test(r.contractPropertyFee)) {
          this.tableData[i].contractPropertyFee = (v * 1).toFixed(2)
        }
        if (!r.contractRentAmount || r.contractRentAmount === 'undefined' || isNaN(r.contractRentAmount)) {
          this.tableData[i].contractRentAmount = 0
        } else if (!reg.test(r.contractRentAmount)) {
          this.tableData[i].contractRentAmount = (v * 1).toFixed(2)
        }
      },
      delRow(v, index) {
        this.tableData.splice(index, 1)
      },
      dateChangeBeginTime(v) {
        this.tableDataIndex = v.$index
      },
      dateChangeAfterTime(v) {
        this.tableId = v.$index
      },
      addRow(v, index) {
        this.tableData.push({
          wid: this.dataForm.wid,
          wname: this.dataForm.wname
        })
      }
    }
  }
</script>