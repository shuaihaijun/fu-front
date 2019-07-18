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
console.log(xmlDoc.env)

module.exports = {
  //  登录
  getLogin(params, callback) {
    proxy.call(this, 'post', _host + '/admin/login', params, callback)
  },
  //  获取菜单
  getMenus(params, callback) {
    proxy.call(this, 'post', _host + '/menus', params, callback)
  }
}
