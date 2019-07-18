<template>
  <div>
    <el-form :model="dataForm" class="dataForm dialogForm" :rules="rules" ref="dataForm" :class="{'dataForm_view': formType == 'view'}" label-width="110px">
      <el-row :gutter="15">
        <el-col :span="24" style="text-align: left;">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运输l类型:">
            <el-radio-group v-model="dataForm.transportationType" :disabled="disabled">
              <el-radio :label="0">同城</el-radio>
              <el-radio :label="1">干线</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配送范围:">
            <el-radio-group v-model="dataForm.distributionScope" :disabled="disabled">
              <el-radio :label="0">全部</el-radio>
              <el-radio :label="1">配区</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="display:flex">
          <el-form-item label="下单时间段:" prop="orderStartTimeStr">
            <el-time-select
              v-model="dataForm.orderStartTimeStr"
              format="HH:mm" 
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59',
              }"
              placeholder="选择开始时间" style="width: 130px" value-format="HH:mm" :disabled="disabled">
            </el-time-select>
          </el-form-item>
          <el-col class="line" :span="2">-</el-col>
          <el-form-item prop="orderEndTimeStr" label-width="0px">
            <el-time-select
              v-model="dataForm.orderEndTimeStr"
              format="HH:mm" 
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59',
                minTime: dataForm.orderStartTimeStr
              }"
              placeholder="选择结束时间" style="width: 130px" value-format="HH:mm" :disabled="disabled">
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配送批次:">
            <el-select :disabled="disabled" v-model="dataForm.distributionBatch" placeholder="请选择活动区域">
              <el-option label="T+0" :value="0"></el-option>
              <el-option label="T+1" :value="1"></el-option>
              <el-option label="T+2" :value="2"></el-option>
              <el-option label="T+3" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="display:flex">
          <el-form-item label="应配送时间段:" prop="distributionStartTimeStr">
            <el-time-picker
              v-model="dataForm.distributionStartTimeStr"
              format="HH:mm" 
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59'
              }"
              placeholder="选择开始时间" style="width: 130px" value-format="HH:mm" :disabled="disabled">
            </el-time-picker>
          </el-form-item>
          <el-col class="line" :span="2">-</el-col>
          <el-form-item prop="distributionEndTimeStr" label-width="0px">
            <el-time-picker
              v-model="dataForm.distributionEndTimeStr"
              format="HH:mm" 
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59',
                minTime: dataForm.distributionStartTimeStr
              }"
              placeholder="选择结束时间" style="width: 130px" value-format="HH:mm" :disabled="disabled">
            </el-time-picker>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="停用/启用:">
            <el-switch :disabled="disabled" v-model="dataForm.distributionState" inactive-value="0" :active-value="0"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="说明:">
            <el-input :disabled="disabled" type="textarea" v-model="dataForm.description"></el-input>
          </el-form-item>
        </el-col>
        
        <el-col :span="24">
          <div class="btnBox" style="text-align: right;">
            <el-button type="primary" @click="handleTemporary('dataForm')">暂存</el-button>
          </div>
        </el-col>

      </el-row>
      <div class="form_box_table" style="margin: 20px 0 0 0;">
        <os-table :topbar="false" searchHeight="320" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @click-operate="handleOperate">
        </os-table>
      </div>
      <el-row>
        <el-col :span="24">
        <div class="btnBox">
          <el-button type="primary" @click="handleSave('dataForm')">保存</el-button>
          <el-button @click="handleClose('dataForm')">取消</el-button>
        </div>
      </el-col>
      </el-row>
    </el-form>
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
      pwid: ''
    },
    data() {
      return {
        disabled: true,
        columnOperate: [
          {
            label: '操作',
            width: '110px',
            fixed: 'left',
            isBtn: true,
            children: [{
                iconClass: 'el-icon-view',
                name: '编辑',
                show: 'IsBtn2',
                isBtn: true
              }
            ]
          }
        ],
        // 表头
        columnData: [{
            prop: 'transportationTypeStr',
            label: '运输类型',
            width: '90'
          },
          {
            prop: 'distributionScopeStr',
            label: '配送范围',
            width: '80',
            align: 'center'
          },
          {
            prop: 'orderTimeSlot',
            label: '下单时间段',
            width: '100',
            align: 'center'
          },
          {
            prop: 'distributionBatchStr',
            label: '配送批次',
            width: '',
            align: 'center'
          },
          {
            prop: 'distributionTimeSlot',
            label: '应配送时间段',
            width: '120',
            align: 'center'
          },
          {
            prop: 'distributionStateStr',
            label: '状态',
            width: '120',
            align: 'center'
          }
        ],
        // 表格
        tableData: [],
        dataForm: {
          wid: '',
          wname: '',
          updateId: '',
          updateName: '',
          branchId: '',
          branchName: '',
          transportationType: 0,
          distributionScope: 0, // 配送范围
          orderStartTimeStr: '', // 下单时间段
          orderEndTimeStr: '',
          distributionBatch: 0, // 配送批次
          distributionStartTimeStr: '', // 应配送时间段
          distributionEndTimeStr: '',
          distributionState: 0, // 停用/启用
          description: '' // 说明
        },
        condition: 'editor',
        rules: {
          orderStartTimeStr: [
            { required: true, message: '必填项', trigger: 'change' }
          ],
          orderEndTimeStr: [
            { required: true, message: '必填项', trigger: 'change' }
          ],
          distributionStartTimeStr: [
            { required: true, message: '必填项', trigger: 'change' }
          ],
          distributionEndTimeStr: [
            { required: true, message: '必填项', trigger: 'change' }
          ]
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
        this.getFindWtcListByWid()
      }
    },
    created() {
      this.getFindWtcListByWid()
      console.log(this.pwid, 'this.pwid')
      if (this.formType === 'view') {
        this.disabled = true
      }
    },
    methods: {
      getFindWtcListByWid() {
        this.disabled = true
        let params = {
          wid: this.pwid.wid,	// 仓库ID
          wname: this.pwid.wname,	// 仓库名称
          branchId: this.pwid.branchId,	// 分公司ID
          branchName: this.pwid.branchName	// 分公司名称
        }
        console.log(params)
        this.$api.pspc.getFindWtcListByWid(params, (res) => {
          console.log(res)
          this.tableData = res.result.list
          this.pageDataTotal = res.result.list.length
        })
      },
      handleAdd() {
        this.disabled = false
        this.condition = ''
        this.dataForm = {
          wid: '',
          wname: '',
          updateId: '',
          updateName: '',
          branchId: '',
          branchName: '',
          transportationType: 0,
          distributionScope: 0, // 配送范围
          orderStartTimeStr: '', // 下单时间段
          orderEndTimeStr: '',
          distributionBatch: 0, // 配送批次
          distributionStartTimeStr: '', // 应配送时间段
          distributionEndTimeStr: '',
          distributionState: 0, // 停用/启用
          description: '' // 说明
        }
      },
      handleTemporary(formName) { // 暂存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.disabled === false) {
              if (this.condition !== 'editor') {
                let _a = window.localStorage.getItem('wtc_userInfo')
                this.dataForm.wid = this.pwid.wid
                this.dataForm.wname = this.pwid.wname
                this.dataForm.updateId = JSON.parse(_a).user_id
                this.dataForm.updateName = JSON.parse(_a).user_name
                this.dataForm.branchId = this.pwid.branchId	// 分公司ID
                this.dataForm.branchName = this.pwid.branchName	// 分公司名称
                this.tableData.push(this.dataForm)
                this.disabled = true
                console.log('23333', this.tableData)
              }
            }
          } else {
            this.$message('请书写完整')
            return false
          }
        })
      },
      handleClose(formName) {
        this.disabled = true
        this.$parent.$parent.$parent.dialogVisible = false
        this.$refs[formName].resetFields()
      },
      handleSave(formName) {
        console.log(this.tableData, 'this.tableData')
        this.$api.pspc.getUpdate(this.tableData, (res) => {
          console.log(res)
          if (res.success === true) {
            console.log('成功')
            this.getFindWtcListByWid()
            this.$refs[formName].resetFields()
            this.$parent.$parent.$parent.dialogVisible = false
          }
        })
      },
      handleOperate(row, index, name) {
        this.dataForm = row
        this.disabled = false
        this.condition = 'editor'
      }
    }
  }
</script>
<style>
.dataForm .el-input--suffix .el-input__inner{
  padding: 0 20px 0 25px;
  box-sizing: border-box;
}
</style>
