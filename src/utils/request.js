import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import { getToken } from '@/utils/storage'


if (process.env.NODE_ENV !== 'development') {
  // 非开发模式  禁用调console
  window.console.log = () => { }
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  error => {
    console.log(error) // for debug
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
    // 判断各种情况
    if (res.code === 100 || res.code === 102 || res.code === 103 || res.code === 402 || res.code === 406) {
      Message({
        message: res.msg,
        type: 'warning',
        duration: 5 * 1000
      })
      setTimeout(() => {
        location.href = res.data
      }, 1000);
      return false
    }
    if (res.code !== 0 && res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res.data
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
