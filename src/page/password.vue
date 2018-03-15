<template>
  <div class="payment">
    <p class="payment_money">
      <span>应付金额</span>
      <span>￥{{price}}</span>
    </p>
    <p class="select">选择支付方式</p>
    <div class="linePay_payType" v-for="(item,index) in payType">
      <div class="left">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{item.title}}</span>
      </div>
      <div class="right">
        <span v-if="index === 2">￥{{balance}}</span>
        <i class="iconfont" :class="{'icon-30xuanzhongyuanxingfill' : item.state, 'icon-30xuanzhongyuanxing' : !item.state}"></i>
      </div>
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'payment',
  data () {
    return {
      price: '278.00',
      payType: [  // 支付方式
        {
          title: '支付宝',
          icon: 'icon-zhifubao',
          state: true
        },
        {
          title: '微信',
          icon: 'icon-weixin',
          state: false
        },
        {
          title: '余额',
          icon: 'icon-yue',
          state: false
        }
      ],
      balance: '2000.00'
    };
  },
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    this.getHeader('支付', 'payment_top');
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  }, // 实例销毁前调用,解绑中间层的数据传输
  destroyed: function () {}, // 实例销毁后调用
  computed: {
    showPhone: function () {
      return this.hidePhone(this.user.phone);
    }
  },
  methods: {
    // 选择支付类型
    toggle: function (index) {
      this.payType[index].state = !this.payType[index].state;
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.payment_top{
  // border: none;
  // background: transparent;
}
.payment{
  
}
</style>
