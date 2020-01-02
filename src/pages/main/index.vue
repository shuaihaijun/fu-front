<template>
	<div class="home" id="home">
		<os-header
			@handleRole="handleRole"
			@handleExit="handleLogOut"
			:osName="osName"
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
        leftWidth: '180px',
        marginLeft: '180px',
				userInfo: {
					adminName: '用户名'
				},
				roleList: '',
				osName: '壹道守十',
				height: ''
			}
		},
		methods: {
      collapse () {
        console.log('展开')
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
				console.log(aId)
			},
			// 退出
			handleLogOut () {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        // 判断用户权限
        let params = {
          userId: userInfo.userId, // 操作用户id
          username: userInfo.username // 名称
        }
        api.getLogout(params, (res) => {
        })
        window.localStorage.removeItem('nice_user')
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
      // 初始化 menu
      // 初始化 dictionary
      this.$store.dispatch('getDictionary')
      if (window.localStorage.getItem('nice_user')) {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        this.$store.dispatch('getMenu', {userId: userInfo.userId})
      } else {
        this.$message('获取用户信息失败！')
      }
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
	/*.main_box {
		overflow: hidden;
    width: 90%;
    margin-left: 5%;
	}
  .home .main_center {
    background-color: #e7e7e7;
  }*/
	.main_left {
		height: 100%;
		width: 180px;
		float: left;
		z-index: 5;
		position: relative;
	}
</style>
