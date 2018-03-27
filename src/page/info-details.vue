<template>
  <div class="infoDetails">
    <div class="details clearfix">
      <div class="top">
        <span class="title">{{info.title}}</span>
        <span class="time">{{info.create_time}}</span>
      </div>
      <p class="center" v-html="info.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infoDetails',
  data () {
    return {
      info: {}
    };
  },
  beforeMount: function () { // 挂载之前
  // 请求用户信息详情接口
    this.getInfoDetails();
  },
  mounted: function () {
    this.getHeader('消息详情');
  },
  methods: {
    // 请求用户信息详情接口
    getInfoDetails () {
      this.axios.get('/user_news/detail', {
        params: {
          id: this.$route.query.id
        }
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.info = data.data;
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
  .infoDetails{
    background: #f5f5f5;
    height: 100%;
    padding: 120px 20px 20px;
    .details{
      background-color: #fff;
      min-height: 100%;
      border-radius: 10px;
      .top{
        padding:25px 30px 0 30px;
        border-top: 10px solid $color;
        border-radius: 10px 10px 0 0;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
        align-items: center;
        &::before{
          position: absolute;
          content: '';
          display: block;
          height: 10px;
          width: 120%;
          background-color: #fff;
          top: 0px;
          left: -20px;
        }
        .title{
          font-size: 28px;
          color: #333;
        }
        .time{
          font-size: 20px;
          color: #999;
        }
      }
      .center{
        width: 100%;
        padding:0 30px;
        font-size: 22px;
        color: #666;
        line-height: 40px;
        word-wrap: break-word;
        width: 100%;
        float: right;
      }
    }
  }
</style>
