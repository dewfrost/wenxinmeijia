<template>
  <div class="zfbUnbind">
    <div class="bind">
      <label for="idCode">支付宝账号</label>
      <input id="idcode" type="text" placeholder="请填写您的支付宝账号" v-model= 'showAlipay' @input = 'isRightPhone' disabled >
    </div>
    <div class="bind">
      <label for="phone">手机号</label>
      <input id="phone" type="text" placeholder="请输入您的手机号" v-model= 'showPhone' @input = 'isRightPhone' :disabled="phoneDisablrd">
    </div>
    <div class="bind">
      <label for="password">登录密码</label>
      <input id="password" type="password" placeholder="请输入您在本平台的登录密码" v-model= 'user.password'>
    </div>
    <div class="bind">
      <label for="code">验证码</label>
      <input class="idcode" id="code" type="number" placeholder="请输入验证码" v-model= 'user.code'>
      <button class="modify_btn" :class="{'send-sms' : isSend, 'no-send-sms': !isSend}" @click ='sendSMS' :disabled ='disabled || sendSMSTime >0'>{{btntxt}}</button>
    </div>
    <button class="link" @click="link">确认</button>
  </div>
</template>

<script>
export default {
  name: 'zfbUnbind',
  data () {
    return {
      // 数据
      user: {},
      phoneDisablrd: false,
      isSend: false,
      sendSMSTime: 0,
      disabled: false,
      btntxt: '获取验证码'
    };
  },
  created: function () {},
  beforeMount: function () {
    this.getPhone(this.user);
    this.getIdcode();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('支付宝解绑', 'zfbUnbind_top');
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  }, // 实例销毁前调用,解绑中间层的数据传输
  destroyed: function () {}, // 实例销毁后调用
  computed: {
    // 手机号隐藏中间数字
    showAlipay () {
      if (!this.user.idCode) {
        return false;
      } else if ((/@/g).test(this.user.idCode)) {
        return this.user.idCode.replace(/(\w{2})\w*(@)/, '$1***$2');
      } else {
        return this.user.idCode.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      }
    },
    showPhone () {
      if (!this.user.phone) {
        return false;
      } else {
        let phone = this.user.phone;
        return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      }
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
        // 获取验证码--接口
        this.getCode(this.user.phone, 6, () => {
          this.sendSMSTime = 60;
          this.isSend = true;
          this.disabled = true;
          this.btntxt = '已发送(' + this.sendSMSTime + ')s';
          this.timer();
        });
      }
    },
    timer () {
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
    },
    // 点击确认
    link: function () {
      if (!this.user.password) {
        this.toast('密码不能为空');
      } else if (!this.user.code) {
        this.toast('验证码不能为空');
      } else {
        this.submit();
      }
    },
    // 确认-接口
    submit () {
      this.axios.post('/user/unAlipay', {
        password: this.user.password,
        code: this.user.code
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.$router.go(-1);
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 获取支付宝账号
    getIdcode () {
      this.axios.get('/user/zhifubao', {
      })
      .then(({data}) => {
        if (data.status === 1) {
          this.user.idCode = data.data[0].zhifubao;
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
.zfbUnbind{
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
    #idcode{
      color: #333;
    }
    label{
      width: 170px;
    }
    input{
      min-width: 314px;
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
