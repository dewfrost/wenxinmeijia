<template>
  <div class="info_wrap">
    <!-- 没有数据页面 -->
    <div v-if="!info.length && isRequest" class="none_order">
       <p>此页面暂无内容</p>
    </div>
    <ul>
        <li class="info_li" v-for="(item, index) in info" :key="index" @click="seeInfoDetails(item.id)">
          <i class="icon iconfont" :class="iconArr[item.type - 1]"></i>
          <div class="info_div">
            <div class="info_top">
              <span class="title">
                <span class="click" :class="{'click1': item.is_look == 2, 'click2': item.is_look == 1}"></span>
                {{item.title}}
                </span>
              <span class="time">{{item.create_time}}</span>
            </div>
            <div class="bottom">{{item.content}}</div>
          </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {
      isRequest: false,
      iconArr: ['icon-laba-copy', 'icon-jiangli'],
      info: []
    };
  },
  beforeCreate: function () { // 创建之前
  },
  created: function () { // 创建之后
  },
  beforeMount: function () { // 挂载之前
    // 请求用户消息接口
    this.getInfo();
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
    },
    // 请求用户消息接口
    getInfo () {
      this.axios.get('/user_news/get_all', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (parseInt(data.status) === 1) {
            console.log(data.data);
            // 列表
            this.info = data.data;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    seeInfoDetails (id) {
      // 此处请求未读的接口
      this.$router.push({path: 'infoDetails', query: {id: id}});
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
  margin-bottom: 110px;
  .none_order{
    background: url(../assets/images/none_01.png) no-repeat center center;
    position: absolute;
    top: 200px;
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
      padding: 14px 16px;
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
    white-space: nowrap;
  }
 }
}
</style>
