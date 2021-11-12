import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import authGuard from './router/auth-guard'; // 路由守卫
import Interceptors from './request/interceptors'; // 请求拦截
import '@/assets/styles/border.css'; // 全局border样式重置
import Api from '@/apis/index.js'; // 全局注册api接口对象

Vue.prototype.Api = Api;
Vue.config.productionTip = false;
Vue.use(Interceptors.request); // 请求拦截器
Vue.use(Interceptors.response); // 相应拦截器
require('./components/index.js'); // 全局注册公共组件

// 仅在开发环境时引入mock
if (process.env.NODE_ENV === 'development') {
  require('./request/mock/index.js'); // 模拟普通请求状态的mock
}

new Vue({
  router,
  store,
  authGuard,
  render: (h) => h(App),
}).$mount('#app');
