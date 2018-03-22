<template>
  <div class="accountBook" ref="logBox">
    <div class="top">
     <span class="tab_in" :class="{'active': tabActive === 1}" @click="headerTab(1)">收入</span>
     <span class="tab_out" :class="{'active': tabActive === 2}" @click="headerTab(2)">支出</span>
    </div>
    <div class="center">
      <ul>
        <li class="account_li" v-for="(item, index) in user" :key="index">
          <div>
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
      tabActive: 1,
      iconArr: ['icon-web__jiangli', 'icon-huokuanyifu', 'icon-huojian', 'icon-xinzi', 'icon-tixian', 'icon-jiankangshangcheng'],
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
    // 请求我的账本收入接口
    this.getIncome();
    // 请求我的账本支出接口
    // this.getExpenditure(this.tabActive);
  },
  mounted: function () {
    this.scrollOn();
    this.getHeader('我的账单', 'account_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    scrollOn: function () {
      eventBus.$on('contentScroll', (height) => {
        // 只在goodsDetails页面监听
        if (/accountBook/g.test(window.location.href)) {
          if (document.getElementById('content').scrollTop > 100) {
            console.log(document.getElementById('content').scrollTop);
            this.getHeader('我的账单', 'no_transparent');
          } else {
            this.getHeader('我的账单', 'account_top');
          }
        }
      });
    },
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
      if (num === this.tabActive) {
        return false;
      }
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
          if (parseInt(data.status) === 1) {
            console.log(data.data);
            // 列表
            this.user = data.data;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 请求我的账本支出接口
    getExpenditure () {
      this.axios.get('/user/expenditure', {
      })
        .then(({data}) => {
          if (parseInt(data.status) === 1) {
            console.log(data.data);
            // 列表
            this.user = data.data;
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
  .center{
    span{
      display: inline-block;
      padding: 0 8px;
      padding-top: 40px;
      font-size: 20px;
      color: #999;
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
        margin: auto;
        border-bottom: 1px solid #e6e6e6;
        .iconfont{
          font-size: 28px;
          margin: 16px 18px 0 0;
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
        }
        .user{
          display: flex;
          flex-direction: column;
        }
        div{
          display: flex;
          justify-content: space-between;
          .account_div{
            margin-top: 15px;
            color: #333;
            font-size: 24px;
          
          }
          .account_time{
            margin-bottom: 15px;
            color: #999;
            font-size: 20px;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .account_span{
        font-size: 24px;
        color: #333;
      }
    }
  }
}
</style>
