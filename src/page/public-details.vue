<template>
  <div class="publicDetails">
    <div class="details">
      <div class="kong"></div>
      <div class="top">
        <span class="title">{{title}}</span>
        <span class="time">{{create_time}}</span>
      </div>
      <div class="center" v-html="content">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'publicDetails',
  data () {
    return {
      content: '',
      create_time: '',
      title: ''
    };
  },
  beforeMount: function () {
    // 挂载之前
    // 请求公告列表
    this.getList();
  },
  mounted: function () {
    this.getHeader('公告详情', 'public_top');
  },
  methods: {
    // 请求公告列表
    getList () {
      this.axios.get('/user/articlesinfo', {
        params: {
          id: this.$route.query.id
        }
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.title = data.data.title;
            this.create_time = data.data.create_time;
            this.content = data.data.content;
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
.publicDetails{
  .details{
    padding-top: 90px;
    min-height: 100%;
    .kong{
      width: 100%;
      height: 10px;
      background: #f5f5f5;
    }
    .top{
      padding:25px 30px 0 30px;
      display: flex;
      justify-content: space-between;
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
      p{
        width: 100%;
        float: right;
        margin-top: 15px;
      }
      span{
        width: 100%;
        float: right;
        margin-top: 15px;
      }
    }
  }
}

</style>
