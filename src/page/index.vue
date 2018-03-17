<template>
  <div class="index">
    <!-- <swiper :options="swiperOption" ref="mySwiper">
      <swiperSlide v-for="item in swiperImg" :key="item.id">
        <img class="swiper-slid_img" :src="item.imgurl" alt="轮播" />
      </swiperSlide>
    </swiper> -->
    <img :src="img" alt="商品">
    <div class="swiper_pagination">
      <p class="title">&mdash;&nbsp;商品专区&nbsp;&mdash;</p>
      <div class="details">
        <div class="details_list" v-for="(item, index) in details" :key="index" @click="seeDetails(item.id)">
          <img :src="item.img" alt="商品">
          <p class="details_name">{{item.name}}</p>
          <p class="details_info">
            <span class="red">&yen;&nbsp;<span class="price">{{item.price}}</span></span>
            <span class="buy" @click.stop="buyGoods(item.id)">立即购买</span>
          </p>
        </div>
        <p class="more">查看更多></p>
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
        loop: true,
        pagination: '.swiper-pagination'
      },
      // 轮播
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
      img: require('../assets/images/banner1.jpg'),
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
    showToast: function () {
      // 引用toast组件
      this.toast('提示文字' + this.hidePhone(15614544444), 'icon-chenggong1');
    },
    showModal: function () {
      let that = this; // 如果回调函数中用到this，则这行代码必须有
      // 引用弹窗组件
      this.modal('这是弹窗标题', '这是弹窗服饰股份的供热一个头特化工股份合格的合格合格分数高富帅正文', '这是按钮', function () {
        console.log('调用弹窗成功');
        console.log(that.modalMsg);
      }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="scss">
@import "../assets/css/base.scss";
.index{
    background: #f5f5f5;
    margin-bottom: 115px;
  .swiper_pagination{
    background: #fff;
    margin-top: 20px;
    .title{
      line-height: 80px;
      text-align: center;
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
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
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
