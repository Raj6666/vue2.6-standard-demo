export default {
  home: [
    {name: 'getHomeList', method: 'get', url: '/mock/city', header: null}, // 首页列表
    {
      name: 'updateHomeList',
      method: 'post',
      url: '/mock/update/city',
      header: null,
    }, // 修改首页列表
  ],
};
