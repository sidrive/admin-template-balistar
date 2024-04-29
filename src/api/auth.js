// import request from '@/utils/request'

// export function login (param) {
//   return request({
//     url: '/security/authentication/login',
//     method: 'get',
//     params: param
//   })
// }

import axios from 'axios'
axios.defaults.withCredentials = true
const service = axios.create({
 // baseURL: process.env.VUE_APP_BASE_API, // api
 // baseURL: process.env.VUE_APP_BASE_API_URL, // api
 baseURL: 'http://127.0.0.1',
 timeout: 30000 // request timeout
})

export default {
  login() {
   service.get('/security/authentication/login')
  },
 getCompany() {
  service.get('/master/company')
 },
}