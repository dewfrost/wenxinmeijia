<template>
  <div class="promotionAwards" ref="logBox">
    <div class="top">
      <span>&yen; <span class="all_sum">{{account.money || 0}}</span></span>
      <span>总额</span>
    </div>
    <!-- 没有数据页面 -->
    <div v-if="!user.length && isRequest" class="none_order">
      <p>此页面暂无内容</p>
    </div>
    <div class="center">
      <span class="iconfont icon-web__jiangli"> <span class="jilu">奖励记录</span> </span>
      <ul>
        <li class="promotion_li" v-for="(item, index) in user" :key="index">
          <div>
            <!-- <img src="../assets/images/r_l.png" alt=""> -->
            <img :src="item.headimgurl" alt="头像">
            <div class="user">
              <div class="promotion_div">{{item.from_uid ? hideString(item.from_uid) : ''}}</div>
              <div class="promotion_time">{{item.create_time}}</div>
            </div>
          </div>
          <span class="promotion_span">&yen;{{item.score}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'promotionAwards',
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
    // 请求晋级奖励
    this.getPromotion();
  },
  mounted: function () {
    this.scrollOn();
    this.getHeader('晋级奖励', 'promotion_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    scrollOn: function () {
      eventBus.$on('contentScroll', (height) => {
        // 只在goodsDetails页面监听
        if (/promotionAwards/g.test(window.location.href)) {
          if (document.getElementById('content').scrollTop > 100) {
            this.getHeader('晋级奖励', 'no_transparent');
          } else {
            this.getHeader('晋级奖励', 'promotion_top');
          }
        }
      });
    },
    // 请求晋级奖励
    getPromotion () {
      this.axios.get('/user/Universal', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (parseInt(data.status) === 1) {
            this.account.money = data.data.count;
            this.user = data.data.universal;
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
.promotion_top {
  background: transparent;
  color: #fff;
  border: none;
}
.promotionAwards {
  background: url(../assets/images/promotion.png) no-repeat;
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
    .promotion_li:first-child{
      border-top: 1px solid #e6e6e6;
    }
    .promotion_li{
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
        .promotion_div{
          margin-top: 15px;
          color: #333;
          font-size: 24px;
        }
        .promotion_time{
          margin-bottom: 15px;
          color: #999;
          font-size: 20px;
        }
      }
      display: flex;
      justify-content: space-between;
    }
    .promotion_span{
      font-size: 24px;
      color: #333;
    }
  }
  }
}
</style>
