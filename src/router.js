import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	saveScrollPosition: true,
	base: __dirname,
	routes: [{
			path: '/',
			name: 'main',
			component: resolve => require(['./pages/main/index'], resolve),
			meta: {
				requireAuth: true
			}
		},
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['./pages/register/index'], resolve),
      meta: {
        requireAuth: false
      }
    },
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['./pages/login/index'], resolve),
      meta: {
        requireAuth: true
      }
		}
	]
})
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		if (window.localStorage.getItem('nice_user')) {
      // 已登录用户 转向主页
      if (to.path === '/login') {
        next({
          path: '/'
        })
      } else {
        next()
      }
		} else {
      if (to.path === '/login') {
        next()
      } else {
        next({
          path: '/login'
        })
      }
		}
	} else {
		next()
	}
})

export default router
