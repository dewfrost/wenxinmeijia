<style lang="scss">
  .footer {
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
    			color:#e01016;
    		}
        .icon-saoyisao.active{
          color:#e01016;
        }
    		.nav-title{
    			font-size:22px;
    		}
    	}
    	.navTitle-xz{
  			color:#e01016;
  		}
    }
  }
</style>

<template>
  <div class="footer" v-show="show">
    <div class="footer-but">
      <div v-for="(item,index) in button" :key="item.id" :class="item.class" @click="item.callback" >
      	<span class="iconfont" v-show="item.isShow"  :class="{ 'icon-shenhe2' : item.state,'icon-weigouxuan' : !item.state }"></span>
      	<span v-html="item.inner"></span>
      </div>
    </div>
    <div v-show="navShow" class="footer-nav">
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
          class: 'icon-news_hot_light',
          class1: 'icon-news_hot_fill_light',
          title: '报单中心',
          router: 'declarationCenter'
        }, {
          class: 'icon-cart_light',
          class1: 'icon-cart_fill_light',
          title: '购物车',
          router: 'goodsCar'
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
    this.linsEvent();
    this.getRoute();
  },
  watch: {
    $route (to, from) {
      this.navRoute = to.name;
    }
  },
  methods: {
    // 监听事件函数
    linsEvent: function () {
      eventBus.$on('footer', (data) => {
        if (!data) {
          this.show = false;
        } else {
          this.show = true;
          this.navShow = data.navShow;
          this.button = data.button;
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