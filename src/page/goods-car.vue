<template>
  <div class="goods_car_wrap">
    <div v-if="!goodsList.length && isRequest" class="none_data">
      <p>此页面暂无内容</p>
    </div>
    <ul class="goods_list">
      <li class="goods" v-for="(item, index) in goodsList" :key="index" @click="seeGoodsDetails(item.id)">
        <i class="iconfont" @click.stop="toggleCheak(index)" :class="{'icon-30xuanzhongyuanxingfill': item.isCheck, 'icon-30xuanzhongyuanxing': !item.isCheck}"></i>
        <div class="img">
          <img :src="item.goodsImg" alt="" class="goods_img">
        </div>
        <div class="goods_details">
          <span class="name">{{item.goodsName}}</span>
          <span class="bottom">
            <span class="price"><span>￥</span>{{item.price || 0}}</span>
            <span class="sum" v-show="!isEdit">x{{item.sum}}</span>
            <span class="edit_sum" v-show="isEdit">
              <span class="reduce" @click.stop="changeNum(1, index)">-</span>
              <span class="sum">{{item.sum}}</span>
              <span class="add" @click.stop="changeNum(0, index)">+</span>
            </span>
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
      isRequest: true, // 是否请求
      isAllCheck: true,
      allCheckGoodsNum: 0,
      allCheckPrice: 0,
      isEdit: false,
      goodsList: [
        {
          isCheck: true,
          goodsImg: require('../assets/images/goods1.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '28.00',
          sum: 6,
          id: 2
        },
        {
          isCheck: true,
          goodsImg: require('../assets/images/goods2.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '80.00',
          sum: 10,
          id: 2
        },
        {
          isCheck: true,
          goodsImg: require('../assets/images/goods3.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '2.00',
          sum: 33,
          id: 2
        },
        {
          isCheck: true,
          goodsImg: require('../assets/images/goods2.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '80.00',
          sum: 10,
          id: 2
        },
        {
          isCheck: true,
          goodsImg: require('../assets/images/goods3.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '2.00',
          sum: 33,
          id: 2
        },
        {
          isCheck: true,
          goodsImg: require('../assets/images/goods2.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '80.00',
          sum: 10,
          id: 2
        },
        {
          isCheck: true,
          goodsImg: require('../assets/images/goods3.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '2.00',
          sum: 33,
          id: 2
        },
        {
          isCheck: true,
          goodsImg: require('../assets/images/goods2.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '80.00',
          sum: 10,
          id: 2
        },
        {
          isCheck: true,
          goodsImg: require('../assets/images/goods3.png'),
          goodsName: '可穿戴美甲贴片奢华组合套装#210可穿戴美甲贴片奢华组合套装可穿戴美甲贴片奢华组合套装',
          price: '2.00',
          sum: 33,
          id: 2
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
    // 循环所有选中状态，判断选中的商品种数
    this.allCheckSum();
    // 计算总价
    this.computedAllPrice();
    this.getFooter();
    let that = this;
    this.getHeader('购物车', 'goods_car_header', '编辑', function () {
      that.toggleEdit(1);
    });
  },
  beforeUpdate: function () { // 数据更新时调用,在渲染之前
    // 循环所有选中状态，判断选中的商品种数
    this.allCheckSum();
    // 计算总价
    this.computedAllPrice();
    this.getFooter();
  },
  updated: function () {
  },
  methods: {
    seeGoodsDetails (id) {
      this.$router.push({path: 'goodsDetails', query: {id: id}});
    },
    getFooter () {
      let that = this;
      // 调用购物车底部，第四个参数为结算事件, 第五个参数为删除事件，第六个参数为全选事件
      this.getGoodscarFooter(this.isAllCheck, this.allCheckGoodsNum, this.allCheckPrice, this.isEdit, function () {
        if (!that.allCheckGoodsNum) {
          that.toast('没有选中商品');
        } else {
          that.$router.push('submitOrder');
        }
      }, function () {
        that.delGoods();
      }, function () {
        // 点击全选按钮
        that.goAllCheck();
      });
    },
    goAllCheck () {
      this.isAllCheck = !this.isAllCheck;
      // 如果全选按钮选中，循环所有商品的按钮为选中，反之亦然
      if (this.isAllCheck) {
        for (let i = 0; i < this.goodsList.length; i++) {
          this.goodsList[i].isCheck = true;
        }
      } else {
        for (let i = 0; i < this.goodsList.length; i++) {
          this.goodsList[i].isCheck = false;
        }
      }
    },
    // 点击是否选中事件
    toggleCheak (index) {
      this.goodsList[index].isCheck = !this.goodsList[index].isCheck;
      // 如果当前点击的变为未选中，则return，不再循环是否全选
      if (!this.goodsList[index].isCheck) {
        this.isAllCheck = false;
      } else {
        // 循环所有选中状态，判断是否全选
        for (let i = 0; i < this.goodsList.length; i++) {
          if (!this.goodsList[i].isCheck) {
            this.isAllCheck = false;
            return false;
          }
        }
        this.isAllCheck = true;
      }
    },
    allCheckSum () {
      // 循环所有选中状态，判断选中的商品种数
      this.allCheckGoodsNum = 0;
      for (let i = 0; i < this.goodsList.length; i++) {
        if (this.goodsList[i].isCheck) {
          this.allCheckGoodsNum++;
        }
      }
    },
    // 切换头部编辑状态
    toggleEdit (status) {
      let that = this;
      if (!this.goodsList.length) {
        this.toast('没有可编辑的商品');
      } else {
        if (status) {
          this.getHeader('购物车', 'goods_car_header', '完成', function () {
            that.toggleEdit(0);
          });
          this.isEdit = true;
          // 以下两行为编辑状态所有商品为不选中
          this.isAllCheck = true;
          this.goAllCheck();
        } else {
          this.getHeader('购物车', 'goods_car_header', '编辑', function () {
            that.toggleEdit(1);
          });
          this.isEdit = false;
          // 以下两行为正常状态所有商品为选中
          this.isAllCheck = false;
          this.goAllCheck();
        }
      }
    },
    // 增删商品数量
    changeNum (type, index) {
      if (type) {
        if (this.goodsList[index].sum === 1) {
          return false;
        } else {
          this.goodsList[index].sum --;
        }
      } else {
        this.goodsList[index].sum ++;
      }
    },
    // 删除事件
    delGoods () {
      if (!this.allCheckGoodsNum) {
        this.toast('没选中商品');
      } else {
        for (let i = this.goodsList.length - 1; i >= 0; i--) {
          // 先判断是否选中
          if (this.goodsList[i].isCheck) {
            // this.allCheckPrice += this.goodsList[i].sum * parseInt(this.goodsList[i].price);
            this.goodsList.splice(i, 1);
          }
        }
      }
      // 如果商品删完了
      if (!this.goodsList.length) {
        let that = this;
        this.getHeader('购物车', 'goods_car_header', '编辑', function () {
          that.toggleEdit(1);
        });
        this.isEdit = false;
        this.isAllCheck = false;
      }
    },
    // 计算总价
    computedAllPrice () {
      this.allCheckPrice = 0;
      for (let i = 0; i < this.goodsList.length; i++) {
        // 先判断是否选中
        if (this.goodsList[i].isCheck) {
          this.allCheckPrice += this.goodsList[i].sum * parseInt(this.goodsList[i].price);
        }
      }
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
    padding: 90px 0 180px;
    background-color: #f5f5f5;
    position: relative;
    .none_data{
      background: url(../assets/images/none_01.png) no-repeat center center;
      position: absolute;
      top: 230px;
      left: 50%;
      transform: translateX(-50%);
      height: 300px;
      width: 80%;
      text-align: center;
      > p{
        color: #999;
        font-size: 24px;
        margin-top: 260px;
      }
    }
    .goods_list{
      .goods{
        background-color: #fff;
        margin-bottom: 10px;
        @include border;
        display: flex;
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
          width: 144px;
          height: 144px;
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
            .edit_sum{
              border: 1px solid #999;
              height: 40px;
              display: flex;
              align-items: center;
              .reduce{
                padding: 0 14px;
                position: relative;
                &::before{
                  position: absolute;
                  content: '';
                  display: block;
                  height: 1em;
                  width: 1px;
                  right: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  background-color: #999;
                }
              }
              .sum{
                padding: 0 30px;
              }
              .add{
                padding: 0 12px;
                position: relative;
                &::before{
                  position: absolute;
                  content: '';
                  display: block;
                  height: 1em;
                  width: 1px;
                  left: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  background-color: #999;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
