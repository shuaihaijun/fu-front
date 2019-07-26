import proxy from './proxy'

let xmlhttp = new window.XMLHttpRequest()
xmlhttp.open('GET', '/static/env.json', false)
xmlhttp.send()
let xmlDoc = JSON.parse(xmlhttp.response)

let _host = 'http://127.0.0.1:8080'

switch (xmlDoc.env) {
  case 'alpha':
    _host = 'http://127.0.0.1:8080'
    break
  case 'pre':
    _host = ''
    break
  case 'pro':
    _host = ''
}

module.exports = {
  //  登录
  getLogin(params, callback) {
    proxy.call(this, 'post', _host + '/admin/login', params, callback)
  },
  //  获取菜单
  getMenus(params, callback) {
    proxy.call(this, 'post', _host + '/menus', params, callback)
  },
  // /*--------------------订单接口--------------------*/
  // 获取客户交易订单
  getOrderCustomer(params, callback) {
    proxy.call(this, 'post', _host + '/orderCustomer/getOrderCustomer', params, callback)
  },
  // 获取社区订单
  getOrderAlive(params, callback) {
    proxy.call(this, 'post', _host + '/order/getMTAliveOrders', params, callback)
  },
  // 获取社区订单
  getOrders(params, callback) {
    proxy.call(this, 'post', _host + '/order/getOrders', params, callback)
  }
}
