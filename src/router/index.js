// 7/8首页 index.vue
// 10 商品列表 goods-list.vue

import index from '../page/index.vue';
import demos from '../page/demos.vue';
import goodsList from '../page/goods-list.vue';

export default[
  {
    path: '/',
    component: index,
    name: 'index'
  },
  {
    path: '/index',
    component: index,
    name: 'index1'
  },
  {
    path: '/demos',
    component: demos,
    name: 'demos'
  },
  {
    path: '/goodsList',
    component: goodsList,
    name: 'goodsList'
  }
];
