<template>
  <div class="modal_wrap" :class="modalClass" v-show="modal">
    <!-- 普通弹框 -->
    <div class="default" v-if="!show" :style="{ width: modalWidth + '%' }">
      <i class="iconfont icon-close" @click="close"></i>
      <span class="title">{{title}}</span>
      <div class="modal_content">
        <div class="text" v-html="content"></div>
      </div>
      <button class="btnClass" @click="buttonBox(callback)">{{ btnTitle }}</button>
    </div>
    <!-- 地址弹框 -->
    <addressBox :data.sync="data" v-if="data.addressShow && show === 'address'"></addressBox>
    <!-- 支付密码弹框 -->
    <div class="pay_password" v-if="(show === 'password') && hasPassword && isRequest">
      <i class="iconfont icon-close" @click="close"></i>
      <span class="title">请输入支付密码</span>
      <div class="password_input">
        <label for="password">
          <ul>
            <li class="box"
            :class="{'is_focus': ((index) === password.length) && isFocus, 'no_focus': (index) !== password.length}"
            v-for="(item, index) in [0, 1, 2, 3, 4, 5]"
            :key="index">
            <i class="iconfont icon-yuandianxiao" v-if="password.length > index"></i>
            <i v-if="password.length <= index"></i>
            </li>
          </ul>
        </label>
        <input type="number" maxlength="6" id="password" v-model="password" @input="showPassNum()" @focus="inputFoces()" @blur="hasBlur()" autofocus>
      </div>
      <span class="forget" @click="toEditPassword()">忘记密码？</span>
    </div>
    <!-- 设置支付密码弹框 -->
    <div class="set_password" v-if="(show === 'password') && (!hasPassword) && isRequest">
      <i class="iconfont icon-close" @click="close"></i>
      <i class="iconfont icon-warnfill"></i>
      <span class="title">您还没有支付密码，设置支付密码后才能进行支付，请设置</span>
      <label for="phone">
        <i class="iconfont icon-shouji"></i>
        <input type="text" id="phone" v-model="showPhone" :disabled="user.phone" placeholder="请输入您的手机号" />
      </label>
      <div class="sms_wrap">
        <label for="sms">
        <i class="iconfont icon-xinxi"></i>
          <input type="number" id="sms" v-model="user.code" placeholder="请输入短信验证码" />
        </label>
        <button @click.stop="sendSMS" class="send_btn" :class="{'is_send': user.isSend, 'no_send': !user.isSend}" :disabled="user.isSend">{{user.btntxt}}</button>
      </div>
      <label for="password">
        <i class="iconfont icon-suo"></i>
        <input type="password" id="password" v-model="user.password" placeholder="请设置6位纯数字的密码" />
      </label>
      <label for="pwd">
        <i class="iconfont icon-suo"></i>
        <input type="password" id="pwd" v-model="user.repassword" placeholder="请确认您的密码" />
      </label>
      <button class="btnClass" @click="submitEditPassword()">提交</button>
    </div>
    <!-- 活动代金券 -->
    <div class="voucher" v-if="show === 'voucher'">
      <img :src="voucherImg" alt="">
      <i class="iconfont icon-close" @click="close"></i>
      <span class="price">{{title}}</span>
      <button class="btnClass" @click="buttonBox(callback)">{{ btnTitle }}</button>
    </div>
  </div>
</template>

