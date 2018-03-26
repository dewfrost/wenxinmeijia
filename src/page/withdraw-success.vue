<template>
  <div class="withdrawSuccess">
    <img :src="img" alt="">
    <p>提现申请提交成功</p>
    <span>后台审核通过后，款项将在1-2个工作日后到账</span>
    <router-link tag="button" to="userCenter">返回个人中心</router-link>
  </div>  
</template>

<script>
export default {
  name: 'withdrawSuccess',
  data () {
    return {
      // 数据
      img: require('../assets/images/success.png')
    };
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.withdrawSuccess{
  img{
    width: 370px;
    height: 370px;
    display: block;
    margin: 160px auto 66px;
  }
  p{
    font-size: 28px;
    text-align: center;
  }
  span{
    display: block;
    text-align: center;
    color: #999999;
    font-size: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 38px auto 78px;
  }
  button{
    display: block;
    width: 452px;
    line-height: 66px;
    text-align: center;
    border-radius: 30px;
    background: $color;
    font-size: 24px;
    color: #fff;
    margin: 0 auto;
    box-shadow: 0 -1px 30px #e897aa;
  }
}
</style>
