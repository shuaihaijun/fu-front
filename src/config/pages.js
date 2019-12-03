const pages = {
  index: r => require.ensure([], () => r(require('../pages/index/'))),
  userList: r => require.ensure([], () => r(require('../pages/user/userList/'))),
  userInfo: r => require.ensure([], () => r(require('../pages/user/userInfo/'))),
  userDetail: r => require.ensure([], () => r(require('../pages/user/userInfo/userDetail/'))),
  demo: r => require.ensure([], () => r(require('../pages/demo/m1/'))),
  m1_1: r => require.ensure([], () => r(require('../pages/m1/m1_1/'))),
  m1_1_form1: r => require.ensure([], () => r(require('../pages/m1/m1_1/form1'))),
  m1_1_form2: r => require.ensure([], () => r(require('../pages/m1/m1_1/form2'))),
  m1_2: r => require.ensure([], () => r(require('../pages/m1/m1_2/'))),
  m2_1: r => require.ensure([], () => r(require('../pages/m2/m2_1/'))),
  m3_1: r => require.ensure([], () => r(require('../pages/m3/m3_1/'))),
  orderAlive: r => require.ensure([], () => r(require('../pages/order/orderAlive/'))),
  orderInfo: r => require.ensure([], () => r(require('../pages/order/orderInfo/'))),
  orderCustomer: r => require.ensure([], () => r(require('../pages/order/orderCustomer/'))),
  signalApplyNew: r => require.ensure([], () => r(require('../pages/signal/signalApply/'))),
  signalApplyCheck: r => require.ensure([], () => r(require('../pages/signal/signalCheck/'))),
  signalList: r => require.ensure([], () => r(require('../pages/signal/signalList/'))),
  agentApply: r => require.ensure([], () => r(require('../pages/agent/agentApply/'))),
  agentCheck: r => require.ensure([], () => r(require('../pages/agent/agentCheck/'))),
  agentList: r => require.ensure([], () => r(require('../pages/agent/agentList/'))),
  serverList: r => require.ensure([], () => r(require('../pages/system/server/'))),
  dictionaryList: r => require.ensure([], () => r(require('../pages/system/dictionary/'))),
  permissionResource: r => require.ensure([], () => r(require('../pages/system/permission/resource/'))),
  permissionRole: r => require.ensure([], () => r(require('../pages/system/permission/role/'))),
  permissionUserRole: r => require.ensure([], () => r(require('../pages/system/permission/userRole/')))
}

export default pages
