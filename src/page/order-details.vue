<template>
   <div class="orderd" :class="{'none_footer': (order.status === 1) || (order.status === 3)}">
     <div class="top">
       <div class="orderd_top left">
         <span class="number">订单编号：{{order.order_sn}}</span>
         <span class="orderd_time">下单时间：<span class="orderd_time_show" >{{order.created_at}}</span></span>
       </div>
       <div class="orderd_top right">
        <i class="iconfont icon-xinyongqiahuankuan"></i>
        <span>{{status[type]}}</span>
       </div>
     </div>
     <div class="address">
        <div class="user">
          <span class="name">{{order.address_name}}</span>
          <span class="phone">{{order.address_phone}}</span>
        </div>
        <div class="dizhi">
          {{order.city}}{{order.address_detail }}
        </div>
     </div>
     <div class="cai">
       <img src="../assets/images/address.png" alt="">
     </div>
     <div class="content">
       <div class="details" v-for="(item, index) in order.goods" :key="index" @click="goodsDetails(item.gid)">
          <img :src="item.gimg" alt="商品">
          <div class="right">
            <div class="one">{{item.gname}}</div>
              <div class="price">
                <span class="money"> &yen;<span class="money_big">{{item.gprice}}</span>  </span>
                <span class="goodsnum">x{{item.gnum}}</span>
              </div>
          </div>
       </div>
    </div>
    <div class="list_info_wrap">
        <div class="order_list_info">
          <span class="name order_money">订单金额</span>
          <span class="price">&yen;&nbsp;{{order.price || 0}}</span>
        </div>
        <div class="order_list_info">
          <span class="name">运费：</span>
          <span class="price">&yen;&nbsp;{{order.postage || 0}}</span>
        </div>
        <div class="order_list_info">
          <span class="name">代金券抵用：</span>
          <span class="price deduction">-&nbsp;&yen;&nbsp;{{order.score || 0}}</span>
        </div>
        <div class="order_list_info">
          <span class="name">实付款：</span>
          <span class="price with_money">&yen;&nbsp;{{order.true_price || 0}}</span>
        </div>
    </div>
    <div class="footer_order" v-if="(pageStatus === 2) || (pageStatus === 3)">
      <div class="footer_one">
       <span class="name">运单号码：</span>
       <span class="haoma" :class="{'none': !order.wuliu_ma}">{{order.wuliu_ma || '暂无'}} <span class="copy btn" :data-clipboard-text="order.wuliu_ma" ref="copy" @click="copyLink" v-if="order.wuliu_ma">复制</span></span>
      </div>
      <div class="footer_one">
       <span class="name">快递公司：</span>
       <span class="company" :class="{'none': !order.wuliu}">{{order.wuliu || '暂无'}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import Clipboard from 'clipboard';
export default {
  name: 'orderDetails',
  data () {
    return {
      copyBtn: null,
      status: ['待付款', '待发货', '待收货', '已完成'],
      type: 0,
      order: {},
      pageStatus: parseInt(this.$route.query.status) || 0
    };
  },
  created: function () {
    // 创建之后
    this.type = this.$route.query.status || 0;
    this.id = this.$route.query.id || '';
  },
  beforeMount: function () {
    // 挂载之前
    // 请求我的订单详情页接口
    this.getOrderDetails();
  },
  mounted: function () {
    this.copyBtn = new Clipboard('.btn');
    this.getFooter();
    this.getHeader('订单详情', 'orderd_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    copyLink () {
      this.toast('已复制运单号码，若未复制成功，请手动复制');
    },
    goodsDetails (gid) {
      if (this.isEdit) {
        return false;
      } else {
        this.$router.push({path: 'goodsDetails', query: {id: gid}});
      }
    },
    getFooter () {
      let that = this;
      if (this.pageStatus === 0) {
        eventBus.$emit('footer', {
          button: [
            {
              inner: '取消订单',
              callback: () => {
                that.cancelOrder(this.$route.query.id);
              }
            },
            {
              inner: '立即支付',
              callback: () => {
                that.payOrder(this.$route.query.id);
              }
            }
          ]
        });
      } else if (this.pageStatus === 2) {
        eventBus.$emit('footer', {
          button: [
            {
              inner: '确认收货',
              callback: () => {
                // 第一个参数，订单号， 第二个参数成功事件，第三个参数，事件类型
                that.goPay(this.$route.query.id, function () {
                  that.toast('确认收货成功');
                  that.$router.go(-1);
                }, 'endOrder');
              }
            }
          ]
        });
      } else {
        eventBus.$emit('footer', false);
      }
    },
    // 是否删除
    cancelOrder: function (index, id) {
      let that = this;
      this.modal('提示', '确定取消订单？', '确定', function () {
        that.goCancelOrder(index, id);
      });
    },
    // 取消订单
    goCancelOrder (index, id) {
      let that = this;
      this.axios.post('/order/ordercancel', {
        id: this.$route.query.id
      })
        .then(({data}) => {
          if (parseInt(data.status) === 1) {
            this.toast(data.message);
            // 删除待付款的订单
            that.$router.go(-1);
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    payOrder: function (id) {
      this.$router.push({path: 'payment', query: {id: id}});
    },
    // 请求我的订单
    getOrderDetails () {
      this.axios.get('/order/orderDetail', {
        params: {
          id: this.$route.query.id
        }
      })
        .then(({data}) => {
          if (parseInt(data.status) === 1) {
            this.order = data.data;
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
.orderd{
  background: #fff;
  padding: 90px 0 80px 0;
  &.none_footer{
    padding: 90px 0 0 0;
  }
  .top{
    padding:10px 20px;
    width:600px;
    line-height: 45px;
    height: 110px;
    border-radius: 4px;
    background: $color;
    margin: 20px auto;
    border: 1px solid $color;
    box-shadow: 0 0 15px 10px #ffd9e3;
    display: flex;
    justify-content: space-between;
    .orderd_top{
      font-size: 22px;
      color: #fff;
      display: flex;
      flex-direction: column;
    }
    .right{
      text-align: center;
      .iconfont{
        display: block;
        font-size: 36px;
      }
      span{
        font-size: 22px;
        color: #333;
      }
    }
  }
  .address{
    padding: 20px 35px 20px 35px;
    display: flex;
    flex-direction: column;
    .user{
      font-size: 24px;
      color: #333;
      display: flex;
      justify-content: space-between;
    }
    .dizhi{
      margin-top: 8px;
      height: 64px;
      line-height: 30px;
      font-size: 24px;
      color: #999;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
    }
  }
  .cai{
    position: relative;
    padding-bottom: 20px;
    &::after{
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 20px;
      background-color: #f5f5f5;
      width: 100%;
      }
  } 
  .content{
    position: relative;
    padding-bottom: 20px;
    &::after{
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 20px;
      background-color: #f5f5f5;
      width: 100%;
    }
    .details{
      border-bottom: 1px solid #e6e6e6;
      height: 195px;
      width: 94%;
      margin: 0 auto;
      display: flex;
      &:nth-last-child(1){
        border-bottom: none;
      }
      img{
        display: block;
        margin: auto;
        width: 149px;
        height: 149px;
      }
      .right{
        width: 75%;
        padding: 20px 5px 20px 20px;
        .one{
          height: 66px;
          font-size: 26px;
          color: #000;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
        }
        .price{
          margin-top: 50px;
          display: flex;
          justify-content: space-between;
          .money{
            font-size: 20px;
            color: $color;
            .money_big{
              font-size: 26px;
              padding-left: 4px;
            }
          }
          .goodsnum{
            font-size: 24px;
          }
        }
      }
    }
 }
  .list_info_wrap{
    position: relative;
    margin-bottom: 20px;
    &::before{
      content: '';
      position: absolute;
      bottom: -20px;
      height: 20px;
      width: 100%;
      background-color: #f5f5f5;
      left: 0;
    }
    .order_list_info{
      height: 84px;
      line-height: 84px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      &:nth-last-child(1){
        border-bottom: none;
      }
      &::before{
        content: '';
        position: absolute;
        bottom: -1px;
        height: 4px;
        width: 20px;
        background-color: #fff;
        left: 0;
      }
      &::after{
        content: '';
        position: absolute;
        bottom: -1px;
        height: 4px;
        width: 20px;
        background-color: #fff;
        right: 0;
      }
      .name{
        font-size: 22px;
        color: #666;
        &.order_money{
          font-size: 24px;
          color: #333;
        }
      }
      .price{
        font-size: 24px;
        &.with_money{
          color: $color;
        }
      }
    }
  }
  .footer_order{
    .footer_one{
      height: 84px;
      line-height: 84px;
      font-size: 22px;
      color: #333;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      &:nth-last-child(1){
        border-bottom: none;
      }
      &::before{
        content: '';
        position: absolute;
        bottom: -1px;
        height: 4px;
        width: 20px;
        background-color: #fff;
        left: 0;
      }
      &::after{
        content: '';
        position: absolute;
        bottom: -1px;
        height: 4px;
        width: 20px;
        background-color: #fff;
        right: 0;
      }
      .none{
        color: #999;
      }
      .copy{
        font-size: 22px;
        color: #133bbe;
        padding-left: 15px;
      }
    }
  }
}
</style>
