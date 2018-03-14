<template>
  <div class="recommendAwards">
    <div class="top">
      <span>￥<span class="all_sum">{{account.money}}</span></span>
      <span>总额</span>
    </div>
    <div class="center">
      <span class="iconfont icon-web__jiangli"> <span class="jilu">奖励记录</span> </span>
      <ul>
        <li class="recommend_li" v-for="item in user">
          <div>
            <!-- <img src="../assets/images/r_l.png" alt=""> -->
            <img :src="item.imgurl" alt="头像">
            <div class="user">
            <div class="recommend_div">{{item.name}}</div>
            <div class="recommend_time">2018-03-10 20:15:00</div>
            </div>
          </div>
          <span class="recommend_span">￥{{item.morey}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recommendAwards',
  data () {
    return {
      account: {
        money: '1000.00'
      },
      user: [
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          morey: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          morey: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          morey: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          morey: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          morey: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          morey: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          morey: '300.00'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          morey: '300.00'
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
    this.getHeader('推荐奖励', 'recommend_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
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
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/base.scss";
.recommend_top {
  background: transparent;
  color: #fff;
  border: none;
}
.recommendAwards {
  background: url(../assets/images/recommend.png) no-repeat;
  min-height: 100%;
  .top{
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 22px;
    margin-top: 160px;
    line-height: 66px;
    .all_sum{
      font-size: 50px;
      line-height: 50px;
    }
  }
  .center{
    span{
      display: inline-block;
      padding: 0 8px;
      padding-top: 40px;
      font-size: 20px;
      color: #999;
      &.icon-web__jiangli{
        font-size: 25px;
        padding-left: 25px;
      }
      }
    ul{
      padding-top: 25px;
      margin-bottom: 20px;
      .recommend_li:first-child{
        border-top: 1px solid #e6e6e6;
      }
      .recommend_li{
        width: 92%;
        margin: auto;
        border-bottom: 1px solid #e6e6e6;
        img{
          width: 56px;
          height: 56px;
          border-radius: 50%;
          margin:20px 25px 20px 5px;
        }
        .user{
          display: flex;
          flex-direction: column;
        }
        div{
          display: flex;
          justify-content: space-between;
          .recommend_div{
            margin-top: 15px;
            color: #333;
            font-size: 24px;
          }
          .recommend_time{
            margin-bottom: 15px;
            color: #999;
            font-size: 20px;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .recommend_span{
        font-size: 24px;
        color: #333;
      }
    }
  }
}
</style>
