import Vue from 'vue'

Vue.mixin({
	data() {
		return {
      topWidth: '',
      userID: '',
      flag: false,
      queryFormHeight: '',
      pageDataTotal: 0,
      pageDataNum: 1,
      pageDataSize: 30,
      pageshow: true,
      UsInfo: JSON.parse(window.localStorage.getItem('nice_user')) || {},
      IsBtn1: false,
      IsBtn2: false,
      IsBtn3: false,
      IsBtn4: false
		}
	},
  created () {
    let pid = window.sessionStorage.getItem('wtc_menuId')
    let menuList = JSON.parse(window.sessionStorage.getItem('wtc_menuList'))
    if (menuList === null) {
      return
    }
    for (var m1 of menuList[0].menuArray) {
      for (var mm1 of m1.menuArray) {
        if (mm1.menuArray.length === 0) {
          for (var mp of mm1.perArray) {
            if (mp.per_action === 'IsBtn1' && mp.per_parentid === Number(pid)) {
              this.IsBtn1 = true
            }
            if (mp.per_action === 'IsBtn2' && mp.per_parentid === Number(pid)) {
              this.IsBtn2 = true
            }
            if (mp.per_action === 'IsBtn3' && mp.per_parentid === Number(pid)) {
              this.IsBtn3 = true
            }
            if (mp.per_action === 'IsBtn4' && mp.per_parentid === Number(pid)) {
              this.IsBtn4 = true
            }
          }
        }
      }
    }
  },
	mounted () {
    // let _w = document.body.clientWidth
    // this.topWidth = _w - 221 + 'px'
    this.topWidth = '80%'
  },
	methods: {
	},
	computed: {
	}
})