<script>
import addressBox from './address';
export default {
  name: 'modal',
  data () {
    return {
      isRequest: false,
      password: '', // 6位支付密码
      orderId: null, // 订单id
      isFocus: false,
      hasPassword: null, // 是否设置过支付密码
      modal: false, // 是否显示模态框
      show: 'default', // 显示类型，支付密码、选择地址或者设置支付密码。默认选择框
      modalWidth: 87.5, // 模态框宽度，百分比，默认70%
      modalClass: '', // 自定义类名
      title: '',
      content: '', // 模态框文字内容
      btnClass: '', // 自定义类名
      btnTitle: '', // 按钮内容
      callback: '', // 事件
      data: {
        addressShow: false,
        hide: true
      },
      select: [],
      voucherImg: require('../assets/images/vouchers.png'),
      user: {
        phone: '',
        code: '',
        password: '',
        repassword: '',
        isSend: false,
        btntxt: '发送验证码',
        sendSMSTime: 0
      },
      payType: '', // 所需支付密码的事件类型
      withdraw: '' // 提现金额
    };
  },
  beforeMount: function () {
    // 监听事件
    this.getEvent();
  },
  beforeDestroy: function () {
    // 取消监听
    // eventBus.$off('modal');
  },
  computed: {
    showPhone () {
      return this.hidePhone(this.user.phone);
    }
  },
  methods: {
    getEvent () {
      eventBus.$on('modal', (data) => {
        if (!data) {
          this.modal = false;
        } else {
          this.modal = true;
          this.modalClass = data.modalClass;
          this.width = data.width;
          this.show = data.show;
          this.content = data.content;
          this.btnClass = data.btnClass;
          this.title = data.title;
          this.btnTitle = data.btnTitle;
          this.callback = data.callback;
          this.orderId = data.orderId;
          this.payType = data.payType;
          this.withdraw = data.withdraw;
          // 地址
          this.data = data;
          // 是否是password类型
          if (this.show === 'password') {
            this.getHasPassword();
            this.getPhone(this.user);
          }
        }
      });
    },
    getHasPassword () {
      this.axios.get('/order_pay/is_twopassword', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (data.status === 1) {
            this.hasPassword = true;
          } else {
            this.hasPassword = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    close: function () {
      this.modal = false;
      this.password = '';
    },
    buttonBox: function () {
      this.callback();
      this.modal = false;
    },
    sendSMS: function () {
      // 判断手机号是否为空
      if (!this.user.phone) {
        this.toast('手机号不能为空');
      } else {
        // 调用发送验证码接口
        this.getCode(this.user.phone, 4, () => {
          this.user.sendSMSTime = 60;
          this.user.disabled = true;
          this.user.isSend = true;
          this.timer();
        });
      }
    },
    timer: function () {
      if (this.user.sendSMSTime > 0) {
        this.user.sendSMSTime--;
        this.user.btntxt = '已发送(' + this.user.sendSMSTime + ')s';
        setTimeout(this.timer, 1000);
      } else {
        this.user.sendSMSTime = 0;
        this.user.btntxt = '重新获取';
        this.user.isSend = false;
      }
    },
    // 提交设置支付密码
    submitEditPassword () {
      if (!this.user.code) {
        this.toast('请填写验证码');
      } else if (!this.user.password) {
        this.toast('请输入密码');
      } else if (!this.user.repassword) {
        this.toast('请输入确认密码');
      } else if (this.user.password !== this.user.repassword) {
        this.toast('两次输入密码不一致');
      } else if (!/^\d{6}$/.test(this.user.password)) {
        this.toast('密码格式不正确，请输入6位纯数字密码');
      } else {
        // 执行设置密码
        this.doSubmit();
      }
    },
    doSubmit () {
      this.axios.post('/user/paymentPassword', {
        code: this.user.code,
        password: this.user.password,
        repassword: this.user.repassword
      })
        .then(({data}) => {
          if (data.status === 1) {
            // 成功，关闭设置密码窗口
            this.close();
            this.toast(data.message);
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showPassNum () {
      if (this.password.length === 6) {
        // 如果有payType传值为endOrder，则是确认收货
        if (this.payType === 'endOrder') {
          this.requestPay1('/order/order_end');
        } else if ((this.payType === 'withdraw1') || (this.payType === 'withdraw2')) {
          // 提现
          this.requestPay2('/withdrawals/apply');
        } else {
          // 支付
          this.requestPay1('/order_pay/balance_payment');
        }
        // 成功或是失败都密码重置，关闭密码框
        this.close();
        this.password = '';
      }
    },
    requestPay1 (url) {
      this.axios.post(url, {
        id: this.orderId,
        pwd: this.password
      })
        .then(({data}) => {
          this.isRequest = true;
          if (parseInt(data.status) === 1) {
            this.callback();
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    requestPay2 (url) {
      let type;
      if (this.payType === 'withdraw1') {
        type = 1;
      } else if (this.payType === 'withdraw2') {
        type = 2;
      }
      this.axios.post(url, {
        types: type,
        money: this.withdraw,
        pwd: this.password
      })
        .then(({data}) => {
          this.isRequest = true;
          if (parseInt(data.status) === 1) {
            this.callback();
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    inputFoces () {
      this.isFocus = true;
    },
    hasBlur () {
      this.isFocus = false;
    },
    toEditPassword () {
      this.$router.push({path: 'revisePassword', query: {type: 'pay'}});
      this.password = '';
    }
  },
  components: {
    addressBox
  }
};
</script>

<style lang="scss">
  @import '../assets/css/base.scss';
  .modal_wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    transform: 0.3s;
    z-index: 100;
    .default{
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 32px 46px;
      border-radius: 6px;
      font-size: 24px;
      text-align: center;
      color: #333;
      i.iconfont{
        position: absolute;
        right: 14px;
        top: 14px;
        font-size: 28px;
        padding: 6px;
      }
      .title{
        font-size: 26px;
        display: block;
        padding-bottom: 28px;
        @include border;
      }
      .modal_content{
        padding: 36px 0 44px;
        text-align: left;
        .text{
          line-height: 40px;
          font-size: 24px;
        }
      }
      .btnClass{
        width: 100%;
        border-radius: 4px;
        background-color: #FFE5E6;
        color: $color;
        height: 68px;
        line-height: 68px;
        font-size: 24px;
      }
    }
    // 优惠券
    .voucher{
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 32px 46px;
      border-radius: 6px;
      font-size: 24px;
      text-align: center;
      color: #333;
      img{
        width: 100%;
      }
      i.iconfont{
        position: absolute;
        right: 30px;
        top: -40px;
        font-size: 38px;
        padding: 12px;
        color: #fff;
      }
      .price{
        position: absolute;
        top: 51%;
        left: 51%;
        transform: translate(-50%, -50%);
        font-size: 80px;
        display: block;
        color: #F95C4F;
      }
      .btnClass{
        width: 90%;
        height: 76px;
        line-height: 76px;
        border-radius: 38px;
        background-color: #F95C4F;
        color: #fff;
        font-size: 30px;
        margin-top: 40px;
        transform: translateX(10px);
      }
    }
    // 设置支付密码
    .set_password{
      width: 86%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 40px 48px;
      border-radius: 6px;
      font-size: 24px;
      color: #333;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      .iconfont.icon-warnfill{
        color: $color;
        font-size: 50px;
        align-self: center;
      }
      .title{
        padding: 0 12%;
        font-size: 24px;
        line-height: 32px;
        margin: 30px 0 40px;
        align-self: center;
        text-align: center;
      }
      i.iconfont.icon-close{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 38px;
        padding: 12px;
        color: #999;
      }
      >label{
        width: 100%;
        border-bottom: 1px solid $color;
        display: flex;
        align-items: center;
        height: 72px;
        line-height: 72px;
        padding-left: 20px;
        margin-top: 20px;
        >i{
          font-size: 40px;
          color: $color;
          margin-right: 30px;
        }
        input{
          flex: 1;
          font-size: 24px;
          color: #333;
          background-color: #fff;
          line-height: 36px;
        }
      }
      .sms_wrap{
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid $color;
        position: relative;
        >label{
          display: flex;
          height: 72px;
          line-height: 72px;
          padding-left: 20px;
          margin-top: 20px;
          >i{
            font-size: 40px;
            color: $color;
            margin-right: 30px;
          }
          input{
            flex: 1;
            font-size: 24px;
            color: #333;
          }
        }
        >button.send_btn{
          min-width: 140px;
          padding: 0 10px;;
          background-color: transparent;
          position: absolute;
          right: 0;
          transform: translate(-50%, 10px);
          bottom: 0;
          font-size: 22px;
          color: $color;
          position: relative;
          &::before{
            position: absolute;
            content: '';
            display: block;
            width: 1px;
            height: 2em;
            top: 50%;
            left: 0;
            background-color: $color;
            transform: translateY(-50%);
          }
          &.is_send{
            color: #999;
          }
          &.no_send{
            color: $color;
          }
        }
      }
      .btnClass{
        margin-top: 54px;
        width: 100%;
        height: 68px;
        line-height: 68px;
        background-color: #FFE5E6;
        color: $color;
        font-size: 26px;
      }
    }
    // 支付密码弹框
    .pay_password{
      width: 86%;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      padding: 0 48px;
      border-radius: 4px;
      font-size: 24px;
      color: #333;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      i.iconfont.icon-close{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 36px;
        padding: 8px;
        color: #999;
      }
      .title{
        width: 100%;
        text-align: center;
        font-size: 28px;
        border-bottom: 1px solid #e6e6e6;
        color: #333;
        align-self: center;
        padding: 34px 0;
      }
      .password_input{
        width: 100%;
        margin: 30px 0 80px;
        position: relative;
        label{
          width: 100%;
          margin-top: 32px;
          ul{
            display: flex;
            li{
              flex: 1;
              border: 1px solid #e6e6e6;
              height: 76px;
              line-height: 76px;
              display: flex;
              justify-content: center;
              align-items: center;
              .iconfont{
                font-size: 40px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                top: 2px;
              }
              &:not(:first-child){
                border-left-color: transparent;
              }
              &.is_focus{
                box-shadow: inset 0 0 1px 2px #ffe5e6;
                border: 1px solid #ffe5e6;
                margin-left: -1px;
              }
            }
          }
        }
        input{
          margin-top: 20px;
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          opacity: 0;
        }
      }
      .forget{
        color: $color;
        text-decoration: underline;
        position: absolute;
        bottom: 30px;
        right: 30px;
        font-size: 20px;
      }
    }
  }
</style>
