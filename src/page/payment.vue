<template>
  <div class="payment">
    <p class="payment_money">
      <span>应付金额</span>
      <span class="color">￥{{price || 0}}</span>
    </p>
    <span class="select">选择支付方式</span>
    <div class="list">
      <div class="linePay_payType" v-for="(item,index) in payType" @click="toggleType(index)" :key="index" v-if="index !== browserNum">
        <div class="left">
          <i class="iconfont" :class="item.icon"></i>
          <span>{{item.title}}</span>
        </div>
        <div class="right">
          <span class="f_x_9" v-if="index === 2">￥{{balance || 0}}</span>
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
  beforeMount: function () {
    // 根据id获取订单信息
    this.getOrderInfo();
    // 对应浏览器隐藏部分支付选项
    this.hideOptions();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('支付', 'payment_top');
  },
  computed: {
    showPhone: function () {
      return this.hidePhone(this.user.phone);
    },
    browserNum () {
      // 如果是微信浏览器，隐藏支付宝
      if (this.isWechat()) {
        this.activeNum = 1;
        return 0;
      } else {
        // 其他浏览器隐藏微信支付
        return 1;
      }
    }
  },
  methods: {
    hideOptions () {
    },
    getOrderInfo () {
      this.axios.get('/order_pay/payment_page', {
        params: {
          id: this.$route.query.id
        }
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.price = data.data.order.price;
            this.balance = data.data.user.balance;
          } else {
            // 获取订单失败
            this.modal('数据错误', '没有找到此订单', '我的订单', () => {
              this.$router.replace({path: 'order', query: {status: 0}});
            });
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
      if ((this.balance < this.price) && this.activeNum === 2) {
        this.toast('余额不足');
      } else if (this.activeNum !== 2) {
        // 选择的支付类型不是余额
        this.toast('王政还没写好接口');
      } else {
        this.goPay(this.$route.query.id, () => {
          this.$router.push('paymentSuccess');
        });
      }
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
