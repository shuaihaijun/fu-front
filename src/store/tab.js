import { MessageBox } from 'element-ui'

export default {
	state: {
		listData: [
			{
				id: '1',
				title: '首页',
				name: '1',
				component: 'index'
			}
		],
		lastIndex: '1',
		currentTab: '1',
		menuId: '',
		uid: {}
	},
	mutations: {
		tabCurrent(state, data) {
			state.currentTab = data
		},
		tabAdd(state, data) {
			state.uid = data.uid
			var arr = state.listData
			var _tabIndex = JSON.stringify(parseInt(state.lastIndex) + 1)
			var tabs
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].id === data.id) {
					tabs = true
					state.currentTab = arr[i].name
					state.indexData = arr[i].name
					state.menuId = arr[i].id
					break
				}
			}
			if (!tabs) {
				if (state.listData.length === 15) {
          MessageBox.confirm('您打开的页签太多了，请节约资源关闭不用的页签？', '友情提示', {
            type: 'warning'
          })
				} else {
					state.lastIndex = JSON.stringify(parseInt(state.lastIndex) + 1)
					let _data = {
						id: data.id,
						title: data.name,
						name: state.lastIndex,
						component: data.url
					}
					state.indexData = _tabIndex
					state.currentTab = _tabIndex
					state.listData.push(_data)
					state.menuId = _data.id
				}
			}
		},
		tabDel(state, data) {
			var currentName = ''
			let tabs = state.listData
			if (typeof data === 'object' && !!data.id) {
				let id = data.id
				for (let index = 0; index < tabs.length; index++) {
					let tab = tabs[index]
					if (id + '' === tab.id) {
						currentName = tab.name
						break
					}
				}
			} else {
				currentName = data
			}
			if (currentName === state.currentTab) {
				for (let index = 0; index < tabs.length; index++) {
					let tab = tabs[index]
					if (currentName === tab.name) {
						let nextTab = tabs[index + 1] || tabs[index - 1]
						if (nextTab) {
							state.currentTab = nextTab.name
						} else {
							state.currentTab = JSON.stringify(index)
						}
					state.listData.splice(index, 1)
					}
				}
			} else {
				if (typeof data === 'string') {
					for (let index = 0; index < tabs.length; index++) {
						let tab = tabs[index]
						if (data === tab.name) {
							state.listData.splice(index, 1)
						}
					}
				} else if (typeof data === 'object') {
					for (let index = 0; index < tabs.length; index++) {
						let tab = tabs[index]
						if (data.id + '' === tab.id) {
							state.listData.splice(index, 1)
						}
					}
				}
			}
		},
		tabDelAll(state) {
      state.listData = [{
        id: '1',
        title: '首页',
        name: '1',
        component: 'index'
      }]
      state.lastIndex = '1'
      state.currentTab = '1'
      state.menuId = ''
    }
	},
	actions: {
		currentTab({commit}, data) {
			commit('tabCurrent', data)
		},
		addTab({commit}, data) {
			commit('tabAdd', data)
		},
		delTab({commit}, data) {
			commit('tabDel', data)
		},
		delAllTab({commit}, data) {
      commit('tabDelAll')
    }
	}
}
