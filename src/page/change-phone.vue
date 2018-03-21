<template>
  <div class="changePhone">
    <div class="bind" v-if="step === 1">
      <label for="phone">当前手机号</label>
      <input id="phone" type="text" placeholder="请输入您的手机号"  v-model= 'showPhone' @input='isRightPhone' :disabled="phoneDisablrd">
    </div>
    <div class="bind" v-if="step === 2">
      <label for="phone">新手机号</label>
      <input id="phone" type="number" placeholder="请输入要绑定的新手机号"  v-model= 'user.newPhone' @input='isRightPhone' :disabled="phoneDisablrd">
    </div>
    <div class="bind" v-if="step === 1">
      <label for="code">验证码</label>
      <input class="idcode" id="code" type="number" placeholder="请输入验证码" v-model= 'user.code'>
      <button class="modify_btn" :class="{'send-sms' : isSend1, 'no-send-sms': !isSend1}" @click ='sendSMS1' :disabled ='disabled1 || sendSMSTime1 >0'>{{btntxt1}}</button>
    </div>
    <div class="bind" v-if="step === 2">
      <label for="code">验证码</label>
      <input  class="idcode" id="code" type="number" placeholder="请输入验证码" v-model= 'user.newCode'>
      <button class="modify_btn" :class="{'send-sms' : isSend2, 'no-send-sms': !isSend2}" @click ='sendSMS2' :disabled ='disabled2 || sendSMSTime2 >0'>{{btntxt2}}</button>
    </div>
    <button class="link" @click="next" v-if="step === 1">下一步</button>
    <button class="link" @click="sure" v-if="step === 2">确认</button>
  </div>
</template>

<script>
export default {
  name: 'changePhone',
  data () {
    return {
      step: 1,
      // 数据
      user: {
        phone: '',
        newPhone: '',
        code: '',
        newCode: ''
      },
      phoneDisablrd: false,
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
  created: function () {},
  beforeMount: function () {
    this.getPhone(this.user);
  }, // 挂载之前
  mounted: function () {
    this.getHeader('更换手机号', 'changePhone_top');
  }, // 挂载之后
  updated: function () {
  },
  computed: {
    // 手机号隐藏中间数字
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
      if (this.step === 1) {
        if (checkPhone.test(this.user.phone)) {
          this.isSend1 = false;
          this.disabled1 = false;
        } else {
          this.isSend1 = true;
          this.disabled1 = true;
        }
      } else {
        if (checkPhone.test(this.user.newPhone)) {
          this.isSend2 = false;
          this.disabled2 = false;
        } else {
          this.isSend2 = true;
          this.disabled2 = true;
        }
      }
    },
    // 获取验证码
    sendSMS1: function () {
      // 判断手机号是否为空
      if (!this.user.phone) {
        this.toast('手机号不能为空');
      } else {
        // 获取验证码
        this.getCode(this.user.phone, 5, () => {
          this.sendSMSTime1 = 60;
          this.isSend1 = true;
          this.disabled1 = true;
          this.btntxt1 = '已发送(' + this.sendSMSTime1 + ')s';
          this.timer();
        });
      }
    },
    timer () {
      // 第一步
      if (this.step === 1) {
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
      // 判断手机号是否为空
      if (!this.user.phone) {
        this.toast('手机号不能为空');
      } else {
        // 获取验证码
        this.getCode(this.user.newPhone, 0, () => {
          this.sendSMSTime2 = 60;
          this.isSend2 = true;
          this.disabled2 = true;
          this.btntxt2 = '已发送(' + this.sendSMSTime2 + ')s';
          this.timer();
        });
      }
    },
    next: function () {
      // 请求接口
      if (!this.user.code) {
        this.toast('验证码不能为空');
      } else {
        this.submitNext();
        this.step = 2;
      }
    },
    // 获取下一个-接口
    submitNext () {
      this.axios.get('/user/changePhone', {
        params: {
          code: this.user.code
        }
      })
      .then(({data}) => {
        if (data.status === 1) {
          this.toast('验证成功');
        } else {
          this.toast(data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    sure: function () {
      if (!this.user.newPhone) {
        this.toast('手机号不能为空');
      } else if (!this.user.newCode) {
        this.toast('验证码不能为空');
      } else {
        this.submitSure();
        let that = this; // 如果回调函数中用到this，则这行代码必须有
        this.modal('提示', '手机号已修改成功，请重新登录。', '确定', function (index) {
          that.$router.push('login');
        }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
      }
    },
    // 确认接口
    submitSure () {
      this.axios.get('/user/newphone', {
        params: {
          phone: this.user.newPhone,
          code: this.user.newCode
        }
      })
      .then(({data}) => {
        if (data.status === 1) {
          this.toast('手机号修改成功');
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
.changePhone{
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
