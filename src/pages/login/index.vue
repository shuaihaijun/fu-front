<template>
	<div :style="backgroundDiv" class="fu_login_beijing">
		<os-header osName="点誠 精诚所至！" :login="false"> </os-header>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="erp_ruleForm">
			<el-form-item label="用户名:" prop="userName">
			  <el-input v-model.number="ruleForm.username" placeholder="请输入您的用户名" size="large"></el-input>
			</el-form-item>
			<el-form-item label="密码:" prop="pass">
			  <el-input type="password" v-model="ruleForm.password" placeholder="请输入您的密码"
                  @keyup.enter.native="submitForm()" auto-complete="off" size="large"></el-input>
			</el-form-item>

			<el-form-item class="erp_ruleForm_btn">
          <el-checkbox v-model="checked">
            <label>我已阅读并接受<a @click="infoAffirm()" style="color:#0066cc" class="mzsmm">《点誠用户协议》</a></label>
          </el-checkbox>
			  <el-button @click="submitForm()" size="large">登  录</el-button>
          <a class="login_zhuce" href="/register">用户注册</a> &nbsp;&nbsp;&nbsp;
          <a onclick="alert('请联系管理员找回！')">密码找回</a>
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
      var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'))
        }
        callback()
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
        callback()
     }
      return {
        show: false,
        LogWid: '',
        checked: true,
        formTitle: '',
        dialogVisible: false,
        dialogTitle: '更新日志',
        dialogWidth: '',
        dialogTop: '5%',
        disabled: true,
        backgroundDiv: {
          // backgroundImage: 'url(' + require('../../assets/images/860.gif') + ')',
          backgroundImage: 'url(' + require('../../assets/images/e20.gif') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
						{ validator: checkUser, trigger: 'blur' }
					],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.isChrome()
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
      userNew() {
        this.$router.push({path: '/register'})
      },
      submitForm () {
        // /*用户名密码格式校验*/
       // /*调用后台接口*/
        if (!this.checked) {
          window.alert('请同意条款后再登录！')
          return
        }
        api.getLogin(this.ruleForm, this.loginRuesult)
      },
      // /*登录结果*/
      loginRuesult (data) {
        let result = JSON.parse(JSON.stringify(data))
        // /*解析登录结果*/
        if (result.status !== 0) {
          window.alert(result.msg)
          return
        }
        if (result.content.code !== 0) {
          window.alert(result.content.msg)
          return
        }
        // /*将用户信息保存*/
        window.localStorage.setItem('nice_user', JSON.stringify(data.content.data))
        this.$router.push({path: '/main'})
      }
    }
  }
</script>
<style>
  .login_zhuce{
    text-align: center;
    padding:5% 2% 1% 1%;
    font-size:15px;
  }
	.erp_ruleForm{
		width: 420px;
    margin-left: 60%;
    margin-top: 10%;
    padding: 4% 4% 1% 0;
    border-radius: 5px;
    background-color: #f5f7fa;
	}
	.erp_ruleForm .el-form-item{
		margin-bottom: 35px;
	}
	.erp_ruleForm_btn{
		text-align: center;
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
  .fu_login_acc{
    font-size: 22px;
    color: #333333;
    margin-left: 5px;
  }
  .fu_login_goLogin{
    font-size: 15px;
    color: #333333;
    margin-left: 150px;
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
