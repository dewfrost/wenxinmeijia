<template>
  <div class="revisePassword">
    <div class="bind">
      <label for="phone">手机号</label>
      <input id="phone" type="text" placeholder="请输入您的手机号"  v-model= 'showPhone' @input = 'isRightPhone' :disabled="this.user.phone ? true : false">
    </div>
    <div class="bind"  v-if="this.$route.query.type === 'login'" fixed>
      <label for="code">验证码</label>
      <input  class="idcode" id="code" type="number" placeholder="请输入验证码" v-model= 'user.code'>
      <button class="modify_btn" :class="{'send-sms' : isSend1, 'no-send-sms': !isSend1}" @click ='sendSMS1' :disabled ='disabled1 || sendSMSTime1 >0'>{{btntxt1}}</button>
    </div>
    <div class="bind" v-if="this.$route.query.type === 'pay'" fixed>
      <label for="code">验证码</label>
      <input  class="idcode" id="code" type="number" placeholder="请输入验证码" v-model= 'user.code'>
      <button class="modify_btn" :class="{'send-sms' : isSend2, 'no-send-sms': !isSend2}" @click ='sendSMS2' :disabled ='disabled2 || sendSMSTime2 >0'>{{btntxt2}}</button>
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
        phone: '',
        code: '',
        password: '',
        pas: ''
      },
      isSend1: false,
      isSend2: false,
      sendSMSTime1: 0,
      sendSMSTime2: 0,
      disabled1: false,
      disabled2: false,
      btntxt1: '获取验证码',
      btntxt2: '获取验证码'
    };
  },
  beforeMount: function () {
    this.getPhone(this.user);
  }, // 挂载之前
  mounted: function () {
    if (this.$route.query.type === 'login') {
      this.getHeader('修改登录密码', 'revisePassword_top');
    } else {
      this.getHeader('修改支付密码', 'revisePassword_top');
    }
  },
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
    sendSMS1: function () {
      this.disabled1 = true;
      // 判断手机号是否为空
      if (!this.user.phone) {
        this.toast('手机号不能为空');
      } else {
        // 获取验证码
        this.getCode(this.user.phone, 3, () => {
          this.sendSMSTime1 = 60;
          this.isSend1 = true;
          this.disabled1 = true;
          this.btntxt1 = '已发送(' + this.sendSMSTime1 + ')s';
          this.timer();
        }, () => {
          this.disabled1 = false;
        });
      }
    },
    timer () {
      // 第一步
      if (this.$route.query.type === 'login') {
        let time = setInterval(() => { // 声明一个定时器
          if (this.sendSMSTime1 > 0) {
            this.sendSMSTime1--;
            this.btntxt1 = '已发送(' + this.sendSMSTime1 + ')s';
          } else {
            this.sendSMSTime1 = 0;
            this.btntxt1 = '重新获取';
            this.disabled1 = false;
            clearInterval(time);
          }
        }, 1000);
      } else {
        // 第二步
        let time = setInterval(() => { // 声明一个定时器
          if (this.sendSMSTime2 > 0) {
            this.sendSMSTime2--;
            this.btntxt2 = '已发送(' + this.sendSMSTime2 + ')s';
          } else {
            this.sendSMSTime2 = 0;
            this.btntxt2 = '重新获取';
            this.disabled2 = false;
            clearInterval(time);
          }
        }, 1000);
      }
    },
    sendSMS2: function () {
      this.disabled2 = true;
      // 判断手机号是否为空
      if (!this.user.phone) {
        this.toast('手机号不能为空');
      } else {
        // 获取验证码
        this.getCode(this.user.phone, 4, () => {
          this.sendSMSTime2 = 60;
          this.isSend2 = true;
          this.disabled2 = true;
          this.btntxt2 = '已发送(' + this.sendSMSTime2 + ')s';
          this.timer();
        }, () => {
          this.disabled2 = false;
        });
      }
    },
    // 点击确认
    link: function () {
      // 修改登录密码
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
          that.submitLogin();
        }
      } else {
        // 修改支付密码
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
          that.submitPay();
        }
      }
    },
    // 修改登录密码-接口
    submitLogin () {
      this.axios.post('/user/editLogin', {
        password: this.user.password,
        repassword: this.user.pas,
        code: this.user.code
      })
      .then(({data}) => {
        if (data.status === 1) {
          this.modal('提示', '登录密码已修改成功，请重新登录。', '确定', () => {
            // 请求退出登录接口
            this.logout();
          }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
        } else {
          this.toast(data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    logout () {
      this.axios.post('/user/exitlogin', {
      })
      .then(({data}) => {
        if (data.status === 1) {
          this.$router.push('login');
          this.toast(data.message);
        } else {
          this.toast(data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 修改支付密码-接口
    submitPay () {
      this.axios.post('/user/paymentPassword', {
        password: this.user.password,
        repassword: this.user.pas,
        code: this.user.code
      })
      .then(({data}) => {
        if (data.status === 1) {
          this.modal('提示', '支付密码已修改成功。', '确定', () => {
            this.$router.go(-1);
          }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
        } else {
          this.toast(data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
  .fixed{
    position: relative;
    #code{
      position: absolute;
      top: 38%;
      right: 30%;
    }
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
