<template>
  <div class="accountBook" ref="logBox">
    <div class="top">
     <span class="tab_in" :class="{'active': tabActive === 1}" @click="headerTab(1)">收入</span>
     <span class="tab_out" :class="{'active': tabActive === 2}" @click="headerTab(2)">支出</span>
    </div>
    <!-- 没有数据页面 -->
    <div v-if="!user.length && isRequest" class="none_order">
      <p>此页面暂无内容</p>
    </div>
    <div class="center">
      <ul>
        <li class="account_li" v-for="(item, index) in user" :key="index">
          <div class="list">
            <i class="icon iconfont" :class="iconArr[item.type - 1]"></i>
            <div class="user">
              <div class="account_div">{{item.remark}}</div>
              <div class="account_time">{{item.create_time}}</div>
            </div>
          </div>
          <span class="account_span">{{item.score}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accountBook',
  data () {
    return {
      isRequest: false,
      tabActive: 1,
      iconArr: ['icon-jiankangshangcheng', 'icon-web__jiangli', 'icon-xinzi', 'icon-huojian', 'icon-tixian', '', 'icon-chongzhi1', 'icon-huokuanyifu'],
      user: []
    };
  },
  beforeMount: function () {
    // 挂载之前
    // 请求我的账本收入接口
    this.getIncome();
  },
  mounted: function () {
    this.scrollOn();
    this.getHeader('我的账本', 'account_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    scrollOn: function () {
      eventBus.$on('contentScroll', (height) => {
        // 只在goodsDetails页面监听
        if (/accountBook/g.test(window.location.href)) {
          if (document.getElementById('content').scrollTop > 100) {
            this.getHeader('我的账本', 'no_transparent');
          } else {
            this.getHeader('我的账本', 'account_top');
          }
        }
      });
    },
    headerTab: function (num) {
      if (num === this.tabActive) {
        return false;
      }
      // 切换tab重新设置成false
      this.isRequest = false;
      this.tabActive = num;
      if (num === 1) {
        this.getIncome();
      } else {
        this.getExpenditure();
      }
    },
    // 请求我的账本收入接口
    getIncome () {
      this.axios.get('/user/income', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (parseInt(data.status) === 1) {
            // 列表
            this.user = data.data;
          } else {
            this.toast(data.message);
          }
        });
    },
    // 请求我的账本支出接口
    getExpenditure () {
      this.axios.get('/user/expenditure', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (parseInt(data.status) === 1) {
            // 列表
            this.user = data.data;
          } else {
            this.toast(data.message);
          }
        });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/base.scss";
.account_top {
  background: transparent;
  color: #fff;
  border: none;
}
.accountBook {
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
  .none_order{
    background: url(../assets/images/none_01.png) no-repeat center center;
    position: absolute;
    top: 300px;
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
      // display: inline-block;
      // padding: 0 8px;
      // padding-top: 40px;
      // font-size: 20px;
      // color: #999;
      &.icon-xinzi{
        font-size: 23px;
        padding-left: 25px;
      }
      }
    ul{
      padding-top: 60px;
      margin-bottom: 20px;
      .account_li{
        width: 92%;
        margin: 0 auto;
        border-bottom: 1px solid #e6e6e6;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        align-items: center;
        .list{
          padding: 20px 0;
          .iconfont{
            font-size: 28px;
            padding-right: 20px;
            padding-top: 6px;
            &.icon-jiankangshangcheng{
              color: #24a5fe;
            }
            &.icon-tixian{
              color: #ff517b;
            }
            &.icon-web__jiangli{
              color: #31aafe;
            }
            &.icon-huokuanyifu{
              color: #a755f4;
            }
            &.icon-huojian{
              color: #fd465e;
            }
            &.icon-xinzi{
              color: #fd9611;
            }
            &.icon-chongzhi1{
              color: #ef0606;
            }
          }
          .user{
          display: flex;
          flex-direction: column;
          }
          div{
          display: flex;
          justify-content: space-between;
          .account_div{
            margin-bottom: 6px;
            color: #333;
            font-size: 24px;
          }
          .account_time{
            color: #999;
            font-size: 20px;
          }
        }
        display: flex;
        justify-content: space-between;
      }
        }
      .account_span{
        font-size: 24px;
        color: #333;
      }
    }
  }
}
</style>
