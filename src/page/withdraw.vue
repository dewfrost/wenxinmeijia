<template>
  <div class="withdraw">
    <div class="top">
      <span>可提现余额</span>
      <span>￥<span class="all_sum">{{account.money}}</span></span>
      <span class="out">去提现</span>
    </div>
    <div class="center">
      <span class="center_top iconfont icon-tixian"> <span class="jilu">提现记录</span> </span>
      <ul>
        <li class="center_li" v-for="item in user">
          <div class="center_div">
            <!-- <span class="dian"></span> -->
            <span class="money">￥{{item.money}}</span>
            <span class="state">{{item.state}}</span>
          </div>
          <div class="time">{{item.time}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'withdraw',
  data () {
    return {
      account: {
        money: '2050.00'
      },
      user: [
        {
          money: '2000.00',
          state: '已到账',
          time: '2018-03-10 20:15:00'
        },
        {
          money: '2000.00',
          state: '已到账',
          time: '2018-03-10 20:15:00'
        },
        {
          money: '2000.00',
          state: '已到账',
          time: '2018-03-10 20:15:00'
        },
        {
          money: '2000.00',
          state: '已到账',
          time: '2018-03-10 20:15:00'
        },
        {
          money: '2000.00',
          state: '已到账',
          time: '2018-03-10 20:15:00'
        },
        {
          money: '2000.00',
          state: '已到账',
          time: '2018-03-10 20:15:00'
        },
        {
          money: '2000.00',
          state: '已到账',
          time: '2018-03-10 20:15:00'
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
    this.getHeader('', 'with_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
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
.with_top {
  background: transparent;
  border: none;
}
.withdraw {
  background: url(../assets/images/withdraw.png) no-repeat;
  min-height: 100%;
.top{
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  margin-top: 80px;
  line-height: 75px;
  .all_sum{
    font-size: 50px;
    line-height: 50px;
  }
  .out{
    width: 140px;
    height: 44px;
    border-radius: 18px;
    background: #fee1e9;
    line-height: 44px;
    text-align: center;
    color: $color;
    margin-top: 20px;
  }
 }
.center{
  margin-top: 30px;
  width: 592px;
  margin:30px auto 0 auto;
  .center_top{
    width: 592px;
    height: 80px;
    line-height: 80px;
    display: inline-block;
    font-size: 20px;
    color: #999;
    border-bottom: 1px solid #e6e6e6;
    &.icon-tixian{
      font-size: 25px;
     }
     .jilu{
       color: #999;
       font-size: 20px;
       margin-left: 8px;
     }
  }
  .center_li{
    height: 80px;
    line-height: 80px;
    display: flex;
    justify-content: space-between;  
    border-bottom: 1px solid #e6e6e6;
    .center_div{
      position: relative;
      padding-left: 15px;
      &::after{
          content: '';
          display: block;
          position: absolute;
          bottom: 43%;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: $color;
          margin-right: 5px;
        }
      display: flex;
      align-items: center; 
      .dian{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: $color;
        margin-right: 5px;
      }
      .money{
        font-size: 24px;
        color: #333;
      }
      .state{
        font-size: 20px;
        color: #999;
        margin-left: 10px;
      }
    }
    .iconfont{
      font-size: 5px;
    }
    .time{
      font-size: 22px;
      color: #666;
    }
  }
 }
}
</style>
