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
    <div class="pay_password" v-if="show === 'payPassword'">
    </div>
    <!-- 设置支付密码弹框 -->
    <div class="set_password" v-if="show === 'setPassword'">
      <label for="phone" class="iconfont icon-shouji">
        <input type="number" id="phone" v-model="user.phone" @input="isRightPhone" placeholder="请输入您的手机号" />
      </label>
      <div class="sms-box">
        <label for="sms" class="iconfont icon-xinxi">
          <input type="number" id="sms" v-model="user.code" placeholder="请输入短信验证码" />
        </label>
        <button @click="sendSMS" :class="{'is_send': disabled}" :disabled="disabled || sendSMSTime > 0">{{btntxt}}</button>
      </div>
      <label for="password" class="iconfont icon-suo">
        <input type="password" id="password" v-model="user.password" placeholder="请设置您的密码（字母+数字）" />
      </label>
      <label for="pwd" class="iconfont icon-suo">
        <input type="password" id="pwd" v-model="user.pwd" placeholder="请确认您的密码" />
      </label>
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
        pad: ''
      }
    };
  },
  beforeMount: function () {
    // 监听事件
    this.getEvent();
  },
  beforeDestroy: function () {
    // 取消监听
    eventBus.$off('modal');
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
          // 地址
          this.data = data;
        }
      });
    },
    close: function () {
      this.modal = false;
    },
    buttonBox: function () {
      this.callback();
      this.modal = false;
    }
    // 首页代金券组件
    // eventBus.$emit('modal', {
    //   title: '￥10.00',
    //   show: 'voucher',
    //   btnTitle: '立即领取',
    //   callback: function () {
    //     alert(1);
    //   }
    // });
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
    position: fixed;
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
  }
</style>
