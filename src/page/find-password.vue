<template>
  <div class="findPassword">
   
    <div class="findPassword_main">
       <span></span>
      <label for="phone" class="iconfont icon-shouji">
        <input type="number" id="phone" v-model="user.phone" @input="isRightPhone" placeholder="请输入您的手机号" />
      </label>
      <label for="sms" class="iconfont icon-xinxi">
        <input type="number" id="sms" v-model="user.code" placeholder="请输入短信验证码" />
        <button class="button" :class="{'is_send': disabled}" @click="sendSMS" :disabled="disabled || sendSMSTime > 0">{{btntxt}}</button>
      </label>
      <label for="password" class="iconfont icon-suo">
        <input type="password" id="password" v-model="user.password" placeholder="请设置您的密码（字母+数字）" />
      </label>
      <label for="pwd" class="iconfont icon-suo">
        <input type="password" id="pwd" v-model="user.pad" placeholder="请确认您的密码" />
      </label>
      <button class="findPassword_btn" @click="findPasswordSubmit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'findPassword',
  data () {
    return {
      // 数据
      user: {
        phone: '',
        code: '',
        password: '',
        pad: ''
      },
      disabled: false,
      sendSMSTime: 0,
      btntxt: '获取验证码'
    };
  },
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    this.getHeader('找回密码', 'findPassword_top');
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  }, // 实例销毁前调用,解绑中间层的数据传输
  destroyed: function () {}, // 实例销毁后调用
  methods: {
    // 输入手机号
    isRightPhone: function () {
      // 判断是否开始倒计时，开始倒计时则不再触发事件
      let buttonText = /[0-9]/g;
      if (buttonText.test(this.btntxt)) {
        return;
      }
      // 判断手机格式是否正确，阻止用户发送验证码
      let checkPhone = /^(1[3-9])\d{9}$/;
      if (checkPhone.test(this.user.phone)) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 获取验证码
    sendSMS: function () {
      // 判断手机号是否为空
      if (!this.user.phone) {
        this.toast('手机号不能为空');
      } else {
        this.sendSMSTime = 60;
        this.disabled = true;
        this.btntxt = '已发送(' + this.sendSMSTime + ')s';
        let time = setInterval(() => { // 声明一个定时器
          if (this.sendSMSTime > 0) {
            this.sendSMSTime--;
            this.btntxt = '已发送(' + this.sendSMSTime + ')s';
          } else {
            this.sendSMSTime = 0;
            this.btntxt = '重新获取';
            this.disabled = false;
            clearInterval(time);
          }
        }, 1000);
      }
    },
    // 点击登录跳转页面
    findPasswordSubmit: function () {
      if (!this.user.phone) {
        this.toast('手机号不能为空');
      } else if (!/^(1[3-9])\d{9}$/.test(this.user.phone)) {
        this.toast('手机号格式错误');
      } else if (!this.user.code) {
        this.toast('验证码不能为空');
      } else if (!this.user.password) {
        this.toast('密码不能为空');
      } else if (!this.user.pad) {
        this.toast('确认密码不能为空');
      } else if (this.user.password !== this.user.pad) {
        this.toast('两次输入的密码不同');
      } else if (!/^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/.test(this.user.password)) {
        this.toast('密码格式不正确');
      } else {
        this.toast('找回密码成功，请登录');
        this.$router.push('login');
      }
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.find-password_top {
  background: transparent;
  border: none;
}
.findPassword {
  min-height: 100%;
  padding: 90px 30px 312px;
 
  .findPassword_main {
    span {
      display: block;
      width: 113%;
      height: 10px;
      margin-left: -30px;
      background: #f5f5f5;
    }
    > label {
        padding-top: 40px;
        line-height: 110px;
        width: 100%;
        display: flex;
        align-items: flex-end;
        border-bottom: 1px solid #e6e6e6;
      &:before {
        color: $color;
        font-size: 40px;
        padding-left: 41px;
        padding-right: 29px;
        line-height: 65px;
      }
      > input {
        font-size: 24px;
        line-height: 68px;
        display: flex;
        width: 100%;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0);
        &::-webkit-input-placeholder {
          color: #999999;
        } /* 使用webkit内核的浏览器 */
        :-moz-placeholder {
          color: #999;
        } /* Firefox版本4-18 */
        ::-moz-placeholder {
          color: #999;
        } /* Firefox版本19+ */
        :-ms-input-placeholder {
          color: #999;
        } /* IE浏览器 */
      }
      .button{
        min-width: 160px;
        height: 68px;
        line-height: 68px;
        color: $color;
        background: transparent;
        font-size: 22px;
        position: relative;
        &::before{
          position: absolute;
          content: '';
          display: block;
          height: 2em;
          width: 1px;
          background-color: $color;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        &.is_send{
          color: #999;
        }
      }
    }
    .findPassword_btn {
      width: 500px;
      height: 68px;
      display: block;
      margin: 170px auto 0;
      border-radius: 4px;
      line-height: 72px;
      color: #fff;
      background: $color;
      font-size: 26px;
    }
  }
}
</style>
