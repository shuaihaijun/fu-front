import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menu.js'
import tab from './tab'

import common from './modules/common'
import m1 from './modules/m1'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
		menu,
    tab,
    m1
  }
})
