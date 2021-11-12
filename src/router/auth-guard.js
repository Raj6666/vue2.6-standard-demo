/*
 * @Descripttion:路由守卫
 * @version:
 * @Author: husiyuan
 * @Date: 2020-07-20 18:02:46
 * @LastEditors: husiyuan
 * @LastEditTime: 2020-07-21 15:52:51
 */
import router from './index';

// to是当前页面，from是上一个页面
// 路由跳转前
const beforeEach = router.beforeEach((to, from, next) => {
  console.log(to, from);
  document.title = to.meta.title || '默认title';
  next();
});
// to是当前页面，from是上一个页面
// 路由跳转后
const afterEach = router.afterEach((to, from) => {
  console.log(to, from);
});

export default {beforeEach, afterEach};
