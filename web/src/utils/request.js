import axios from 'axios'
// import store from '@/store'

const request = axios.create({
  // baseURL: 'http://127.0.0.1:3000/api/private/v1'
  baseURL: 'http://ttapi.research.itcast.cn'
})

// request.interceptors.request.use(
//   function(config) {
//     // 如果已登录，则为请求接口统一添加用户 token
//     const { user } = store.state
//     if (user) {
//       config.headers.Authorization = `Bearer ${user.token}`
//     }
//     return config
//   },
//   function(error) {
//     return Promise.reject(error)
//   }
// )

request.interceptors.response.use(
  function(response) {
    return response.data.data || response.data
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default request
