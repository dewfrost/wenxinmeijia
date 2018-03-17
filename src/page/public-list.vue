<template>
  <div class="publicList">
    <div class="list" v-for="item in list">
      <div class="time">{{item.time}}</div>
      <router-link to="publicDetails" tag="div" class="list_center">
        <span class="list_top">
          <span class="title" :class="{'title1': !item.isClick, 'title2': item.isClick}">{{item.title}}<i class="iconfont icon-you"></i></span>
        </span>
        <div class="center">{{item.center}}</div>
      </router-link>
    </div>
    <div class="bottom">已经到底了...</div>
  </div>
</template>

<script>
export default {
  name: 'publicList',
  data () {
    return {
      list: [
        {
          isClick: false,
          time: '2017-12-09 12:26:03',
          title: '系统通知',
          center: '新系统可以开始注单了！首先热烈祝贺我们平台正式上线！欢迎家人登录平台新系统>>'
        },
        {
          isClick: true,
          time: '2017-12-09 12:26:03',
          title: '系统通知',
          center: '新系统可以开始注单了！首先热烈祝贺我们平台正式上线！欢迎家人登录平台新系统>>'
        },
        {
          isClick: true,
          time: '2017-12-09 12:26:03',
          title: '系统通知',
          center: '新系统可以开始注单了！首先热烈祝贺我们平台正式上线！欢迎家人登录平台新系统>>'
        }
      ]
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
    this.getHeader('公告列表', 'public_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
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
          &.title1{
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

</style>
