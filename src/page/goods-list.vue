<template>
  <div class="goodsList">
    <!-- 商品专区 -->
    <div class="goods">
      <div class="details">
        <div class="details_list" v-for="(item, index) in list" :key="index" @click="seeDetails(item.id)">
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
    <!-- <div class="parts" v-if="this.$route.query.id">
      <div class="details">
        <div class="details_list" v-for="(item, index) in parts" :key="index" @click="seeDetails(item.id)">
          <img :src="item.img" alt="商品">
          <p class="details_name">{{item.name}}</p>
          <p class="details_info">
            <span class="red">&yen;&nbsp;<span class="price">{{item.price}}</span></span>
            <span class="buy" @click.stop="buyGoods(item.id)">立即购买</span>
          </p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'goodsList',
  data () {
    return {
      // 商品专区
      headerName: '商品专区',
      list: []
    };
  },
  beforeCreate: function () { // 创建之前
  },
  created: function () { // 创建之后
    eventBus.$emit('header', false);
  },
  beforeMount: function () {
    this.getList();
  },
  mounted: function () {
    this.getHeaderName();
    console.log(this.$route.name);
  },
  updated: function () {
    this.getHeaderName();
  },
  methods: {
    getHeaderName () {
      this.getHeader(this.headerName, 'revisePassword_top');
    },
    getList () {
      if (!this.$route.query.id) {
        // 商品专区
        this.axios.get('/goods/goods', {
        })
          .then(({data}) => {
            if (data.status === 1) {
              this.list = data.data;
            } else {
              this.toast(data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // 其他专区
        this.axios.get('/goods/class_goods', {
          params: {
            cid: this.$route.query.id
          }
        })
          .then(({data}) => {
            if (data.status === 1) {
              this.list = data.data.goods;
              this.headerName = data.data.class_name;
            } else {
              this.toast(data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    // 点击商品的跳转商品详情
    seeDetails (id) {
      this.$router.push({path: 'goodsDetails', query: {id: id}});
    },
    buyGoods (id) {
      this.$router.push({path: 'submitOrder', query: {id: id}});
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/base.scss";
.goodsList{
  padding-top: 90px;
  min-height: 100%;
  .details{
    flex-flow: wrap;
    display: flex;
    position: relative;
    padding: 0 12px;
    padding-top: 20px;
    &::before{
      position: absolute;
      content: '';
      display: block;
      height: 20px;
      width: 100%;
      background-color: #f5f5f5;
      left: 0;
      top: 0px;
    }
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
