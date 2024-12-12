/*
 * @Description:
 * @Autor: LSX
 * @Date: 2021-10-26 09:48
 * @LastEditTime: 2021-10-28 14:49
 */
import axios from 'axios';
import { Message } from 'element-ui';
import statusCode from '@/utils/statusCode';

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

const { headers, param } = axiosSetting || {};

/* 使用 setting 配置覆盖headers*/
if (headers) {
  for (var k in headers) {
    axios.defaults.headers[k] = headers[k];
  }
}

const service = axios.create(param);

//请求拦截
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

//响应拦截
service.interceptors.response.use(
  response => {
    const code = response.data.code || 200;
    const msg = statusCode[code];
    if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      });
      return Promise.reject(new Error(msg));
    } else if (code === 400) {
      return response.data;
    }else if (code !== 200) {
      Message({
        message: msg,
        type: 'error'
      });
      return Promise.reject('error');
    } else {
      bus.$emit('timeline', function() { this.resizeTimelineWidth(); });
      return response.data;
    }
  },
  error => {
    console.log('err' + error);
    let { message } = error;
    if (message == 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);
export default service;
