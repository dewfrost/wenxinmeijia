<template>
  <div class="partner">
    <div class="top">
      <span>总人数</span>
      <span class="all_sum">{{account.num}}</span>
    </div>
    <div class="two">
      <span class="tab_in" :class="{'active': tabActive === 1}" @click="headerTab(1)">扫码会员</span>
      <span class="tab_out" :class="{'active': tabActive === 2}" @click="headerTab(2)">消费会员</span>
    </div>
    <div class="center" v-if="tabActive === 1">
      <ul>
        <li class="partner_li" v-for="(item, index) in user" :key="index">
          <div class="partner_one">
            <img :src="item.imgurl" alt="头像">
            <div class="partner_div">{{item.name}}</div>
          </div>
          <span class="partner_span">{{item.phone}}</span>
        </li>
      </ul>
    </div>
    <div class="center" v-if="tabActive === 2">
     <div class="spend">
        <span>筛选 :
          <span @click="select()" class="spend_span">全部 <i class="iconfont icon-sanjiao"></i> </span>
        </span>
        <span class="spend_num">共{{people.num}}人</span>
     </div>
     <ul v-show="isShow" class="agent">
          <li class="agent_all" v-for="(item, index) in agent" @click="select()" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="num">{{item.num}}</span>
          </li>
      </ul>
     <ul>
       <li class="spend_li" v-for="(item, index) in member" :key="index">
         <div class="tou">
           <img :src="item.Imgurl" alt="头像">
           <div class="s_d">
            <div>{{item.name}}</div>
            <div class="level" @click="all()">
              <span class="level_logo" :class="'level' + (parseInt(item.level) - 2)" v-if="parseInt(item.level) > 2"></span>
              <span>{{levelArr[parseInt(item.level) - 1]}}</span>
            </div>
           </div>
         </div>
         <div class="spend_money">
           <div class="spend_one">总收入￥{{item.money}}</div>
           <div class="spend_two">直推{{item.num}}人</div>
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
      levelArr: ['见习推广员', '推广员', '初级代理', '中级代理', '高级代理', '合伙人'],
      isShow: false,
      tabActive: 1,
      account: {
        num: 200
      },
      user: [
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          phone: '13700000000'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          phone: '13700000000'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          phone: '13700000000'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          phone: '13700000000'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          phone: '13700000000'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          phone: '13700000000'
        },
        {
          imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          phone: '13700000000'
        }
      ],
      member: [
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '6',
          money: '200000.00',
          num: 120
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '4',
          money: '50000.00',
          num: 100
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '3',
          money: '40000.00',
          num: 80
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '3',
          money: '30000.00',
          num: 60
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '2',
          money: '2000.00',
          num: 30
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '1',
          money: '1500.00',
          num: 20
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '2',
          money: '1000.00',
          num: 10
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '2',
          money: '1000.00',
          num: 10
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '1',
          money: '30000.00',
          num: 60
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '1',
          money: '2000.00',
          num: 30
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '1',
          money: '1500.00',
          num: 20
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '1',
          money: '1000.00',
          num: 10
        },
        {
          Imgurl: require('../assets/images/r_l.png'),
          name: 'CRxiaosha',
          level: '5',
          money: '1000.00',
          num: 10
        }
      ],
      agent: [
        {
          name: '全部',
          num: 120
        },
        {
          name: '推广员',
          num: 60
        },
        {
          name: '初级代理L1',
          num: 30
        },
        {
          name: '初级代理L2',
          num: 15
        },
        {
          name: '初级代理L3',
          num: 10
        },
        {
          name: '合伙人L4',
          num: 5
        },
        {
          name: '推广员',
          num: 60
        },
        {
          name: '初级代理L1',
          num: 30
        },
        {
          name: '初级代理L2',
          num: 15
        },
        {
          name: '初级代理L3',
          num: 10
        },
        {
          name: '合伙人L4',
          num: 5
        }
      ],
      people: {
        num: 200
      }
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
    this.getHeader('我的伙伴', 'partner_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
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
    },
    select: function () {
      this.isShow = !this.isShow;
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
        width: 40%;
        display: flex;
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
      .spend_span{
        color: $color;
        margin-left: 5px;
        .iconfont{
          font-size: 12px;
          margin-top: 5px;
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
          color: #FFDD06;
          display: flex;
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
