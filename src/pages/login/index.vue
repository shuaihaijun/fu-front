<template>
	<div>
		<os-header osName="全球第一帅 泰国旅行 谨慎行事！" :login="false"> </os-header>
    <li class="login_zhuce"><a @click="userNew()">用户注册</a> &nbsp;&nbsp;&nbsp; <a onclick="alert('请联系管理员找回！')">密码找回</a></li>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="erp_ruleForm">
			<el-form-item label="用户名:" prop="userName">
			  <el-input v-model.number="ruleForm.username" size="large"></el-input>
			</el-form-item>
			<el-form-item label="密码:" prop="pass">
			  <el-input type="password" v-model="ruleForm.password" auto-complete="off" size="large"></el-input>
			</el-form-item>
			<el-form-item class="erp_ruleForm_btn">

			  <el-button @click="submitForm()" size="large">登  录</el-button>
			</el-form-item>
		</el-form>
		<div class="erp_login_bottom">© Copyright © 2019</div>

    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :title="formTitle"></forms>

	</div>
</template>
<script>
  import api from '../../api/'
  import forms from './form'

  export default {
    components: {
      'forms': forms
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
        formVisible: false,
        formTitle: '',
        disabled: true,
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
      userNew() {
        this.LogWid = ''
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.formTitle = '用户注册'
        this.show = 'forms'
        this.disabled = false
      },
      submitForm () {
        // /*用户名密码格式校验*/
       // /*调用后台接口*/
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
    text-align: right;
    padding:1% 2% 1% 1%;
    font-size:16px;
  }
	.erp_ruleForm{
		width: 420px;
		margin: 0 auto;
		padding:8% 0 0 0;
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
		background: #ccc;
		text-align: center;
		width: 100%;
		font-size:16px;
		color: #666;
	}
	.erp_ruleForm_btn .el-button{
	 width: 100%;
	 background: #d93220;
	 color: #fff;
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
