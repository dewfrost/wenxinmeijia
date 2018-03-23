<template>
  <div class="index" :class="{'is_ios': isIos}">
    <!-- 轮播  -->
    <div class="index_banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide v-for="(item,index) in swiperImg" :key="index">
          <img class="swiper-slid_img" :src="item.pic" alt="轮播" />
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
        <span class="more" @click="goodsMore">查看更多></span>
      </div>
      <!-- 空白灰色 -->
      <div class="blank"></div>
      <!-- 配件专区 -->
      <div class="area" v-for="(item, index) in areaList" :key="index">
        <p class="title">&nbsp;{{item.name}}&nbsp;</p>
        <div class="details">
          <div class="details_list" v-for="(list, index) in item.getGoods" :key="index" @click="seeDetails(list.id)">
            <img :src="list.img" alt="商品">
            <p class="details_name">{{list.name}}</p>
            <p class="details_info">
              <span class="red">&yen;&nbsp;<span class="price">{{list.price}}</span></span>
              <span class="buy" @click.stop="buyParts(list.id)">立即购买</span>
            </p>
          </div>
          <span class="more" @click="partsOther(item.id)">查看更多></span>
        </div>
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
      isIos: false,
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
      swiperImg: [],
      // 商品专区
      areaList: [],
      details: [],
      // 配件专区
      parts: []
    };
  },
  beforeCreate: function () { // 创建之前
  },
  created: function () { // 创建之后
    eventBus.$emit('header', false);
  },
  beforeMount: function () {
    // 获取轮播图片
    this.getCarouselImg();
    // 获取商品专区
    this.getGoodsList();
    // 获取其他分类专区
    this.getOtherList();
  },
  mounted: function () {
    this.getFooter();
    // 展示代金券弹窗,参数为金额
    this.getVoucherModal('1450.00');
    // 检查是否是IOS
    this.checkIsIos();
  },
  methods: {
    getCarouselImg () {
      this.axios.get('/index/lunbo', {
      })
        .then(({data}) => {
          console.log(data);
          if (data.status === 1) {
            this.swiperImg = data.data;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getGoodsList () {
      this.axios.get('/goods/goods', {
      })
        .then(({data}) => {
          console.log(data);
          if (data.status === 1) {
            this.details = data.data;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getOtherList () {
      this.axios.get('/goods/other_goods', {
      })
        .then(({data}) => {
          console.log(data);
          if (data.status === 1) {
            this.areaList = data.data;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    checkIsIos () {
      // 是否IOS系统
      if (navigator.userAgent.toLowerCase().match(/iphone|ipad/i)) {
        this.isIos = true;
      }
    },
    // 点击商品的跳转商品详情
    seeDetails (id) {
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
    goodsMore () {
      this.$router.push({path: 'goodsList'});
      // window.location.href = './goodsList?type=goods';
    },
    // 点击配件的查看更多
    partsOther (id) {
      this.$router.push({path: 'goodsList', query: {id: id}});
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
  &.is_ios{
    margin-bottom: 140px;
  }
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
