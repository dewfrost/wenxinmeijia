<template>
  <div class="goodsList">
    <!-- 商品专区 -->
    <div class="blank"></div>
    <div class="goods" v-if="this.$route.query.type === 'goods'">
      <div class="details">
        <div class="details_list" v-for="(item, index) in details" :key="index" @click="seeDetails(item.id)">
          <img :src="item.img" alt="商品">
          <p class="details_name">{{item.name}}</p>
          <p class="details_info">
            <span class="red">&yen;&nbsp;<span class="price">{{item.price}}</span></span>
            <span class="buy" @click.stop="buyGoods(item.id)">立即购买</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 空白灰色 -->
    
    <!-- 配件专区 -->
    <div class="parts" v-if="this.$route.query.type === 'parts'">
      <div class="details">
        <div class="details_list" v-for="(item, index) in parts" :key="index" @click="seeParts(item.id)">
          <img :src="item.img" alt="商品">
          <p class="details_name">{{item.name}}</p>
          <p class="details_info">
            <span class="red">&yen;&nbsp;<span class="price">{{item.price}}</span></span>
            <span class="buy" @click.stop="buyParts(item.id)">立即购买</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsList',
  data () {
    return {
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
    if (this.$route.query.type === 'goods') {
      this.getHeader('商品专区', 'revisePassword_top');
    } else {
      this.getHeader('配件专区', 'revisePassword_top');
    }
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
    buyParts (id) {
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
      this.details = this.details.concat(this.details);
    },
    // 点击配件的查看更多
    parts_more: function () {
      this.parts = this.parts.concat(this.parts);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/base.scss";
.goodsList{
  padding-top: 90px;
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
    margin-top: -8px;
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
      &:last-child{
        position: relative;
        &:after{
          display: none;
        }
      }
      img{
        width: 284px;
        height: 284px;
      }
      .details_name{
        font-style: 22px;
        color: #000000;
        line-height: 1.4;
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
  }
}
</style>
