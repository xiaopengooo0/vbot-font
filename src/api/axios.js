import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7878', // 根据实际情况修改基础URL
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 封装请求方法
export const get = (url, params) => {
  return instance.get(url, { params });
};

export const post = (url, data) => {
  return instance.post(url, data);
};

export const put = (url, data) => {
  return instance.put(url, data);
};

export const del = (url, params) => {
  return instance.delete(url, { params });
};

export default instance;