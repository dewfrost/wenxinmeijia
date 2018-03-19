<template>
   <div class="orderd" :class="{'none_footer': (order.status === 1) || (order.status === 3)}">
     <div class="top">
       <div class="orderd_top left">
         <span class="number">订单编号：{{order.order_sn}}</span>
         <span class="orderd_time">下单时间：<span class="orderd_time_show" >{{order.add_date}}</span></span>
       </div>
       <div class="orderd_top right">
        <i class="iconfont icon-xinyongqiahuankuan"></i>
        <span>{{status[type]}}</span>
       </div>
     </div>
     <div class="address">
        <div class="user">
          <span class="name">{{order.name}}</span>
          <span class="phone">{{order.phone}}</span>
        </div>
        <div class="dizhi">
          {{order.address}}
        </div>
     </div>
     <div class="cai">
       <img src="../assets/images/address.png" alt="">
     </div>
     <div class="content">
       <div class="details" v-for="(item, index) in goodsInfo" :key="index" @click="goodsDetails(item.id)">
          <img :src="item.imgurl" alt="商品">
          <div class="right">
            <div class="one">{{item.name}}</div>
              <div class="price">
                <span class="money"> &yen;<span class="money_big">{{item.price}}</span>  </span>
                <span class="goodsnum">x{{item.goodsnum}}</span>
              </div>
          </div>
       </div>
    </div>
    <div class="list_info_wrap">
        <div class="order_list_info">
          <span class="name order_money">订单金额</span>
          <span class="price">￥{{order.amount || 0}}</span>
        </div>
        <div class="order_list_info">
          <span class="name">运费：</span>
          <span class="price">￥{{order.costs || 0}}</span>
        </div>
        <div class="order_list_info">
          <span class="name">代金券抵用：</span>
          <span class="price deduction">-￥{{order.deduction || 0}}</span>
        </div>
        <div class="order_list_info">
          <span class="name">需付款：</span>
          <span class="price with_money">￥{{order.endPrice || 0}}</span>
        </div>
    </div>
    <div class="footer_order" v-if="(order.status === 2) || (order.status === 3)">
      <div class="footer_one">
       <span class="name">运单号码：</span>
       <span class="haoma" :class="{'none': !order.haoma}">{{order.haoma || '暂无'}} <span class="copy btn" :data-clipboard-text="order.haoma" ref="copy" @click="copyLink">复制</span></span>
      </div>
      <div class="footer_one">
       <span class="name">快递公司：</span>
       <span class="company" :class="{'none': !order.company}">{{order.company || '暂无'}}</span>
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
      order: {
        status: parseInt(this.$route.query.status),
        order_sn: '13845699654',
        add_date: '2018-03-20  10:10:10',
        name: '宓知月',
        phone: '17000000000',
        address: '河南省郑州市金水区黄河路文化路交叉口大幅度小区7层706',
        amount: '864.00',
        costs: '0.00',
        deduction: '0.00',
        endPrice: '864.00',
        haoma: '0000',
        company: '顺丰快递'
      },
      goodsInfo: [
        {
          imgurl: require('../assets/images/goods.png'),
          name: '可穿戴美甲贴片奢华组合套装#210',
          price: '288.00',
          goodsnum: 2
        },
        {
          imgurl: require('../assets/images/goods2.png'),
          name: '可穿戴美甲贴片玫瑰香薰 球#265',
          price: '68.00',
          goodsnum: 2
        }
      ],
      pageStatus: parseInt(this.$route.query.status) || 0,
      // 订单id
      orderId: parseInt(this.$route.query.id) || 0,
      orderSn: this.$route.query.order_sn || 0
    };
  },
  beforeCreate: function () {
    // 创建之前
  },
  created: function () {
    // 创建之后
    this.type = this.$route.query.status || 0;
    this.id = this.$route.query.id || '';
  },
  beforeMount: function () {
    // 挂载之前
  },
  mounted: function () {
    this.copyBtn = new Clipboard('.btn');
    console.log(this.copyBtn);
    this.getFooter();
    this.getHeader('订单详情', 'orderd_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    copyLink () {
      this.toast('已复制运单号码，若未复制成功，请手动复制');
    },
    goodsDetails (id) {
      if (this.isEdit) {
        return false;
      } else {
        this.$router.push({path: 'goodsDetails', query: {id: id}});
      }
    },
    getFooter () {
      let that = this;
      if (this.order.status === 0) {
        eventBus.$emit('footer', {
          button: [
            {
              inner: '取消订单',
              callback: () => {
                that.cancelOrder();
              }
            },
            {
              inner: '立即支付',
              callback: () => {
                that.$router.push('payment');
              }
            }
          ]
        });
      } else if (this.order.status === 2) {
        eventBus.$emit('footer', {
          button: [
            {
              inner: '确认订单',
              callback: () => {
                that.goPay(function () {
                  that.$router.go(-1);
                  that.toast('确认收货成功');
                });
              }
            }
          ]
        });
      } else {
        eventBus.$emit('footer', false);
      }
    },
    // 取消订单
    cancelOrder () {
      this.toast('取消订单成功');
      this.$router.go(-1);
    },
    showToast: function () {
      // 引用toast组件
      this.toast('提示文字' + this.hidePhone(15614544444), 'icon-chenggong1');
    },
    showModal: function () {
      let that = this; // 如果回调函数中用到this，则这行代码必须有
      // 引用弹窗组件
      this.toast(
        '这是弹窗标题',
        '这是弹窗服饰股份的供热一个头特化工股份合格的合格合格分数高富帅正文',
        '这是按钮',
        function () {
          console.log('调用弹窗成功');
          console.log(that.modalMsg);
        }
      ); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
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
      height: 60px;
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
