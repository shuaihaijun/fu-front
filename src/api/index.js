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
  // /*---------------------公共接口---------------------*/
  // 用户图片上传接口
  getPictureUploadUrl: function () {
    return _host + '/com/uploadPicture'
  },
  // /*---------------------用户信息---------------------*/
  //  登录
  getLogin(params, callback) {
    proxy.call(this, 'post', _host + '/admin/login', params, callback)
  },
  // 注册
  registered(params, callback) {
    proxy.call(this, 'post', _host + '/admin/registered', params, callback)
  },
  // 修改
  saveOrUpdateUser(params, callback) {
    proxy.call(this, 'post', _host + '/admin/saveOrUpdateUser', params, callback)
  },
  // 用户列表
  queryUserList(params, callback) {
    proxy.call(this, 'post', _host + '/admin/queryUserList', params, callback)
  },
  // 用户详情
  getUserByIdOrName(params, callback) {
    proxy.call(this, 'post', _host + '/admin/getUserByIdOrName', params, callback)
  },
  // /*---------------------账户信息 MT账户---------------------*/
  // 获取MT账户信息
  getUserMtAccountByCondition(params, callback) {
    proxy.call(this, 'post', _host + '/account/getUserMtAccountByCondition', params, callback)
  },
  // 获取MT账户信息
  getUsersMtAccountByCondition(params, callback) {
    proxy.call(this, 'post', _host + '/account/getUsersMtAccountByCondition', params, callback)
  },
  // 保存MT账户信息
  saveUserMTAccount(params, callback) {
    proxy.call(this, 'post', _host + '/account/saveUserMTAccount', params, callback)
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
  },
  // /*---------------------信号源---------------------*/
  // 保存信号源信息
  saveSignalApply(params, callback) {
    proxy.call(this, 'post', _host + '/signalApply/saveApply', params, callback)
  },
  // 提交申请
  submitSignalApply(params, callback) {
    proxy.call(this, 'post', _host + '/signalApply/submitApply', params, callback)
  },
  // 提交审核
  reviewProductSignal(params, callback) {
    proxy.call(this, 'post', _host + '/signalApply/reviewProductSignal', params, callback)
  },
  // 查询信号源信息
  getSignalApply(params, callback) {
    proxy.call(this, 'post', _host + '/signalApply/findApply', params, callback)
  },
  // 根据ID 查询信号源信息
  getSignalApplyById(params, callback) {
    proxy.call(this, 'post', _host + '/signalApply/findApplyById', params, callback)
  },
  // 根据ID 修改信号源信息
  signalApplySaveOrUpdate(params, callback) {
    proxy.call(this, 'post', _host + '/signalApply/saveOrUpdate', params, callback)
  },
  // /*---------------------数据字典---------------------*/
  // 保存数据字典信息
  saveDictionary(params, callback) {
    proxy.call(this, 'post', _host + '/dictionary/saveDictionary', params, callback)
  },
  queryDictionary(params, callback) {
    proxy.call(this, 'post', _host + '/dictionary/queryDictionary', params, callback)
  },
  getDictionaryById(params, callback) {
    proxy.call(this, 'post', _host + '/dictionary/getDictionaryById', params, callback)
  },
  deleteDictionary(params, callback) {
    proxy.call(this, 'post', _host + '/dictionary/deleteDictionary', params, callback)
  },
  // /*---------------------服务器信息---------------------*/
  // 保存数据字典信息
  queryServer(params, callback) {
    proxy.call(this, 'post', _host + '/comServer/queryComServer', params, callback)
  },
  saveServer(params, callback) {
    proxy.call(this, 'post', _host + '/comServer/saveComServer', params, callback)
  },
  updateComServer(params, callback) {
    proxy.call(this, 'post', _host + '/comServer/updateComServer', params, callback)
  },
  deleteServer(params, callback) {
    proxy.call(this, 'post', _host + '/comServer/deleteServer', params, callback)
  },
  findServerById(params, callback) {
    proxy.call(this, 'post', _host + '/comServer/findComServerById', params, callback)
  },
  // /*---------------------代理信息---------------------*/
  queryAgentApply(params, callback) {
    proxy.call(this, 'post', _host + '/agent/queryAgentApply', params, callback)
  },
  saveAgentApply(params, callback) {
    proxy.call(this, 'post', _host + '/agent/saveAgentApply', params, callback)
  },
  getAgentApplyById(params, callback) {
    proxy.call(this, 'post', _host + '/agent/getAgentApplyById', params, callback)
  },
  deleteAgentApply(params, callback) {
    proxy.call(this, 'post', _host + '/agent/deleteAgentApply', params, callback)
  },
  updateAgentApply(params, callback) {
    proxy.call(this, 'post', _host + '/agent/updateAgentApply', params, callback)
  },
  submitAgentApply(params, callback) {
    proxy.call(this, 'post', _host + '/agent/submitAgentApply', params, callback)
  },
  reviewAgentApply(params, callback) {
    proxy.call(this, 'post', _host + '/agent/reviewAgentApply', params, callback)
  },
  // /*---------------------权限信息----资源-----------------*/
  //  获取菜单
  getMenus(params, callback) {
    proxy.call(this, 'post', _host + '/menus', params, callback)
  },
  savePermissionResource(params, callback) {
    proxy.call(this, 'post', _host + '/permission/resource/save', params, callback)
  },
  queryPermissionResource(params, callback) {
    proxy.call(this, 'post', _host + '/permission/resource/queryPage', params, callback)
  },
  getPermissionResource(params, callback) {
    proxy.call(this, 'post', _host + '/permission/resource/queryDetail', params, callback)
  },
  deletePermissionResource(params, callback) {
    proxy.call(this, 'post', _host + '/permission/resource/remove', params, callback)
  },
  modifyPermissionResource(params, callback) {
    proxy.call(this, 'post', _host + '/permission/resource/modify', params, callback)
  },
  // /*---------------------权限信息----角色-----------------*/
  savePermissionRole(params, callback) {
    proxy.call(this, 'post', _host + '/permission/role/save', params, callback)
  },
  modifyPermissionRole(params, callback) {
    proxy.call(this, 'post', _host + '/permission/role/modify', params, callback)
  },
  removePermissionRole(params, callback) {
    proxy.call(this, 'post', _host + '/permission/role/remove', params, callback)
  },
  queryPagePermissionRole(params, callback) {
    proxy.call(this, 'post', _host + '/permission/role/queryPage', params, callback)
  },
  queryDetailPermissionRole(params, callback) {
    proxy.call(this, 'post', _host + '/permission/role/queryDetail', params, callback)
  },
  // /*---------------------权限信息----角色资源-----------------*/
  savePermissionRoleResource(params, callback) {
    proxy.call(this, 'post', _host + '/permission/roleResource/save', params, callback)
  },
  removePermissionRoleResource(params, callback) {
    proxy.call(this, 'post', _host + '/permission/roleResource/remove', params, callback)
  },
  queryPagePermissionRoleResource(params, callback) {
    proxy.call(this, 'post', _host + '/permission/roleResource/queryPage', params, callback)
  },
  // /*---------------------权限信息----用户角色-----------------*/
  queryPermissionUserRole(params, callback) {
    proxy.call(this, 'post', _host + '/permission/userRole/query', params, callback)
  },
  savePermissionUserRole(params, callback) {
    proxy.call(this, 'post', _host + '/permission/userRole/save', params, callback)
  },
  removePermissionUserRole(params, callback) {
  proxy.call(this, 'post', _host + '/permission/userRole/remove', params, callback)
  }
}
