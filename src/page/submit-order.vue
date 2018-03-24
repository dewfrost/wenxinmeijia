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
        <span class="info">
          <span class="first_line_left">
            <span>收货人：</span>
            <span>{{address.name}}</span>
          </span>
          <span class="phone">{{address.phone}}</span>
        </span>
        <span class="address_details">地址：{{address.city}} {{address.description}}</span>
      </div>
      <i class="iconfont icon-you" @click="selectAddress()"></i>
    </div>
    <!-- 订单 -->
    <div class="details" v-for="(item, index) in goodsInfo" :key="index">
      <div class="img">
        <img :src="item.img" alt="商品">
      </div>
      <div class="right">
        <p class="details_name">{{item.name}}</p>
        <p class="moeny">
          <span class="price">
            <span class="now_price">
              <span class="yen"> &yen; </span>
              {{item.price}}
            </span>
            <span class="old_price" v-if="item.zhekou">
              <span class="yen"> &yen; </span>
              {{item.zhekou}}
            </span>
          </span>
          <span class="number">x{{numList ? numList[index] : '1'}}</span>
        </p>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="information">
      <p class="list">
        <span>商品金额</span>
        <span> &yen;{{allPrice}}</span>
      </p>
      <p class="list">
        <span>运费</span>
        <span> &yen;{{freight}}</span>
      </p>
      <p class="list" @click="select">
        <span>
          代金券可抵用
          <span>&nbsp;&yen;{{voucher}}</span>
        </span>
        <i class="iconfont" :class="{'icon-30xuanzhongyuanxingfill': selectStatus,'icon-30xuanzhongyuanxing': !selectStatus}"></i>
      </p>
      <p class="small">
        <span>
          共
          <span>&nbsp;{{endNum}}&nbsp;</span>
          件商品&nbsp;&nbsp;小计：
        </span>
        <span class="red">
          <span>&yen;&nbsp;</span>
          <span class="small_price">{{endPrice}}</span>
        </span>
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
      goodsInfo: [], // 商品列表
      allPrice: '0', // 商品总金额
      freight: '0', // 运费
      voucher: '0', // 抵用券
      selectStatus: false,
      endNum: 1,
      endPrice: '0',
      numList: null
    };
  },
  beforeMount: function () {
    // 获取页面信息
    this.getInfo();
  },
  mounted: function () {
    this.getHeader('提交订单', 'submitOrder_top');
  },
  updated: function () {
    // 获取底部
    this.getFooter();
    this.computedEndPrice();
  },
  methods: {
    computedEndPrice () {
      // 如果选择抵用券
      if (this.selectStatus) {
        // 如果抵用券比商品金额还多，则至少为0元
        if (parseFloat(this.allPrice + this.freight - this.voucher) < 0) {
          this.endPrice = '0';
        } else {
          this.endPrice = parseFloat(this.allPrice + this.freight - this.voucher);
        }
      } else {
        if (parseFloat(this.allPrice + this.freight) < 0) {
          this.endPrice = '0';
        } else {
          this.endPrice = parseFloat(this.allPrice + this.freight);
        }
      }
    },
    getInfo () {
      // 如果query值有id，则是商品一件下单，有gid则是购物车下单
      if (this.$route.query.id) {
        this.axios.post('/order_pay/front_order', {
          gid: this.$route.query.id,
          num: this.$route.query.num || 1
        })
          .then(({data}) => {
            if (data.status === 1) {
              // 地址
              this.address = data.data.user.address;
              // 抵用券
              this.voucher = data.data.user.score;
              // 商品金额
              this.allPrice = data.data.all_money;
              // 商品信息
              this.goodsInfo = data.data.goods.goods;
              // 运费
              this.freight = data.data.youfei;
              // 获取底部
              this.getFooter();
            } else {
              this.toast(data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // 商品总得种类数等于传的gid数组长度
        this.endNum = this.$route.query.gid.split(',').length;
        // 购物车结算
        this.axios.post('/order_pay/front_order', {
          cids: this.$route.query.gid
        })
          .then(({data}) => {
            if (data.status === 1) {
              // 地址
              this.address = data.data.user.address;
              // 抵用券
              this.voucher = data.data.user.score;
              // 商品金额
              this.allPrice = data.data.all_money;
              // 商品信息
              this.goodsInfo = data.data.goods.goods;
              // 运费
              this.freight = data.data.youfei;
              // 数量列表
              this.numList = data.data.goods.num;
              // 获取底部
              this.getFooter();
            } else {
              this.toast(data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      // 计算总计金额
      this.computedEndPrice();
    },
    selectAddress () {
      this.$router.push('selectAddress');
    },
    // 调用提交订单底部
    getFooter () {
      let that = this;
      this.getSubmitFooter(this.endPrice, function () {
        // 调用提交事件
        that.submit();
      });
    },
    submit () {
      // 如果选中抵用券，传值1，否则不传
      let score;
      if (this.selectStatus) {
        score = 1;
      } else {
        score = '';
      }
      this.axios.post('/order_pay/add_order', {
        aid: this.address.id,
        score: score
      })
        .then(({data}) => {
          if (data.status === 1) {
            // 跳转到支付页面
            this.$router.replace({path: 'payment', query: {id: data.data}});
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      // this.$router.push('payment');
    },
    // 是否选择
    select: function () {
      this.selectStatus = !this.selectStatus;
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
    width: 100%;
    margin-top: 20px;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
    padding: 27px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .left{
      width: 90%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 84px;
      font-size: 22px;
      >.address_details{
        width: 100%;
        overflow: hidden;  /*超出隐藏*/
        white-space: nowrap;  /*不换行*/
        text-overflow: ellipsis;  /*用“...”表示超出的文本*/
      }
      .info{
        display: flex;
        justify-content: space-between;
        margin-right: 60px;
      }
    }
    .icon-you{
      width: 10%;
      height: 84px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 12px;
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
    img{
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
          .now_price{
            color: $color;
            .yen{
              font-size: 20px;
              margin-right: -3px;
            }
          }
          .old_price{
            font-size: 22px;
            color: #999;
            margin-left: 8px;
            text-decoration: line-through;
            .yen{
              font-size: 20px;
              margin-right: -3px;
            }
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
