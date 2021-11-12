export default [
  //     {
  //     path: '/user', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
  //     redirect: '/user/home' ,
  //   },{
  //     path: '/user/home', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
  //     name: 'home', // 路由组件名称
  //     component: () => import( /* webpackChunkName: "home" */ "@/views/userModule/home.vue"), // 按需引入组件，提高首屏加载速度
  //     leaf: false, // 递归属性，（当前导航具有子集开启）
  //     meta: {
  //       keepAlive: true, // 是否缓存组件
  //       title: "个人中心" // 路由中文名称
  //     },
  //   },{
  //     path: '/user/tradeManagement', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
  //     redirect: {
  //         name: 'orders'
  //     },
  //     component: () => import( /* webpackChunkName: "records" */ "@/views/userModule/home.vue"), // 按需引入组件，提高首屏加载速度
  //     name: 'tradeManagement',
  //     meta: {
  // 		title: '交易管理',
  // 	},
  //     children: [
  //         {
  //             path: 'orders', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
  //             name: 'orders', // 路由组件名称
  //             component: () => import( /* webpackChunkName: "orders" */ "@/views/userModule/tradeManagement/orders.vue"), // 按需引入组件，提高首屏加载速度
  //             // leaf: false, // 递归属性，（当前导航具有子集开启）
  //             // meta: {
  //             //   keepAlive: false, // 是否缓存组件
  //             //   title: "我的订单" // 路由中文名称
  //             // }
  //         },
  //         {
  //             path: 'records', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
  //             name: 'records', // 路由组件名称
  //             component: () => import( /* webpackChunkName: "records" */ "@/views/userModule/tradeManagement/records.vue"), // 按需引入组件，提高首屏加载速度
  //             leaf: false, // 递归属性，（当前导航具有子集开启）
  //             meta: {
  //               keepAlive: false, // 是否缓存组件
  //               title: "交易记录" // 路由中文名称
  //             }
  //         }
  //     ]
  //   },

  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "home" */ '@/views/userModule/home.vue'),
    alwaysShow: true,
    meta: {
      keepAlive: true, // 是否缓存组件
      title: '个人中心', // 路由中文名称
    },
    children: [
      {
        path: 'tradeManagement',
        name: 'tradeManagement',
        redirect: {
          name: 'orders',
        },
        component: {template: `<router-view></router-view>`},
        meta: {
          title: '交易管理',
        },
        children: [
          {
            path: 'orders',
            name: 'orders',
            component: () =>
              import(
                /* webpackChunkName: "orders" */ '@/views/userModule/tradeManagement/orders.vue'
              ), // 按需引入组件，提高首屏加载速度
            meta: {
              keepAlive: false, // 是否缓存组件
              title: '我的订单', // 路由中文名称
            },
          },
          {
            path: 'records',
            name: 'records',
            component: () =>
              import(
                /* webpackChunkName: "records" */ '@/views/userModule/tradeManagement/records.vue'
              ), // 按需引入组件，提高首屏加载速度
            meta: {
              keepAlive: false, // 是否缓存组件
              title: '交易记录', // 路由中文名称
            },
          },
        ],
      },
    ],
  },
];
