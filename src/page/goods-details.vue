<template>
  <div class="goodsDetails">
    <div class="goods_top">
     <img :src="goods.imgurl" alt="商品">
     <div class="title">
       <div class="title_t">{{goods.title}}</div>
       <div class="money">￥<span>{{goods.money}}</span></div>
       <div class="freight" :class="{'wu': !goods.freight}">运费：{{goods.freight || "10元，订单满88元包邮"}}</div>
     </div>
    </div>
    <div class="content">
      <div class="type"> 商品参数</div>
      <div class="goods_param_mess">
          <p class="goods_param_list" v-for="(item,index) in param" :key="index">
            <span class="goods_param_list_tit">
              {{item.title}}
            </span>
            <span class="goods_param_list_na">
              {{item.name}}
            </span>
          </p>
      </div>
    </div>
    <!-- 商品详请 -->
    <div class="goods_Details">
      <div class="goods_Details_title">
        <span>商品详请</span>
      </div>
      <div class="goods_Detials_img">
        <img src="../assets/images/goods_details.png" alt="">
      </div>
    </div>
    <!-- <div class="bottom">
      <div class="car">
        <div class="iconfont icon-cart_light">
          <span class="num">{{goods.num}}</span>
        </div>
        <span>购物车</span>
      </div>
      <div class="add_car" @click.stop="add()">加入购物车</div>
      <div class="add_buy">立即购买</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'goodsDetails',
  data () {
    return {
      goods: {
        imgurl: require('../assets/images/goods_details.png'),
        title: '可穿戴美甲贴片奢华组合套装#210',
        money: '288.00',
        freight: '免运费',
        num: 2
      },
      param: [{
        title: '品名',
        name: '可穿戴美甲贴片奢华组合套装#210'
      }, {
        title: '货号',
        name: '#210'
      }, {
        title: '规格',
        name: '1/套'
      }, {
        title: '甲片',
        name: '进口树脂ABS材质'
      }, {
        title: '技术',
        name: '丝印油墨工艺印刷'
      }, {
        title: '凝胶',
        name: '进口环保水溶性树脂胶'
      }]
    };
  },
  beforeMount: function () {
  },
  mounted: function () {
    this.getHeader('商品详情');  // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
    this.getFooter();
  },
  beforeDestroy: function () {
  },
  methods: {
    add: function () {
      this.toast('' + this.hidePhone('添加购物车成功!'), 'icon-chenggong1');
      this.goods.num++;
      this.getFooter();
    },
    buy: function () {
      this.$router.push({path: 'submitOrder'});
    },
    getFooter () {
      eventBus.$emit('footer', {
        button: [
          {
            inner: '<div class="iconfont icon-cart_light"><span class="num">' + this.goods.num + '</span></div><span class="font">购物车</span>',
            class: 'car',
            isShow: false,
            state: true,
            callback: () => {}
          },
          {
            inner: '<div>加入购物车</div>',
            class: 'add_car',
            isShow: false,
            state: true,
            callback: () => {
              this.add();
            }
          },
          {
            inner: '<div>立即购买</div>',
            class: 'add_buy',
            isShow: false,
            state: true,
            callback: () => {
              this.buy();
            }
          }
        ],
        navShow: false
      });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.goodsDetails{
  .goods_top{
    position: relative;
    padding-bottom: 20px;
    padding-top: 90px;
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
    img{
      width: 640px;
      height: 420px;
    }
    .title{
     padding: 20px;
     .title_t{
       font-size: 24px;
       color: #000;
     }
     .money{
       margin-top: 18px;
       font-size: 20px;
       color: $color;
       span{
         font-size: 26px;
       }
     }
     .freight{
       font-size: 22px;
       color: #999;
       margin-top: 5px;
     }
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
    .type{
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid #e6e6e6;
      font-size: 24px;
      color: #333;
      padding-left: 20px;
    }
    .goods_param_mess{
      color: #000;
      padding:20px;
      font-size:22px;
      .goods_param_list{
        line-height:42px;
        .goods_param_list_tit{
          color:#999;
          display:inline-block;
          width:140px;
        }
      }
    }
  }
  .goods_Details{
    padding-bottom: 80px;
    .goods_Details_title{
      height:60px;
      line-height:60px;
      text-align:center;
      span{
        color: #333;
        font-size: 20px;
        position: relative;
        &::before,&::after{
          content:'';
          width:50px;
          height:1px;
          background-color:#333;
          position: absolute;
          top:15px;
        }
        &::before{
          left:-70px;
        }
        &::after{
          right:-70px;
        }
      }
    }
    .goods_Details_img{
      img{
        width: 640px;
      }
    }
  }
  .bottom{
    text-align: center;
    height: 80px;
    background-color: #fff;
    display: flex;  
  }
}
.car{
  margin: auto;
  width: 20%;
  color: #999;
  background: #fff;
  display: flex;
  flex-direction: column;
  span{
    // height: 80px;
    .iconfont{
    font-size: 40px;
    position: relative;
    .num{
      position: absolute;
      top: 10px;
      left: 54%;
      width: 25px;
      height: 25px;
      line-height: 25px;
      background: $color;
      border-radius: 50%;
      color: #fff;
      font-size: 16px;
    }
  }
  .font{
    display: inline-block;
    font-size: 16px;
    margin-top: -14px;
  }
}
  span{
    font-size: 16px;
  }
}
.add_car{
  line-height: 80px;
  width: 40%;
  background: #ffe5e6;
  color: $color;
}
.add_buy{
  line-height: 80px;
  width: 40%;
  background: $color;
  color: #fff;
}
.footer .footer-but .add_car{
  line-height: 0;
}
.footer .footer-but .car{
  line-height: 0;
}
.footer .footer-but .add_buy{
  line-height: 0;
}
</style>
