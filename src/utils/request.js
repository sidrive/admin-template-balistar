import axios from 'axios'
// import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
// import router from '@/router'

// create an axios instance
// axios.defaults.withCredentials = true
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api
  // baseURL: process.env.VUE_APP_BASE_API_URL, // api
  baseURL: 'https://pulung.yangpunya.com',
  withCredentials: true,
  timeout: 30000 // request timeout
})

function generateErrorMessage (error) {
  let errorCode = 0
  let statusCode = 500
  let message = 'Connection timeout, please check your internet connection'
  let string = 'Connection timeout, please check your internet connection'

  if (error.response) {
    if (error.response.data.type !== 'application/json') {
      const errorError = error.response.data.error.error
      let errArr = errorError
      string = errArr

      if (typeof errorError !== 'string') {
        string = ''
        errArr = Object.values(errorError)
        for (let index = 0; index < errArr.length; index++) {
          string += '- ' + errArr[index]
        }
      }

      if (error.response) {
        statusCode = error.response.data.error.status_code
        message = error.response.data.error.message
        errorCode = error.response.data.error.error_code
      } else {
        string = message
      }
    }
  }

  return {
    ...error,
    statusCode,
    message,
    string,
    errorCode
  }
}

// request interceptor
service.interceptors.request.use(
  console.log('axios'),
  config => {
    // const token = getToken()
    const token = 'Aizadedelll'
    if (token) {
      // if (store.getters.token) {
        // config.headers['Authorization'] = 'Bearer ' + token.access_token
      // }
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    console.log('Log 3', error)
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(response => {
  return response
}, error => {
  const errorXHR = generateErrorMessage(error)
  return Promise.reject(errorXHR)
})

export default service
