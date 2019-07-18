export default {
  state: {
    m1_list_state: 0,
    m1_form_state: 0
  },
  mutations: {
    m1_list_state(state, data) {
      state.m1_list_state = data
    },
    m1_form_state(state, data) {
      state.m1_form_state = data
    }
  },
  actions: {
    m1_list_state({commit}, data) {
      commit('m1_list_state', data)
    },
    m1_form_state({commit}, data) {
      commit('m1_form_state', data)
    }
  }
}
