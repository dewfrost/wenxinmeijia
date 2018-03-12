// 9  商品详情 goods-details.vue
// 10 加入购物车 add-cart.vue
// 11 购买-弹窗 buy-pop.vue
// 12 提交订单 submit-order.vue
// 13 选择收货地址 select-address.vue
// 14 确认收货地址 confirm-address.vue
// 15 支付 payment.vue
// 16 设置支付密码 setting-password.vue
// 17 密码 password.vue
// 18 支付成功 payment-success.vue
// 19 配件商品详情 parts-details.vue
// 20 购物车/21 购物车-编辑/22 购物车-删除 shopping-cart.vue

import info from '../page/info.vue';
import goodsCar from '../page/goods-car.vue';
import goodsDetails from '../page/goods-details.vue';
import addCart from '../page/add-cart.vue';
import buyPop from '../page/buy-pop.vue';
import submitOrder from '../page/submit-order.vue';
import selectAddress from '../page/select-address.vue';
import confirmAddress from '../page/confirm-address.vue';
import payment from '../page/payment.vue';
import settingPassword from '../page/setting-password.vue';
import password from '../page/password.vue';
import paymentSuccess from '../page/payment-success.vue';
import partsDetails from '../page/parts-details.vue';
import shoppingCart from '../page/shopping-cart.vue';

export default[
  {
    path: '/goodsCar',
    component: goodsCar,
    name: 'goodsCar'
  },
  {
    path: '/goodsDetails',
    component: goodsDetails,
    name: 'goodsDetails'
  },
  {
    path: '/info',
    component: info,
    name: 'info'
  },
  {
    path: '/addCart',
    component: addCart,
    name: 'addCart'
  },
  {
    path: '/buyPop',
    component: buyPop,
    name: 'buyPop'
  },
  {
    path: '/submitOrder',
    component: submitOrder,
    name: 'submitOrder'
  },
  {
    path: '/selectAddress',
    component: selectAddress,
    name: 'selectAddress'
  },
  {
    path: '/confirmAddress',
    component: confirmAddress,
    name: 'confirmAddress'
  },
  {
    path: '/payment',
    component: payment,
    name: 'payment'
  },
  {
    path: '/settingPassword',
    component: settingPassword,
    name: 'settingPassword'
  },
  {
    path: '/password',
    component: password,
    name: 'password'
  },
  {
    path: '/paymentSuccess',
    component: paymentSuccess,
    name: 'paymentSuccess'
  },
  {
    path: '/partsDetails',
    component: partsDetails,
    name: 'partsDetails'
  },
  {
    path: '/shoppingCart',
    component: shoppingCart,
    name: 'shoppingCart'
  }
];
