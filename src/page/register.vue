<template>
  <div class="register">
    <div class="register_main">
      <img :src="love" alt="">
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
        <input type="password" id="pwd" v-model="user.pad" placeholder="请确认您的密码" />
      </label>
      <button class="register_btn" @click="registerSubmit">注册</button>
    </div>
    <span class="registration" @click="seclectP">
      <i class="iconfont" :class="{'icon-30xuanzhongyuanxingfill': select,'icon-30xuanzhongyuanxing': !select}"></i>
      <span class="agree">同意</span>
      <router-link :to="{path:'registrationAgreement'}" tag="span" class="registration_link">《用户注册协议》</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      // 数据
      user: {
        phone: '',
        code: '',
        password: '',
        pad: ''
      },
      love: require('../assets/images/love.png'),
      select: true,
      disabled: false,
      sendSMSTime: 0,
      btntxt: '获取验证码'
    };
  },
  mounted: function () {
    this.getHeader('注册', 'register_top', '登录', function () {
      this.$router.push('login');
    });
  },
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
      this.disabled = true;
      // 判断手机号是否为空
      if (!this.user.phone) {
        this.toast('手机号不能为空');
      } else {
        // 获取验证码
        this.getCode(this.user.phone, 1, () => {
          this.sendSMSTime = 60;
          this.isSend = true;
          this.disabled = true;
          this.btntxt = '已发送(' + this.sendSMSTime + ')s';
          this.timer();
        }, () => {
          this.disabled = false;
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
          this.btntxt = '重新获取';
          this.disabled = false;
          clearInterval(time);
        }
      }, 1000);
    },
    // 点击注册
    registerSubmit: function () {
      if (!this.select) {
        this.toast('同意注册协议才可以注册');
      } else if (!this.user.phone) {
        this.toast('手机号不能为空');
      } else if (!/^(1[3-9])\d{9}$/.test(this.user.phone)) {
        this.toast('手机号格式错误');
      } else if (!this.user.code) {
        this.toast('验证码不能为空');
      } else if (!this.user.password) {
        this.toast('设置密码不能为空');
      } else if (this.user.password && !/^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/.test(this.user.password)) {
        this.toast('设置的密码格式不正确');
      } else if (!this.user.pad) {
        this.toast('确认密码不能为空');
      } else if (this.user.pad !== this.user.password) {
        this.toast('两次输入的密码不一致');
      } else {
        // 请求注册
        this.doSubmit();
      }
    },
    doSubmit () {
      // 如果路由有上级参数
      if (this.$route.query.pid) {
        this.axios.post('/login/register', {
          phone: this.user.phone,
          password: this.user.password,
          repassword: this.user.pad,
          code: this.user.code,
          pid: this.$route.query.pid
        })
          .then(({data}) => {
            if (data.status === 1) {
              this.toast('注册成功，请登录');
              this.$router.push('login');
            } else {
              this.toast(data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
      // 路由没有上级参数
        this.axios.post('/login/register', {
          phone: this.user.phone,
          password: this.user.password,
          repassword: this.user.pad,
          code: this.user.code,
          pid: ''
        })
          .then(({data}) => {
            if (data.status === 1) {
              this.toast('注册成功，请登录');
              this.$router.push('login');
            } else {
              this.toast(data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    // 是否同意用户注册协议
    seclectP: function () {
      this.select = !this.select;
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.register_top {
  background: transparent;
  border: none;
}
.register {
  min-height: 100%;
  padding: 220px 70px 85px;
  background: url(../assets/images/register.png) no-repeat #ffffff center top;
  .register_main {
    img {
      display: block;
      border-style: none;
      margin: 0 auto;
      margin-bottom: 65px;
    }
    > label.iconfont {
      margin-bottom: 40px;
      height: 72px;
      line-height: 72px;
      display: inline-block;
      width: 100%;
      border: 1px solid $color;
      border-radius: 34px;
      display: flex;
      align-items: center;
      &:before {
        color: $color;
        font-size: 40px;
        padding-left: 41px;
        padding-right: 29px;
      }
      > input {
        font-size: 24px;
        line-height: 72px;
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
    }
    .sms-box {
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      border: 1px solid $color;
      border-radius: 34px;
      > label.iconfont {
        height: 72px;
        line-height: 72px;
        display: inline-block;
        display: flex;
        align-items: center;
        &:before {
          color: $color;
          font-size: 36px;
          padding-left: 41px;
          padding-right: 29px;
        }
        > input {
          font-size: 24px;
          line-height: 72px;
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
      }
      button {
        background: #fff;
        color: #ff517b;
        border: none;
        font-size: 22px;
        padding-left: 20px;
        margin-right: 32px;
        min-width: 140px;
        border-left: 1px solid #ff517b;
        &.is_send{
          color: #999;
        }
      }
    }
    .register_btn {
      margin-top: 40px;
      width: 500px;
      height: 72px;
      border-radius: 34px;
      line-height: 72px;
      color: #fff;
      background: $color;
      font-size: 26px;
    }
  }
  span.registration {
    margin-top: 26px;
    display: inline-block;
    color: #333;
    font-size: 22px;
    i.iconfont{
      color: $color;
      font-size: 26px;
      position: relative;
      top: 1px;
      &.icon-30xuanzhongyuanxingfill{
        color: $color;
      }
      &.icon-30xuanzhongyuanxing{
        color: #666;
      }
    }
    span.registration_link {
      color: $color;
    }
  }
}
</style>
