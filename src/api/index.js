import proxy from './proxy'
import store from '../store/index'

let xmlhttp = new window.XMLHttpRequest()
xmlhttp.open('GET', '/static/env.json', false)
xmlhttp.send()
let xmlDoc = JSON.parse(xmlhttp.response)

let _host = 'http://127.0.0.1:8088'
// let _host = 'http://172.16.207.145:8088'
// let _host = 'http://47.96.165.40:8088'

switch (xmlDoc.env) {
  case 'alpha':
    _host = 'http://127.0.0.1:8088'
    break
  case 'pre':
    _host = ''
    break
  case 'prod':
    _host = 'http://172.16.207.145:8088'
}

module.exports = {
  // /*---------------------公共接口---------------------*/
  // 数据字典获取值
  getDicValue: function (dicSign, dicKey) {
    let dic = store.state.dictionary.dictionaryData

    if (dic[dicSign]) {
      if (dicKey === null || dicKey === undefined || dicKey === '') {
        return ''
      }
      let key = dicKey
      for (let index = 0; index < dic[dicSign].length; index++) {
        if (key === dic[dicSign][index]['dicKey']) {
          return dic[dicSign][index]['dicValue']
        }
      }
    }
    return ''
  },
  buildTree: function (data) {
    if (data !== null && data !== undefined && data !== 'undefined' && data.length > 0) {
      let _arr = data.map(item => {
        return {
          id: item.id,
          pid: item.resPid,
          name: item.resName,
          ico: item.resIco,
          url: item.resAction,
          control: '',
          remark: item.resDesc,
          children: this.buildTree(item.children)
        }
      })
      return _arr
    }
    return []
  },
  // 数据字典获取值
  getDicValues: function (dicSign) {
    let dic = store.state.dictionary.dictionaryData
    return dic[dicSign]
  },
  // 用户图片上传接口
  getPictureUploadUrl: function () {
    return _host + '/com/uploadPicture'
  },
  // 用户图片反显
  getPictureDownloadUrl: function (path) {
    return _host + path
  },
  // /*---------------------用户信息---------------------*/
  //  登录
  getLogin(params, callback) {
    proxy.call(this, 'post', _host + '/admin/login', params, callback)
  },
  getLogout(params, callback) {
    proxy.call(this, 'post', _host + '/admin/logout', params, callback)
  },
  // 注册
  registered(params, callback) {
    proxy.call(this, 'post', _host + '/admin/registered', params, callback)
  },
  // 修改
  saveOrUpdateUser(params, callback) {
    proxy.call(this, 'post', _host + '/admin/saveOrUpdateUser', params, callback)
  },
  // 修改
  updatePassword(params, callback) {
    proxy.call(this, 'post', _host + '/admin/updatePassword', params, callback)
  },
  // 提交审核申请
  submitUserBinding(params, callback) {
    proxy.call(this, 'post', _host + '/admin/submitUserBinding', params, callback)
  },
  // 审核用户信息
  checkUserBinding(params, callback) {
    proxy.call(this, 'post', _host + '/admin/checkUserBinding', params, callback)
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
  queryUsersMtAccount(params, callback) {
    proxy.call(this, 'post', _host + '/accountMt/queryUsersMtAccount', params, callback)
  },
  // 获取MT账户信息
  getUserMtAccountByCondition(params, callback) {
    proxy.call(this, 'post', _host + '/accountMt/getUserMtAccountByCondition', params, callback)
  },
  // 获取MT账户信息
  getUsersMtAccountByCondition(params, callback) {
    proxy.call(this, 'post', _host + '/accountMt/getUsersMtAccountByCondition', params, callback)
  },
  // 保存MT账户信息
  saveUserMTAccount(params, callback) {
    proxy.call(this, 'post', _host + '/accountMt/saveUserMTAccount', params, callback)
  },
  // 连接MT账户信息
  connectUserMTAccount(params, callback) {
    proxy.call(this, 'post', _host + '/accountMt/connectUserMTAccount', params, callback)
  },
  // 断开连接MT账户信息
  disConnectUserMTAccount(params, callback) {
    proxy.call(this, 'post', _host + '/accountMt/disConnectUserMTAccount', params, callback)
  },
  // /*---------------------账户信息 佣金账户---------------------*/
  getPageAccountCommisson(params, callback) {
    proxy.call(this, 'post', _host + '/account/CommissionInfo/getPageAccountCommisson', params, callback)
  },
  getAccountCommissonByUserId(params, callback) {
    proxy.call(this, 'post', _host + '/account/CommissionInfo/getAccountCommissonByUserId', params, callback)
  },
  getPageCommissonFlow(params, callback) {
    proxy.call(this, 'post', _host + '/account/CommissionFlow/getPageCommissonFlow', params, callback)
  },
  findCommissionCustomerByCondition(params, callback) {
    proxy.call(this, 'post', _host + '/commission/commissionCustomer/findCommissionByCondition', params, callback)
  },
  accountCommissonWithdraw(params, callback) {
    proxy.call(this, 'post', _host + '/account/CommissionInfo/accountCommissonWithdraw', params, callback)
  },
  // /*--------------------订单接口--------------------*/
  // 获取客户交易订单
  getOrderCustomer(params, callback) {
    proxy.call(this, 'post', _host + '/orderCustomer/getOrderCustomer', params, callback)
  },
  // 获取客户交易订单
  getOrderSignal(params, callback) {
    proxy.call(this, 'post', _host + '/orderSignal/getOrderSignal', params, callback)
  },
  // 获取社区订单
  getOrderAlive(params, callback) {
    proxy.call(this, 'post', _host + '/orderFollowInfo/getMTAliveOrders', params, callback)
  },
  // 获取社区订单
  getOrderFollows(params, callback) {
    proxy.call(this, 'post', _host + '/orderFollowInfo/getOrderFollows', params, callback)
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
  // 查询信号源信息
  getSignalInfos(params, callback) {
    proxy.call(this, 'post', _host + '/signal/getSignalInfos', params, callback)
  },
  // 根据信号源ID查询
  findSignalById(params, callback) {
  proxy.call(this, 'post', _host + '/signal/findSignalById', params, callback)
  },
  // 根据ID 修改信号源信息
  signalFollowsQuery(params, callback) {
    proxy.call(this, 'post', _host + '/signal/signalFollowsQuery', params, callback)
  },
  // 根据ID 修改信号源信息
  signalFollowsRemove(params, callback) {
    proxy.call(this, 'post', _host + '/signal/signalFollowsRemove', params, callback)
  },
  // 根据ID 修改信号源信息
  signalFollowsSaveOrUpdate(params, callback) {
    proxy.call(this, 'post', _host + '/signal/signalFollowsSaveOrUpdate', params, callback)
  },
  // 连接MT账户信息
  connectSignalMTAccount(params, callback) {
    proxy.call(this, 'post', _host + '/accountMt/connectSignalMTAccount', params, callback)
  },
  // 断开连接MT账户信息
  disConnectSignalMTAccount(params, callback) {
    proxy.call(this, 'post', _host + '/accountMt/disConnectSignalMTAccount', params, callback)
  },
  // /*---------------------数据字典---------------------*/
  // 保存数据字典信息
  saveDictionary(params, callback) {
    proxy.call(this, 'post', _host + '/dictionary/saveDictionary', params, callback)
  },
  queryDictionary(params, callback) {
    proxy.call(this, 'post', _host + '/dictionary/queryDictionary', params, callback)
  },
  queryDictionaryAll(params, callback) {
    proxy.call(this, 'post', _host + '/dictionary/queryDictionaryAll', params, callback)
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
  // /*---------------------经纪商信息--------------------*/
  saveComBroker(params, callback) {
    proxy.call(this, 'post', _host + '/comBroker/saveComBroker', params, callback)
  },
  queryComBroker(params, callback) {
    proxy.call(this, 'post', _host + '/comBroker/queryComBroker', params, callback)
  },
  findComBrokerById(params, callback) {
    proxy.call(this, 'post', _host + '/comBroker/findComBrokerById', params, callback)
  },
  deleteComBroker(params, callback) {
    proxy.call(this, 'post', _host + '/comBroker/deleteComBroker', params, callback)
  },
  // /*---------------------代理信息---------------------*/
  queryAgent(params, callback) {
  proxy.call(this, 'post', _host + '/agent/queryAgent', params, callback)
},
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
  findResourceTree(params, callback) {
    proxy.call(this, 'post', _host + '/permission/resource/findResourceTree', params, callback)
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
  findResIdsByRoleId(params, callback) {
    proxy.call(this, 'post', _host + '/permission/roleResource/findResIdsByRoleId', params, callback)
  },
  findRoleResourceTree(params, callback) {
    proxy.call(this, 'post', _host + '/permission/roleResource/findRoleResourceTree', params, callback)
  },
  // /*---------------------权限信息----用户角色-----------------*/
  queryPermissionUserRole(params, callback) {
    proxy.call(this, 'post', _host + '/permission/userRole/queryUserRole', params, callback)
  },
  savePermissionUserRole(params, callback) {
    proxy.call(this, 'post', _host + '/permission/userRole/save', params, callback)
  },
  removePermissionUserRole(params, callback) {
  proxy.call(this, 'post', _host + '/permission/userRole/remove', params, callback)
  },
  // /*---------------------佣金----佣金规则-----------------*/
  getPageCommissonLevel(params, callback) {
    proxy.call(this, 'post', _host + '/commission/commissionLevel/getPageCommissonLevel', params, callback)
  },
  getCommissonLevelById(params, callback) {
    proxy.call(this, 'post', _host + '/commission/commissionLevel/getCommissonLevelById', params, callback)
  },
  saveCommissonLevel(params, callback) {
    proxy.call(this, 'post', _host + '/commission/commissionLevel/saveCommissonLevel', params, callback)
  },
  upateCommissonLevel(params, callback) {
    proxy.call(this, 'post', _host + '/commission/commissionLevel/upateCommissonLevel', params, callback)
  },
  deleteCommissonLevelById(params, callback) {
    proxy.call(this, 'post', _host + '/commission/commissionLevel/deleteCommissonLevelById', params, callback)
  }
}
