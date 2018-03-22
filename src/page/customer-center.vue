<template>
  <div class="customerCenter">
    <div class="qr_code">
      <img :src="qr_code" alt="">
    </div>
    <p>微信公众号二维码</p>
    <a href="tel:400-000-0000">
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
  created: function () {},
  beforeMount: function () {
    this.getCustomer();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('客服中心', 'customerCenter_top');
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  }, // 实例销毁前调用,解绑中间层的数据传输
  destroyed: function () {}, // 实例销毁后调用
  methods: {
    // 接口
    getCustomer () {
      this.axios.post('/index/kefu', {
      })
        .then(({data}) => {
          console.log(data);
          if (data.status === 1) {
            this.qr_code = data.data.kefu_ma;
            this.phone = data.data.kefu_phone;
            this.time = data.data.kefu_time;
            this.toast('修改成功');
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
.customerCenter{
  padding-top: 90px;
  background: #f5f5f5;
  min-height: 100%;
  .qr_code{
    width: 245px;
    height: 245px;
    border-radius: 5px;
    border: 1px solid $color;
    margin: 54px auto 0;
    img{
      display: block;
      width: 245px;
      height: 245px;
      margin: 0 auto;
      padding: 5px 2px;
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
