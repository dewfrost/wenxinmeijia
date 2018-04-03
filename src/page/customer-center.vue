<template>
  <div class="customerCenter">
    <div class="qr_code">
      <img :src="qr_code" alt="">
    </div>
    <p>微信公众号二维码</p>
    <a :href="'tel:' + phone">
      <div class="list">
        <span>客服电话</span>
        <span>{{phone}}</span>
      </div>
    </a>
    <div class="list">
      <span>服务时间</span>
      <span>{{time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customerCenter',
  data () {
    return {
      // 数据
      phone: '',
      time: '',
      qr_code: ''
    };
  },
  beforeMount: function () {
    this.getCustomer();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('客服中心', 'customerCenter_top');
  },
  methods: {
    // 接口
    getCustomer () {
      this.axios.get('/index/kefu', {
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.qr_code = data.data.kefu_ma;
            this.phone = data.data.kefu_phone;
            this.time = data.data.kefu_time;
          } else {
            this.toast(data.message);
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.customerCenter{
  padding-top: 90px;
  background: #f5f5f5;
  min-height: 100%;
  .qr_code{
    width: 244px;
    height: 244px;
    border-radius: 5px;
    border: 1px solid $color;
    margin: 54px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 240px;
      height: 240px;
      border-radius: 5px;
    }
  }
  p{
    color: $color;
    text-align: center;
    margin: 20px auto 50px;
  }
  .list{
    padding: 0 30px;
    border-bottom: 1px solid #eaeaea;
    line-height: 85px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    color: #333;
  }
}
</style>
