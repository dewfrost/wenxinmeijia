<template>
  <div class="settingAccount">
    <div class="setting" @click="login">
      <span>修改登录密码</span>
      <i class="iconfont icon-you"></i>
    </div>
    <div class="setting" @click="pay">
      <span>修改支付密码</span>
      <i class="iconfont icon-you"></i>
    </div>
    <button class="link" @click="link">退出登录</button>
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
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    this.getHeader('账号设置', 'settingAccount_top');
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  }, // 实例销毁前调用,解绑中间层的数据传输
  destroyed: function () {}, // 实例销毁后调用
  computed: {
  },
  methods: {
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
        that.$router.push('login');
      }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
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
