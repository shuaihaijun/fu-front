<template>
  <div>
    <div class="form_topBar" :style="{'width': topWidth}">
      <div class="form_topBar_l">
        <b>用户信息</b>
      </div>
      <div class="form_topBar_r" v-if="formType == 'edit'">
        <el-button @click="handleCheck('ruleForm')"><i class="el-icon-circle-check"></i>提交审核</el-button>
      </div>
      <div class="form_topBar_r" v-if="formType == 'edit'">
        <el-button @click="handleSave('ruleForm')"><i class="el-icon-check"></i> 保&nbsp;&nbsp;存</el-button>&nbsp;&nbsp;&nbsp;
      </div>
    </div>
    <el-form :model="dataForm" class="dataForm" :rules="rules" ref="ruleForm" :class="{'dataForm_view': formType == 'view'}" label-width="100px">
      <el-row :gutter="15">
        <form-1 :dataForm="dataForm" :formType="formType"></form-1>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="MT账户信息" name="1">
            <span><small class="title_s" v-if="formType=='edit'">注：已绑定账户只能做修改密码操作！修改密码后请联系管理员重新启动监听！</small></span>
            <form-2 :dataForm="dataForm" :formType="formType" :tableData="tableData1"></form-2>
          </el-collapse-item>
          <el-collapse-item title="银行卡信息" name="2">
            <form-4 :dataForm="tableData2" :formType="formType" ></form-4>
          </el-collapse-item>
          <el-collapse-item title="照片信息" name="3">
            <span><small class="title_s" v-if="formType=='edit'">注：上传单个文件不能大于2M，文件名称为：用户ID + 昵称，上传文件后需按保存按钮！</small></span>
            <form-3 title="头像" :images="images.avatarUrl" :dataForm="dataForm" :showType="formType"></form-3>
            <form-3 title="身份证正面" :images="images.idFront" :dataForm="dataForm" :showType="formType"></form-3>
            <form-3 title="身份证反面" :images="images.idObverse" :dataForm="dataForm" :showType="formType"></form-3>
          </el-collapse-item>
        </el-collapse>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import form1 from './formUserInfo.vue'
  import form2 from './formUserAcc.vue'
  import form3 from './formUserImages.vue'
  import form4 from './formUserBank.vue'

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
          if (value.length !== 11) {
            callback()
          }
          var reg = /^1[3|4|5|7|6|8][0-9]\d{8}$/
          var reg2 = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/
          if (reg2.test(value) || reg.test(value)) {
            callback()
          }
          callback(new Error('请输入正确手机号码'))
        }
      }
      var validEmail = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请正确填写邮箱'))
        } else {
          if (value !== '') {
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (!reg.test(value)) {
              callback(new Error('请输入有效的邮箱'))
            }
          }
          callback()
        }
      }
      return {
        formType: 'edit',
        activeName: '1',
        dataForm: {
          modifyPersonName: '',
          wname: ''
        },
        tableData1: [{}],
        tableData2: {},
        disabled: false,
        images: {
          avatarUrl: [
          ],
          idFront: [
          ],
          idObverse: [
          ]
        },
        ruleForm: {
        },
        rules: {
          realName: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          refName: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          mobile: [
            { required: true, validator: validPhone, trigger: 'blur' }
          ],
          email: [
            { required: true, validator: validEmail, trigger: 'blur' }
          ],
          accountType: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          brokerId: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          serverId: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          mtAccId: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          mtPasswordWatch: [
            { required: true, message: '必填项', trigger: 'blur' }
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
          id: this.dataForm.wid,
          userId: this.dataForm.wid,
          username: this.dataForm.wname
        }
        this.$api.getUserByIdOrName(params, (res) => {
          let _dataForm = res.content
          this.dataForm = _dataForm
          if (_dataForm.avatarUrl !== '') {
            this.setFileNames(1, _dataForm.avatarUrl)
          }
          if (_dataForm.idFront !== '') {
            this.setFileNames(2, _dataForm.idFront)
          }
          if (_dataForm.idObverse !== '') {
            this.setFileNames(3, _dataForm.idObverse)
          }
        })
        this.$api.getUsersMtAccountByCondition(params, (res) => {
          if (res.content !== null) {
            if (res.content.data.length > 0) {
              this.tableData1 = res.content.data
            } else {
              this.initTable1()
            }
          } else {
            this.tableData1 = [{}]
          }
        })
        params.id = ''
        let data = {
          params
        }
        this.$api.getUserBank(data, (res) => {
          if (res.content !== null) {
            this.tableData2 = res.content
          } else {
            this.initTable2()
          }
        })
      },
      setFileNames(idFlag, filePath) {
        let fileArr = filePath.split(',')
        let object = []
        for (let index = 0; index < fileArr.length; index++) {
          let fileName = fileArr[index].substring(fileArr[index].lastIndexOf('\\') + 1, fileArr[index].lastIndexOf('.'))
          let fileUrl = this.$api.getPictureDownloadUrl(fileArr[index])
          object[index] = {name: fileName, url: fileUrl}
        }
        if (idFlag === 1) {
          this.images.avatarUrl = object
        }
        if (idFlag === 2) {
          this.images.idFront = object
        }
        if (idFlag === 3) {
          this.images.idObverse = object
        }
      },
      handleSave(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
            let params = JSON.parse(JSON.stringify(this.dataForm))
            params.userId = this.dataForm.id
            this.tableData1[0].userId = this.dataForm.id
            this.tableData2.userId = this.dataForm.id
            params.mtAccInfo = this.tableData1[0]
            // params.idFront = this.images.IDCard1
            // params.idObverse = this.images.IDCard2
            // 保存
            this.$api.saveOrUpdateUser(params, (res) => {
              if (res.status !== 0) {
                window.alert(res.message)
                return
              }
              this.$message('操作成功！')
            })
            this.$api.saveUserMTAccount(params, (res) => {
              if (res.status !== 0) {
                window.alert(res.message)
                return
              }
              this.$message('操作成功！')
            })
            params = this.tableData2
            let data = {
              params
            }
            this.$api.saveOrUpdateUserBank(data, (res) => {
              if (res.status !== 0) {
                window.alert(res.message)
                return
              }
              this.$message('操作成功！')
            })
          } else {
            this.$message('请书写完整')
            return false
          }
        })
      },
      initTable1() {
        this.tableData1 = [
          {
            'accountType': '',
            'brokerName': '',
            'serverName': '',
            'mtAccId': '',
            'mtPasswordWatch': '',
            'mtPasswordTrade': '',
            'connectState': ''
          }
        ]
      },
      initTable2() {
        this.tableData2 = {
            'bankName': '',
            'hostName': '',
            'code': ''
          }
      },
      handleCheck(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = JSON.parse(JSON.stringify(this.dataForm))
            params.userId = this.dataForm.id
            params.mtAccInfo = this.tableData1[0]
            // 校验
            if (params.userType < 4) {
                if (params.mtAccInfo.mtPasswordTrade === undefined || params.mtAccInfo.mtPasswordTrade === null || params.mtAccInfo.mtPasswordTrade === '') {
                  // 用户需要输入交易密码
                  this.$message('请输入交易密码！')
                  return
                }
                if (params.idObverse === undefined || params.idObverse === null || params.idObverse === '') {
                  // 用户需要输入交易密码
                  this.$message('请上传照片信息！')
                  return
                }
                if (params.idFront === undefined || params.idFront === null || params.idFront === '') {
                  // 用户需要输入交易密码
                  this.$message('请上传照片信息！')
                  return
                }
              if (params.avatarUrl === undefined || params.avatarUrl === null || params.avatarUrl === '') {
                // 用户需要输入交易密码
                this.$message('请上传头像照片信息！')
                return
              }
            }
            // 提价申请
            this.$api.submitUserBinding(params, (res) => {
              if (res.status !== 0) {
                window.alert('操作失败！')
                return
              }
              this.$message(res.msg)
              this.formType = 'view'
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
        // this.createdCom()
      }
    }
  }
</script>
