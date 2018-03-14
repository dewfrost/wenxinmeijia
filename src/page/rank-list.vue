<template>
  <div class="rankList">
    <div class="top">
     <span class="tab_in" :class="{'active': tabActive === 1}" @click="headerTab(1)">销售排行</span>
     <span class="tab_out" :class="{'active': tabActive === 2}" @click="headerTab(2)">本月收入</span>
    </div>
    <div class="center">
      <span class="iconfont icon-ranking"> <span class="paihang">本月排行</span> </span>
      <ul>
        <li class="rank_li" v-for="(item, index) in user">
          <div class="rank_one">
            <!-- <span>{{index+1}}.</span> -->
            <span v-if="index == 0">
              <img src="../assets/images/index_1.png" alt="">
            </span>
            <span v-if="index == 1">
              <img src="../assets/images/index_2.png" alt="">
            </span>
            <span v-if="index == 2">
              <img src="../assets/images/index_3.png" alt="">
            </span>
            <span v-if="index >= 3">
             {{index+1}}.
            </span>
            <img :src="item.imgurl" alt="头像">
            <div class="rank_div">{{item.name}}</div>
          </div>
          <span class="rank_span">￥{{item.money}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rankList',
  data () {
    return {
      tabActive: 1,
      user: [
        {
          imgurl: require('../assets/images/r_l.png'),
          name: '推荐奖励',
          money: '3500.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: '推荐奖励',
          money: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: '推荐奖励',
          money: '3500.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: '推荐奖励',
          money: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: '推荐奖励',
          money: '3500.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: '推荐奖励',
          money: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: '推荐奖励',
          money: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: '推荐奖励',
          money: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: '推荐奖励',
          money: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: '推荐奖励',
          money: '300.00'
        }
      ]
    };
  },
  beforeCreate: function () {
    // 创建之前
  },
  created: function () {
    // 创建之后
  },
  beforeMount: function () {
    // 挂载之前
  },
  mounted: function () {
    this.getHeader('排行榜', 'rank_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    showToast: function () {
      // 引用toast组件
      this.toast('提示文字' + this.hidePhone(15614544444), 'icon-chenggong1');
    },
    showModal: function () {
      let that = this; // 如果回调函数中用到this，则这行代码必须有
      // 引用弹窗组件
      this.toast(
        '这是弹窗标题',
        '这是弹窗服饰股份的供热一个头特化工股份合格的合格合格分数高富帅正文',
        '这是按钮',
        function () {
          console.log('调用弹窗成功');
          console.log(that.modalMsg);
        }
      ); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
    },
    headerTab: function (num) {
      this.tabActive = num;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/base.scss";
.rank_top {
  background: transparent;
  color: #fff;
  border: none;
}
.rankList {
  background: url(../assets/images/account.png) no-repeat;
  min-height: 100%;
  .top{
    width: 50%;
    margin: auto;
    color: #ffd5dd;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    margin-top: 130px;
    line-height: 45px;
    .active{
      border-bottom: 3px solid #fff;
      color: #fff;
    }
    .all_sum{
      font-size: 50px;
      line-height: 50px;
    }
  }
 .center{
   .iconfont{
    display: inline-block;
    padding:0 10px 10px  8px;
    padding-top: 40px;
    color: #999;
    &.icon-ranking{
      font-size: 23px;
      padding-left: 25px;
     }
     .paihang{
       font-size: 20px;
       margin-left: 5px;
     }
    }
     .rank_li{
        color: #333;
        font-size: 24px;
        height: 95px;
        line-height: 95px;
        display: flex;
        justify-content: space-between;
        width: 92%;
        margin: auto;
        border-bottom: 1px solid #e6e6e6;
        &.rank_li:first-child{
            border-top: 1px solid #e6e6e6;
          }
          img{
            width: 56px;
            height: 56px;
            border-radius: 50%;
            margin: auto 20px auto 5px;
          }
        .rank_one{
          span{
            display: block;
            color: $color;
            width: 55px;
            margin: auto;
            text-align: center;
            img{ 
              height: 54px;
              width: 45px;
            }
          }
          width: 40%;
          display: flex;
        }
      }
  }
}
</style>
