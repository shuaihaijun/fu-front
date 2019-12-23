import api from '../api/'
import menuData from '../config/menuData'

export default {
  state: {
    'menuNull': '',
    'menuData': menuData
  },
  mutations: {
    menuData(state, data) {
      state.menuData = data
    },
    menuNull(state) {
      state.menuNull = 'no'
    }
  },
  actions: {
    getMenu({
      commit
    }, data) {
      var _env = process.env.NODE_ENV
//    var _env = 'development'
      if (_env === 'production' || _env === 'test') {
        api.findRoleResourceTree(data, res => {
          if (res.content === null || res.content.data === null) {
            console.log('无菜单权限')
            commit('menuData', [])
            return
          }
          window.sessionStorage.setItem('nice_menuList', JSON.stringify(res.content.data))
          if (res.content.data !== null) {
            let _menu = res.content.data[0].children
            let _arr = api.buildTree(_menu)
            commit('menuData', _arr)
          } else {
            console.log('无权限')
            commit('menuNull')
          }
        })
      } else {
        console.log('启用本地菜单')
        commit('menuData', menuData)
      }
    }
  }
}
