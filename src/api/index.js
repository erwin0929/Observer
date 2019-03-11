import axios from 'axios'

// 创建一个 axios 实例
const service = axios.create({
  // 请求域名
  baseURL: process.env.VUE_APP_API_HOST,
  // 请求超时时间
  timeout: 35000,
  // 请求方式
  method: 'post'
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const { method, data, params } = config
    if (method === 'get') {
      // config.params = {
      //   StoreID: 6,
      //   ...params
      // }
    }
    if (method === 'post') {
    }
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data } = response
    // 如果有错则提示
    // if (errMsg) {
    //   Toast.fail({
    //     message: errMsg,
    //     duration: 2000
    //   })
    //   return false
    // }
    return data
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    return Promise.reject(error)
  }
)

export default service
