<template>
	<div class="home" id="home">
		<os-header
			@handleRole="handleRole"
			@handleExit="handleLogOut"
			:osName="osName"
      :osTitle="osTitle"
      :osLogo="osLogo"
			:roleList="roleList">
		</os-header>
    <div class="main_center" >
      <div class="main_box" :style="{height: height}">
        <os-left menuType="B" @collapse="collapse" :leftWidth="leftWidth" :collapse="onoff"></os-left>
        <os-right :marginLeft="marginLeft"></os-right>
      </div>
    </div>
	</div>
</template>
<script>
  import api from '../../api/'
	export default {
		data() {
			return {
        onoff: false,
        leftWidth: '12%',
        marginLeft: '12%',
        // leftWidth: '180px',
        // marginLeft: '180px',
				userInfo: {
					adminName: '用户名'
				},
				roleList: '',
        osName: '',
        osTitle: '',
        osLogo: '',
				height: ''
			}
		},
		methods: {
      collapse () {
        if (this.leftWidth === '180px') {
          this.onoff = true
          this.leftWidth = '60px'
          this.marginLeft = '60px'
        } else {
          this.leftWidth = '180px'
          this.marginLeft = '180px'
          this.onoff = false
        }
      },
			// 框架高度计算
			mainHeight () {
				let _h = document.documentElement.clientHeight
        this.height = _h - 54 + 'px'
        // 页签高度
        var divHeight = document.getElementsByClassName('el-tabs__content').item(0)
        divHeight.style.height = _h - 111 + 'px'
			},
			// 切换岗位
			handleRole (aId) {
			},
      // 设置项目工程内容
      setProjectInfos () {
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          let params = {
            userId: userInfo.userId // 操作用户id
          }
          let data = {
            params
          }
          api.getPermissionProjectByCondition(data, (res) => {
            if (res.status === 0 && res.content !== null && res.content !== '') {
              this.osName = res.content.projName
              this.osTitle = res.content.projSlogan
              this.osLogo = res.content.projLogo
              api.setComUrl(res.content.projCrmRealm, res.content.projOfficialRealm)
            } else {
              window.alert('获取用户团队失败！')
            }
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      submitToken (token) {
        // /*用户名密码格式校验*/
        // /*调用后台接口*/
        if (token === null || token === '') {
          window.alert('登录已过期，请重新登录！')
          window.localStorage.removeItem('nice_user')
          this.$router.push({path: '/login'})
          return
        }
        let params = {
          token: token
        }
        let data = {
          params
        }
        api.getTokenLogin(data, this.loginRuesult)
      },
			// 退出
			handleLogOut () {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        // 判断用户权限
        let params = {
          userId: userInfo.userId, // 操作用户id
          username: userInfo.username, // 名称
          token: userInfo.token // 操作用户id
        }
        api.getLogout(params, (res) => {
        })
        this.$store.dispatch('delAllTab')
        window.localStorage.removeItem('nice_user')
        this.$router.push({path: '/login'})
			},
      // /*登录结果*/
      loginRuesult (data) {
        let result = JSON.parse(JSON.stringify(data))
        // /*解析登录结果*/
        if (result.status !== 0) {
          window.localStorage.removeItem('nice_user')
          window.alert(result.msg)
          this.$router.push({path: '/login'})
          return
        }
        if (result.content.code !== 0) {
          window.localStorage.removeItem('nice_user')
          window.alert(result.content.msg)
          this.$router.push({path: '/login'})
          return
        }
        // /*将用户信息保存*/
        window.localStorage.setItem('nice_user', JSON.stringify(data.content.data))
        this.$router.push({path: '/'})
      }
		},
		computed: {
      winHeight() {
        return document.documentElement.clientHeight
      }
    },
    watch: {
      winHeight() {
        let _h = document.documentElement.clientHeight
        this.height = _h - 54 + 'px'
        // 页签高度
        var divHeight = document.getElementsByClassName('el-tabs__content').item(0)
        divHeight.style.height = _h - 111 + 'px'
      }
    },
		mounted () {
			this.mainHeight()
			// 当窗口改变计算高度
			var me = this
			window.onresize = () => {
        me.mainHeight()
			}
		},
		created () {
      if (this.$route.query.token !== null && this.$route.query.token !== undefined) {
        this.submitToken(this.$route.query.token)
      } else if (window.localStorage.getItem('nice_user')) {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        this.submitToken(userInfo.token)
      }
      // 初始化 dictionary
      this.$store.dispatch('getDictionary')
      // 初始化 menu
      if (window.localStorage.getItem('nice_user')) {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        this.$store.dispatch('getMenu', {userId: userInfo.userId})
      } else {
        this.$message('获取用户信息失败！')
      }
      // 初始化团队信息
      this.setProjectInfos()

//    // 获取url参数为token的值并且保存本地
//    var url = window.location.search
//    if (url.indexOf('?') !== -1) {
//      var str = url.substr(1)
//      var strs = str.split('=')
//      window.localStorage.setItem('wtc_token', strs[1])
//    }
//    let params = {
//      token: window.localStorage.getItem('wtc_token')
//    }
//    this.$api.getLogin(params, (res) => {
//      console.log(res)
//      if (res.code !== 500) {
//        let _userInfo = {
//          user_id: res.result.user_id,
//          user_name: res.result.user_name
//        }
//        window.localStorage.setItem('wtc_userInfo', JSON.stringify(_userInfo))
//       this.$store.dispatch('getMenu', {user_id: res.result.user_id})
//      } else {
//        this.handleLogOut()
//      }
//    })
		}
	}
</script>
<style>
	.main_box {
		overflow: hidden;
    /*width: 94%;*/
    margin-left: 3%;
	}
  .home .main_center {
    background-color: #2b3348;
  }
	.main_left {
		height: 100%;
		width: 200px;
		float: left;
		z-index: 5;
		position: relative;
	}
</style>
