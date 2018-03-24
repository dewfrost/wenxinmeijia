import Vue from 'vue';
import App from './App';
import router from './router/app';
import axios from 'axios';
import Qs from 'qs';
import './assets/css/base.scss';

Vue.config.productionTip = false;
// 传参组件
window.eventBus = new Vue();
// 缓存组件
window.eventCookie = new Vue();

// 全局mixin在销毁前清除组件
// Vue.mixin({
//   beforeDestroy () {
//     eventBus.$emit('toast', false);
//     eventBus.$emit('loading', false);
//     eventBus.$emit('header', false);
//     eventBus.$emit('modal', false);
//     eventBus.$emit('footer', false);
//   }
// });

router.beforeEach((to, from, next) => {
  eventBus.$emit('toast', false);
  eventBus.$emit('loading', false);
  eventBus.$emit('header', false);
  eventBus.$emit('modal', false);
  eventBus.$emit('footer', false);
  next();
});

// 公共函数

// 创建ajax
Vue.prototype.axios = axios.create({
  baseURL: 'http://wx.ewtouch.com/index/',
  timeout: 10000,
  withCredentials: true,
 // 这时候我们通过Qs.stringify转换为表单查询参数
  transformRequest: [function (data) {
    data = Qs.stringify(data);
    return data;
  }],
  // 设置Content-Type
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

Vue.prototype.getVoucherModal = function (price) {
  // 如果localStorage里面有isGetVoucher
  if (localStorage.isGetVoucher) {
    return false;
  } else {
    eventBus.$emit('modal', {
      title: '￥' + price,
      show: 'voucher',
      btnTitle: '立即领取',
      callback: function () {
        localStorage.isGetVoucher = JSON.stringify('yes');
        Vue.prototype.toast('领取成功');
      }
    });
  }
};

// 滚动事件
Vue.prototype.backScroll = function (length) {
  if (document.getElementById('content').scrollTop > length) {
    let unit = document.getElementById('content').scrollTop / 50;
    let timeout = setInterval(function () {
      if (document.getElementById('content').scrollTop > length) {
        document.getElementById('content').scrollTop -= unit;
      } else {
        clearInterval(timeout);
      }
    }, 10);
  } else {
    let unit = length / 50;
    let timeout = setInterval(function () {
      if (document.getElementById('content').scrollTop <= length) {
        document.getElementById('content').scrollTop += unit;
      } else {
        clearInterval(timeout);
      }
    }, 10);
  }
};

// 加载头部
Vue.prototype.getHeader = function (title, topClass, rightName, rightCallback, leftName, leftCallback, goodDetailsCallback) {
  eventBus.$emit('header', {
    title: title,
    class: topClass,
    right: rightName,
    rightBack: rightCallback,
    left: leftName,
    leftBack: leftCallback,
    goodDetailsCallback: goodDetailsCallback
  });
};

// 加载弹框
Vue.prototype.modal = function (title, content, btnTitle, callback) {
  eventBus.$emit('modal', {
    title: title,
    content: content,
    btnTitle: btnTitle,
    callback: callback
  });
};

// 输入密码支付
Vue.prototype.goPay = function (id, callback, payType, withdraw) {
  eventBus.$emit('modal', {
    show: 'password',
    orderId: id,
    payType: payType,
    withdraw: withdraw,
    callback: function () {
      callback();
    }
  });
};

// 提交订单底部
Vue.prototype.getSubmitFooter = function (price, callback) {
  eventBus.$emit('footer', {
    type: 'submit',
    price: price,
    button: [
      {
        callback: () => {
          callback();
        }
      }
    ]
  });
};

// 商品详情底部
Vue.prototype.getGoodsFooter = function (goodsAmount, callback1, callback2) {
  eventBus.$emit('footer', {
    type: 'goods',
    goodsAmount: goodsAmount,
    button: [
      {
        inner: '加入购物车',
        callback: () => {
          callback1();
        }
      },
      {
        inner: '立即购买',
        callback: () => {
          callback2();
        }
      }
    ]
  });
};

// 购物车底部
Vue.prototype.getGoodscarFooter = function (isCheck, goodsNum, price, isEdit, callback, delCallback, toggleCallback) {
  eventBus.$emit('footer', {
    type: 'goodsCar',
    price: price,
    isCheck: isCheck,
    goodsNum: goodsNum,
    isEdit: isEdit,
    delCallback: delCallback,
    toggleCallback: toggleCallback,
    button: [
      {
        callback: () => {
          callback();
        }
      }
    ],
    navShow: true
  });
};

// 是否是微信浏览器
Vue.prototype.isWechat = function () {
  if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {
    return true;
  } else {
    return false;
  }
};

// 名字过长，中间隐藏
Vue.prototype.hideString = function (str) {
  if (str.length > 9) {
    return str.replace(/([\S]{4})\S+([\S]{4})/, '$1****$2');
  } else {
    return str;
  }
};

// loading加载
Vue.prototype.loading = function (boolean) {
  if (!boolean) {
    eventBus.$emit('loading', false);
  } else {
    eventBus.$emit('loading', true);
  }
};

// toast弹窗
Vue.prototype.toast = function (message, icon) {
  eventBus.$emit('toast', {
    message: message,
    icon: icon
  });
};

// 手机号码隐藏中间四位
Vue.prototype.hidePhone = function (phone) {
  let phoneStr;
  if (typeof (phone) !== 'string') {
    phoneStr = phone.toString();
  } else {
    phoneStr = phone;
  }
  return phoneStr.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

// AJAX获取手机号
Vue.prototype.getPhone = function (giveObj) {
  this.axios.get('/user/phone', {
  })
    .then(({data}) => {
      if (data.status === 1) {
        giveObj.phone = data.data;
      } else {
        // this.toast(data.message);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// AJAX获取手机验证码
Vue.prototype.getCode = function (phone, type, callback, catchback) {
  this.axios.get('/login/sms', {
    params: {
      phone: phone,
      type: type
    }
  })
    .then(({data}) => {
      if (data.status === 1) {
        callback();
      } else {
        catchback();
        this.toast(data.message);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// 添加一个请求拦截器
Vue.prototype.axios.interceptors.request.use(function (config) {
  // 在请求发送之前做一些事
  Vue.prototype.loading();
  return config;
}, function (error) {
  // 当出现请求错误是做一些事
  return Promise.reject(error);
});

// 判断是否登录
const Other = ['index', 'login', 'register', 'findPassword', 'registrationAgreement', 'goodsDetails', 'goodsList'];
// 跳转前
router.beforeEach((to, from, next) => {
  // 如果在白名单内
  if (Other.join('*').match(to.fullPath.replace('/', '')) || Other.join('*').match(to.name) !== null) {
    next();
  } else {
    Vue.prototype.axios.post('/index/is_login')
      .then(({data}) => {
        // 如果返回值为1，则跳转到登录页
        if (data.status !== 1) {
          router.push('login');
        } else {
          next();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

// 添加一个返回拦截器
Vue.prototype.axios.interceptors.response.use(function (response) {
  // 对返回的数据进行一些处理
  Vue.prototype.loading(false);
  // 路由白名单
  return response;
}, function (error) {
  // 对返回的错误进行一些处理
  Vue.prototype.loading(false);
  if (error.message.includes('timeout')) {
    Vue.prototype.toast('网络错误', 'icon-close');
  };
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
