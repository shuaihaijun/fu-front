import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import { Message } from 'element-ui'
Vue.use(VueAxios, axios)

/**
 * 封装axios的通用请求
 * @param  {string}   type        get\post\put\delete
 * @param  {string}   url         请求的接口URL
 * @param  {object}   params      传的参数，没有则传空对象
 * @param  {Function} callback    回调函数
 */
const proxy = (type, url, params, callback, version) => {
  let datas = {}
  let _token = ''
  if (window.localStorage.getItem('wtc_token')) {
    _token = window.localStorage.getItem('wtc_token')
  }
  if (type === 'post') {
    datas = {
      url: url,
      method: 'post',
      headers: {'Content-Type': 'application/json;charset=UTF-8', 'token': _token},
      transformRequest: [function(params) {
        return params
      }],
      data: JSON.stringify(params)
    }
    console.log(datas)
  }

  if (type === 'get') {
    datas = {
      url: url,
      method: type,
      transformRequest: [(params) => {
        return qs.stringify(params)
      }],
      params: params
    }
  }
  // 上传文件
  if (type === 'file') {
    datas = {
      url: url,
      method: 'post',
      headers: {'Content-Type': 'application/json;charset=UTF-8', 'token': _token},
      data: params
    }
  }

  axios(datas).then((res) => {
    if (res.data.code !== 200) {
      Message('code：' + res.data.code + '，' + res.data.message)
    }
    console.log(res.data)
    callback(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
axios.interceptors.response.use(
  response => {
      return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
        console.log('400')
        break
        case 401:
        console.log('401')
      }
    }
  return Promise.reject(error.response.data)
})

module.exports = proxy
