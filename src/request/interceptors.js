/*
 * @Descripttion:请求拦截器
 * @version:
 * @Author: husiyuan
 * @Date: 2020-07-20 15:05:57
 * @LastEditors: husiyuan
 * @LastEditTime: 2020-07-23 12:09:54
 */
import axios from 'axios';
import router from './../router';

// 请求拦截
const request = axios.interceptors.request.use(
  (config) => {
    // console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
const response = axios.interceptors.response.use(
  (res) => {
    console.log(res);
    const apiRes = res.data;
    const statusCode = res.status; // http返回状态码
    if (String(statusCode).startsWith('2')) {
      return apiRes;
    } else {
      Promise.reject(res); // 调用reject，关闭请求流程
    }
  },
  (error) => {
    console.log(error);
    let errorContent = '';
    if (error.response.status) {
      // 错误状态码
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          errorContent = '账号未登陆';
          break;
        case 403:
          errorContent = '账号无权访问该页面';
          break;
        case 404:
          errorContent = 'opps,页面找不到了';
          break;
        case 500:
          errorContent = '网络异常';
          break;
      }
      // 路由跳转到异常页面
      router.push({
        path: '/StatusError',
        query: {
          content: errorContent,
        },
      });
    }
    return Promise.reject(error);
  },
);

export default {request, response};
