import VueRouter from 'vue-router';

import room from './../views/videoRoom';
import list from './../views/videoList';

export default function routeConfig() {
  const router = new VueRouter({
    base: __dirname, // 这个很重要
    routes: [{
      path: '*',
      component: room,
    },
    {
      path: '/room',
      name: 'room',
      component: room,
      meta: {
        keepAlive: true, // 不需要缓存
      },
    },
    {
      path: '/list',
      name: 'list',
      component: list,
      meta: {
        keepAlive: true, // 不需要缓存
      },
    }],
  });
  // 路由处理
  router.beforeEach((to, from, next) => {
    next();
  });
  return router;
}
