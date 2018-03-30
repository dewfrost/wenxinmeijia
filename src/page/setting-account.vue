<template>
  <div class="settingAccount">
    <div class="setting" @click="login">
      <span>修改登录密码</span>
      <i class="iconfont icon-you"></i>
    </div>
    <div class="setting" @click="getHasPassword">
      <span>修改支付密码</span>
      <i class="iconfont icon-you"></i>
    </div>
    <div class="link" @click="link" v-if="!isWechat()">退出登录</div>
  </div>
</template>

<script>
export default {
  name: 'settingAccount',
  data () {
    return {
      // 数据
    };
  },
  mounted: function () {
    this.getHeader('账号设置', 'settingAccount_top');
  },
  methods: {
    getHasPassword () {
      this.axios.get('/order_pay/is_twopassword', {
      })
        .then(({data}) => {
          if (data.status === 1) {
            // 跳转至修改支付密码狂
            this.$router.push({path: 'revisePassword', query: {type: 'pay'}});
          } else {
            // 弹出设置支付密码狂
            this.goPay();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    login: function () {
      this.$router.push({path: 'revisePassword', query: {type: 'login'}});
    },
    pay: function () {
      this.$router.push({path: 'revisePassword', query: {type: 'pay'}});
    },
    // 退出登录跳到登录，（接口对过跳到首页）
    link: function () {
      let that = this; // 如果回调函数中用到this，则这行代码必须有
      this.modal('提示', '确定退出该账号吗？', '确定', function (index) {
        that.submit();
      }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
    },
    // 退出登录接口
    submit () {
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
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.settingAccount{
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
  .setting{
    padding: 0 30px;
    line-height: 85px;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    .iconfont{
      font-size: 30px;
    }
  }
  .link{
    width: 500px;
    line-height: 68px;
    text-align: center;
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
