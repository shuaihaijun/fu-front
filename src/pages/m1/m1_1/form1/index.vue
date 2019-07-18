<template>
  <div>
    <div class="form_topBar" :style="{'width': topWidth}">
      <div class="form_topBar_l">
        <b>{{dataForm.wname}}</b>
      </div>
      <div class="form_topBar_r" v-if="formType == 'edit'">
        <el-button @click="handleSave('ruleForm')"><i class="el-icon-check"></i> 保 存</el-button>
      </div>
    </div>
    <el-form :model="dataForm" class="dataForm" :rules="rules" ref="ruleForm" :class="{'dataForm_view': formType == 'view'}" label-width="100px">
      <el-row :gutter="15">
        <form-1 :dataForm="dataForm" :formType="formType"></form-1>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="仓库结构信息" name="1">
            <form-2 :dataForm="dataForm" :formType="formType" :tableData="tableData1"></form-2>
          </el-collapse-item>
          <el-collapse-item title="费用信息" name="2">
            <form-3 :dataForm="dataForm" :formType="formType" :tableData="tableData2"></form-3>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <span>证照图片&文件上传<small class="title_s" v-if="formType=='edit'">上传单个文件不能大于10M</small></span>
            </template>
            <form-4 title="资质上传" :images="images.typeZeroList" :dataForm="dataForm" :showType="formType"></form-4>
            <form-4 title="CAD上传"  :images="images.typeOneList" :dataForm="dataForm" :showType="formType"></form-4>
            <form-4 title="合同上传" :images="images.typeTwoList" :dataForm="dataForm" :showType="formType"></form-4>
            <form-4 title="现场照片" :images="images.typeThreeList" :dataForm="dataForm" :showType="formType"></form-4>
          </el-collapse-item>
        </el-collapse>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import form1 from './form_1.vue'
  import form2 from './form_2.vue'
  import form3 from './form_3.vue'
  import form4 from './form_4.vue'
  export default {
    components: {
      'form-1': form1,
      'form-2': form2,
      'form-3': form3,
      'form-4': form4
    },
    props: {
    },
    data() {
      var validPhone = (rule, value, callback) => { // 手机号验证
        if (!value) {
          callback(new Error('请输入电话号码'))
        } else {
          var reg = /^1[3|4|5|7|6|8][0-9]\d{8}$/
          var reg2 = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/
          if (reg2.test(value) || reg.test(value)) {
            callback()
          }
          callback(new Error('请输入正确手机号码'))
        }
      }
      var nonempty = (rule, value, callback) => { // 非空数字验证
        if (!value) {
          callback(new Error('必填项'))
        } else {
          var reg = /(^[1-9]\d*$)/
          if (reg.test(value)) {
            callback()
          }
          callback(new Error('请正确输入'))
        }
      }
      var decimals = (rule, value, callback) => { // 非空数字验证保留两位小数
        if (!value) {
          callback(new Error('必填项'))
        } else {
          if (value === 0 || value === '0') {
            callback(new Error('请正确输入，保留两位小数'))
          } else {
            var reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/
            if (reg.test(value)) {
              callback()
            }
          }
          callback(new Error('请正确输入，保留两位小数'))
        }
      }
      var noNonempty = (rule, value, callback) => { // 0-9
        if (value === 0 || value === '0') {
          callback()
        } else if (!value) {
          callback(new Error('必填项'))
        } else {
          var reg = /(^[0-9]\d*$)/
          if (reg.test(value)) {
            callback()
          }
          callback(new Error('请正确输入'))
        }
      }
      var noDecimals = (rule, value, callback) => { // 带0空数字验证保留两位小数
        if (value === 0 || value === '0') {
          callback()
        } else if (!value) {
          callback(new Error('必填项'))
        } else {
          var reg = /(^[0-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/
          if (reg.test(value)) {
            callback()
          }
          callback(new Error('请正确输入，保留两位小数'))
        }
      }
      return {
        formType: 'edit',
        activeName: '1',
        dataForm: {
          modifyPersonName: '',
          wname: '',
          _networkAccess: [],
          _warehouseFormalities: [],
          _contractPropertyFee: ''
        },
        tableData1: [{}],
        tableData2: [{}],
        disabled: false,
        images: {
          typeZeroList: [
            {id: 1, certificateType: '证件类型', certificateName: 'food.jpeg', certificateUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
            {id: 2, certificateType: '证件类型', certificateName: 'food2.jpeg', certificateUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
          ],
          typeOneList: [
          ],
          typeTwoList: [
          ],
          typeThreeList: [
          ]
        },
        ruleForm: {
        },
        rules: {
          contactsName: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          contactsTelephone: [
            { required: true, trigger: 'blur', validator: validPhone }
          ],
          address: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          doorsCount: [
            { required: true, validator: nonempty, trigger: 'blur' }
          ],
          maxDoorWidth: [
            { required: true, validator: decimals, trigger: 'blur' }
          ],
          maxDoorHeight: [
            { required: true, validator: decimals, trigger: 'blur' }
          ],
          parkingSpaceCount: [
            { required: true, validator: nonempty, trigger: 'blur' }
          ],
          parkingLength: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          parkingWidth: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          _networkAccess: [
            { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
          ],
          _warehouseFormalities: [
            { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
          ],
          loadingPlatformCount: [
            { required: true, validator: nonempty, trigger: 'blur' } // 非空数字验证
          ],
          loadingPlatformWidth: [
            { required: true, validator: decimals, trigger: 'blur' } // 非空数字验证保留两位小数
          ],
          loadingPlatformLength: [
            { required: true, validator: decimals, trigger: 'blur' }
          ],
          networkBandWidth: [
            { required: true, validator: nonempty, trigger: 'blur' }
          ],
          leaseStartTime: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          leaseEndTime: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          rentFreeDays: [
            { required: true, validator: noNonempty, trigger: 'blur' }
          ],
          leasePrice: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          invoiceTaxPoint: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          leaseLiquidatedDamages: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          annualRentIncreasingRate: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          rentModeDetain: [
            { required: true, validator: noNonempty, trigger: 'blur' }
          ],
          rentModePayment: [
            { required: true, validator: noNonempty, trigger: 'blur' }
          ],
          leaseDeposit: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          networkCost: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          networkInstallationFee: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          waterFeeStandard: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          parkingFeeStandard: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          electricityFee: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          monthlyHeatingFee: [
            { required: true, validator: noNonempty, trigger: 'blur' }
          ],
          wasteDisposalFee: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          contractRentAmount: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ],
          contractPropertyFee: [
            { required: true, validator: noDecimals, trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.createdCom()
    },
    methods: {
      createdCom() {
        this.formType = this.$store.state.tab.uid.formType
        this.dataForm.wid = this.$store.state.tab.uid.id
        this.dataForm.wname = this.$store.state.tab.uid.wname
        let params = {
          wid: this.dataForm.wid,
          wname: this.dataForm.wname
        }
        this.$api.CKXX.getView(params, (res) => {
          let _dataForm = res.result
          _dataForm._networkAccess = res.result.networkAccess === '' ? [] : res.result.networkAccess.split(',')
          _dataForm._warehouseFormalities = res.result.warehouseFormalities === '' ? [] : res.result.warehouseFormalities.split(',')
          this.dataForm = _dataForm
        })
        this.$api.CKXX.getWSize(params, (res) => {
          this.tableData1 = res.result.length ? res.result : [{}]
        })
        this.$api.CKXX.getWContract(params, (res) => {
          this.tableData2 = res.result.length ? res.result : [{}]
        })
        this.getUploadList()
      },
      getUploadList() {
        this.$api.CKXX.getUploadList({wid: this.dataForm.wid}, (res) => {
          this.images = res.result
        })
      },
      handleSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataForm.networkAccess = this.dataForm._networkAccess.join(',')
            this.dataForm.warehouseFormalities = this.dataForm._warehouseFormalities.join(',')
            let params = JSON.parse(JSON.stringify(this.dataForm))
            params.divisionEntiyList = this.tableData1
            params.cycleEntiyList = this.tableData2
            params.modifyPersonId = this.UsInfo.user_id
            params.modifyPersonName = this.UsInfo.user_name
            delete params._networkAccess
            delete params._warehouseFormalities
            this.$api.CKXX.getEdit(params, (res) => {
              if (res.code !== 200) {
                this.$refs[formName].resetFields()
                return
              }
              this.$message(res.message)
              this.$store.dispatch('delTab', {id: 'm1_edit'})
              this.$store.dispatch('m1_list_state', this.$store.state.m1.m1_list_state + 1)
            })
          } else {
            this.$message('请书写完整')
            return false
          }
        })
      }
    },
    computed: {
      form_state () {
        return this.$store.state.m1.m1_form_state
      }
    },
    watch: {
      form_state (v) {
        this.createdCom()
      }
    }
  }
</script>
