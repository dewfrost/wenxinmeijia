<template>
  <div class="order">
    <div class="header">
      <div class="top">
        <span class="tab_in" :class="{'active': status === 0}" @click="status = 0;changeType(0);">待付款</span>
        <span class="tab_out" :class="{'active': status === 1}" @click="status = 1;changeType(1);">待发货</span>
        <span class="tab_out" :class="{'active': status === 2}" @click="status = 2;changeType(2);">待收货</span>
        <span class="tab_out" :class="{'active': status === 3}"@click="status = 3;changeType(3);">已完成</span>
      </div>
    </div>
    <div v-if="!orderData.length" v-show="status === 0" class="none_order">
      <div class="none">
        <img src="../assets/images/none.png" alt="">
      </div>
    </div>
    <div v-if="!orderData.length" v-show="status === 1" class="none_order">
      <div class="none">
        <img src="../assets/images/none.png" alt="">
      </div>
    </div>
    <div v-if="!orderData.length" v-show="status === 2" class="none_order">
      <div class="none">
        <img src="../assets/images/none.png" alt="">
      </div>
    </div>
    <div v-if="!orderData.length" v-show="status === 3" class="none_order">
      <div class="none">
        <img src="../assets/images/none.png" alt="">
      </div>
    </div>
    <div class="order_min">
      <div class="center" v-for="(item,index) in orderData" v-if="status === 0" @click="seeOrderDetails(status, 0)">
        <div class="content" v-for="(list,index) in item.goodsInfo"  :key="index" >
            <img :src="item.goodsInfo[index].imgurl" alt="商品">
            <div class="right">
              <div class="one">{{item.goodsInfo[index].name}}</div>
              <div class="price">
                <span class="money"> &yen;<span class="money_big">{{item.goodsInfo[index].price}}</span>  </span>
                <span class="goodsnum">x{{item.goodsInfo[index].goodsnum}}</span>
              </div>
            </div>
        </div>
        <div class="order_footer">
          <div class="order_footer_top">
              <span>共{{ item.sum }}件商品&nbsp;合计:<span class="order_footer_price">&yen;{{ item.amount }}</span>&nbsp;<span>(含运费:￥{{item.costs}}元)</span></span>
          </div>
          <div class="footer_btn" v-if="!item.hasMsg">
            <button class="btn order_out" @click.stop="goodsOut(index, item.id)">取消订单</button>
            <button class="btn order_pay" @click.stop="goodsPay(index, item.id, item.amount)">立即支付</button>
          </div>
        </div>
      </div>
      <div class="center" v-for="(item,index) in orderData" v-if="status === 1" @click="seeOrderDetails(status, 0)">
        <div class="content" v-for="(list,index) in item.goodsInfo" :key="index" >
            <img :src="item.goodsInfo[index].imgurl" alt="商品">
            <div class="right">
              <div class="one">{{item.goodsInfo[index].name}}</div>
              <div class="price">
                <span class="money"> &yen;<span class="money_big">{{item.goodsInfo[index].price}}</span>  </span>
                <span class="goodsnum">x{{item.goodsInfo[index].goodsnum}}</span>
              </div>
            </div>
        </div>
        <div class="order_footer">
          <div class="order_footer_top">
              <span>共{{ item.sum }}件商品&nbsp;合计:<span class="order_footer_price">&yen;{{ item.amount }}</span>&nbsp;<span>(含运费:￥{{item.costs}}元)</span></span>
          </div>
        </div>
      </div>
      <div class="center" v-for="(item,index) in orderData" v-if="status === 2" @click="seeOrderDetails(status, 0)">
        <div class="content" v-for="(list,index) in item.goodsInfo" :key="index" >
            <img :src="item.goodsInfo[index].imgurl" alt="商品">
            <div class="right">
              <div class="one">{{item.goodsInfo[index].name}}</div>
              <div class="price">
                <span class="money"> &yen;<span class="money_big">{{item.goodsInfo[index].price}}</span>  </span>
                <span class="goodsnum">x{{item.goodsInfo[index].goodsnum}}</span>
              </div>
            </div>
        </div>
        <div class="order_footer">
          <div class="order_footer_top">
            <span>共{{ item.sum }}件商品&nbsp;合计:<span class="order_footer_price">&yen;{{ item.amount }}</span>&nbsp;<span>(含运费:￥{{item.costs}}元)</span></span>
          </div>
          <div class="footer_btn" v-if="!item.hasMsg">
              <button class="btn order_pay" @click.stop="goodsPay(index, item.id, item.amount)">确认收货</button>
          </div> 
        </div>
      </div>
       <div class="center" v-for="(item,index) in orderData" v-if="status === 3" @click="seeOrderDetails(status, 0)">
        <div class="content" v-for="(list,index) in item.goodsInfo"  :key="index" >
            <img :src="item.goodsInfo[index].imgurl" alt="商品">
            <div class="right">
              <div class="one">{{item.goodsInfo[index].name}}</div>
              <div class="price">
                <span class="money"> &yen;<span class="money_big">{{item.goodsInfo[index].price}}</span></span>
                <span class="goodsnum">x{{item.goodsInfo[index].goodsnum}}</span>
              </div>
            </div>
        </div>
        <div class="order_footer">
          <div class="order_footer_top">
              <span>共{{ item.sum }}件商品&nbsp;合计:<span class="order_footer_price">&yen;{{ item.amount }}</span>&nbsp;<span>(含运费:￥{{item.costs}}元)</span></span>
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
      status: parseInt(this.$route.query.status) || 0,
      orderData: [
        {
          goodsInfo: [
            {
              imgurl: require('../assets/images/goods.png'),
              name: '可穿戴美甲贴片奢华组合套装#210',
              price: '288.00',
              goodsnum: 2
            },
            {
              imgurl: require('../assets/images/goods2.png'),
              name: '可穿戴美甲贴片奢华组合套装#210',
              price: '288.00',
              goodsnum: 2
            }
          ],
          sum: 6,
          amount: '96.00',
          costs: '0.00'
        },
        {
          goodsInfo: [
            {
              imgurl: require('../assets/images/goods3.png'),
              name: '可穿戴美甲贴片奢华组合套装#210',
              price: '288.00',
              goodsnum: 2
            }
          ],
          sum: 6,
          amount: '96.00',
          costs: '0.00'
        }
      ]
    };
  },
  beforeCreate: function () {
    // 创建之前
  },
  created: function () {
    // 创建之后
  },
  beforeMount: function () {
    // 挂载之前
  },
  mounted: function () {
    this.getHeader('我的订单', 'order_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
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
    },
    changeType: function (n) {
      this.$router.replace({path: 'order', query: {status: n}});
      // this.getOrderInfo(n);
    },
    // 是否删除
    goodsOut: function (id, index) {
      let that = this; // 如果回调函数中用到this，则这行代码必须有
      this.modal('提示', '确定取消订单？', '确定', function () {
        that.orderData.splice(index, 1);
      }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
    },
    goodsPay: function (index, id, price) {
      this.$router.push({path: 'payment', query: {orderId: id, allPrice: price}});
    },
    seeOrderDetails: function (status, id) {
      this.$router.push({ path: 'orderDetails', query: {status: status, id: id} });
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
    .none{
      img{
       display: block;
       margin:40% auto;
      }
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
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
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
