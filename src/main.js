import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import store from './store'
import router from './router.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/ico.css'
import './assets/css/ui.css'
import './assets/css/w.css'
import components from './components/'
import com from './pages/common/com.js'
import './icons'
import api from './api/'
import {tableToExcel, exportExcelApi} from './components/exportExcel.js'

Vue.prototype.$api = api
Vue.prototype.$exportExcel = tableToExcel
Vue.prototype.$exportExcelApi = exportExcelApi

Vue.use(ElementUI, { size: 'mini' })
// 注册component组件
components.map(component => {
  Vue.component(component.name, component)
})
Vue.config.errorHandler = function (err, vm, info) {
  console.log(info, vm, err)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  com,
  template: '<App/>',
  components: { App }
})
