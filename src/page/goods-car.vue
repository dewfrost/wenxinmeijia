<template>
  <div class="goods_car_wrap">
    <div v-if="!goodsList.length && isRequest" class="none_data">
      <p>此页面暂无内容</p>
    </div>
    <ul class="goods_list">
      <li class="goods" v-for="(item, index) in goodsList" :key="index" @click="seeGoodsDetails(item.gid)">
        <i class="iconfont" @click.stop="toggleCheak(index)" :class="{'icon-30xuanzhongyuanxingfill': item.isClick, 'icon-30xuanzhongyuanxing': !item.isClick}"></i>
        <div class="img">
          <img :src="item.goods.img" alt="" class="goods_img">
        </div>
        <div class="goods_details">
          <span class="name">{{item.goods.name}}</span>
          <span class="bottom">
            <span class="price">
              <span class="sale_price">
                <span class="small_money">&yen; </span>
                {{item.goods.price || 0}}
              </span>
              <span class="old_price">
                <span class="small_money" v-if="item.goods.zhekou">&yen; </span>
                {{item.goods.zhekou}}
              </span>
            </span>
            <span class="sum" v-show="!isEdit">x{{item.num}}</span>
            <span class="edit_sum" v-show="isEdit">
              <span class="reduce" @click.stop="changeNum(1, index)">-</span>
              <span class="sum">{{item.num}}</span>
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
      isRequest: false, // 是否请求
      isAllCheck: false,
      allCheckGoodsNum: 0,
      allCheckPrice: 0,
      isEdit: false,
      goodsList: []
    };
  },
  beforeMount: function () {
    // 获取购物车列表
    this.getList();
  },
  mounted: function () {
    // 循环所有选中状态，判断选中的商品种数
    this.allCheckSum();
    // 计算总价
    this.computedAllPrice();
    this.getFooter();
    this.getHeader('购物车', 'goods_car_header', '编辑', () => {
      this.toggleEdit(1);
    });
  },
  beforeUpdate: function () { // 数据更新时调用,在渲染之前
    // 循环所有选中状态，判断选中的商品种数
    this.allCheckSum();
    // 计算总价
    this.computedAllPrice();
    this.getFooter();
  },
  methods: {
    seeGoodsDetails (id) {
      if (this.isEdit) {
        return false;
      } else {
        this.$router.push({path: 'goodsDetails', query: {id: id}});
      }
    },
    getList () {
      this.axios.get('/cart/index', {
      })
        .then(({data}) => {
          if (data.status === 1) {
            // 请求成功
            this.isRequest = true;
            this.goodsList = data.data;
            // 把所有商品是否选中的状态数组填充赋值
            for (let i = 0; i < this.goodsList.length; i++) {
              this.goodsList[i].isClick = false;
            }
          } else {
            this.toast(data.message);
          }
        });
    },
    getFooter () {
      // 调用购物车底部，第四个参数为结算事件, 第五个参数为删除事件，第六个参数为全选事件
      this.getGoodscarFooter(this.isAllCheck, this.allCheckGoodsNum, this.allCheckPrice, this.isEdit, () => {
        if (!this.allCheckGoodsNum) {
          this.toast('没有选中商品');
        } else {
          this.doSubmit();
        }
      }, () => {
        this.delGoods();
      }, () => {
        this.goAllCheck(); // 点击全选按钮
      });
    },
    // 执行结算
    doSubmit () {
      let clearArr = [];
      for (let i = this.goodsList.length - 1; i >= 0; i--) {
        // 先判断是否选中
        if (this.goodsList[i].isClick) {
          // 把购物车id添加到一个数组里面
          clearArr.push(this.goodsList[i].id);
        }
      }
      this.$router.push({path: 'submitOrder', query: {gid: clearArr.join()}});
    },
    // 全选按钮事件
    goAllCheck () {
      // 如果没有商品，则弹窗提示
      if (!this.goodsList.length) {
        this.toast('没有可选中的商品');
        return false;
      }
      this.isAllCheck = !this.isAllCheck;
      // 如果全选按钮选中，循环所有商品的按钮为选中，反之亦然
      if (this.isAllCheck) {
        for (let i = 0; i < this.goodsList.length; i++) {
          this.goodsList[i].isClick = true;
        }
      } else {
        for (let i = 0; i < this.goodsList.length; i++) {
          this.goodsList[i].isClick = false;
        }
      }
    },
    // 点击是否选中事件
    toggleCheak (index) {
      this.goodsList[index].isClick = !this.goodsList[index].isClick;
      // 如果当前点击的变为未选中，则return，不再循环是否全选
      if (!this.goodsList[index].isClick) {
        this.isAllCheck = false;
      } else {
        // 循环所有选中状态，判断是否全选
        for (let i = 0; i < this.goodsList.length; i++) {
          if (!this.goodsList[i].isClick) {
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
        if (this.goodsList[i].isClick) {
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
          // this.isAllCheck = true;
          // this.goAllCheck();
        } else {
          this.getHeader('购物车', 'goods_car_header', '编辑', function () {
            that.toggleEdit(1);
          });
          this.isEdit = false;
          // 以下两行为正常状态所有商品为选中
          // this.isAllCheck = false;
          // this.goAllCheck();
        }
      }
    },
    // 增删商品数量
    changeNum (type, index) {
      if (type) {
        if (this.goodsList[index].num === 1) {
          return false;
        } else {
          this.goodsList[index].num --;
        }
      } else {
        this.goodsList[index].num ++;
      }
      this.doEditSum(index, this.goodsList[index].num);
    },
    doEditSum (index, sum) {
      this.axios.post('/cart/edit', {
        cid: this.goodsList[index].id,
        num: sum
      })
        .then(({data}) => {
          if (data.status === 1) {
          } else {
            this.toast(data.message);
          }
        });
    },
    // 删除事件
    delGoods () {
      if (!this.allCheckGoodsNum) {
        this.toast('没选中商品');
      } else {
        let delIdArr = [];
        for (let i = this.goodsList.length - 1; i >= 0; i--) {
          // 先判断是否选中
          if (this.goodsList[i].isClick) {
            delIdArr.push(this.goodsList[i].id);
          }
        }
        // 请求后台删除
        this.axios.post('/cart/del', {
          ids: delIdArr.join()
        })
          .then(({data}) => {
            if (data.status === 1) {
              // 循环从页面删除
              for (let i = this.goodsList.length - 1; i >= 0; i--) {
                // 先判断是否选中
                if (this.goodsList[i].isClick) {
                  this.goodsList.splice(i, 1);
                }
              }
              this.toast('删除成功');
              // 变为非编辑状态
              this.getHeader('购物车', 'goods_car_header', '编辑', () => {
                this.toggleEdit(1);
              });
              this.isEdit = false;
              this.isAllCheck = false;
            } else {
              this.toast(data.message);
            }
          });
      }
      // 如果商品删完了
      if (!this.goodsList.length) {
        this.getHeader('购物车', 'goods_car_header', '编辑', () => {
          this.toggleEdit(1);
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
        if (this.goodsList[i].isClick) {
          this.allCheckPrice += this.goodsList[i].num * parseFloat(this.goodsList[i].goods.price);
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
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name{
            margin-top: 8px;
            line-height: 1.4;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
          }
          .bottom{
            display: flex;
            justify-content: space-between;
            margin-bottom: 14px;
            .price{
              .sale_price{
                color: $color;
                .small_money{
                  font-size: 20px;
                }
              }
              .old_price{
                margin-left: 10px;
                color: #999;
                font-size: 22px;
                text-decoration: line-through;
                .small_money{
                  font-size: 18px;
                }
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
