<template>
  <div class="rankList">
    <div class="top">
     <span class="tab_in" :class="{'active': tabActive === 1}" @click="headerTab(1)">销售排行</span>
     <span class="tab_out" :class="{'active': tabActive === 2}" @click="headerTab(2)">本月收入</span>
    </div>
    <div class="center">
      <span class="iconfont icon-ranking"> <span class="paihang">本月排行</span> </span>
      <ul>
        <li class="rank_li" v-for="(item, index) in user" :key="index">
          <div class="rank_one">
            <!-- <span>{{index+1}}.</span> -->
            <span v-if="index == 0">
              <img src="../assets/images/index_1.png" alt="">
            </span>
            <span v-if="index == 1">
              <img src="../assets/images/index_2.png" alt="">
            </span>
            <span v-if="index == 2">
              <img src="../assets/images/index_3.png" alt="">
            </span>
            <span v-if="index >= 3">
             {{index+1}}.
            </span>
            <img :src="item.headimgurl" alt="头像">
            <div class="rank_div">{{item.nickname ? hideString(item.nickname) : ''}}</div>
          </div>
          <span class="rank_span">&yen;{{item.price}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rankList',
  data () {
    return {
      tabActive: 1,
      user: []
    };
  },
  beforeCreate: function () {
  },
  created: function () {
  },
  beforeMount: function () {
    // 请求本月排行销售排行接口
    this.getRank();
  },
  mounted: function () {
    this.scrollOn();
    this.getHeader('排行榜', 'rank_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    scrollOn: function () {
      eventBus.$on('contentScroll', (height) => {
        // 只在rankList页面监听
        if (/rankList/g.test(window.location.href)) {
          if (document.getElementById('content').scrollTop > 100) {
            this.getHeader('排行榜', 'no_transparent');
          } else {
            this.getHeader('排行榜', 'rank_top');
          }
        }
      });
    },
    headerTab: function (num) {
      if (num === this.tabActive) {
        return false;
      }
      this.tabActive = num;
      if (num === 1) {
        this.getRank();
      } else {
        this.getList();
      }
    },
    // 请求本月排行销售排行接口
    getRank () {
      this.axios.get('/user/Sales', {
      })
        .then(({data}) => {
          if (parseInt(data.status) === 1) {
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
    // 请求本月排行本月收入接口
    getList () {
      this.axios.get('/user/monthincome', {
      })
        .then(({data}) => {
          if (parseInt(data.status) === 1) {
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
.rank_top {
  background: transparent;
  color: #fff;
  border: none;
}
.rankList {
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
   .iconfont{
    display: inline-block;
    padding:0 10px 10px  8px;
    padding-top: 40px;
    color: #999;
    &.icon-ranking{
      font-size: 23px;
      padding-left: 25px;
     }
     .paihang{
       font-size: 20px;
       margin-left: 5px;
     }
    }
     .rank_li{
        color: #333;
        font-size: 24px;
        height: 95px;
        line-height: 95px;
        display: flex;
        justify-content: space-between;
        width: 92%;
        margin: auto;
        border-bottom: 1px solid #e6e6e6;
        &.rank_li:first-child{
            border-top: 1px solid #e6e6e6;
          }
          img{
            width: 56px;
            height: 56px;
            border-radius: 50%;
            margin: auto 20px auto 5px;
          }
        .rank_one{
          span{
            display: block;
            color: $color;
            width: 55px;
            margin: auto;
            text-align: center;
            img{ 
              height: 54px;
              width: 45px;
            }
          }
          // width: 40%;
          display: flex;
        }
      }
  }
}
</style>
