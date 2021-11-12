import HTTP from '../request/axios';
const http = new HTTP();

// 加载所有子模块
const requireContext = require.context('./', true, /index\.js$/);
let allApiModules = {};
requireContext.keys().forEach((name) => {
  allApiModules = Object.assign({}, allApiModules, requireContext(name).default || {});
});

// 获取token
const getTokenFn = () => {
  // let loginData = localStorage.getItem("system/loginData");
  // if (loginData) {
  //   loginData = JSON.parse(loginData) || {};
  //   return loginData.token || "";
  // }
  return 'RajToken';
};

// baseUrl
const baseUrl = () => {
  return ['development'].includes(process.env.NODE_ENV) ? '' : process.env.VUE_APP_API_PATH;
};

// 格式化api方法
const toApiFn = (configData = null) => {
  // 定义存放所有接口模块的变量
  let api = {};
  if (configData) {
    // 循环所有的子模块
    for (let modeName in configData) {
      api[modeName] = {}; // 将每个子模块单独定义一个对象存放（命名空间）
      let modeApiConfig = configData[modeName] || []; // 获取子模块中定义的api配置项数组
      // 循环api配置项数组
      modeApiConfig.forEach((modeItem) => {
        if (modeItem?.name) {
          /**
           * @param params 请求参数集合
           * @param option 可以覆盖默认请求配置的参数集合
           */
          api[modeName][modeItem.name] = (params = {}, option = {}) => {
            return http.request({
              url: option?.url || (modeItem.baseUrl || baseUrl()) + modeItem.url,
              method: option?.method || modeItem?.method || 'post',
              data:
                params instanceof FormData ? params : Object.assign({}, modeItem?.params, params),
              headers: Object.assign({}, modeItem?.headers, option?.headers, {
                token: modeItem.noToken ? '' : getTokenFn(),
              }),
              responseType: option?.responseType || 'json',
            });
          };
        }
      });
    }
  }
  console.log(api);
  return api;
};

export default toApiFn(allApiModules);
