import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: 'http://localhost:7878/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token&&config.url!='/admin/login') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => {
    ElMessage.error(error.response.data.message||'请求失败') 
    Promise.reject(error)
  }

)

export const get = (url: string, params?: any) => instance.get(url, { params })
export const post = (url: string, data?: any) => instance.post(url, data)
export const put = (url: string, data?: any) => instance.put(url, data)
export const del = (url: string) => instance.delete(url)

export default instance 