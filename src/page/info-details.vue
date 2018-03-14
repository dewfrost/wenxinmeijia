<template>
  <div class="infoDetails">
    <div class="details">
      <div class="top">
        <span class="title">{{info.title}}</span>
        <span class="time">{{info.time}}</span>
      </div>
      <div class="center">
        <p>你终于通过一步步的闯过，手机号码验证输入，短信验证输入，设置密密码，确认密码等一系列繁琐的操作最后闯关成功。恭喜你注册成功，继续你的购物之旅吧！</p>
        <p>你终于通过一步步的闯过，手机号码验证输入，短信验证输入，设置密密码，确认密码等一系列繁琐的操作最后闯关成功。恭喜你注册成功，继续你的购物之旅吧！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infoDetails',
  data () {
    return {
      info: {
        title: '注册成功',
        time: '2018-02-06 15:17:06'
      }
    };
  },
  beforeCreate: function () { // 创建之前
  },
  created: function () { // 创建之后
  },
  beforeMount: function () { // 挂载之前
  },
  mounted: function () {
    this.getHeader('消息详情');
  },
  methods: {
  }
};
</script>

<style lang="scss">
@import "../assets/css/base.scss";
.infoDetails{
  background: #f5f5f5;
  min-height: 100%;
  // height: 100%;
  .details{
    background: url(../assets/images/info_details.png) no-repeat;
    margin: 113px 20px 0 20px;
    min-height: 100%;
    .top{
      padding:25px 30px 0 30px;
      display: flex;
      justify-content: space-between;
      .title{
        font-size: 28px;
        color: #333;
      }
      .time{
        font-size: 20px;
        color: #999;
      }
    }
    .center{
      padding:0 30px;
      font-size: 22px;
      color: #666;
      line-height: 40px;
      p{
        margin-top: 15px;
      }
    }
  }
}
</style>
