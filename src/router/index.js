// 08首页 index.vue
// 09平台简介 company-intro.vue
// 10新手必看 new-hands.vue
// 11注册方式 regist-methid.vue
// 12提现规则 rule-of-cash.vue
// 13系统公告 system-notice.vue
// 14公告详情 system-notice-details.vue
// 15客服中心 company-center.vue
// 16招商政策 policy.vue

// 78,81,91,114,116 提现/互转/申请报单/订单激活/修改支付密码/修改支付密码成功 success.vue?type=withdraw/turnOther/applyReport/orderActive/editLoginPw/editPayPw

import index from '../page/index.vue';

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
  }
];
