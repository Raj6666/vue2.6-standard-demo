/*
 * @Descripttion:
 * @version:
 * @Author: husiyuan
 * @Date: 2020-07-20 12:04:59
 * @LastEditors: husiyuan
 * @LastEditTime: 2020-07-21 15:14:30
 */
import axios from 'axios';
import store from '@/store/index';
var qs = require('qs');

class HTTP {
  // 公开函数
  request({
    url,
    method = 'get',
    data = {},
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    responseType = 'json',
  }) {
    return new Promise((resolve, reject) => {
      // 设置全局loading状态
      store.commit('updateLoadingStatus', {isLoading: true});
      // 发起请求
      axios({
        url: url,
        data: method === 'post' || method === 'put' ? data : null,
        params: method === 'get' || method === 'delete' ? qs.stringify(data) : null,
        method: method,
        headers,
        responseType,
        baseURL: process.env.BASE_API,
      })
        .then((res) => {
          this._successCallback(res, resolve, reject);
        })
        .catch((err) => {
          this._handleError(err);
          reject(err); // 调用reject，关闭请求流程
        });
    });
  }

  // 请求成功的回调函数
  _successCallback(res, resolve, reject) {
    console.log(res);
    const statusCode = res.code; // http返回状态码
    // 设置全局loading状态
    store.commit('updateLoadingStatus', {
      isLoading: false,
    });
    // TODO: 根据不同项目需求，除了判断http状态码，还需判断返回的对象的结果码code
    if (statusCode && String(statusCode).startsWith('2')) {
      resolve(res.data); // 若请求成功，则把请求结果传入resolve中
    } else {
      reject(res.data); // 调用reject，关闭请求流程
      this._handleError(statusCode); // 调用异常处理函数，展示错误码指定的错误提示
    }
  }

  // 请求失败的回调函数
  _handleError(res) {
    // TODO: 根据不同项目需求，调起当前项目使用的UI库的全局通知工具，展示错误信息
    console.log(res);
    // 设置全局loading状态
    store.commit('updateLoadingStatus', {
      isLoading: false,
    });
  }
}

// 返回在vue模板中的调用接口
export default HTTP;
