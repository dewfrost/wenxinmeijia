<template>
  <div class="footer" v-show="show">
    <!-- 普通底部 -->
    <div class="footer_btn" v-if="!type">
      <div v-for="(item,index) in button" :key="index" :class="item.class" @click="item.callback" >
      	<span class="iconfont" v-show="item.isShow" :class="{ 'icon-shenhe2' : item.state,'icon-weigouxuan' : !item.state }"></span>
      	<span v-html="item.inner"></span>
      </div>
    </div>
    <!-- 购物车底部 -->
    <div class="footer_goodscar" v-if="type === 'goodsCar'">
      <span class="left" @click="toggleCallback()">
        <i class="iconfont" :class="{'icon-30xuanzhongyuanxingfill': isCheck, 'icon-30xuanzhongyuanxing': !isCheck}"></i>
        <span>全选</span>
      </span>
      <div class="right">
        <span class="all_price" v-if="!goodscarIsEdit">
          <span class="warn" v-if="goodsNum">不含运费</span>共计:&nbsp;<span class="small">&yen;</span>
          <span class="price">{{price}}</span>
        </span>
        <div class="buttons">
          <span @click="goodsDelCallback" v-if="goodscarIsEdit">删除</span>
          <span @click="button[0].callback" v-if="!goodscarIsEdit">结算({{goodsNum}})</span>
        </div>
      </div>
    </div>
    <!-- 商品详情底部 -->
    <div class="footer_goods_details" v-if="type === 'goods'">
      <span class="goods_car" @click="goGoodsCar">
        <i class="iconfont icon-cart_light"></i>
        <span class="sum" v-if="goodsAmount">{{goodsAmount}}</span>
        <span class="name">购物车</span>
      </span>
      <div v-for="(item,index) in button" :key="index" :class="item.class" @click="item.callback" >
      	<span class="iconfont" v-show="item.isShow" :class="{ 'icon-shenhe2' : item.state,'icon-weigouxuan' : !item.state }"></span>
      	<span v-html="item.inner"></span>
      </div>
    </div>
    <!-- 提交订单底部 -->
    <div class="footer_submit" v-if="type === 'submit'">
      <span class="all_price">合计：<span class="small">&yen;</span><span>{{price}}</span></span>
      <div class="buttons">
      	<span @click="button[0].callback">提交订单</span>
      </div>
    </div>
    <!-- 底部导航 -->
    <div v-show="navShow" class="footer_tab">
      <div class="footerNav" v-for="(item,index) in nav" @click="toggle(index)"  :class="{ 'navTitle-xz' : item.router === navRoute}" :key="item.id">
      	<span class="iconfont" :class="[item.router === navRoute ? item.class1 : item.class ]"></span>
      	<span class="nav-title">{{item.title}}</span>
        <span class="no_read" v-if="(index === 2) && noReadMessage">{{noReadMessage}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footerTab',
  data () {
    return {// 数据
      noReadMessage: '',
      goodsAmount: null,
      goodscarIsEdit: false,
      isCheck: false,
      goodsNum: null,
      show: false,
      type: '',
      navShow: false,
      navRoute: '',
      price: '',
      toggleCallback: null,
      goodsDelCallback: null,
      button: [
        {
          inner: '123',
          class: '',
          isShow: true,
          state: true,
          callback: () => {}
        }
      ],
      nav: [
        {
          class: 'icon-home_light',
          class1: 'icon-home_fill_light',
          title: '首页',
          router: 'index'
        }, {
          class: 'icon-cart_light',
          class1: 'icon-cart_fill_light',
          title: '购物车',
          router: 'goodsCar'
        }, {
          class: 'icon-Information_light',
          class1: 'icon-Information_fill_lig',
          title: '消息',
          router: 'info'
        }, {
          class: 'icon-my_light',
          class1: 'icon-my_fill_light',
          title: '我的',
          router: 'userCenter'
        }
      ]
    };
  },
  beforeMount: function () {
    this.getEvent();
    this.getRoute();
    // 请求未读消息数量
    this.getNoRead();
  },
  watch: {
    $route (to, from) {
      if (to.name === 'index1') {
        this.navRoute = 'index';
        this.$router.push('/');
      } else {
        this.navRoute = to.name;
      }
    }
  },
  methods: {
    getNoRead () {
      this.axios.get('/user_news/no_look_num', {
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.noReadMessage = data.data;
          } else if (data.status === '10000') {
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 监听事件函数
    getEvent () {
      eventBus.$on('footer', (data) => {
        if (!data) {
          this.show = false;
        } else {
          // if (this.$route.name === 'info') {
          //   // 如果是info页面请求未读消息数量
          //   this.getNoRead();
          // }
          this.getNoRead();
          this.show = true;
          this.navShow = data.navShow;
          this.button = data.button;
          this.type = data.type;
          this.goodsAmount = data.goodsAmount;
          this.price = data.price;
          this.goodsNum = data.goodsNum;
          this.isCheck = data.isCheck;
          this.goodscarIsEdit = data.isEdit;
          this.toggleCallback = data.toggleCallback;
          this.goodsDelCallback = data.delCallback;
        }
      });
    },
    getRoute: function () {
      this.navRoute = this.$route.name;
    },
    toggle: function (index) {
      this.$router.push({path: this.nav[index].router});
    },
    goGoodsCar () {
      this.$router.push({path: 'goodsCar'});
    }
  }
};
</script>
<style lang="scss">
  @import '../assets/css/base.scss';
  .footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    // 普通底部组件
    .footer_btn {
      display: flex;
      div {
        flex-grow: 1;
        text-align: center;
        line-height: 80px;
        font-size: 28px;
        &:nth-last-child(1){
          background-color: $color;
          color: #fff;
        }
        &:nth-last-child(2){
          background-color: #FFE5E6;
          color: $color;
        }
      }
    }
    // 底部导航栏
    .footer_tab{
    	border-top:1px solid #e6e6e6;
    	background-color:#fff;
    	height:100px;
    	padding-top:15px;
    	display: flex;
    	text-align:center;
    	.footerNav{
    		flex-grow: 1;
    		color:#666;
        &:nth-child(3){
          position: relative;
          .no_read{
            position: absolute;
            height: 24px;
            line-height: 24px;
            min-width: 24px;
            border-radius: 12px;
            left: 50%;
            transform: translateX(10px);
            top: -6px;
            background-color: #FE0154;
            color: #fff;
            font-size: 18px;
            padding: 0 4px;
          }
        }
    		.iconfont{
    			font-size:40px;
    			display:block;
    		}
    		.icon-shouye2,.icon-gouwuche2,.icon-yonghu2{
    			color:$color;
    		}
        .icon-saoyisao.active{
          color:$color;
        }
    		.nav-title{
    			font-size:22px;
    		}
    	}
    	.navTitle-xz{
  			color:$color;
  		}
    }
    // 提交订单底部
    .footer_submit{
      width: 640px;
      display: flex;
      justify-content: flex-end;
      position: relative;
      .all_price{
        flex: 1;
        text-align: left;
        padding-left: 24px;
        line-height: 80px;
        height: 84px;
        font-size: 24px;
        background-color: #fff;
        border-top: 1px solid #e6e6e6;
        > span{
          color: $color;
          font-size: 28px;
        }
        .small{
          font-size: 20px;
        }
      }
      .buttons{
        width: 220px;
        text-align: center;
        line-height: 80px;
        height: 84px;
        border-top: 1px solid $color;
        font-size: 24px;
        position: absolute;
        right: 0;
        top: 0;
        &:nth-last-child(1){
          background-color: $color;
          color: #fff;
        }
        &:nth-last-child(2){
          background-color: #FFE5E6;
          color: $color;
        }
      }
    }
    // 购物车底部
    .footer_goodscar{
      width: 100%;
      display: flex;
      height: 80px;
      line-height: 80px;
      justify-content: space-between;
      .left{
        display: flex;
        border-top: 1px solid #e6e6e6;
        background-color: #fff;
        i.iconfont{
          font-size: 28px;
          display: flex;
          align-items: center;
          margin: 0 10px 0 20px;
          position: relative;
          top: 2px;
          &.icon-30xuanzhongyuanxingfill{
            color: $color;
          }
          &.icon-30xuanzhongyuanxing{
            color: #999;
          }
        }
        >span{
          display: flex;
          align-items: center;
        }
      }
      .right{
        display: flex;
        justify-content: flex-end;
        background-color: #fff;
        border-top: 1px solid #e6e6e6;
        flex: 1;
        .all_price{
          flex: 1;
          display: flex;
          justify-content: flex-end;
          text-align: left;
          line-height: 80px;
          font-size: 24px;
          color: #333;
          background-color: #fff;
          > span{
            color: $color;
            font-size: 26px;
          }
          .warn{
            font-size: 18px;
            color: #999;
            margin-right: 8px;
          }
          .small{
            font-size: 20px;
            position: relative;
            top: 2px;
          }
          .price{
            margin-right: 10px;
            color: $color;
          }
        }
        .buttons{
          width: 200px;
          text-align: center;
          line-height: 80px;
          font-size: 24px;
          &:nth-last-child(1){
            background-color: $color;
            color: #fff;
          }
          &:nth-last-child(2){
            background-color: #FFE5E6;
            color: $color;
          }
        }
      }
    }
    // 商品详情底部
    .footer_goods_details{
      display: flex;
      .goods_car{
        width: 110px;
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border-top: 1px solid #e6e6e6;
        .sum{
          position: absolute;
          left: 60px;
          top: -6px;
          padding: 0 2px;
          background-color: $color;
          border-radius: 12px;
          min-width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 18px;
        }
        i.iconfont{
          font-size: 40px;
          color: #666;
        }
        .name{
          font-size: 22px;
          color: #666;
        }
      }
      div {
        flex-grow: 1;
        text-align: center;
        line-height: 80px;
        font-size: 28px;
        &:nth-last-child(1){
          background-color: $color;
          color: #fff;
        }
        &:nth-last-child(2){
          background-color: #FFE5E6;
          color: $color;
        }
      }
    }
  }
</style>
