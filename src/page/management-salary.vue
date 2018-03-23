<template>
  <div class="managementSalary" ref="logBox">
    <div class="top">
      <span>$&yen;<span class="all_sum">{{account.money}}</span></span>
      <span>总额</span>
    </div>
    <!-- 没有数据页面 -->
    <div v-if="!user.length && isRequest" class="none_order">
      <p>此页面暂无内容</p>
    </div>
    <div class="center">
      <span class="iconfont icon-xinzi"> <span class="jilu">薪资记录</span> </span>
      <ul>
        <li class="management_li" v-for="(item, index) in user" :key="index">
          <div>
            <!-- <img src="../assets/images/r_l.png" alt=""> -->
            <img :src="item.headimgurl" alt="头像">
            <div class="user">
              <div class="management_div">{{item.from_uid ? hideString(item.from_uid) : ''}}</div>
              <div class="management_time">{{item.create_time}}</div>
            </div>
          </div>
          <span class="management_span">￥{{item.score}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'managementSalary',
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
    this.getSalary();
  },
  mounted: function () {
    this.scrollOn();
    this.getHeader('管理薪资', 'management_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    scrollOn: function () {
      eventBus.$on('contentScroll', (height) => {
        // 只在goodsDetails页面监听
        if (/managementSalary/g.test(window.location.href)) {
          if (document.getElementById('content').scrollTop > 100) {
            console.log(document.getElementById('content').scrollTop);
            this.getHeader('管理薪资', 'no_transparent');
          } else {
            this.getHeader('管理薪资', 'management_top');
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
    // 请求管理薪资
    getSalary () {
      this.axios.get('/user/Management', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (data.status === 1) {
            // 头部金钱数
            this.account.money = data.data.count;
            // 列表
            this.user = data.data.management;
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
.management_top {
  background: transparent;
  color: #fff;
  border: none;
}
.managementSalary {
  background: url(../assets/images/management.png) no-repeat;
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
      &.icon-xinzi{
        font-size: 23px;
        padding-left: 25px;
      }
      }
    ul{
      padding-top: 25px;
      margin-bottom: 20px;
      .management_li:first-child{
        border-top: 1px solid #e6e6e6;
      }
      .management_li{
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
          .management_div{
            margin-top: 15px;
            color: #333;
            font-size: 24px;
          }
          .management_time{
            margin-bottom: 15px;
            color: #999;
            font-size: 20px;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .management_span{
        font-size: 24px;
        color: #333;
      }
    }
  }
}
</style>
