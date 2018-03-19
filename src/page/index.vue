<template>
  <div class="index">
    <!-- 轮播  -->
    <div class="index_banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide v-for="(item,index) in swiperImg" :key="index">
          <img class="swiper-slid_img" :src="item.imgurl" alt="轮播" />
        </swiperSlide>
        <!-- Optional controls -->
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <!-- <img :src="img" alt="商品"> -->
    <div class="goods_list">
      <!-- 商品专区 -->
      <p class="title">&nbsp;商品专区&nbsp;</p>
      <div class="details">
        <div class="details_list" v-for="(item, index) in details" :key="index" @click="seeDetails(item.id)">
          <img :src="item.img" alt="商品">
          <p class="details_name">{{item.name}}</p>
          <p class="details_info">
            <span class="red">&yen;&nbsp;<span class="price">{{item.price}}</span></span>
            <span class="buy" @click.stop="buyGoods(item.id)">立即购买</span>
          </p>
        </div>
        <p class="more" @click="goods_more">查看更多></p>
      </div>
      <!-- 空白灰色 -->
      <div class="blank"></div>
      <!-- 配件专区 -->
      <p class="title">&nbsp;配件专区&nbsp;</p>
      <div class="details">
        <div class="details_list" v-for="(item, index) in parts" :key="index" @click="seeParts(item.id)">
          <img :src="item.img" alt="商品">
          <p class="details_name">{{item.name}}</p>
          <p class="details_info">
            <span class="red">&yen;&nbsp;<span class="price">{{item.price}}</span></span>
            <span class="buy" @click.stop="buyParts(item.id)">立即购买</span>
          </p>
        </div>
        <p class="more" @click="parts_more">查看更多></p>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'index',
  data () {
    return {
      // 轮播图配置
      swiperOption: { // 以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，
        // 也就意味着你可以在第一时间获取到swiper对象，<br>假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: 3000,
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
      // 商品专区
      details: [
        {
          img: require('../assets/images/goods1.png'),
          name: '可穿戴美甲贴片奢华组合套装#210',
          price: '288.00',
          id: 2
        },
        {
          img: require('../assets/images/goods3.png'),
          name: '可穿戴美甲贴片奢华组合 套装#210-',
          price: '288.00',
          id: 2
        },
        {
          img: require('../assets/images/goods2.png'),
          name: '可穿戴美甲贴片奢华组合套装#710',
          price: '288.00',
          id: 2
        },
        {
          img: require('../assets/images/goods3.png'),
          name: '可穿戴美甲贴片奢华组合套装#1711-',
          price: '288.00',
          id: 2
        }
      ],
      // 配件专区
      parts: [
        {
          img: require('../assets/images/goods1.png'),
          name: '可穿戴美甲贴片玫瑰香薰球#265',
          price: '68.00',
          id: 2
        },
        {
          img: require('../assets/images/parts2.png'),
          name: '可穿戴美甲贴片天然翡翠#1760',
          price: '68.00',
          id: 2
        },
        {
          img: require('../assets/images/parts3.png'),
          name: '可穿戴美甲贴片淑女蝴蝶结#2060',
          price: '58.00',
          id: 2
        },
        {
          img: require('../assets/images/parts4.png'),
          name: '可穿戴美甲贴片蓝色妖姬#1360',
          price: '46.00',
          id: 2
        },
        {
          img: require('../assets/images/parts5.png'),
          name: '可穿戴美甲贴片黑色甲壳虫#960',
          price: '58.00',
          id: 2
        },
        {
          img: require('../assets/images/parts6.png'),
          name: '可穿戴美甲贴片花间舞者#862',
          price: '58.00',
          id: 2
        }
      ]
    };
  },
  beforeCreate: function () { // 创建之前
  },
  created: function () { // 创建之后
    eventBus.$emit('header', false);
  },
  beforeMount: function () { // 挂载之前
  },
  mounted: function () {
    this.getFooter();
  },
  methods: {
    // 点击商品的跳转商品详情
    seeDetails (id) {
      this.$router.push({path: 'goodsDetails', query: {id: id}});
    },
    // 点击商品的跳转商品详情
    seeParts (id) {
      this.$router.push({path: 'goodsDetails', query: {id: id}});
    },
    buyGoods (id) {
      this.$router.push({path: 'submitOrder', query: {id: id}});
    },
    getFooter () {
      eventBus.$emit('footer', {
        button: [],
        navShow: true
      });
    },
    // 点击商品的查看更多
    goods_more: function () {
      this.$router.push({path: 'goodsList', query: {type: 'goods'}});
    },
    // 点击配件的查看更多
    parts_more: function () {
      this.$router.push({path: 'goodsList', query: {type: 'parts'}});
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
.index{
  background: #f5f5f5;
  margin-bottom: 115px;
  .index_banner{
    width:640px;
    height:350px;
    overflow: hidden;
    position: relative;
    img{
      width:640px;
      height:350px;
    }
    .swiper-pagination {
      bottom: 10px;
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
  .goods_list{
    background: #fff;
    margin-top: 20px;
    .title{
      line-height: 80px;
      text-align: center;
      position: relative;
      &:before{
        content: '';
        display: block;
        width: 16px;
        height: 2px;
        position: absolute;
        top: 50%;
        left: 38%;
        background: #333;
        margin-right: 10px;
      }
      &:after{
        content: '';
        display: block;
        width: 16px;
        height: 2px;
        position: absolute;
        top: 50%;
        right: 37%;
        background: #333;
        margin-right: 10px;
      }
    }
    .blank{
      display: block;
      background: #f5f5f5;
      height: 20px;
      width: 100%;
    }
    .details{
      flex-flow: wrap;
      display: flex;
      position: relative;
      margin-top: -28px;
      padding: 0 12px;
      .details_list{
        width: 50%;
        padding: 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        &:nth-child(2n){
          position: relative;
          &:after{
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            height: 1px;
            background-color: #e6e6e6;
            width: 590px;
            right: 13px;
          }
        }
        // &:not(:last-child){
        //   position: relative;
        //   &:after{
        //     display: none;
        //   }
        // }
        img{
          width: 284px;
          height: 284px;
        }
        .details_name{
          font-style: 22px;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          padding: 5px 18px 0;
          font-size: 22px;
        }
        .details_info{
          width: 270px;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 20px;
          .red{
            color: $color;
            .price{
              font-size: 26px;
            }
          }
          .buy{
            width: 100px;
            border-radius: 4px;
            line-height: 36px;
            background: $color;
            color: #fff;
            text-align: center;
          }
        }
      }
      .more{
        width: 100%;
        line-height: 60px;
        text-align: center;
        color: $color;
      }
    }
  }
}
</style>
