<template>
  <div class="user_center">
    <!-- 个人信息 -->
    <div class="top">
      <router-link tag="img" class="head_img" to="editInformation" :src="user.headImg" alt="头像"></router-link>
      <div class="right">
        <div class="info">
          <div class="info_top">
            <span class="name">{{user.name}}</span>
            <span class="user_level"><i class="iconfont icon-huiyuan"></i>{{user.class}}</span>
          </div>
          <div class="info_bottom">
            <span>推荐人：</span><span class="recommended">{{user.phone}}</span>
          </div>
        </div>
        <router-link tag="i" to="editInformation" class="info_you iconfont icon-you"></router-link>
      </div>
    </div>
    <!-- 公告列表 -->
    <p class="public">
      <i class="iconfont icon-laba-copy"></i>
      <span class="list">
        <swiper :options="swiperinfo" ref="swiperInfo">
          <!-- slides -->
          <swiperSlide v-for="item in swiperInfo" :key="item.id"> 
           {{item.text}}
          </swiperSlide>
          <!-- Optional controls -->
        </swiper>
      </span>
      <router-link tag="span" to="publicList" class="more">更多</router-link>
    </p>
    <!-- 订单列表 -->
    <div class="nav">
      <router-link tag="div" class="nav_list" v-for="(name, index) in msgList" :to="{path: 'order', query:{status: index}}" :key="name">
        <span class="has-msg" v-show="orderList[index]">{{orderList[index] > 99 ? '99+' : orderList[index]}}</span>
        <span class="iconfont" :class="'icon-' + iconList[index]"></span>
        <span class="name">{{name}}</span>
      </router-link>
    </div>
    <!-- 累计收益 -->
    <div class="add">
      <div class="add_list">
        <span class="money">1288.00</span>
        <span class="add_name">累计收益</span>
      </div>
      <router-link tag="div" class="add_list" v-for="(addName, index) in addList" :to="{path: add[index], query:{status: index}}" :key="index">
        <span class="money">{{money[index]}}</span>
        <span class="add_name">{{addName}}</span>
      </router-link>
    </div>
    <!-- 个人设置 -->
    <div class="set">
      <router-link tag="div" class="set_list" v-for="(setName, index) in setList" :to="{path: setLink[index]}" :key="index">
        <span class="iconfont" :class="'icon-' + iconfontList[index]"></span>
        <span class="set_name">{{setName}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'userCenter',
  data () {
    return {
      // 数据
      swiperinfo: {
        notNextTick: true,
        autoplay: 2000,
        loop: true,
        direction: 'vertical'
      },
      swiperImg: [], // 轮播
      swiperInfo: [
        {
          text: '二月二，带你去美甲！'
        },
        {
          text: '指尖秀科技'
        },
        {
          text: '春来了'
        }
      ],
      user: {
        headImg: require('../assets/images/header.png'),
        name: '宓月',
        class: '推广员',
        phone: '13845699654'
      },
      // 公告
      list: '今晚12点整进行更新维护，请大家互相转告',
      msgList: ['待付款', '待发货', '待收货', '已完成'],
      orderList: [0, 2, 100000, 55],
      iconList: ['xinyongqiahuankuan', 'kuaidi', 'suishendai', 'chenggong'],
      addList: ['可提现余额', '货款余额', '推荐奖励', '晋级奖励', '管理薪资'],
      money: ['10000.00', '10000.00', '10512.00', '10512.00', '10512.00'],
      add: ['withdraw', 'moneyAccount', 'recommendAwards', 'promotionAwards', 'managementSalary'],
      setList: ['我的账本', '我的伙伴', '二维码', '收货地址', '客服中心', '更换手机号', '账户绑定', '账号设置'],
      iconfontList: ['qianbao', 'kehu', 'erweima', 'dingwei', 'zuoji', 'dianhuaben', 'youhuiquan', 'hekriconshebeisuokai'],
      setLink: ['accountBook', 'partner', 'qrCode', 'manageAddress', 'customerCenter', 'changePhone', 'accountBind', 'settingAccount']
    };
  },
  beforeCreate: function () { // 创建之前
  },
  created: function () { // 创建之后
  },
  beforeMount: function () { // 挂载之前
  },
  mounted: function () {
    this.getFooter();
    // 展示代金券弹窗,参数为金额
    this.getVoucherModal('1450.00');
    // this.getHeader('个人中心');
  },
  methods: {
    getFooter () {
      eventBus.$emit('footer', {
        button: [],
        navShow: true
      });
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style  lang="scss">
@import url(../assets/css/swiper-3.4.0.min.css);
@import "../assets/css/base.scss";
.user_center{
  min-height: 100%;
  padding-bottom: 100px;
  background: #fff;
  min-height: 100%;
  padding-bottom: 100px;
  .top{
    width: 600px;
    height: 140px;
    border-radius: 4px;
    display: flex;
    background: $color;
    box-shadow: 0 0 30px #e08ea4;
    color: #fff;
    margin: 43px auto 18px;
    justify-content: space-between;
    align-items: center;
    .head_img{
      width: 110px;
      height: 110px;
      border-radius: 50%;
      border: 5px solid #f2a9bb;
      margin:  0 32px;
    }
    .right{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      .info{
        width: 330px;
        display: flex;
        color: #fff;
        font-size: 22px;
        flex-direction: column;
        .info_top{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: -6px;
          .name{
            font-size: 30px;
          }
          .user_level{
            color: #ffe400;
            display: flex;
            .icon-huiyuan{
              padding-right: 8px;
              font-size: 32px;
            }
          }
        }
        .info_bottom{
          margin-top: 17px;
          span{
          }
          .recommended{

          }
        }
      }
      .info_you{
        font-size: 32px;
        padding-right: 15px;
      }
    }
  }
  .public{
    padding: 0 30px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 10px;
    .icon-laba-copy{
      font-size: 32px;
      color: #fe7000;
      background: linear-gradient(90deg, #fe8800 , #ff6a00);     /* 背景色渐变 */
      -webkit-background-clip: text;         /* 规定背景的划分区域 */
      -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
    }
    .list{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 140px;
      height: 40px;
      line-height: 40px;
      position: relative;
      left: -50%;
      transform: translateX(50%);
      .index_goodsNews_mess{
        border-left:1px solid #e6e6e6;
        // padding-left:20px;
        font-size:20px;
        // float:left;
        .swiper-container{
          width:400px;
          height:30px;
          .swiper-slide{
            width:400px;
            height:30px;
            display: flex;
            align-items: center;
            line-height: 32px;
            &.swiper-slide-active{
              height: 32px;
            }
          }
        }
      }
    }
    .more{
      min-width: 80px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      border-left: 2px solid #999;
    }
  }
  .nav{
    height:155px;
    display: flex;
    align-items: center;
    .nav_list{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .has-msg{
        min-width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 12px;
        background: #9a31ff;
        color: #fff;
        // box-sizing: content-box;
        padding: 0 4px;
        position: absolute;
        top: 0;
        font-size: 16px;
        left: 56%;
      }
      .iconfont{
        font-size: 37px;
      }
      .icon-xinyongqiahuankuan{
        color: #fe8800;
        background: linear-gradient(90deg, #fed420 , #fd9d05);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .icon-kuaidi{
        color: #ff6400;
        background: linear-gradient(90deg, #fe8700 , #ff5600);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .icon-suishendai{
        color: #6c96fd;
        background: linear-gradient(90deg, #72abfe , #6989fc);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .icon-chenggong{
        color: #fb5f85;
        background: linear-gradient(90deg, #f883a0 , #ff3c6b);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .name{
        font-size: 22px;
      }
    }
  }
  .add{
    flex-flow: wrap;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 20px;
    &:before{
      position: absolute;
      top: -20px;
      left: 0;
      content: '';
      width: 100%;
      height: 20px;
      display: block;
      background: #f5f5f5;
    }
    &:after{
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      height: 1px;
      background-color: #e6e6e6;
      width: 90%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .add_list{
      width: 33.3333%;
      padding: 30px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .money{
      font-size: 24px;
      color: $color;
    }
    .add_name{
      font-style: 20px;
      margin-top: 4px;
    }
  }
  .set{
    flex-flow: wrap;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 20px;
    &:before{
      content: '';
      position: absolute;
      top: -20px;
      left: 0;
      width: 100%;
      height: 20px;
      display: block;
      background: #f5f5f5;
    }
    &:after{
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      height: 1px;
      background-color: #e6e6e6;
      width: 90%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .set_list{
      width: 25%;
      padding: 30px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .iconfont{
      font-size: 37px;
      color: $color;
    }
    .icon-qianbao{
        color: #9773fe;
        background: linear-gradient(90deg, #9e76fe , #8a6bfe);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .icon-kehu{
        color: #4db9ec;
        background: linear-gradient(90deg, #4cc1f2 , #50a0db);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .icon-erweima{
        color: #ffb612;
        background: linear-gradient(90deg, #fed11e , #ffb948);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .icon-dingwei{
        color: #fb5f85;
        background: linear-gradient(90deg, #f883a0 , #ff3c6b);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .icon-zuoji{
        color: #6e97fc;
        background: linear-gradient(90deg, #6fa2fc , #6c89fd);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .icon-dianhuaben{
        color: #feba14;
        background: linear-gradient(90deg, #fed11e , #ffa108);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .icon-youhuiquan{
        color: #9471fe;
        background: linear-gradient(90deg, #9f77fe , #8a6bfe);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
      .icon-hekriconshebeisuokai{
        color: #4dcd5d;
        background: linear-gradient(90deg, #54d560 , #45c259);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      }
    .set_name{
      font-style: 20px;
      margin-top: 8px;
    }
  }
}
</style>
