// 9  商品详情 goods-details.vue
// 12 提交订单 submit-order.vue
// 13 选择收货地址 select-address.vue
// 15 支付 payment.vue
// 18 支付成功 payment-success.vue

import info from '../page/info.vue';
import infoDetails from '../page/info-details.vue';
import goodsCar from '../page/goods-car.vue';
import goodsDetails from '../page/goods-details.vue';
import submitOrder from '../page/submit-order.vue';
import selectAddress from '../page/select-address.vue';
import payment from '../page/payment.vue';
import paymentSuccess from '../page/payment-success.vue';

export default[
  {
    path: '/goodsCar',
    component: goodsCar,
    name: 'goodsCar'
  },
  {
    path: '/infoDetails',
    component: infoDetails,
    name: 'infoDetails'
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
    path: '/payment',
    component: payment,
    name: 'payment'
  },
  {
    path: '/paymentSuccess',
    component: paymentSuccess,
    name: 'paymentSuccess'
  }
];
