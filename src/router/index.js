// 7/8首页 index.vue

import index from '../page/index.vue';
import demos from '../page/demos.vue';

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
  }
];
