import axios, { Axios } from 'axios'
import { ElMessage } from 'element-plus'

const network: Axios = axios.create({
  baseURL: '',
  timeout: 25000,                // Request Timing
  withCredentials: true,          // Support Cors Cookie
})

// response拦截器
network.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res instanceof Blob) {
      return res
    }

    if (!res.success) {
      ElMessage({
        message: res.errMessage,
        type: 'error',
        duration: 5 * 1000,
      })

      return Promise.reject(res.errMessage);
    }

    return res;
  },
  (error) => {
    const res = error.response && error.response.data;
    if (res && !res.success) {
      ElMessage({
        message: res.errMessage,
        type: 'error',
        duration: 5 * 1000,
      })
    } else {
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
      })
    }

    return Promise.reject(error);
  },
);

export default network as any
