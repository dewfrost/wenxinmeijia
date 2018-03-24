<template>
  <div class="login">
   <div class="login_logo"> 
     <img src="../assets/images/love.png" alt="">
   </div>
   <div class="login_center">
    <div class="phone iconfont icon-shouji">
      <input type="number" id="phone" v-model="user.phone" placeholder="请输入您的手机号" />
    </div>
    <div class="password iconfont icon-suo">
      <input type="password" id="password" v-model="user.password"  placeholder="请输入您的密码" />
    </div>
    <button class="login_btn" @click="login()">登录</button>
    <div class="select">
        <p class="iconfont memory" :class="{'icon-30xuanzhongyuanxingfill': memory, 'icon-30xuanzhongyuanxing': !memory}" @click="changePassMemory">记住密码</p>
        <router-link to="findPassword" tag="p" class="no-memory">忘记密码？</router-link>
    </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        phone: '',
        password: ''
      },
      memory: false
    };
  },
  beforeCreate: function () {
    // 创建之前
  },
  created: function () {
    this.readPass();
    // 创建之后
  },
  beforeMount: function () {
    // 挂载之前
  },
  mounted: function () {
    this.getHeader('登录', 'login_top', '注册', function () {
      this.$router.push('register');
    }); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    // 选择记住/遗忘密码
    changePassMemory: function () {
      this.memory = !this.memory;
    },
    // 记住/遗忘密码
    passMemory: function (flag) {
      if (flag) {
        let user = {};
        user.phone = this.user.phone;
        user.password = this.user.password;
        user.memory = this.memory;
        localStorage.wenxin = JSON.stringify(user);
      } else {
        localStorage.removeItem('wenxin');
      }
    },
    // 如果有密码读取
    readPass: function () {
      if (localStorage.wenxin) {
        const MemoryUser = JSON.parse(localStorage.wenxin);
        this.user.phone = MemoryUser.phone;
        this.user.password = MemoryUser.password;
        this.memory = MemoryUser.memory;
      }
    },
    // 登录
    login: function () {
      if (!this.user.phone || !this.user.password) {
        this.toast('手机号或密码不能为空');
      } else {
        this.toLogin();
      }
    },
    toLogin () {
      this.axios.post('/login/login', {
        phone: this.user.phone,
        password: this.user.password
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.passMemory(this.memory);
            this.toast('登录成功');
            this.$router.push('/');
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
.login_top {
  background: transparent;
  border: none;
}
.login {
  background: url(../assets/images/login.png) no-repeat;
  min-height: 100%;
  .login_logo img {
    display: block;
    margin: 40% auto;
    margin-bottom: 100px;
  }
  .login_center {
    .phone,
    .password {
      width: 500px;
      height: 72px;
      border: 1px solid $color;
      margin: 40px auto;
      border-radius: 34px;
      display: fixed;
      &.iconfont {
        font-size: 35px;
        color: $color;
        padding-left: 20px;
        display: flex;
        align-items: center;
        &::before{
          margin-top: 4px;
        }
      }
      input {
        width: 390px;
        display: flex;
        justify-content: center;
        height: 60px;
        line-height: 60px;
        font-size: 24px;
        margin-left: 20px;
        &::-webkit-input-placeholder {
          /* 使用webkit内核的浏览器 */
          color: #999;
        }
        :-moz-placeholder {
          /* Firefox版本4-18 */
          color: #999;
        }
        ::-moz-placeholder {
          /* Firefox版本19+ */
          color: #999;
        }
        :-ms-input-placeholder {
          /* IE浏览器 */
          color: #999;
        }
      }
    }
    .login_btn {
      display: block;
      border-radius: 34px;
      width: 500px;
      height: 72px;
      line-height: 72px;
      font-size: 26px;
      color: #fff;
      background: $color;
      margin: 115px auto;
      margin-bottom: 10px;
    }
    .select {
      width: 100%;
      padding: 24px 70px 50px;
      font-size: 22px;
      line-height: 36px;
      color: #666;
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        align-items: center;
        font-size: 22px;
        line-height: 30px;
        height: 28px;
        &.iconfont {
          &:before {
            color: $color;
            padding-right: 8px;
            font-size: 28px;
            margin-top: 4px;
          }
          &.icon-30xuanzhongyuanxing::before {
            color: $color;
          }
        }
        &.no-memory {
          .icon-30xuanzhongyuanxingfill {
            padding-left: 8px;
            &:before {
              color: $color;
              font-size: 28px;
            }
          }
        }
      }
    }
  }
}
</style>
