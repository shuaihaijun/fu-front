import {
  queryDictionaryAll
} from '../api'

export default {
// 数据字典常量
    state: {
      'dictionaryData': {}
    },
    mutations: {
      dictionaryData(state, data) {
        state.dictionaryData = data
      }
    },
    getters: {
      // 获取单位
      // getDicValue: (state) => (sign) => {
      //   console.log(sign)
      //   return state.dictionaryData.sign
      // }
      getDicValue: state => {
        return state.dictionaryData
      }
    },
    actions: {
      getDictionary({ commit }) {
        queryDictionaryAll({}, (res) => {
          let jsons = JSON.parse(res.content.data)
          commit('dictionaryData', jsons)
        })
      }
    }
}
