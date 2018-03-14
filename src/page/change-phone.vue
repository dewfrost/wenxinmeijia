<template>
  <div class="changePhone">
    <div class="bind" v-if="this.$route.query.type === 'now'">
      <label for="phone">当前手机号</label>
      <input id="phone" type="text" placeholder="请输入您的手机号"  v-model= 'showPhone' @input = 'isRightPhone' :disabled="phoneDisablrd">
    </div>
    <div class="bind" v-if="this.$route.query.type === 'new'">
      <label for="phone">新手机号</label>
      <input id="phone" type="number" placeholder="请输入要绑定的新手机号"  v-model= 'user.newPhone' @input = 'isRightPhone' :disabled="phoneDisablrd">
    </div>
    <div class="bind" v-if="this.$route.query.type === 'now'">
      <label for="code">验证码</label>
      <input id="code" type="number" placeholder="请输入验证码" v-model= 'user.code'>
      <button class="modify-btn" :class="{'send-sms' : !isSend, 'no-send-sms': isSend}" @click ='sendSMS' :disabled ='disabled || sendSMSTime >0'>{{btntxt}}</button>
    </div>
    <div class="bind" v-if="this.$route.query.type === 'new'">
      <label for="code">验证码</label>
      <input id="code" type="number" placeholder="请输入验证码" v-model= 'user.newCode'>
      <button class="modify-btn" :class="{'send-sms' : !isSend, 'no-send-sms': isSend}" @click ='sendSMS' :disabled ='disabled || sendSMSTime >0'>{{btntxt}}</button>
    </div>
    <button class="link" @click="next" v-if="this.$route.query.type === 'now'">下一步</button>
    <button class="link" @click="sure" v-if="this.$route.query.type === 'new'">确认</button>
  </div>
</template>

<script>
export default {
  name: 'changePhone',
  data () {
    return {
      // 数据
      user: {
        phone: '13700000000',
        newPhone: '',
        code: '',
        newCode: ''
      },
      phoneDisablrd: false,
      isSend: false,
      sendSMSTime: 0,
      disabled: false,
      btntxt: '获取验证码'
    };
  },
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    this.getHeader('更换手机号', 'changePhone_top');
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
        this.sendSMSTime = 60;
        this.disabled = true;
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
    next: function () {
      if (!this.user.code) {
        this.toast('验证码不能为空');
      } else {
        this.$router.push({path: 'changePhone', query: {type: 'new'}});
      }
    },
    sure: function () {
      if (!this.user.newPhone) {
        this.toast('手机号不能为空');
      } else if (!this.user.newCode) {
        this.toast('验证码不能为空');
      } else {
        let that = this; // 如果回调函数中用到this，则这行代码必须有
        this.modal('提示', '手机号已修改成功，请重新登录。', '确定', function (index) {
          that.$router.push('userCenter');
        }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
      }
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

    }
    input{
      width: 314px;
      font-size: 24px;
      text-align: right;
      background: transparent;
    }
    button{
      width: 145px;
      height: 50px;
      margin-left: -10px;
      margin-top: 17.5px;
      color: $color;
      text-align: right;
      font-size: 24px;
      background: #fff;
      border-left: 1px solid $color;
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
