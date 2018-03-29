<template>
  <div class="order">
    <!-- 顶部tab栏 -->
    <div class="header">
      <div class="top">
        <span v-for="index in [0,1,2,3]" :class="{'active': status === index}" @click="changeType(index);" :key="index">{{tabName[index]}}</span>
      </div>
    </div>
    <!-- 没有数据页面 -->
    <div v-if="!orderData.length && isRequest" class="none_order">
      <p>此页面暂无内容</p>
    </div>
    <div class="order_min">
      <div class="center" v-for="(item,index) in orderData" @click="seeOrderDetails(status, item.id)" :key="index">
        <div class="content" v-for="(list,index) in item.goods" :key="index">
        <!-- <div class="content"> -->
          <img :src="list.gimg " alt="商品">
          <div class="right">
            <div class="one">{{list.gname}}</div>
            <div class="price">
              <span class="money">
                <span class="money_new"><span class="money_small">&yen;</span> {{parseFloat(list.gprice).toFixed(2)}}</span>
                <span class="money_old" v-if="list.zhekou && (parseFloat(list.zhekou) !== parseFloat(list.gprice))"><span class="money_small">&yen;</span> {{parseFloat(list.gprice).toFixed(2)}}</span>
              </span>
              <span class="goodsnum">x{{list.gnum}}</span>
            </div>
          </div>
        </div>
        <!--  待支付每个订单底部 -->
        <div class="order_footer" v-if="status === 0">
          <div class="order_footer_top">
              <span>共{{ item.all_num }}件商品&nbsp;合计:&nbsp;<span class="order_footer_price"><span class="blank">&yen;&nbsp;</span>{{ item.allPrice }}</span>&nbsp;<span>(含运费:￥{{item.youfei || 0}}元)</span></span>
          </div>
          <div class="footer_btn" v-if="!item.hasMsg">
            <button class="btn order_out" @click.stop="goodsOut(index, item.id)">取消订单</button>
            <button class="btn order_pay" @click.stop="goodsPay(index, item.id)">立即支付</button>
          </div>
        </div>
        <!-- 待发货 -->
        <div class="order_footer" v-if="status === 1">
          <div class="order_footer_top">
              <span>共{{ item.all_num }}件商品&nbsp;合计:&nbsp;<span class="order_footer_price"><span class="blank">&yen;&nbsp;</span>{{ item.allPrice }}</span>&nbsp;<span>(含运费:￥{{item.youfei || 0}}元)</span></span>
          </div>
        </div>
        <!-- 待收货 -->
        <div class="order_footer" v-if="status === 2">
          <div class="order_footer_top">
            <span>共{{ item.all_num }}件商品&nbsp;合计:&nbsp;<span class="order_footer_price"><span class="blank">&yen;&nbsp;</span>{{ item.allPrice }}</span>&nbsp;<span>(含运费:￥{{item.youfei || 0}}元)</span></span>
          </div>
          <div class="footer_btn" v-if="!item.hasMsg">
              <button class="btn order_pay" @click.stop="receipt(index, item.id)">确认收货</button>
          </div> 
        </div>
        <!-- 已完成 -->
        <div class="order_footer" v-if="status === 3">
          <div class="order_footer_top">
              <span>共{{ item.all_num }}件商品&nbsp;合计:&nbsp;<span class="order_footer_price"><span class="blank">&yen;&nbsp;</span>{{ item.allPrice }}</span>&nbsp;<span>(含运费:￥{{item.youfei || 0}}元)</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order',
  data () {
    return {
      isRequest: false,
      tabName: ['待付款', '待发货', '待收货', '已完成'],
      status: parseInt(this.$route.query.status) || 0,
      orderData: []
    };
  },
  beforeMount: function () {
    // 挂载之前
    // 我的订单
    this.getOrderInfo(this.$route.query.status);
  },
  mounted: function () {
    this.getHeader('我的订单', 'order_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    changeType: function (index) {
      this.status = index;
      this.$router.replace({path: 'order', query: {status: index}});
      this.getOrderInfo(index);
    },
    // 是否删除
    goodsOut: function (index, id) {
      let that = this; // 如果回调函数中用到this，则这行代码必须有
      this.modal('提示', '确定取消订单？', '确定', function () {
        that.goCancelOrder(index, id);
      }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
    },
    // 取消订单
    goCancelOrder (index, id) {
      let that = this;
      this.axios.post('/order/ordercancel', {
        id: id
      })
        .then(({data}) => {
          if (parseInt(data.status) === 1) {
            this.toast(data.message);
            // 删除待付款的订单
            that.orderData.splice(index, 1);
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    goodsPay: function (index, id) {
      this.$router.push({path: 'payment', query: {id: id}});
    },
    seeOrderDetails: function (status, id) {
      this.$router.push({ path: 'orderDetails', query: {status: status, id: id} });
    },
    // 确认收货
    receipt (index, id) {
      let that = this;
      // 第一个参数，订单号， 第二个参数成功事件，第三个参数，事件类型
      this.goPay(id, function () {
        that.toast('确认收货成功');
        that.orderData.splice(index, 1);
      }, 'endOrder');
    },
    // 请求我的订单
    getOrderInfo (index) {
      this.axios.post('/order/orderList', {
        status: parseInt(index) + 1
      })
        .then(({data}) => {
          this.isRequest = true;
          if (parseInt(data.status) === 1) {
            this.orderData = data.data;
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
.order_top {
  background: $color;
  color: #fff;
  border: none;
}
.order {
  background: #fff;
  .header{
    background: $color;
    width: 100%;
    height: 100px;
    padding-top: 20px;
    margin-top: 89px;
  }
  .top{
    background: $color;
    width: 80%;
    margin: auto;
    color: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    line-height: 50px;
    .active{
      border-bottom: 3px solid #ffe400;
      color: #ffe400;
    }
  }
  .none_order{
    background: url(../assets/images/none_01.png) no-repeat center center;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    height: 300px;
    width: 80%;
    text-align: center;
    > p{
      color: #999;
      font-size: 24px;
      margin-top: 260px;
    }
  }
  .order_min{
   .center{
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
    &:nth-child(1){
      padding-top: 20px;
      &::before{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        background-color: #f5f5f5;
        width: 100%;
      }
    }
    .content{
      border-bottom: 1px solid #e6e6e6;
      height: 195px;
      width: 94%;
      margin: 0 auto;
      display: flex;
      &:nth-last-child(2){
        width: 100%;
        padding: 0 3%;
      }
      img{
        display: block;
        margin: auto;
        width: 149px;
        height: 149px;
      }
      // justify-content: space-between;
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
            .money_new{
              font-size: 26px;
              margin-left: -2px;
              .money_small{
                font-size: 20px;
              }
            }
            .money_old{
              font-size: 22px;
              margin-left: 10px;
              text-decoration: line-through;
              color: #999;
              .money_small{
                font-size: 20px;
              }
            }
          }
          .goodsnum{
            font-size: 24px;
          }
        }
      }
    }
    .order_footer{
      text-align: right;
      padding:15px 25px;
     .order_footer_top{
       margin-bottom: 10px;
       font-size: 22px;
       color: #333;
       .order_footer_price{
         font-size: 26px;
         color: $color;
         .blank{
            margin-right: -4px;
         }
       }
     }
     .footer_btn{
       .btn{
         width: 130px;
         height: 48px;
         border-radius: 4px;
         font-size: 22px;
         margin-left: 12px;
       }
       .order_out{
         background: #ffe5e6;
         color: $color;
       }
       .order_pay{
         background: $color;
         color: #fff;
       }
     }
    }
  }
}
  

}
</style>
