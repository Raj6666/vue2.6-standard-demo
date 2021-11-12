import Mock from 'mockjs';

const Random = Mock.Random;

// 模拟正常请求
// mock需要给三个参数,url(与axios请求是传的url一致,我这个是本地启动的项目就直接用本地域名了)
// 请求类型: get post...其他看文档
// 数据处理函数,函数需要return数据
Mock.mock(RegExp('/mock/city' + '.*'), 'get', (params) => {
  let citys = [];
  citys.push(params);
  for (let i = 0; i < 10; i++) {
    let obj = {
      id: i + 1,
      city: Random.city(),
      color: Random.color(),
    };
    citys.push(obj);
  }
  return {
    code: 200,
    data: {
      cityList: citys,
    },
  };
});
Mock.mock('/mock/update/city', 'post', (params) => {
  return {
    code: 200,
    data: {
      msg: '更新成功',
      params,
    },
  };
});
