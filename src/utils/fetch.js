import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken, getUserId } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['X-UserId'] = getUserId()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非2001是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      // 23001已在其他设备登入
      if (res.code === 23001 || res.code === 23000) {
        store.dispatch('FedLogOut').then(res => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg || "请求超时",
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service