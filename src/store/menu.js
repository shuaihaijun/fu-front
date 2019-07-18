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
      console.log(_env)
//    var _env = 'development'
      if (_env === 'production' || _env === 'development') {
        api.getMenus(data, res => {
          if (res.result.result === null) {
            console.log('无菜单权限')
            commit('menuData', [])
            return
          }
          window.sessionStorage.setItem('wtc_menuList', JSON.stringify(res.result.result))
          if (res.result.result !== null) {
            let _menu = res.result.result[0].menuArray
            let _arr = _menu.map(item => {
              return {
                id: item.menu_id,
                pid: item.menu_pid,
                name: item.menu_name,
                ico: item.ico_view,
                url: item.per_action,
                control: item.per_controller,
                remark: item.remark,
                children: item.menuArray.map(item => {
                  return {
                    id: item.menu_id,
                    pid: item.menu_pid,
                    name: item.menu_name,
                    ico: item.ico_view,
                    url: item.per_action,
                    control: item.per_controller,
                    remark: item.remark,
                    children: item.menuArray
                  }
                })
              }
            })
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
