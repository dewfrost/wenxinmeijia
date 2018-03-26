<template>
  <div class="partner" ref="logBox">
    <div class="top">
      <span>总人数</span>
      <span class="all_sum">{{account}}</span>
    </div>
    <div class="two">
      <span class="tab_in" :class="{'active': tabActive === 1}" @click="headerTab(1)">扫码会员</span>
      <span class="tab_out" :class="{'active': tabActive === 2}" @click="headerTab(2)">消费会员</span>
    </div>
    <div class="center" v-if="tabActive === 1">
      <!-- 没有数据页面 -->
      <div v-if="!user.length && isRequest" class="none_order">
        <p>此页面暂无内容</p>
      </div>
      <ul>
        <li class="partner_li" v-for="(item, index) in user" :key="index">
          <div class="partner_one">
            <div class="img">
              <img :src="item.headimgurl" alt="头像">
            </div>
            <div class="partner_div">{{item.nickname ? hideString(item.nickname) : item.nickname}}</div>
          </div>
          <span class="partner_span">{{item.phone ? hidePhone(item.phone) : item.phone}}</span>
        </li>
      </ul>
    </div>
    <div class="center" v-if="tabActive === 2">
      <div class="spend">
        <span class="left">
          <span class="name">筛选 :</span>
          <span @click="select()" class="spend_span">
            <span class="show_condition">{{showCondition}}</span>
            <i class="iconfont icon-sanjiao"></i>
          </span>
        </span>
        <!-- 对应条件下的总人数 -->
        <span class="spend_num">{{requestLevel ? '共' + agent[requestLevel].user_num + '人' : people.num}}</span>
      </div>
      <ul v-show="isShowCondition" class="agent">
        <li class="agent_all" @click="chooseCondition(0)">
          <span class="name">全部</span>
          <span class="num">{{people.num[1]}}</span>
        </li>
        <li class="agent_all" v-for="(item, index) in agent" @click="chooseCondition(index)" :key="index" v-if="item.user_num && (index > 1)">
          <span class="name">{{item.value}}</span>
          <span class="num">{{item.user_num}}</span>
        </li>
      </ul>
      <!-- 没有数据页面 -->
      <div v-if="!member.length && isRequest" class="none_order">
        <p>此页面暂无内容</p>
      </div>
      <ul>
        <li class="spend_li" v-for="(item, index) in member" :key="index">
          <div class="tou">
            <img :src="item.headimgurl" alt="头像">
            <div class="s_d">
              <div>{{item.nickname ? hideString(item.nickname) : item.nickname}}</div>
              <div class="level" @click="all()">
                <span class="level_logo" :class="'level' + (parseInt(item.class_num) - 2)" v-if="parseInt(item.class_num) > 2"></span>
                <span>{{levelArr[parseInt(item.class_num) - 1]}}</span>
              </div>
            </div>
          </div>
          <div class="spend_money">
            <div class="spend_one">总收入￥{{item.count_money}}</div>
            <div class="spend_two">直推{{item.count_children}}人</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'partner',
  data () {
    return {
      isRequest: false,
      showCondition: '全部', // 展示的筛选条件
      levelArr: ['见习推广员', '推广员', '初级代理', '中级代理', '高级代理', '合伙人'],
      isShowCondition: false,
      tabActive: 1,
      page: 1,
      canRequest: true,
      noMore: false,
      account: 0,
      user: [],
      member: [],
      agent: [],
      agentBase: [
        {
          user_num: 0,
          value: '全部'
        }
      ],
      people: {
        num: 0
      },
      requestLevel: null
    };
  },
  beforeMount: function () {
    // 扫码会员列表
    this.getFreeList(this.page);
  },
  mounted: function () {
    this.scrollOn();
    this.getHeader('我的伙伴', 'partner_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    scrollOn: function () {
      // 头部滚动事件
      eventBus.$on('contentScroll', (height) => {
        // 只在goodsDetails页面监听
        if (/partner/g.test(window.location.href)) {
          if (document.getElementById('content').scrollTop > 100) {
            this.getHeader('我的伙伴', 'no_transparent');
          } else {
            this.getHeader('我的伙伴', 'partner_top');
          }
        }
      });
      // 底部滚动加载事件
      eventBus.$on('getScrollInfo', (height) => {
        if (/partner/g.test(window.location.href) && this.$refs.logBox.clientHeight - height < 50 && this.canRequest && !this.noMore) {
          if (this.tabActive === 1) {
            this.getFreeList(this.page);
          } else {
            this.getPayList(this.page, this.requestLevel);
          }
        }
      });
    },
    getFreeList (page) {
      this.canRequest = false;
      this.axios.get('/user/saoma_members', {
        params: {
          page: page
        }
      })
        .then(({data}) => {
          this.isRequest = true;
          if (data.status === 1) {
            this.canRequest = true;
            this.page++;
            if (data.data.users.length < 10 || !data.data.users.length || !data.data.users) {
              this.noMore = true;
            }
            this.account = data.data.count;
            this.user = this.user.concat(data.data.users);
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getPayList (page, level) {
      this.canRequest = false;
      this.axios.get('/user/xiaofei_members', {
        params: {
          page: page,
          class: level
        }
      })
        .then(({data}) => {
          this.isRequest = true;
          if (data.status === 1) {
            this.canRequest = true;
            this.page++;
            if (data.data.users.length < 5 || !data.data.users.length || !data.data.users) {
              this.noMore = true;
            }
            // 选择级别的总人数
            this.people.num = data.data.class_user_count;
            // 筛选数组
            this.agent = data.data.class;
            this.member = this.member.concat(data.data.users);
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    headerTab: function (num) {
      if (this.tabActive === num) {
        return false;
      }
      // 切换tab重新设置成false
      this.isRequest = false;
      // 筛选条件框收起
      this.isShowCondition = false;
      // page变为1
      this.page = 1;
      this.noMore = false;
      this.canRequest = true;
      this.tabActive = num;
      if (this.tabActive === 1) {
        // 数组清空
        this.user = [];
        this.getFreeList(this.page);
      } else {
        // 数组清空
        this.member = [];
        this.getPayList(this.page);
      }
    },
    // 点击展开收起筛选条件
    select: function () {
      this.isShowCondition = !this.isShowCondition;
    },
    // 选择条件事件
    chooseCondition (index) {
      this.isShowCondition = false;
      // 切换tab重新设置成false
      this.isRequest = false;
      // 数组清空
      this.member = [];
      this.canRequest = true;
      // page变为1
      this.page = 1;
      if (!index) {
        this.getPayList(this.page);
      }
      // 请求的等级
      this.requestLevel = index;
      this.showCondition = this.agent[index].value;
      // 筛选条件后的获取列表
      this.getPayList(this.page, this.requestLevel);
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.partner_top {
  background: transparent;
  color: #fff;
  border: none;
}
.partner { 
  background: url(../assets/images/partner.png) no-repeat;
  min-height: 100%;
  padding-bottom: 16px;
  .top{
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    margin-top: 120px;
    line-height: 66px;
    .all_sum{
      font-size: 58px;
      line-height: 58px;
    }
  }
  .two{
    width: 50%;
    margin: auto;
    color: #ffd5dd;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    margin-top: 45px;
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
   margin-top: 20px;
    .partner_li{
      color: #333;
      font-size: 24px;
      height: 95px;
      line-height: 95px;
      display: flex;
      justify-content: space-between;
      width: 92%;
      margin: auto;
      border-bottom: 1px solid #e6e6e6;
      &:nth-last-child(1){
        border-bottom: none;
      }
      img{
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin: auto 20px auto 0;
      }
      .partner_one{
        display: flex;
        align-items: center;
      }
    }
    .spend{
      color: #333;
      font-size: 22px;
      display: flex;
      justify-content: space-between;
      margin: auto;
      width:  92%;
      height: 70px;
      // border-bottom: 1px solid #e6e6e6;
      line-height: 70px;
      .left{
        display: flex;
        align-items: center;
        .spend_span{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: $color;
          margin-left: 5px;
          .show_condition{
            margin: 0 8px;
          }
          .iconfont{
            font-size: 12px;
          }
        }
      }
      .spend_num{
        color: #999;
      }
    }
    .agent{
     position: absolute;
      min-height: 100%;
      width: 100%;
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0.4);
      .agent_all{
        width: 100%;
        padding: 0 4%;
        justify-content: space-between;
        display: flex;
        margin:auto auto;
        height: 70px;
        line-height: 70px;
        font-size: 22px;
        background: #fff;
        border-bottom: 1px solid #e6e6e6;
        .name{
          color: #666;
        }
        .num{
          color: #999;
        }
      }
    }
    .spend_li{
      height: 95px;
      border-bottom: 1px solid #e6e6e6;
      margin: auto;
      width:  92%;
      display: flex;
      justify-content: space-between;
      &:nth-last-child(1){
        border-bottom: none;
      }
      .tou{
        img{
          width: 56px;
          height: 56px;
          border-radius: 50%;
          margin: auto  10px auto 0;
        }
        display: flex;
        .s_d{
          div{
            padding: 2px;
          }
          margin: auto;
          font-size: 24px;
          color: #333;
          .iconfont{
            font-size: 25px;
            color: #fd8f01;
          }
          .level{
            font-size: 20px;
            color: #FD991D;
            display: flex;
            align-items: center;
            .level_logo{
              width: 24px;
              height: 24px;
              margin-right: 6px;
              &.level1{
                background: url(../assets/images/L1.png) no-repeat left center;
                background-size: 24px;
              }
              &.level2{
                background: url(../assets/images/L2.png) no-repeat left center;
                background-size: 24px;
              }
              &.level3{
                background: url(../assets/images/L3.png) no-repeat left center;
                background-size: 24px;
              }
              &.level4{
                background: url(../assets/images/L4.png) no-repeat left center;
                background-size: 24px;
              }
            }
          }
        }
      }
      .spend_money{
        div{
          padding: 2px;
        }
        margin: auto 0;
        font-size: 22px;
        color: #333;
        text-align: right;
        .spend_two{
          color: #999;
          font-size: 20px;
          right: 0;
        }
      }
    }
  }
}
</style>
