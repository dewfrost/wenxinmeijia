import Vue from 'vue';
import Router from 'vue-router';
// 引入路由
import index from './index';
import login from './login';
import goods from './goods';
import user from './user';

Vue.use(Router);

// 路由回顶部
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    document.getElementById('content').scrollTop = 0;
  }
};

export default new Router({
  mode: 'history',
  base: '/wenxin/',
  scrollBehavior,
  routes: [].concat(
    index,
    login,
    goods,
    user
  )
});
