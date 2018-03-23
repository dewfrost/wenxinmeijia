<template>
  <div class="payment">
    <p class="payment_money">
      <span>应付金额</span>
      <span class="color">￥{{price}}</span>
    </p>
    <span class="select">选择支付方式</span>
    <div class="list">
      <div class="linePay_payType" v-for="(item,index) in payType" @click="toggleType(index)" :key="index">
        <div class="left">
          <i class="iconfont" :class="item.icon"></i>
          <span>{{item.title}}</span>
        </div>
        <div class="right">
          <span class="f_x_9" v-if="index === 2">￥{{balance}}</span>
          <i class="iconfont" :class="{'icon-30xuanzhongyuanxingfill' : activeNum === index, 'icon-30xuanzhongyuanxing' : activeNum !== index}"></i>
        </div>
      </div>
    </div>
    <button class="submit" @click="pay()">立即支付</button>
  </div>
</template>

<script>
export default {
  name: 'payment',
  data () {
    return {
      activeNum: 0,
      price: '',
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
      balance: ''
    };
  },
  created: function () {},
  beforeMount: function () {
    // 根据id获取订单信息
    this.getOrderInfo();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('支付', 'payment_top');
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  computed: {
    showPhone: function () {
      return this.hidePhone(this.user.phone);
    }
  },
  methods: {
    getOrderInfo () {
      this.axios.get('/order_pay/payment_page', {
        params: {
          id: this.$route.query.id
        }
      })
        .then(({data}) => {
          console.log(data);
          if (data.status === 1) {
            this.price = data.data.user.balance;
            this.balance = data.data.user.score;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 选择支付类型
    toggleType: function (index) {
      this.activeNum = index;
    },
    pay () {
      let that = this;
      that.goPay(function () {
        that.$router.push('paymentSuccess');
      });
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
  background: #f5f5f5;
  padding-top: 90px;
  min-height: 100%;
  .payment_money{
    line-height: 80px;
    padding: 0 20px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .color{
      color: $color;
    }
  }
  .select{
    display: block;
    width: 100%;
    height: 80px;
    margin-top: 20px;
    line-height: 80px;
    padding: 0 24px;
    color: #666666;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
  }
  .list{
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    padding: 0 24px;
    .linePay_payType{
      line-height: 80px;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      .left{
        display: flex;
        align-items: center;
        .iconfont{
          font-size: 32px;
          padding-right: 8px;
          margin-top: 1px;
        }
        .icon-zhifubao{
          color: #00a0e9;
        }
        .icon-weixin{
          color: #00b30d;
        }
        .icon-yue{
          color: #fd8f01;
        }
      }
      .right{
        .f_x_9{
          color: #999999;
        }
        .iconfont{
          font-size: 32px;
          padding-left: 13px;
        }
        .icon-30xuanzhongyuanxingfill{
          color: $color;
        }
        .icon-30xuanzhongyuanxing{
          color: #999999;
        }
      }
      &:last-child{
        border: none;
      }
    }
  }
  .submit{
    width: 452px;
    height: 66px;
    line-height: 66px;
    background: $color;
    border-radius: 30px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    display: block;
    margin: 200px auto 0;
    box-shadow: 0 0 15px #da768e;
  }
}
</style>
