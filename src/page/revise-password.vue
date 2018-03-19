<template>
  <div class="revisePassword">
    <div class="bind">
      <label for="phone">手机号</label>
      <input id="phone" type="text" placeholder="请输入您的手机号"  v-model= 'showPhone' @input = 'isRightPhone' :disabled="phoneDisablrd">
    </div>
    <div class="bind">
      <label for="code">验证码</label>
      <input  class="idcode" id="code" type="number" placeholder="请输入验证码" v-model= 'user.code'>
      <button class="modify_btn" :class="{'send-sms' : isSend, 'no-send-sms': !isSend}" @click ='sendSMS' :disabled ='disabled || sendSMSTime >0'>{{btntxt}}</button>
    </div>
    <div class="bind">
      <label for="password">新密码</label>
      <input id="password" type="password" placeholder="请设置新的登录密码（字母+数字）" v-model= 'user.password' v-if="this.$route.query.type === 'login'">
      <input id="password" type="password" placeholder="请设置6位纯数字密码" v-model= 'user.password' v-if="this.$route.query.type === 'pay'">
    </div>
    <div class="bind">
      <label for="pas">确认密码</label>
      <input id="pas" type="password" placeholder="再次确认新的登录密码" v-model= 'user.pas' v-if="this.$route.query.type === 'login'">
      <input id="pas" type="password" placeholder="再次确认新的支付密码" v-model= 'user.pas' v-if="this.$route.query.type === 'pay'">
    </div>
    <button class="link" @click="link">确认</button>
  </div>
</template>

<script>
export default {
  name: 'revisePassword',
  data () {
    return {
      // 数据
      user: {
        phone: '13700000000',
        code: '',
        password: '',
        pas: ''
      },
      phoneDisablrd: true,
      isSend: false,
      sendSMSTime: 0,
      disabled: false,
      btntxt: '获取验证码'
    };
  },
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    if (this.$route.query.type === 'login') {
      this.getHeader('修改登录密码', 'revisePassword_top');
    } else {
      this.getHeader('修改支付密码', 'revisePassword_top');
    }
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  }, // 实例销毁前调用,解绑中间层的数据传输
  destroyed: function () {}, // 实例销毁后调用
  computed: {
    // 手机号隐藏中间数字
    showPhone () {
      return this.hidePhone(this.user.phone);
    }
  },
  methods: {
    isRightPhone: function () {
      // 判定是否开始倒计时，开始倒计时则不再触发按钮点亮事件
      let buttonText = /[0-9]/g;
      if (buttonText.test(this.btntxt)) {
        return;
      }
      // 判断手机格式是否正确，阻止用户发送验证码
      let checkPhone = /^(1[3-9])\d{9}$/;
      if (checkPhone.test(this.user.phone)) {
        this.isSend = false;
        this.disabled = false;
      } else {
        this.isSend = true;
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
        this.isSend = true;
        this.disabled = true;
        this.btntxt = '已发送(' + this.sendSMSTime + ')s';
        let time = setInterval(() => { // 声明一个定时器
          if (this.sendSMSTime > 0) {
            this.sendSMSTime--;
            this.btntxt = '已发送(' + this.sendSMSTime + ')s';
          } else {
            this.sendSMSTime = 0;
            this.isSend = false;
            this.btntxt = '重新获取';
            this.disabled = false;
            clearInterval(time);
          }
        }, 1000);
      }
    },
    // 点击确认
    link: function () {
      if (this.$route.query.type === 'login') {
        if (!this.user.code) {
          this.toast('验证码不能为空');
        } else if (!this.user.password) {
          this.toast('新密码不能为空');
        } else if (this.user.password && !/^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/.test(this.user.password)) {
          this.toast('密码格式不正确');
        } else if (!this.user.pas) {
          this.toast('确认密码不能为空');
        } else if (this.user.pas !== this.user.password) {
          this.toast('两次输入的密码不一致');
        } else {
          let that = this; // 如果回调函数中用到this，则这行代码必须有
          this.modal('提示', '登录密码已修改成功，请重新登录。', '确定', function (index) {
            that.$router.push('login');
          }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
        }
      } else {
        console.log(this.user.password);
        if (!this.user.code) {
          this.toast('验证码不能为空');
        } else if (!this.user.password) {
          this.toast('新密码不能为空');
        } else if (!/^\d{6}$/.test(this.user.password)) {
          this.toast('密码格式不正确');
        } else if (!this.user.pas) {
          this.toast('确认密码不能为空');
        } else if (this.user.pas !== this.user.password) {
          this.toast('两次输入的密码不一致');
        } else {
          let that = this; // 如果回调函数中用到this，则这行代码必须有
          this.modal('提示', '支付密码已修改成功', '确定', function (index) {
            that.$router.go(-1);
          }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.revisePassword{
  padding-top: 90px;
  min-height: 100%;
  background: #f5f5f5;
  &:before{
    content: '';
    display: block;
    width: 100px;
    height: 20px;
    background: #f5f5f5;
  }
  .bind{
    line-height: 85px;
    background: #fff;
    padding: 0 30px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    #code{
      width: 315px;
    }
    label{
      width: 170px;
    }
    input{
      min-width: 366px;
      font-size: 24px;
      text-align: right;
      background: transparent;
    }
    .idcode{
      min-width: 80px;
      padding-right: 20px;
    }
    .modify_btn{
      min-width: 155px;
      height: 50px;
      margin-top: 17.5px;
      color: $color;
      text-align: right;
      font-size: 24px;
      background: #fff;
      border-left: 1px solid $color;
      &.send-sms{
        color: #999;
      }
      &.no-send-sms{
        color: $color;
      }
    }  
  }
  .link{
    width: 500px;
    line-height: 68px;
    background: $color;
    color: #fff;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
    margin-top: 129px;
    font-size: 24px;
  }
}
</style>
