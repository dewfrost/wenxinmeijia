<template>
  <div class="recommendAwards" ref="logBox">
    <div class="top">
      <span>&yen;<span class="all_sum">{{account.money}}</span></span>
      <span>总额</span>
    </div>
    <!-- 没有数据页面 -->
    <div v-if="!user.length && isRequest" class="none_order">
      <p>此页面暂无内容</p>
    </div>
    <div class="center">
      <span class="iconfont icon-web__jiangli"> <span class="jilu">奖励记录</span> </span>
      <ul>
        <li class="recommend_li" v-for="(item, index) in user" :key="index">
          <div>
            <img :src="item.headimgurl" alt="头像">
            <div class="user">
              <div class="recommend_div">{{item.from_uid ? hideString(item.from_uid) : ''}}</div>
              <div class="recommend_time">{{item.create_time}}</div>
              </div>
          </div>
          <span class="recommend_span">&yen;{{item.score}}</span>
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
    // 请求推荐奖励
    this.tuijian();
  },
  mounted: function () {
    this.scrollOn();
    this.getHeader('推荐奖励', 'recommend_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    scrollOn: function () {
      eventBus.$on('contentScroll', (height) => {
        // 只在goodsDetails页面监听
        if (/recommendAwards/g.test(window.location.href)) {
          if (document.getElementById('content').scrollTop > 100) {
            console.log(document.getElementById('content').scrollTop);
            this.getHeader('推荐奖励', 'no_transparent');
          } else {
            this.getHeader('推荐奖励', 'recommend_top');
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
    // 请求推荐奖励
    tuijian () {
      this.axios.get('/user/Recommend', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (data.status === 1) {
            this.account.money = data.data.count;
            this.user = data.data.recommend;
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
