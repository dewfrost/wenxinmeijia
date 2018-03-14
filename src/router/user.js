// 26 个人中心 user-center.vue
// 27 编辑资料 edit-information.vue
// 28 完善资料提示 perfect-pop.vue
// 29 公告列表  public-list.vue
// 30 公告详情  public-details.vue
// 31 订单空白页/32 我的订单-待付款/34 取消订单/35 我的订单-待发货/37 我的订单-待收货/39 我的订单-已完成  order.vue
// 33 订单详情-待付款/36 订单详情-待发货/38 订单详情-待收货/40 订单详情-已完成  order-details.vue
// 41 可提现金额 withdraw.vue
// 42 提现-未绑定/43 提现-弹窗/44 提现 withdraw-apply.vue
// 45 提现申请提交成功 withdraw-success.vue
// 46 货款账户/47 充值-弹窗 money-account.vue
// 48 推荐奖励 recommend-awards.vue
// 49 晋级奖励 promotion-awards.vue
// 50 管理薪资 management-salary.vue
// 51 收入明细/52 支出明细  account-book.vue
// 53 我的伙伴/54 消费会员/55 消费会员-筛选  partner.vue
// 56 查看二维码 look-code.vue
// 57 我的二维码 qr-code.vue
// 58 管理收货地址/61 删除收货地址 manage-address.vue
// 59 编辑收货地址 edit-address.vue
// 60 添加新地址/62 选择所在地区 add-address.vue
// 63 客服中心 customer-center.vue
// 64/65 更换手机号 change-phone.vue
// 66 手机号修改成功 phone-success.vue
// 67 账户绑定 account-bind.vue
// 68 微信绑定 weixin-bind.vue
// 69 支付宝绑定 zfb-bind.vue
// 70 支付宝解绑 zfb-unbind.vue
// 71 账户设置/75 退出登录 setting-account.vue
// 72 修改登录密码/74 修改支付密码 revise-password.vue
// 73 登录密码修改成功 setting-success.vue
// 76 销售排行/77 本月收入 rank-list.vue

import userCenter from '../page/user-center.vue';
import editInformation from '../page/edit-information.vue';
import perfectPop from '../page/perfect-pop.vue';
import publicList from '../page/public-list.vue';
import publicDetails from '../page/public-details.vue';
import order from '../page/order.vue';
import orderDetails from '../page/order-details.vue';
import withdraw from '../page/withdraw.vue';
import withdrawApply from '../page/withdraw-apply.vue';
import withdrawSuccess from '../page/withdraw-success.vue';
import moneyAccount from '../page/money-account.vue';
import recommendAwards from '../page/recommend-awards.vue';
import promotionAwards from '../page/promotion-awards.vue';
import managementSalary from '../page/management-salary.vue';
import accountBook from '../page/account-book.vue';
import partner from '../page/partner.vue';
import lookCode from '../page/look-code.vue';
import qrCode from '../page/qr-code.vue';
import manageAddress from '../page/manage-address.vue';
import editAddress from '../page/edit-address.vue';
import addAddress from '../page/add-address.vue';
import customerCenter from '../page/customer-center.vue';
import changePhone from '../page/change-phone.vue';
import phoneSuccess from '../page/phone-success.vue';
import accountBind from '../page/account-bind.vue';
import weixinBind from '../page/weixin-bind.vue';
import zfbBind from '../page/zfb-bind.vue';
import zfbUnbind from '../page/zfb-unbind.vue';
import settingAccount from '../page/setting-account.vue';
import revisePassword from '../page/revise-password.vue';
import settingSuccess from '../page/setting-success.vue';
import rankList from '../page/rank-list.vue';

export default[
  {
    path: '/userCenter',
    component: userCenter,
    name: 'userCenter'
  },
  {
    path: '/editInformation',
    component: editInformation,
    name: 'editInformation'
  },
  {
    path: '/perfectPop',
    component: perfectPop,
    name: 'perfectPop'
  },
  {
    path: '/publicList',
    component: publicList,
    name: 'publicList'
  },
  {
    path: '/publicDetails',
    component: publicDetails,
    name: 'publicDetails'
  },
  {
    path: '/order',
    component: order,
    name: 'order'
  },
  {
    path: '/orderDetails',
    component: orderDetails,
    name: 'orderDetails'
  },
  {
    path: '/withdraw',
    component: withdraw,
    name: 'withdraw'
  },
  {
    path: '/withdrawApply',
    component: withdrawApply,
    name: 'withdrawApply'
  },
  {
    path: '/withdrawSuccess',
    component: withdrawSuccess,
    name: 'withdrawSuccess'
  },
  {
    path: '/moneyAccount',
    component: moneyAccount,
    name: 'moneyAccount'
  },
  {
    path: '/recommendAwards',
    component: recommendAwards,
    name: 'recommendAwards'
  },
  {
    path: '/promotionAwards',
    component: promotionAwards,
    name: 'promotionAwards'
  },
  {
    path: '/managementSalary',
    component: managementSalary,
    name: 'managementSalary'
  },
  {
    path: '/accountBook',
    component: accountBook,
    name: 'accountBook'
  },
  {
    path: '/partner',
    component: partner,
    name: 'partner'
  },
  {
    path: '/lookCode',
    component: lookCode,
    name: 'lookCode'
  },
  {
    path: '/qrCode',
    component: qrCode,
    name: 'qrCode'
  },
  {
    path: '/manageAddress',
    component: manageAddress,
    name: 'manageAddress'
  },
  {
    path: '/editAddress',
    component: editAddress,
    name: 'editAddress'
  },
  {
    path: '/addAddress',
    component: addAddress,
    name: 'addAddress'
  },
  {
    path: '/customerCenter',
    component: customerCenter,
    name: 'customerCenter'
  },
  {
    path: '/changePhone',
    component: changePhone,
    name: 'changePhone'
  },
  {
    path: '/phoneSuccess',
    component: phoneSuccess,
    name: 'phoneSuccess'
  },
  {
    path: '/accountBind',
    component: accountBind,
    name: 'accountBind'
  },
  {
    path: '/weixinBind',
    component: weixinBind,
    name: 'weixinBind'
  },
  {
    path: '/zfbBind',
    component: zfbBind,
    name: 'zfbBind'
  },
  {
    path: '/zfbUnbind',
    component: zfbUnbind,
    name: 'zfbUnbind'
  },
  {
    path: '/settingAccount',
    component: settingAccount,
    name: 'settingAccount'
  },
  {
    path: '/revisePassword',
    component: revisePassword,
    name: 'revisePassword'
  },
  {
    path: '/settingSuccess',
    component: settingSuccess,
    name: 'settingSuccess'
  },
  {
    path: '/rankList',
    component: rankList,
    name: 'rankList'
  }
];
