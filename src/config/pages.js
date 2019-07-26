const pages = {
  index: r => require.ensure([], () => r(require('../pages/index/'))),
  demo: r => require.ensure([], () => r(require('../pages/demo/m1/'))),
  m1_1: r => require.ensure([], () => r(require('../pages/m1/m1_1/'))),
  m1_1_form1: r => require.ensure([], () => r(require('../pages/m1/m1_1/form1'))),
  m1_1_form2: r => require.ensure([], () => r(require('../pages/m1/m1_1/form2'))),
  m1_2: r => require.ensure([], () => r(require('../pages/m1/m1_2/'))),
  m2_1: r => require.ensure([], () => r(require('../pages/m2/m2_1/'))),
  m3_1: r => require.ensure([], () => r(require('../pages/m3/m3_1/'))),
  orderAlive: r => require.ensure([], () => r(require('../pages/order/orderAlive/'))),
  orderInfo: r => require.ensure([], () => r(require('../pages/order/orderInfo/'))),
  orderCustomer: r => require.ensure([], () => r(require('../pages/order/orderCustomer/')))
}

export default pages
