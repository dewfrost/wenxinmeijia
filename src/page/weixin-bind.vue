<template>
  <div class="weixinBind">
    <div class="qr_code">
      <img :src="qr_code" alt="">
    </div>
    <p>扫描二维码，绑定微信账号</p>
  </div>
</template>

<script>
export default {
  name: 'weixinBind',
  data () {
    return {
      // 数据
      qr_code: require('../assets/images/qr_code.png')
    };
  },
  beforeMount: function () {
    this.getSubmit();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('微信绑定', 'weixinBind_top');
  },
  methods: {
    getSubmit () {
      this.axios.post('/login/bindwx')
      .then(({data}) => {
        if (data.status === 1) {
          this.qr_code = data.data;
        } else {
          // 获取失败
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
.weixinBind{
  margin-top: 90px;
  &:before{
    content: '';
    display: block;
    width: 100%;
    height: 20px;
    background: #f5f5f5;
  }
  background: #fff;
  .qr_code{
    width: 312px;
    height: 312px;
    border-radius: 5px;
    border: 1px solid $color;
    margin: 127px auto 0;
    img{
      display: block;
      width: 301px;
      height: 308px;
      margin: 0 auto;
      padding: 5px 2px;
    }
  }
  p{
    color: $color;
    text-align: center;
    margin-top: 55px;
  }
}
</style>
