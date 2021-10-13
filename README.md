# vue2.6-standard-demo
vue标准化项目

### 项目文件树
```
.
├─ .env.development                 —— 开发环境变量
├─ .env.production                  —— 测试环境变量
├─ .env.rc                          —— 预发布环境变量
├─ .env.test                        —— 生产环境变量
├─ src
│    ├─ App.vue                     —— 项目根组件
│    ├─ main.js                     —— 项目入口文件
│    ├─ apis
│    │    ├─ index.js               —— 对api请求对象的封装以及所有模块api的自动引入
│    │    └─ modules                —— 请求api集合,内部必须遵循文件夹包含index.js的声明方式
│    │           ├─ home
│    │           └─ userModule
│    ├─ assets                      —— 项目静态资源
│    │    ├─ images
│    │    │    └─ logo.png
│    │    └─ styles                 —— 全局引用样式资源
│    │           ├─ border.css      —— 重置border样式
│    │           ├─ common.scss     —— 全局公共样式
│    │           └─ variables.scss  —— 全局公共常用工具样式，代码中以@include方式进行引用
│    ├─ components
│    │    ├─ common                 —— 全局公共组件
│    │    │    └─ HelloWorld.vue
│    │    └─ index.js               —— 全局公共组件的全局注册
│    ├─ request
│    │    ├─ axios.js               —— axios请求封装，并添加公共的请求成功与请求失败回调函数（包含全局loading状态调整）
│    │    ├─ interceptors.js        —— 请求拦截器，对请求返回不同状态码的统一处理
│    │    └─ mock                       
│    │           ├─ index.js        —— 请求数据模拟
│    │           └─ mockAdapter.js  —— 需要模拟异常状态请求所需的请求
│    ├─ router
│    │    ├─ auth-guard.js          —— 路由守卫
│    │    ├─ index.js               —— 自动引入所有modules模块中的路由，以及标准的单页路由配置
│    │    └─ modules              
│    │           └─ userModule.js   —— 标准模块路由示例
│    ├─ store
│    │    └─ index.js               —— store 仓库
│    ├─ utils                       —— 工具类仓库
│    │    ├─ date-util.js
│    │    └─ types.js
│    └─ views                       —— 页面
│           ├─ Error.vue
│           ├─ Home.vue
│           └─ userModule
│                  ├─ home.vue
│                  └─ tradeManagement
└─ vue.config.js                        —— 项目基础配置

```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
