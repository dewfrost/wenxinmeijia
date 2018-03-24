<template>
  <div class="publicList">
    <!-- 没有数据页面 -->
    <div v-if="!list.length && isRequest" class="none_order">
      <p>此页面暂无内容</p>
    </div>
    <div class="main">
      <div class="list" v-for="item in list">
        <div class="time">{{item.create_time}}</div>
        <div class="list_center" @click="seeDetails(item.id)">
          <span class="list_top" >
            <span class="title" :class="{'title1': item.read, 'title2': !item.read}">{{item.title}}<i class="iconfont icon-you"></i></span>
          </span>
          <div class="center">{{item.description}}</div>
        </div>
      </div>
     <div class="bottom" v-if="list.length && isRequest">已经到底了...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'publicList',
  data () {
    return {
      isRequest: false,
      list: []
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
    // 请求公告列表
    this.getList();
  },
  mounted: function () {
    this.getHeader('公告列表', 'public_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    // 请求公告列表
    getList () {
      this.axios.get('/user/articles', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (data.status === 1) {
            this.list = data.data;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    seeDetails (id) {
      // 此处请求未读的接口
      this.$router.push({path: 'publicDetails', query: {id: id}});
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.publicList{
  background: #f5f5f5;
  padding-top: 90px;
  min-height: 100%;
.none_order{
  background: url(../assets/images/none_01.png) no-repeat center center;
  position: absolute;
  top: 230px;
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
.main{


  .list{
    padding-bottom: 10px;
    .time{
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #999;
      font-size: 20px;
    }
    .list_center{
      background: #fff;
      width: 96%;
      margin: auto;
      .list_top{
        .title{
          padding: 0 20px;
          height: 80px;
          line-height: 80px;
          display: flex;
          justify-content: space-between;
          font-size: 24px;
          border-bottom: 1px solid #e6e6e6;
          width: 96%;
          margin: auto;
          &.title1{
            color:#333;
          }
          &.title2{
           color: $color;
          }
        }
        .iconfont{
          display: inline-block;
          font-size: 28px;
          color: #333;
        }
      }
      .center{
        width: 96%;
        height: 112px;
        line-height: 40px;
        padding: 22px 20px;
        font-size: 22px;
        margin: 0 auto;
        color: #999;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
    }
    
  }
  .bottom{
      color: #999;
      font-size: 20px;
      text-align: center;
    }
    }
}

</style>
