<template>
  <div class="goods_car_wrap">
    <ul class="goods_list">
      <li class="goods" v-for="(item, index) in goodsList" :key="index">
        <i class="iconfont"
        @click="toggleCheak(index)"
        :class="{'icon-30xuanzhongyuanxingfill': item.isCheck, 'icon-30xuanzhongyuanxing': !item.isCheck}"></i>
        <img :src="item.goodsImg" alt="" class="goods_img">
        <div class="goods_details">
          <span class="name">{{item.goodsName}}</span>
          <span class="bottom">
            <span class="price"><span>￥</span>{{item.price || 0}}</span>
            <span class="sum">x{{item.sum}}</span>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'goodsCar',
  data () {
    return {
      isEdit: false,
      goodsList: [
        {
          isCheck: false,
          goodsImg: require('../assets/images/goods1.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '288.00',
          sum: 14
        },
        {
          isCheck: false,
          goodsImg: require('../assets/images/goods1.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '288.00',
          sum: 14
        },
        {
          isCheck: false,
          goodsImg: require('../assets/images/goods1.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '288.00',
          sum: 14
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
    let that = this;
    this.getHeader('购物车', 'goods_car_header', '编辑', function () {
      that.toggleEdit(1);
    });
  },
  methods: {
    toggleCheak (index) {
      this.goodsList[index].isCheck = !this.goodsList[index].isCheck;
    },
    // 切换头部编辑状态
    toggleEdit (status) {
      let that = this;
      if (status) {
        this.getHeader('购物车', 'goods_car_header', '完成', function () {
          that.toggleEdit(0);
        });
        this.isEdit = true;
      } else {
        this.getHeader('购物车', 'goods_car_header', '编辑', function () {
          that.toggleEdit(1);
        });
        this.isEdit = false;
      }
    },
    getFooter () {
      eventBus.$emit('footer', {
        button: [
          {
            inner: '123',
            class: 'goods_footer',
            callback: () => {}
          },
          {
            inner: '123',
            class: 'goods_footer1',
            callback: () => {}
          }
        ],
        navShow: true
      });
    }
  }
};
</script>

<style lang="scss">
  @import "../assets/css/base.scss";
  .goods_car_header.header_top{
    .iconfont.back{
      display: none;
    }
  }
  .goods_car_wrap{
    min-height: 100%;
    padding: 110px 0 100px;
    background-color: #f5f5f5;
    .goods_list{
      .goods{
        background-color: #fff;
        margin-bottom: 20px;
        @include border;
        display: flex;
        // align-items: center;
        padding: 26px 20px 30px;
        i.iconfont{
          font-size: 32px;
          margin-right: 14px;
          display: flex;
          align-items: center;
          &.icon-30xuanzhongyuanxingfill{
            color: $color;
          }
          &.icon-30xuanzhongyuanxing{
            color: #999;
          }
        }
        img.goods_img{
          width: 150px;
          height: 150px;
          padding: 5px;
          margin-right: 22px;
        }
        .goods_details{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name{
            margin-top: 8px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .bottom{
            display: flex;
            justify-content: space-between;
            margin-bottom: 14px;
            .price{
              font-size: 28px;
              color: $color;
              >span{
                font-size: 22px;
              }
            }
          }
        }
      }
    }
  }
</style>
