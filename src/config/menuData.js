const menuData = [{
    'id': '01',
    'pid': '01',
    'name': '用户管理',
    'ico': 'el-icon-document',
    'url': '',
    'control': '',
    'remark': '',
    'children': [{
        'id': '01-1',
        'pid': '01',
        'name': '用户列表',
        'ico': '',
        'url': 'userList',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      },
      {
        'id': '01-2',
        'pid': '02',
        'name': '待审用户',
        'ico': '',
        'url': 'userCheck',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      },
      {
        'id': '01-4',
        'pid': '04',
        'name': '用户信息',
        'ico': '',
        'url': 'userInfo',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      }
    ],
    'buttons': null
  },
  {
    'id': '02',
    'pid': '02',
    'name': '代理管理',
    'ico': 'el-icon-document',
    'url': '',
    'control': '',
    'remark': '',
    'children': [{
      'id': '02-1',
      'pid': '01',
      'name': '代理列表',
      'ico': '',
      'url': 'agentList',
      'control': '',
      'remark': '',
      'children': [],
      'buttons': null
      },
      {
        'id': '02-2',
        'pid': '02',
        'name': '代理待审',
        'ico': '',
        'url': 'agentCheck',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      },
      {
        'id': '02-3',
        'pid': '03',
        'name': '代理申请',
        'ico': '',
        'url': 'agentApply',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      }],
    'buttons': null
  },
  {
    'id': '03',
    'pid': '03',
    'name': '信号源管理',
    'ico': 'el-icon-document',
    'url': '',
    'control': '',
    'remark': '',
    'children': [{
      'id': '03-1',
      'pid': '01',
      'name': '信号源列表',
      'ico': '',
      'url': 'signalList',
      'control': '',
      'remark': '',
      'children': [],
      'buttons': null
     },
      {
      'id': '03-2',
      'pid': '02',
      'name': '信号源待审',
      'ico': '',
      'url': 'signalApplyCheck',
      'control': '',
      'remark': '',
      'children': [],
      'buttons': null
     },
      {
      'id': '03-3',
      'pid': '03',
      'name': '信号源申请',
      'ico': '',
      'url': 'signalApplyNew',
      'control': '',
      'remark': '',
      'children': [],
      'buttons': null
     },
    {
      'id': '03-5',
      'pid': '05',
      'name': '信号源跟随',
      'ico': '',
      'url': 'signalFollow',
      'control': '',
      'remark': '',
      'children': [],
      'buttons': null
    }],
    'buttons': null
  },
  {
    'id': '04',
    'pid': '04',
    'name': '订单管理',
    'ico': 'el-icon-document',
    'url': '',
    'control': '',
    'remark': '',
    'children': [{
      'id': '04-1',
      'pid': '01',
      'name': '社区跟随订单',
      'ico': '',
      'url': 'orderFollow',
      'control': '',
      'remark': '',
      'children': [],
      'buttons': null
      },
      {
        'id': '04-2',
        'pid': '02',
        'name': '信号源交易订单',
        'ico': '',
        'url': 'orderSignal',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      },
      {
        'id': '04-3',
        'pid': '03',
        'name': '用户交易订单',
        'ico': '',
        'url': 'orderCustomer',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      },
      {
        'id': '04-4',
        'pid': '04',
        'name': '用户在仓订单',
        'ico': '',
        'url': 'orderAlive',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      }],
    'buttons': null
  },
  {
    'id': '08',
    'pid': '08',
    'name': '账户管理',
    'ico': 'el-icon-document',
    'url': '',
    'control': '',
    'remark': '',
    'children': [{
      'id': '08-1',
      'pid': '01',
      'name': 'MT账户管理',
      'ico': '',
      'url': 'accountMTList',
      'control': '',
      'remark': '',
      'children': [],
      'buttons': null
      },
      {
        'id': '08-2',
        'pid': '01',
        'name': '社区账户管理',
        'ico': '',
        'url': 'accountInfoList',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      }
    ],
    'buttons': null
  },
  {
    'id': '09',
    'pid': '09',
    'name': '系统管理',
    'ico': 'el-icon-document',
    'url': '',
    'control': '',
    'remark': '',
    'children': [{
      'id': '09-1',
      'pid': '01',
      'name': '服务器管理',
      'ico': '',
      'url': 'serverList',
      'control': '',
      'remark': '',
      'children': [],
      'buttons': null
     },
      {
        'id': '09-2',
        'pid': '02',
        'name': '数据字典',
        'ico': '',
        'url': 'dictionaryList',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      },
      {
        'id': '09-3',
        'pid': '03',
        'name': '权限资源管理',
        'ico': '',
        'url': 'permissionResource',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      },
      {
        'id': '09-4',
        'pid': '04',
        'name': '角色管理',
        'ico': '',
        'url': 'permissionRole',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      },
      {
        'id': '09-5',
        'pid': '05',
        'name': '用户角色关系',
        'ico': '',
        'url': 'permissionUserRole',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      }],
    'buttons': null
  },
  {
    'id': '11',
    'pid': '11',
    'name': '监控管理',
    'ico': 'el-icon-document',
    'url': '',
    'control': '',
    'remark': '',
    'children': [{
      'id': '11-1',
      'pid': '11',
      'name': '异常订单监控',
      'ico': '',
      'url': 'm3_1',
      'control': '',
      'remark': '',
      'children': [],
      'buttons': null
    }],
    'buttons': null
  },
  {
    'id': '12',
    'pid': '12',
    'name': '基础信息',
    'ico': 'el-icon-document',
    'url': '',
    'control': '',
    'remark': '',
    'children': [{
      'id': '12-1',
      'pid': '01',
      'name': '仓库基础信息',
      'ico': '',
      'url': 'm1_1',
      'control': '',
      'remark': '',
      'children': [],
      'buttons': null
      },
      {
        'id': '12-2',
        'pid': '01',
        'name': '配送批次设置',
        'ico': '',
        'url': 'm1_2',
        'control': '',
        'remark': '',
        'children': [],
        'buttons': null
      }
    ],
    'buttons': null
  },
  {
    'id': '011111',
    'pid': '01111',
    'name': 'DEMO演示',
    'ico': 'el-icon-document',
    'url': 'demo',
    'control': '',
    'remark': '',
    'children': [],
    'buttons': null
  }
]
export default menuData
