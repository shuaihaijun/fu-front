export default {
	state: {
		userData: JSON.parse(window.localStorage.getItem('os_user')) || ''
	},
	mutations: {
		userData(state, data) {
			state.userData = data
		},
		keyState(state, data) {
      state.keyState = data
    }
	},
	actions: {
		userData({commit}, data) {
			commit('userData', data)
		},
		keyState({commit}, data) {
      commit('keyState', data)
    }
	}
}
