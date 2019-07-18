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
				requireAuth: false
			}
		},
		{
			path: '/',
			name: 'login',
			component: resolve => require(['./pages/login/index'], resolve)
		}
	]
})
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		if (window.localStorage.getItem('nice_user')) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		next()
	}
})

export default router
