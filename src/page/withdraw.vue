<template>
  <div class="withdraw">
    <div class="top">
      <span>可提现余额</span>
      <span>&yen; <span class="all_sum">{{account.money || 0}}</span></span>
      <span @click="seeWithdraw()"  class="out">去提现</span>
    </div>
     <!-- 没有数据页面 -->
    <div v-if="!user.length && isRequest" class="none_order">
      <p>此页面暂无内容</p>
    </div>
    <div class="center">
      <span class="center_top iconfont icon-tixian"> <span class="jilu">提现记录</span> </span>
      <ul>
        <li class="center_li" v-for="(item, index) in user" :key="index">
          <div :class="['center_div', item.status === '已到账' ? 'center_div' : 'now'] ">
            <span class="money">&yen; {{item.money}}</span>
            <div class="audit" v-if="item.status === '审核中'">
              <i class="iconfont icon-biaoqian"><span>审核中</span></i>
           </div>
           <span class="state" v-else>{{item.status === '审核失败' ? '审核失败' : '已到账'}}</span>
          </div>
          <div class="time">{{item.created_at}}</div>
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
      isRequest: false,
      account: {
        money: ''
      },
      user: []
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
    // 请求可提现
    this.getWithdraw();
  },
  mounted: function () {
    this.getHeader('', 'with_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    // 请求可提现接口
    getWithdraw () {
      this.axios.get('/withdrawals/log', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (parseInt(data.status) === 1) {
            // 列表
            this.account = data.data;
            this.user = data.data.log;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    seeWithdraw () {
      this.$router.push({path: 'withdrawApply'});
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
    &.icon-tixian{
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
      .audit{
        line-height: 80px;
        .icon-biaoqian{
          position: relative;
          // display: inline-block;
          font-size: 90px;
          color: $color;
        }
      span{
        position: absolute;
        left: 20px;
        top: 5px; 
        color: #fff;
        font-size: 20px;
      }
     }
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
        width: 144px;
      }
      .state{
        font-size: 20px;
        color: #999;
        margin-left: 4px;
      }
    }
      .now{
      &::after{
      content: '';
      display: block;
      position: absolute;
      bottom: 43%;
      left: 0;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background: -webkit-linear-gradient(left,#269dfe,#1ccdfe);
      margin-right: 5px;
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
