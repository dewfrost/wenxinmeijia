<template>
  <div class="info_wrap">
    <ul>
      <router-link to="infoDetails">
      <li class="info_li" v-for="item in info">
         <i class="icon iconfont" :class="iconArr[item.type]"></i>
         <div class="info_div">
          <div class="info_top">
             <span class="title">
               <span class="click" :class="{'click1': !item.isClick, 'click2': item.isClick}"></span>
               {{item.title}}
               </span>
             <span class="time">{{item.time}}</span>
          </div>
          <div class="bottom">{{item.cenetr}}</div>
         </div>
      </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {
      iconArr: ['icon-laba-copy', 'icon-jiangli'],
      info: [
        {
          type: 1,
          isClick: true,
          title: '推荐奖励',
          time: '2018-03-12 15:36:26',
          cenetr: '恭喜获得推荐奖励，多劳多得加油哦！恭喜获得推荐奖励，多劳多得加油哦'
        },
        {
          type: 1,
          title: '推荐奖励',
          time: '2018-03-12 15:36:26',
          cenetr: '恭喜获得推荐奖励，多劳多得加油哦！恭喜获得推荐奖励，多劳多得加油哦'
        },
        {
          type: 1,
          title: '推荐奖励',
          time: '2018-03-12 15:36:26',
          cenetr: '恭喜获得推荐奖励，多劳多得加油哦！恭喜获得推荐奖励，多劳多得加油哦'
        },
        {
          type: 0,
          title: '推荐奖励',
          time: '2018-03-12 15:36:26',
          cenetr: '恭喜获得推荐奖励，多劳多得加油哦！恭喜获得推荐奖励，多劳多得加油哦'
        }
      ]
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
    this.getHeader('消息', 'info_header');
  },
  methods: {
    getFooter () {
      eventBus.$emit('footer', {
        button: [],
        navShow: true
      });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/base.scss";
.info_header.header_top{
  span.iconfont{
    display: none;
  }
}
.info_wrap{
  background: #f5f5f5;
  min-height: 100%;
  ul{
    margin-top: 110px;

  .info_li{
    display: flex;
    justify-content: space-between;
    background: #fff;
    height: 110px;
    border-bottom:  1px solid #e6e6e6;
      i{
        margin: 20px;
      }
    .icon{
      display: inline-block;
      color: #fff;
      padding: 15px;
      font-size: 35px;
      border-radius: 50%;
        &.icon-jiangli{
        background:  -webkit-linear-gradient(left, #70a6fe , #698bfc);
        }
        &.icon-laba-copy{
          background:  -webkit-linear-gradient(left, #f97b99 , #fe4270);
        }
    }
  }
  .info_top{
    padding: 25px 25px 25px 0;
    width: 540px;
    display: flex;
    justify-content: space-between;
    .title{
      font-size: 26px;
      color: #111;
      display: flex;
      align-items: center;
     
      .click{
        margin-right: 5px;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: $color;
         &.click1{
           display: none;
         }
         &.click2{
           display: block;
         }
      }
    }
    .time{
      color: #999;
      font-size: 20px;
    }
  }
  .bottom{
    width: 540px;
    padding-right: 25px;
    margin-top: -20px;
    color: #666;
    font-size: 20px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
 }
}
</style>
