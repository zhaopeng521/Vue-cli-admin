import Vue from 'vue'
import axios from 'axios'

import { MessageBox, Message ,Loading} from 'element-ui'
import store from '@/store'

import { getToken } from '@/utils/auth'

let loading        //定义全局loading变量

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: '', // url = base url + request url

  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    showFullScreenLoading()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    tryHideFullScreenLoading()
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    tryHideFullScreenLoading()
    // if the custom code is not 20000, it is judged as an error.
    if(!res.code){ // 导出时用到
      return response;
    }
    if (res.code !== '0000') {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if(res.code == '9999'){
        return res;
      }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code == 50000 || res.code === 50012 || res.code === 50014) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
