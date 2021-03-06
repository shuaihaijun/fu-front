import proxy from './proxy'
import store from '../store/index'

let xmlhttp = new window.XMLHttpRequest()
xmlhttp.open('GET', '/static/env.json', false)
xmlhttp.send()

// let xmlDoc = JSON.parse(xmlhttp.response)
// let _host = 'http://47.99.240.111:8088'
// let _front = 'http://my.aitoptrade.com'
// let _official = 'http://www.aitoptrade.com'
// let _host = 'http://47.96.165.40:8188'
// let _front = 'http://47.96.165.40:8080'
// let _official = 'http://47.96.165.40'
// let _host = 'http://127.0.0.1:8188'
let _host = 'http://127.0.0.1:8088'
let _front = 'http://127.0.0.1:8181'
let _official = 'http://127.0.0.1:8000'
// switch (xmlDoc.env) {
//   case 'alpha':form_topBa
//     _host = 'http://127.0.0.1:8088'
//     break
//   case 'pre':
//     _host = ''
//     break
//   case 'prod':
//     _host = 'http://172.16.207.145:8088'
// }

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
  // 获取用户推广链接
  getIntroducerloadUrl: function (introducer) {
    return _front + '/register?introducer=' + introducer
  },
  // 获取官网链接
  getOfficialUrl: function () {
    return _official
  },
  setComUrl: function (frontUrl, officialUlr) {
    if (frontUrl !== null && frontUrl !== '') {
      if (frontUrl.indexOf('http') >= 0) {
        _front = frontUrl
      } else {
        _front = 'http://' + frontUrl
      }
    }
    if (officialUlr !== null && officialUlr !== '') {
      if (officialUlr.indexOf('http') >= 0) {
        _official = officialUlr
      } else {
        _official = 'http://' + officialUlr
      }
    }
  },
  userIsAgent: function () {
    if (!window.localStorage.getItem('user_identity')) {
      return false
    }
    let userIndentity = JSON.stringify(window.localStorage.getItem('user_identity'))
    if (userIndentity.indexOf('1') >= 0) {
      return true
    }
    return false
  },
  userIsSignal: function () {
    if (!window.localStorage.getItem('user_identity')) {
      return false
    }
    let userIndentity = JSON.stringify(window.localStorage.getItem('user_identity'))
    if (userIndentity.indexOf('2') >= 0) {
      return true
    }
    return false
  },
  userIsCManager: function () {
    if (!window.localStorage.getItem('user_identity')) {
      return false
    }
    let userIndentity = JSON.stringify(window.localStorage.getItem('user_identity'))
    if (userIndentity.indexOf('3') >= 0) {
      return true
    }
    return false
  },
  userIsSManager: function () {
    if (!window.localStorage.getItem('user_identity')) {
      return false
    }
    let userIndentity = JSON.stringify(window.localStorage.getItem('user_identity'))
    if (userIndentity.indexOf('4') >= 0) {
      return true
    }
    return false
  },
  // /*---------------------用户信息---------------------*/
  //  登录
  getLogin(params, callback) {
    proxy.call(this, 'post', _host + '/admin/login', params, callback)
  },
  //  token登录
  getTokenLogin(params, callback) {
    proxy.call(this, 'post', _host + '/admin/tokenLogin', params, callback)
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
  // 用户银行卡获取
  getUserBank(params, callback) {
    proxy.call(this, 'post', _host + '/userBank/find', params, callback)
  },
  // 用户银行卡获取
  saveOrUpdateUserBank(params, callback) {
    proxy.call(this, 'post', _host + '/userBank/saveOrUpdate', params, callback)
  },
  // 用户银行卡获取
  updateUserBank(params, callback) {
    proxy.call(this, 'post', _host + '/userBank/modify', params, callback)
  },
  // 代理用户获取
  queryAgentUserList(params, callback) {
    proxy.call(this, 'post', _host + '/admin/queryAgentUserList', params, callback)
  },
  // 修改用户
  updateUserIntroducer(params, callback) {
    proxy.call(this, 'post', _host + '/admin/updateUserIntroducer', params, callback)
  },
  // 获取用户身份
  getIdentityByUserId(params, callback) {
    proxy.call(this, 'post', _host + '/admin/getIdentityByUserId', params, callback)
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
  // 移除用户MT账户校验
  mtAccRemoveCheck(params, callback) {
    proxy.call(this, 'post', _host + '/accountMt/mtAccRemoveCheck', params, callback)
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
  // 管理员执行佣金提取
  commissonWithdrawTake(params, callback) {
    proxy.call(this, 'post', _host + '/account/Withdraw/commissonWithdraw', params, callback)
  },
  // 佣金提取流水查询
  commissonWithdrawQuery(params, callback) {
    proxy.call(this, 'post', _host + '/account/Withdraw/commissonWithdrawQuery', params, callback)
  },
  // 佣金提取申请保存
  commissonWithdrawApplySave(params, callback) {
    proxy.call(this, 'post', _host + '/account/Withdraw/commissonWithdrawApplySave', params, callback)
  },
  // 佣金提取申请提交
  commissonWithdrawApplySubmit(params, callback) {
    proxy.call(this, 'post', _host + '/account/Withdraw/commissonWithdrawApplySubmit', params, callback)
  },
  // 佣金提取申请审核
  commissonWithdrawApplyCheck(params, callback) {
    proxy.call(this, 'post', _host + '/account/Withdraw/commissonWithdrawApplyCheck', params, callback)
  },
  // 佣金提取申请查询
  commissonWithdrawApplyQuery(params, callback) {
    proxy.call(this, 'post', _host + '/account/Withdraw/commissonWithdrawApplyQuery', params, callback)
  },
  // 佣金提取申请查询
  findCommissonWithdrawApplyById(params, callback) {
    proxy.call(this, 'post', _host + '/account/Withdraw/findCommissonWithdrawApplyById', params, callback)
  },
  // 佣金提取申请修改
  commissonWithdrawApplyUpdate(params, callback) {
    proxy.call(this, 'post', _host + '/account/Withdraw/commissonWithdrawApplyUpdate', params, callback)
  },
  // 佣金提取申请删除
  commissonWithdrawApplyDelete(params, callback) {
    proxy.call(this, 'post', _host + '/account/Withdraw/commissonWithdrawApplyDelete', params, callback)
  },
  // /*--------------------订单接口--------------------*/
  // 获取客户交易订单
  getOrderCustomer(params, callback) {
    proxy.call(this, 'post', _host + '/orderCustomer/getOrderCustomer', params, callback)
  },
  // 获取客户交易订单
  querySignalOrder(params, callback) {
    proxy.call(this, 'post', _host + '/orderSignal/querySignalOrder', params, callback)
  },
  // 同步信号源历史交易订单
  synSignalHistoryOrder(params, callback) {
    proxy.call(this, 'post', _host + '/orderSignal/synSignalHistoryOrder', params, callback)
  },
  // 获取社区订单
  getOrderAlive(params, callback) {
    proxy.call(this, 'post', _host + '/orderCustomer/getMTAliveOrders', params, callback)
  },
  // 获取社区跟单关系
  getOrderFollowInfo(params, callback) {
    proxy.call(this, 'post', _host + '/orderFollowInfo/getOrderFollowInfo', params, callback)
  },
  // 获取社区跟单错误信息
  queryOrderFollowError(params, callback) {
    proxy.call(this, 'post', _host + '/orderFollowInfo/queryOrderFollowError', params, callback)
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
  // 根据ID 删除
  signalApplyDelete(params, callback) {
    proxy.call(this, 'post', _host + '/signalApply/deleteApply', params, callback)
  },
  // 查询信号源信息
  querySignalInfos(params, callback) {
    proxy.call(this, 'post', _host + '/signal/querySignalInfos', params, callback)
  },
  // 查询允许跟随信号源信息
  querySignalAllowed(params, callback) {
    proxy.call(this, 'post', _host + '/signal/querySignalAllowed', params, callback)
  },
  // 修改信号源状态
  signalStateUpdate(params, callback) {
    proxy.call(this, 'post', _host + '/signal/signalStateUpdate', params, callback)
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
  // 查询跟随状态
  querySignalFollowState(params, callback) {
    proxy.call(this, 'post', _host + '/signal/querySignalFollowState', params, callback)
  },
  // 查询跟随信息
  getSignalFollowByCondition(params, callback) {
    proxy.call(this, 'post', _host + '/signal/getSignalFollowByCondition', params, callback)
  },
  // 初始化信号源订单信息
  initSignalHistoryOrder(params, callback) {
    proxy.call(this, 'post', _host + '/signal/initSignalHistoryOrder', params, callback)
  },
  // 查询跟随权限
  querySignalPermit(params, callback) {
    proxy.call(this, 'post', _host + '/signal/signalPermit/querySignalPermit', params, callback)
  },
  saveSignalPermit(params, callback) {
    proxy.call(this, 'post', _host + '/signal/signalPermit/saveSignalPermit', params, callback)
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
  serverSlaveSaveOrUpdate(params, callback) {
    proxy.call(this, 'post', _host + '/comServer/slaveSaveOrUpdate', params, callback)
  },
  getSlaveByServerName(params, callback) {
    proxy.call(this, 'post', _host + '/comServer/getSlaveByServerName', params, callback)
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
  getAgentById(params, callback) {
    proxy.call(this, 'post', _host + '/agent/getAgentById', params, callback)
  },
  // /*---------------------权限信息----资源-----------------*/
  //  获取菜单
  getMenus(params, callback) {
    proxy.call(this, 'post', _host + '/menus', params, callback)
  },
  // 项目工程
  savePermissionProject(params, callback) {
    proxy.call(this, 'post', _host + '/permission/project/save', params, callback)
  },
  queryPermissionProject(params, callback) {
    proxy.call(this, 'post', _host + '/permission/project/queryPage', params, callback)
  },
  getPermissionProject(params, callback) {
    proxy.call(this, 'post', _host + '/permission/project/queryDetail', params, callback)
  },
  modifyPermissionProject(params, callback) {
    proxy.call(this, 'post', _host + '/permission/project/modify', params, callback)
  },
  deletePermissionProject(params, callback) {
    proxy.call(this, 'post', _host + '/permission/project/remove', params, callback)
  },
  getPermissionProjectByCondition(params, callback) {
    proxy.call(this, 'post', _host + '/permission/project/queryDetailByCondition', params, callback)
  },
  queryComNetByCondition(params, callback) {
    proxy.call(this, 'post', _host + '/permission/project/queryComNetByCondition', params, callback)
  },
  // 项目工程管理员
  addPermissionAdmin(params, callback) {
    proxy.call(this, 'post', _host + '/permission/admin/addPermissionAdmin', params, callback)
  },
  queryPermissionAdmin(params, callback) {
    proxy.call(this, 'post', _host + '/permission/admin/queryPermissionAdmin', params, callback)
  },
  removePermissionAdmin(params, callback) {
    proxy.call(this, 'post', _host + '/permission/admin/removePermissionAdmin', params, callback)
  },
  // 项目工程资源
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
