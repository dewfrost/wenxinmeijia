<template>
  <div class="user_center">
    <!-- 个人信息 -->
    <div class="top">
      <div class="left">
        <router-link tag="img" class="head_img" to="editInformation" :src="user.headimgurl" alt="头像"></router-link>
      </div>
      <div class="right">
        <div class="info">
          <div class="info_top">
            <span class="name">{{user.nickname}}</span>
            <span class="user_level">
              <span class="level" :class="'level' + (user.t_class - 2)"></span>
              <span>{{levelArr[user.t_class - 1]}}</span>
            </span>
          </div>
          <div class="info_bottom">
            <span>推荐人：</span><span class="recommended">{{showPhone}}</span>
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
           {{item.description}}
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
    <div class="add" v-if="!isWechat()">
      <div class="add_list">
        <span class="money">{{moneyList[0] || 0.00}}</span>
        <span class="add_name">累计收益</span>
      </div>
      <router-link tag="div" class="add_list" v-for="(addName, index) in addList" :to="{path: add[index], query:{status: index}}" :key="index">
        <span class="money">{{moneyList[index + 1] || 0.00}}</span>
        <span class="add_name">{{addName}}</span>
      </router-link>
    </div>
    <!-- 个人设置 -->
    <div class="set">
      <div class="set_list" v-for="(setName, index) in setList" :key="index" @click="seeDetails(index)" v-if="!(isWechat() && [0, 1].includes(index))">
        <span class="iconfont" :class="'icon-' + iconfontList[index]"></span>
        <span class="set_name">{{setName}}</span>
      </div>
      <div class="set_list copy_btn" @click="copy()" :data-clipboard-text="copyLink" v-if="isWechat()">
        <span class="iconfont icon-copy"></span>
        <span class="set_name">复制链接</span>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'userCenter',
  data () {
    return {
      // 数据
      showPhone: '',
      levelArr: ['见习推广员', '推广员', '初级代理', '中级代理', '高级代理', '合伙人'],
      swiperinfo: {
        notNextTick: true,
        autoplay: 2000,
        loop: true,
        direction: 'vertical'
      },
      swiperImg: [], // 轮播
      swiperInfo: [],
      user: {
        headimgurl: null,
        nickname: '',
        t_class: null,
        pphone: ''
      },
      // 公告
      msgList: ['待付款', '待发货', '待收货', '已完成'],
      orderList: [],
      iconList: ['xinyongqiahuankuan', 'kuaidi', 'suishendai', 'chenggong'],
      addList: ['可提现余额', '货款余额', '推荐奖励', '管理薪资', '晋级奖励'],
      moneyList: [],
      add: ['withdraw', 'moneyAccount', 'recommendAwards', 'managementSalary', 'promotionAwards'],
      setList: ['我的账本', '我的伙伴', '二维码', '收货地址', '客服中心', '更换手机号', '账户绑定', '账号设置'],
      iconfontList: ['qianbao', 'kehu', 'erweima', 'dingwei', 'zuoji', 'dianhuaben', 'youhuiquan', 'hekriconshebeisuokai'],
      setLink: ['accountBook', 'partner', 'qrCode', 'manageAddress', 'customerCenter', 'changePhone', 'accountBind', 'settingAccount'],
      copyLink: '' // 复制要分享的链接
    };
  },
  beforeCreate: function () { // 创建之前
  },
  created: function () {
  },
  beforeMount: function () {
    // 获取订单角标
    this.getOrderSum();
    // 获取用户信息
    this.getInfo();
    // 获取公告轮播列表
    this.getCarouselList();
    // 获取累计收益列表
    this.getMoneylList();
    // 微信中获取要分享的链接
    if (this.isWechat()) {
      this.getCopyLink();
    }
  },
  mounted: function () {
    this.getFooter();
    // this.loading();
    // setTimeout(() => {
    //   this.loading(false);
    // }, 2000);
  },
  methods: {
    getCopyLink () {
      this.axios.get('/user/get_code_url').then(({data}) => {
        if (data.status === 1) {
          this.copyLink = data.data;
          this.copyBtn = new Clipboard('.copy_btn');
        } else {
          this.toast(data.message);
        }
      });
    },
    copy () {
      // this.toast('复制成功，若未成功请手动复制该链接');
      this.modal('复制成功，若未成功请手动复制', this.copyLink, '确定', function () {
        return false;
      });
    },
    seeDetails (index) {
      if (index === 2) {
        // 请求是否有权限打开二维码
        this.seeQrcode();
      } else {
        this.$router.push({path: this.setLink[index]});
      }
    },
    seeQrcode () {
      // this.$router.push({path: this.setLink[2]});
      window.location.href = '/qrCode';
    },
    getOrderSum () {
      this.axios.get('/user/angle', {
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.orderList = data.data;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCarouselList () {
      this.axios.get('/user/articles', {
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.swiperInfo = data.data;
            let result;
            for (let i = 0; i < this.swiperInfo.length; i++) {
              result = this.swiperInfo[i].description.replace(/[\u4e00-\u9fa5]/g, '**');
              if (result.length >= 45) {
                let endString = '';
                let tempstrting;
                for (let j = 0; i < this.swiperInfo[i].description.length; j++) {
                  endString += this.swiperInfo[i].description[j];
                  tempstrting = endString.replace(/[\u4e00-\u9fa5]/g, '**');
                  if (tempstrting.length >= 45) {
                    this.swiperInfo[i].description = endString + '···';
                    break;
                  }
                }
              } else {
                continue;
              }
            }
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getMoneylList () {
      this.axios.get('/user/count_money', {
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.moneyList = data.data;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getInfo () {
      this.axios.get('/user/info', {
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.user = data.data;
            // 手机号隐藏中间四位
            if (data.data.pphone) {
              this.showPhone = this.hidePhone(data.data.pphone);
            } else {
              this.showPhone = '无';
            }
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getFooter () {
      eventBus.$emit('footer', {navShow: true});
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
    .left{
      display: flex;
      justify-content: center;
      align-items: center;
      .head_img{
        width: 110px;
        height: 110px;
        border-radius: 50%;
        border: 5px solid #f2a9bb;
        margin:  0 32px;
      }
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
            font-size: 26px;
          }
          .user_level{
            color: #FFDD06;
            display: flex;
            align-items: center;
            .level{
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
    width: 100%;
    padding: 0 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 10px;
    justify-content: space-between;
    position: relative;
    .icon-laba-copy{
      position: absolute;
      left: 20px;
      font-size: 32px;
      color: #fe7000;
      background: linear-gradient(90deg, #fe8800 , #ff6a00);     /* 背景色渐变 */
      -webkit-background-clip: text;         /* 规定背景的划分区域 */
      -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
    }
    .list{
      flex: 1;
      padding-left: 40px;
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      position: relative;
      left: -50%;
      transform: translateX(50%);
      width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .swiper-container{
        min-width:100%;
        height:30px;
        .swiper-slide{
          // min-width:500px;
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
    .more{
      // min-width: 120px;
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      position: absolute;
      right: 20px;
      top: 44%;
      transform: translateY(-50%);
      &::before{
        position: absolute;
        content: '';
        display: block;
        width: 2px;
        height: 1em;
        background-color: #666;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
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
        top: -10px;
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
    justify-content: flex-start;
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
