<template>
  <div class="submitOrder">
    <!-- 收货地址 -->
    <div class="address" v-if="!address" @click="selectAddress()">
      <p class="add_adddress">
        <i class="iconfont icon-tianjia1"></i>
        <span >添加收货地址</span>
      </p>
      <i class="iconfont icon-you"></i>
    </div>
    <div class="new_address" v-if="address">
      <div class="left">
        <p class="info">
          收货人：{{address.name}}
          <span class="phone">{{address.phone}}</span>
        </p>
        <p class="add">地址：{{address.address}}</p>
      </div>
      <i class="iconfont icon-you"></i>
    </div>
    <!-- 订单 -->
    <div class="details">
      <img :src="img" alt="商品">
      <div class="right">
        <p class="details_name">{{list_title}}</p>
        <p class="moeny">
          <span class="price"><span class="yen"> &yen; </span>{{list_price}}</span>
          <span class="number">x{{list_number}}</span>
        </p>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="information">
      <p class="list">
        <span>商品金额</span>
        <span> &yen;{{details_price}}</span>
      </p>
      <p class="list">
        <span>运费</span>
        <span> &yen;{{freight}}</span>
      </p>
      <p class="list" @click="select">
        <span>代金券可抵用<span>&yen;{{voucher}}</span></span>
        <i class="iconfont" :class="{'icon-30xuanzhongyuanxingfill': status,'icon-30xuanzhongyuanxing': !status}"></i>
      </p>
      <p class="small">
        <span>共<span>{{small_number}}</span>件商品&nbsp;&nbsp;小计：</span>
        <span class="red"><span>&yen;&nbsp;</span><span class="small_price">{{small_price}}</span></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submitOrder',
  data () {
    return {
      address: null,
      // {
      //   name: '杨阳洋',
      //   phone: 17336369854,
      //   address: '河南省 郑州市 金水区 某某某小区1单元6楼东户'
      // },
      show: true,
      img: require('../assets/images/goods1.png'),
      list_title: '可穿戴美甲贴片奢华组合套装#210',
      list_price: '288.00',
      list_number: 1,
      details_price: '288.00',
      freight: '0.00',
      voucher: '10.00',
      status: true,
      small_number: 1,
      small_price: '278.00'
    };
  },
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    this.getFooter();
    this.getHeader('提交订单', 'submitOrder_top');
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
    selectAddress () {
      this.$router.push('selectAddress');
    },
    // 调用提交订单底部
    getFooter () {
      let that = this;
      this.getSubmitFooter(this.small_price, function () {
        // 调用提交事件
        that.submit();
      });
    },
    submit () {
      this.$router.push('payment');
    },
    // 是否选择
    select: function () {
      this.status = !this.status;
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.submitOrder{
    padding-top: 90px;
    min-height: 100%;
    background: #f5f5f5;
  .address{
    margin-top: 20px;
    padding: 0 20px;
    line-height: 130px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    color: #999999;
    .add_adddress{
      .icon-tianjia1{
        font-size: 26px;
        padding-right: 10px;
        color: #e0dbdb;
      }
    }
    .icon-you{
      position: absolute;
      top: 1%;
      right: 12px;
      font-size: 30px;
    }
  }
  .new_address{
    margin-top: 20px;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
    padding: 27px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .left{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 84px;
      font-size: 22px;
    }
    .icon-you{
      position: absolute;
      right: 12px;
      top: 41%;
      font-size: 30px;
      color: #999999;
    }
  }
  .details{
    margin-top: 20px;
    height: 200px;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .img{
      width: 140px;
      height: 140px;
    }
    .right{
      width: 440px;
      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .moeny{
        display: flex;
        justify-content: space-between;
        .price{
          color: $color;
          .yen{
            font-size: 20px;
            margin-right: -3px;
          }
        }
      }
    }
  }
  .information{
    margin-top: 20px;
    padding: 0 20px;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    .list{
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      line-height: 80px;
      .iconfont{
        font-size: 30px;
        color: #a09c9c;
      }
      .icon-30xuanzhongyuanxingfill{
        color: $color;
      }
    }
    .small{
      background: #fff;
      display: flex;
      justify-content: flex-end;
      line-height: 80px;
      font-size: 20px;
      .red{
        color: $color;
        .small_price{
        font-size: 24px;
        }
      }
    }
  }
}
</style>
