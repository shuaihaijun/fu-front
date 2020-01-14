<template>
	<div :style="backgroundDiv" class="fu_login_beijing">
		<os-header osName="点誠" osTitle="去伪存真" :login="false"> </os-header>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="fu_ruleForm">
      <h2>
        <span class="fu_login_acc">注册账户</span>
        <a class="fu_login_goLogin" href="/">已有账号，去登录<i class="el-icon-right"></i></a>
      </h2>
      <el-form-item label="推荐码:" prop="introducer">
        <el-input v-model.number="ruleForm.introducer" placeholder="请输入推荐码" size="large" :disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="用户名:" prop="username" :required="required">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名（后期不能修改）" auto-complete="off" size="large"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password" :required="required">
        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" auto-complete="off" size="large"></el-input>
      </el-form-item>
      <el-form-item label="密码确认:" prop="password2" :required="required">
        <el-input type="password" v-model="ruleForm.password2" placeholder="请再次输入密码" auto-complete="off" size="large"></el-input>
      </el-form-item>
      <el-form-item label="昵称:" prop="refName" :required="required">
        <el-input v-model="ruleForm.refName" placeholder="请输入您的昵称" size="large"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobile" :required="required">
        <el-input v-model.number="ruleForm.mobile" placeholder="请输入手机号码" size="large"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件:" prop="email" :required="required">
        <el-input v-model="ruleForm.email" placeholder="请输入电子邮件" size="large"></el-input>
      </el-form-item>
        <el-checkbox v-model="checked">
          <label>我已阅读并接受<a @click="infoAffirm()" style="color:#0066cc" class="mzsmm">《点誠用户协议》</a></label>
        </el-checkbox>
			<el-form-item class="erp_ruleForm_btn">
			  <el-button @click="submitForm('ruleForm')" size="large">注  册</el-button>
			</el-form-item>
		</el-form>
		<div class="erp_login_bottom">© Copyright © 2020</div>
    <dialogs :visible="dialogVisible" :title="dialogTitle" :visibleButton="false" :width="dialogWidth +'px'" :top="dialogTop">
    </dialogs>

	</div>
</template>
<script>
  import api from '../../api/'
  import dialogs from './view'

  export default {
    components: {
      'dialogs': dialogs
    },
    name: 'os-right',
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
      // var stripscript = (rule, value, callback) => { // 特殊字符
      //   if (!value) {
      //     callback(new Error('必填项'))
      //   } else {
      //     value = value.replace(/[`～*~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g, '').replace(/\s/g, "");
      //     if (value.length >= 255) {
      //       callback(new Error('请勿输入非法字符!'))
      //     }
      //     callback()
      //   }
      // }
      return {
        show: false,
        LogWid: '',
        checked: false,
        readonly: false,
        formTitle: '',
        dialogVisible: false,
        dialogTitle: '更新日志',
        dialogWidth: '',
        dialogTop: '5%',
        required: true,
        disabled: true,
        backgroundDiv: {
          backgroundImage: 'url(' + require('../../assets/images/e20.gif') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
        ruleForm: {
          username: '',
          password: '',
          introducer: ''
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
					],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          refName: [
            { required: true, message: '必填项', trigger: 'blur' }
          ],
          mobile: [
            { required: true, validator: validPhone, trigger: 'blur' }
          ],
          email: [
            { required: true, validator: validEmail, trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.isChrome()
      if (this.$route.query.introducer > 0) {
        this.ruleForm.introducer = this.$route.query.introducer
        this.readonly = true
      }
    },
    methods: {
      isChrome() {
        let isChrome = navigator.userAgent.toLowerCase().match(/chrome/)
        if (!isChrome) {
          const h = this.$createElement
          this.$msgbox({
            title: '提示',
            message: h('p', { style: 'color: #f00; line-height: 24px' }, '您当前使用非Chrome 浏览器，推荐您安装 Chrome 浏览器以获得更好的体验。 '),
            showCancelButton: true,
            confirmButtonText: '下载Chrome',
            cancelButtonText: '取消'
          }).then(action => {
            window.location.href = 'http://sw.bos.baidu.com/sw-search-sp/software/e80aba170ee7c/ChromeStandalone_62.0.3202.94_Setup.exe'
          })
        }
      },
      infoAffirm() {
        setTimeout(() => {
          this.dialogVisible = true
        }, 0)
        this.dialogTitle = '点誠 免责申明'
        this.show = 'dialogs'
        this.dialogWidth = 350
        this.dialogTop = '5%'
      },
      submitForm (formName) {
        if (!this.checked) {
          window.alert('请同意条款后再提交！')
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 校验数据
            api.registered(this.ruleForm, (res) => {
              if (res.status === 0 && res.content.data !== '') {
                // 保存成功
                window.alert('保存成功！')
                this.$router.push({path: '/'})
              } else {
                window.alert(res.message)
              }
            })
          } else {
            this.$message('请书写完整')
            return false
          }
        })
      }
    }
  }
</script>
<style>
  .login_zhuce{
    text-align: center;
    padding:1% 2% 1% 1%;
    font-size:15px;
  }
	.fu_ruleForm{
		width: 420px;
    margin-left: 60%;
    margin-top: 3%;
    padding: 1% 3% 1% 0;
    border-radius: 3px;
    padding-bottom: 35px;
    background-color: #f5f7fa;
	}
	.erp_ruleForm .el-form-item{
		margin-bottom: 35px;
	}
	.erp_ruleForm_btn{
		text-align: center;
	}
  .fu_login_acc{
    font-size: 22px;
    color: #333333;
    margin-left: 5px;
  }
  .fu_login_goLogin{
    font-size: 15px;
    color: #333333;
    margin-left: 100px;
  }
	.erp_login_bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		height: 70px;
		line-height: 70px;
		background: rgba(51,51,51,.6);
		text-align: center;
		width: 100%;
		font-size:16px;
		color: #666;
	}
  .fu_dister{
    position: fixed;
  }
	.erp_ruleForm_btn .el-button{
	 width: 100%;
	 background: #b22222;
	 color: #fff;
   font-weight: bold;
	}
  .fu_login_beijing{
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    line-height: 70px;
    background: #ccc;
    text-align: center;
    width: 100%;
    font-size:16px;
    color: #666;
  }
	@media screen and (max-width:500px) {
		.erp_ruleForm{
			width: 320px;
			margin: 0 auto 0 20px;
			padding:8% 0 0 0;
		}
	}
	@media screen and (max-width:350px) {
		.erp_ruleForm{
			width: 260px;
			margin: 0 auto 0 20px;
			padding:8% 0 0 0;
		}
	}
</style>
