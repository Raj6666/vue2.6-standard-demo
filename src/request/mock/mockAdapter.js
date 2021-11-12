import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default {
  init() {
    // 模拟异常请求
    let mock = new MockAdapter(axios);

    // mock success request  模拟成功请求
    mock.onGet('/success').reply(200, {
      msg: 'success',
    });
    // mock error request  模拟失败请求
    mock.onGet('/error').reply(500, {
      msg: 'failure',
    });
    // mock error request  模拟失败403请求
    mock.onGet('/error403').reply(403, {
      msg: 'failure',
    });

    mock.onGet('/user/list').reply((config) => {
      console.log(config);
      return new Promise((resolve, reject) => {
        // resolve() 响应Promise 对象的状态, 从 未完成 变为成功 可传递成功的处理函数
        // reject()  响应Promise 对象的状态, 从 未完成 变为失败 可传递失败的处理函数
        // 模拟成功
        setTimeout(() => {
          resolve([
            200,
            {
              msg: '请求成功',
            },
          ]);
        }, 1000);
        // 模拟失败
        setTimeout(() => {
          reject([
            400,
            {
              msg: '请求失败',
            },
          ]);
        }, 1000);
      });
    });
  },
};
