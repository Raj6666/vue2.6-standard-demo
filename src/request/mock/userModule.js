import Mock from 'mockjs';

const Random = Mock.Random;

Mock.mock(RegExp('/mock/user' + '.*'), 'get', (params) => {
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
      user: citys,
    },
  };
});
