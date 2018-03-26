<template>
  <div class="moneyAccount">
    <div class="top">
      <span>货款余额</span>
      <span>&yen; <span class="all_sum">{{account.money || 0}}</span></span>
      <span class="in" @click="accountMoney()">充值</span>
    </div>
     <!-- 没有数据页面 -->
    <div v-if="!user.length && isRequest" class="none_order">
      <p>此页面暂无内容</p>
    </div>
    <div class="center">
      <span class="center_top iconfont icon-chongzhi"> <span class="jilu">充值记录</span> </span>
      <ul>
        <li class="center_li" v-for="(item, index) in user" :key="index">
          <div class="center_div">
            <span class="money">&yen; {{item.score}}</span>
          </div>
          <div class="time">{{item.create_time}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'moneyAccount',
  data () {
    return {
      isRequest: false,
      account: {
        money: ''
      },
      user: []
    };
  },
  beforeMount: function () {
    // 挂载之前
    // 请求货款余额
    this.getMoneyAccount();
  },
  mounted: function () {
    this.getHeader('', 'with_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    accountMoney: function () {
      this.modal('提示', '请联系客服，线下充值贷款', '联系客服', function () {
        this.$router.replace({path: 'customerCenter'});
      }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
    },
    // 请求货款余额
    getMoneyAccount () {
      this.axios.get('/user/Mymoney', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (parseInt(data.status) === 1) {
            // 列表
            this.account.money = data.data.count;
            this.user = data.data.mymoney;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
.moneyAccount {
  background: url(../assets/images/money_account.png) no-repeat;
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
  .in{
    width: 140px;
    height: 44px;
    border-radius: 18px;
    background: #fdf7e8;
    line-height: 44px;
    text-align: center;
    color: #ebad05;
    margin-top: 20px;
  }
 }
 .none_order{
  background: url(../assets/images/none_01.png) no-repeat center center;
  position: absolute;
  top: 400px;
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
    // border-bottom: 1px solid #e6e6e6;
    &.icon-chongzhi{
      font-size: 25px;
     }
     .jilu{
       color: #999;
       font-size: 20px;
       margin-left: 8px;
     }
  }
  .center_li:first-child{
     border-top: 1px solid #e6e6e6;
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
        background: -webkit-linear-gradient(left,#ff2686,#fd3fdd);
        margin-right: 5px;
      }
      display: flex;
      align-items: center; 
    }
    .money{
      font-size: 24px;
      color: #333;
    }
  }
    .state{
      font-size: 20px;
      color: #999;
      margin-left: 10px;
    }
    .time{
      font-size: 22px;
      color: #666;
    }
  }
 }
</style>
