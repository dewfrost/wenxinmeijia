<template>
  <div class="footer" v-show="show">
    <!-- 普通底部 -->
    <div class="footer-but" v-if="!type">
      <div v-for="(item,index) in button" :key="index" :class="item.class" @click="item.callback" >
      	<span class="iconfont" v-show="item.isShow" :class="{ 'icon-shenhe2' : item.state,'icon-weigouxuan' : !item.state }"></span>
      	<span v-html="item.inner"></span>
      </div>
    </div>
    <!-- 购物车底部 -->
    <div class="footer_goods" v-if="type === 'goodsCar'">
      <div v-for="(item,index) in button" :key="index" :class="item.class" @click="item.callback" >
      	<span class="iconfont" v-show="item.isShow" :class="{ 'icon-shenhe2' : item.state,'icon-weigouxuan' : !item.state }"></span>
      	<span v-html="item.inner"></span>
      </div>
    </div>
    <!-- 商品详情底部 -->
    <div class="footer_goods" v-if="type === 'goods'">
      <div v-for="(item,index) in button" :key="index" :class="item.class" @click="item.callback" >
      	<span class="iconfont" v-show="item.isShow" :class="{ 'icon-shenhe2' : item.state,'icon-weigouxuan' : !item.state }"></span>
      	<span v-html="item.inner"></span>
      </div>
    </div>
    <!-- 提交订单底部 -->
    <div class="footer_goods" v-if="type === 'goods'">
      <div v-for="(item,index) in button" :key="index" :class="item.class" @click="item.callback" >
      	<span class="iconfont" v-show="item.isShow" :class="{ 'icon-shenhe2' : item.state,'icon-weigouxuan' : !item.state }"></span>
      	<span v-html="item.inner"></span>
      </div>
    </div>
    <!-- 底部导航 -->
    <div v-show="navShow" class="footer-nav" v-if="!type">
      <div class="footerNav" v-for="(item,index) in nav" @click="toggle(index)"  :class="{ 'navTitle-xz' : item.router === navRoute}" :key="item.id">
      	<span class="iconfont" :class="[item.router === navRoute ? item.class1 : item.class ]"></span>
      	<span class="nav-title">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'footerTab',
  data () {
    return {// 数据
      show: false,
      type: '',
      navShow: false,
      navRoute: '',
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
  },
  watch: {
    $route (to, from) {
      if (to.name === 'index1') {
        this.navRoute = 'index';
      } else {
        this.navRoute = to.name;
      }
    }
  },
  methods: {
    // 监听事件函数
    getEvent () {
      eventBus.$on('footer', (data) => {
        if (!data) {
          this.show = false;
        } else {
          this.show = true;
          this.navShow = data.navShow;
          this.button = data.button;
          this.type = data.type;
        }
      });
    },
    getRoute: function () {
      this.navRoute = this.$route.name;
    },
    toggle: function (index) {
      this.$router.push({path: this.nav[index].router});
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
    .footer-but {
      display: flex;
      div {
        flex-grow: 1;
        text-align: center;
        line-height: 80px;
      }
    }
    .footer-nav{
    	border-top:1px solid #e6e6e6;
    	background-color:#fff;
    	height:100px;
    	padding-top:15px;
    	display: flex;
    	text-align:center;
    	
    	.footerNav{
    		flex-grow: 1;
    		color:#666;
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
  }
</style>
