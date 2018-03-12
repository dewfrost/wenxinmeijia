// 1启动  start.vue
// 2注册  register.vue
// 3注册协议  registration-agreement.vue
// 4登录  login.vue
// 5找回密码  find-password.vue

import start from '../page/start.vue';
import register from '../page/register.vue';
import registrationAgreement from '../page/registration-agreement.vue';
import login from '../page/login.vue';
import findPassword from '../page/find-password.vue';

export default [
  {
    path: '/start',
    component: start,
    name: 'start'
  },
  {
    path: '/register',
    component: register,
    name: 'register'
  },
  {
    path: '/registrationAgreement',
    component: registrationAgreement,
    name: 'registrationAgreement'
  },
  {
    path: '/login',
    component: login,
    name: 'login'
  },
  {
    path: '/findPassword',
    component: findPassword,
    name: 'findPassword'
  }
];
