<template>
  <div class="goodsDetails" ref="logBox" id="goods">
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
    <div class="goods_Details" id="goodsDetails">
      <div class="goods_Details_title">
        <span>商品详请</span>
      </div>
      <div class="goods_Detials_img">
        <img src="../assets/images/goods_details.png" alt="">
        <img src="../assets/images/goods_details.png" alt="">
        <img src="../assets/images/goods_details.png" alt="">
        <img src="../assets/images/goods_details.png" alt="">
        <img src="../assets/images/goods_details.png" alt="">
        <img src="../assets/images/goods_details.png" alt="">
      </div>
    </div>
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
    this.getDetailsHeader();
  },
  mounted: function () {
    this.scrollOn();
    this.getFooter();
    this.getFromName();
  },
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  },
  updated: function () {
    this.getFooter();
  },
  methods: {
    getFromName () {
    },
    scrollOn: function () {
      eventBus.$on('contentScroll', (height) => {
        // 只在goodsDetails页面监听
        if (/goodsDetails/g.test(window.location.href)) {
          if (height > 986) {
            this.getGoodsHeader();
          } else {
            this.getDetailsHeader();
          }
        }
      });
    },
    // 点击详情事件
    getDetailsHeader () {
      let that = this;
      this.getHeader('商品', 'goods_details_details', '详情', function () {
        // that.getGoodsHeader();
        that.backScroll(986);
      });  // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字,第七个参数点击商品的事件
    },
    // 点击商品事件
    getGoodsHeader () {
      let that = this;
      this.getHeader('商品', 'goods_details_goods', '详情', null, null, null, function () {
        // that.getDetailsHeader();
        that.backScroll(0);
      });  // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字,第七个参数点击商品详情的事件
    },
    add: function () {
      this.toast('' + this.hidePhone('添加购物车成功!'), 'icon-chenggong1');
      this.goods.num++;
      this.getFooter();
    },
    buy: function () {
      this.$router.push({path: 'submitOrder'});
    },
    getFooter () {
      let that = this;
      this.getGoodsFooter(this.goods.num, function () {
        that.add();
      }, function () {
        that.$router.push('submitOrder');
      });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.header_top.goods_details_details, .header_top.goods_details_goods{
  position: relative;
  h1.title{
    font-size: 24px;
    position: absolute;
    left: 40%;
    top: 0;
    color: #333;
  }
  .header_right{
    position: absolute;
    right: 40%;
    top: 0;
    display: inline-block;
    padding: 0;
  }
}
.header_top{
  &.goods_details_details{
    &::before{
      position: absolute;
      content: '';
      display: block;
      height: 2px;
      transition: left .4s;
      width: 2em;
      bottom: 20%;
      left: 280px;
      transform: translateX(-50%);
      background-color: #333;
    }
    .header_right{
      color: #777;
    }
  }
  &.goods_details_goods{
    &::before{
      position: absolute;
      content: '';
      display: block;
      height: 2px;
      width: 2em;
      bottom: 20%;
      transition: left .4s;
      left: 360px;
      transform: translateX(-50%);
      background-color: #333;
    }
    .header_right{
      color: #333;
    }
    h1.title{
      color: #777;
    }
  }
}
.goodsDetails{
  min-height: 100%;
  padding: 90px 0 80px;
  .goods_top{
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
    padding-top: 90px;
    margin-top: -90px;
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
}
</style>
