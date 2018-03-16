<template>
  <div class="index">
    <!-- 轮播图 -->
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiperSlide v-for="item in swiperImg" :key="item.id">
        <img class="swiper-slid_img" :src="item.imgurl" alt="轮播" />
      </swiperSlide>
      <!-- Optional controls -->
    </swiper>
    <div class="swiper-pagination"></div>
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
      ]
    };
  },
  beforeCreate: function () { // 创建之前
  },
  created: function () { // 创建之后
  },
  beforeMount: function () { // 挂载之前
  },
  mounted: function () {
    this.getFooter();
  },
  methods: {
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

<style scoped>
 .index{
   
 }
</style>
