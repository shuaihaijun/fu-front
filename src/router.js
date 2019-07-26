import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	saveScrollPosition: true,
	base: __dirname,
	routes: [{
			path: '/main',
			name: 'main',
			component: resolve => require(['./pages/main/index'], resolve),
			meta: {
				requireAuth: true
			}
		},
		{
			path: '/',
			name: 'login',
			component: resolve => require(['./pages/login/index'], resolve),
      meta: {
        requireAuth: false
      }
		}
	]
})
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		if (window.localStorage.getItem('nice_user')) {
      // 已登录用户 转向主页
      if (to.path === '/') {
        next({
          path: '/main'
        })
      } else {
        next()
      }
		} else {
			next({
				path: '/'
			})
		}
	} else {
		next()
	}
})

export default router
