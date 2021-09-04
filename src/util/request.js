import axios from 'axios'

// 创建一个axios的实例：
const instance = axios.create({
  // baseURl会自动将请求地址拼到url前面
  baseURL: 'http://159.75.112.81:8082/',
  withCredentials: true,
  timeout: 10000
})

// 封装get请求
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data)
    }, (err) => {
      reject(err)
    })
  })
}

// 封装post请求
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, (err) => {
      reject(err)
    })
  })
}