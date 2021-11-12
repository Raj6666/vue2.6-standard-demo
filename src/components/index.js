import Vue from 'vue';

/**
 * 功能：自动导入公共组件
 * 备注：组件内 name 属性 必须与文件名保持一致
 * 参数1 加载common文件所有.vue结尾文件
 * 参数2 是否遍历子文件
 * 参数3 过滤条件
 */
const requireComponents = require.context('./common', false, /\.vue$|\.js$/);
requireComponents.keys().forEach((component) => {
  const reqCom = requireComponents(component).default;
  Vue.component(reqCom.name, reqCom);
});
