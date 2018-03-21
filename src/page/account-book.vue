<template>
  <div class="accountBook">
    <div class="top">
     <span class="tab_in" :class="{'active': tabActive === 1}" @click="headerTab(1)">收入</span>
     <span class="tab_out" :class="{'active': tabActive === 2}" @click="headerTab(2)">支出</span>
    </div>
    <div class="center">
      <ul>
        <li class="account_li" v-for="(item, index) in user" :key="index">
          <div>
            <!-- <img src="../assets/images/r_l.png" alt=""> -->
            <!-- <img :src="item.imgurl" alt="头像"> -->
            <i :class="['iconfont', index === 1 ? 'icon-web__jiangli' : index === 2 ? 'icon-huokuanyifu' : index === 3 ? 'icon-huojian' : 
            index === 4 ? 'icon-xinzi' : index === 5 ? 'icon-tixian' : 'icon-jiankangshangcheng']"></i>
            <div class="user">
            <div class="account_div">{{item.name}}</div>
            <div class="account_time">{{item.time}}</div>
            </div>
          </div>
          <span class="account_span">{{tabActive === 1 ? '+' : '-'}}￥{{item.morey}}</span>
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
      user: [
        {
          name: '推荐奖励',
          morey: '300.00',
          time: '2018-03-10 20:15:00'
        },
        {
          name: '晋级奖励',
          morey: '300.00',
          time: '2018-03-10 20:15:00'
        },
        {
          name: '管理薪资',
          morey: '300.00',
          time: '2018-03-10 20:15:00'
        },
        {
          name: '销售货款',
          morey: '300.00',
          time: '2018-03-10 20:15:00'
        },
        {
          name: '推荐奖励',
          morey: '300.00',
          time: '2018-03-10 20:15:00'
        },
        {
          name: '晋级奖励',
          morey: '300.00',
          time: '2018-03-10 20:15:00'
        },
        {
          name: '管理薪资',
          morey: '300.00',
          time: '2018-03-10 20:15:00'
        },
        {
          name: '管理薪资',
          morey: '300.00',
          time: '2018-03-10 20:15:00'
        },
        {
          name: '管理薪资',
          morey: '300.00',
          time: '2018-03-10 20:15:00'
        },
        {
          name: '管理薪资',
          morey: '300.00',
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
    this.getHeader('我的账单', 'account_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
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
          font-size: 30px;
          margin: 18px 18px 0 0;
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
