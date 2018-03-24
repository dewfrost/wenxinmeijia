<template>
  <div class="goodsDetails" ref="logBox" id="goods">
    <!-- 轮播  -->
    <div class="goods_details_banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide v-for="(item,index) in swiperImg" :key="index">
          <img class="swiper-slid_img" :src="item.imgurl" alt="轮播" />
        </swiperSlide>
        <!-- Optional controls -->
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <div class="goods_top">
      <div class="title">
        <div class="title_t">{{goods.name}}</div>
        <span class="new_money">
          <span class="small_money">&yen;</span>
          <span>{{goods.price}}</span>
        </span>
        <span class="old_money" v-if="goods.zhekou">
          <span class="small_money">&yen;</span>
          <span>{{goods.zhekou}}</span>
        </span>
        <div class="freight" :class="{'wu': !goods.freight}">运费：{{goods.freight || "免运费"}}</div>
      </div>
    </div>
    <div class="content">
      <div class="type"> 商品参数</div>
      <div class="goods_param_mess">
          <span class="goods_param_list" v-for="(item,index) in param" :key="index">
            <span class="goods_param_list_tit">
              {{item.title}}
            </span>
            <span class="goods_param_list_na">
              {{item.name}}
            </span>
          </span>
      </div>
    </div>
    <!-- 商品详请 -->
    <div class="goods_Details" id="goodsDetails" ref="logBox">
      <div class="goods_Details_title">
        <span>商品详请</span>
      </div>
      <div class="goods_details_tag" v-html="detailsHtml"></div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'goodsDetails',
  data () {
    return {
      goods: {
        id: null,
        price: null,
        name: ''
      },
      goodsCarSum: 0,
      // 轮播图配置
      swiperOption: { // 以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，
        // 也就意味着你可以在第一时间获取到swiper对象，<br>假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: false,
        speed: 1000,
        loop: true,
        pagination: '.swiper-pagination'
      },
      swiperImg: [
        {
          imgurl: require('../assets/images/banner1.jpg')
        },
        {
          imgurl: require('../assets/images/banner2.jpg')
        },
        {
          imgurl: require('../assets/images/banner3.jpg')
        }
      ],
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
      }],
      detailsHtml: ''
    };
  },
  beforeMount: function () {
    // 获取商品详情
    this.getDetails(this.$route.query.id);
  },
  mounted: function () {
    this.scrollOn();
    this.getFooter();
    this.getDetailsHeader();
  },
  beforeDestroy: function () {
    eventBus.$emit('header', false);
    document.getElementById('content').scrollTop = 0;
  },
  updated: function () {
    this.getFooter();
  },
  methods: {
    scrollOn: function () {
      eventBus.$on('contentScroll', (height) => {
        // 只在goodsDetails页面监听
        if (/goodsDetails/g.test(window.location.href)) {
          if (height > document.getElementById('goodsDetails').offsetTop) {
            this.getGoodsHeader();
          } else {
            this.getDetailsHeader();
          }
        }
      });
    },
    getDetails (id) {
      this.axios.get('/goods/goods_detail', {
        params: {
          id: id
        }
      })
        .then(({data}) => {
          if (data.status === 1) {
            // 轮播图片
            this.swiperImg = data.data.lunbo;
            this.detailsHtml = data.data.description;
            this.goods = data.data;
            // 底部购物车数量
            this.goodsCarSum = data.data.cart_num;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 点击详情事件
    getDetailsHeader () {
      this.getHeader('商品', 'goods_details_details', '详情', () => {
        // 如果详情元素的高度不足屏幕的高度。则不滚动跳转
        if (document.getElementById('goodsDetails').scrollHeight < window.innerHeight) {
          return false;
        }
        this.backScroll(document.getElementById('goodsDetails').offsetTop);
      });  // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字,第七个参数点击商品的事件
    },
    // 点击商品事件
    getGoodsHeader () {
      this.getHeader('商品', 'goods_details_goods', '详情', null, null, null, () => {
        // 如果滚动轴距离顶部不足详情距离顶部的高度，则return
        if (document.getElementById('content').scrollTop <= document.getElementById('goodsDetails').offsetTop) {
          return false;
        }
        this.backScroll(0);
      });  // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字,第七个参数点击商品详情的事件
    },
    addGoods: function () {
      this.axios.post('/cart/add', {
        num: 1,
        gid: this.$route.query.id
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.toast('添加购物车成功!', 'icon-chenggong1');
            // this.goodsCarSum++;
            // this.getFooter();
            this.getDetails(this.$route.query.id);
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    buy: function () {
      this.$router.push({path: 'submitOrder'});
    },
    getFooter () {
      this.getGoodsFooter(this.goodsCarSum, () => {
        this.addGoods();
      }, () => {
        this.$router.push({path: 'submitOrder', query: {id: this.$route.query.id}});
      });
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style lang="scss">
@import url(../assets/css/swiper-3.4.0.min.css);
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
  .goods_details_banner{
    width:640px;
    height:350px;
    overflow: hidden;
    position: relative;
    img{
      width:640px;
      height:350px;
    }
    .swiper-pagination {
      bottom: 20px;
      right: 50%;
      transform: translateX(50%);
      padding: 0 10px;
      margin-left: -75px;
      height: 20px;
      border-radius: 10px;
    }
    .swiper-pagination-bullet {
      background: #999;
      margin: 2px 6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      opacity: .9;
    }
    .swiper-pagination-bullet-active {
      background: #fff;
      width: 46px;
      border-radius: 8px;
    }
  }
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
     .new_money{
       color: $color;
       .small_money{
         font-size: 20px;
       }
     }
     .old_money{
       color: #999;
       margin-left: 10px;
       font-size: 22px;
       text-decoration: line-through;
       .small_money{
         font-size: 20px;
       }
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
        width: 100%;
        display: flex;
        // flex-flow: nowrap;
        .goods_param_list_tit{
          color:#999;
          display:inline-block;
          width:140px;
        }
        .goods_param_list_na{
          flex: 1;
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
    .goods_details_tag{
      img{
        width: 640px;
      }
    }
  }
}
</style>
