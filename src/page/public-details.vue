<template>
  <div class="publicDetails">
    <div class="details">
      <div class="kong"></div>
      <div class="top">
        <span class="title">{{public.title}}</span>
        <span class="time">{{public.time}}</span>
      </div>
      <div class="center">
        <p>系统将于今晚十二点进行维护更新，预计更新时间7个小时更新完毕。</p>
        <p>系统将于今晚十二点进行维护更新，预计更新时间7个小时更新完毕。系统将于今晚十二点进行维护更新，预计更新时间7个小时更新完毕。系统将于今晚十二点进行维护更新，预计更新时间7个小时更新完毕。</p>
        <p>系统将于今晚十二点进行维护更新，预计更新时间7个小时更新完毕。预计更新时间7个小时更新完毕。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'publicDetails',
  data () {
    return {
      public: {
        title: '系统升级',
        time: '2018-02-06 15:17:06'
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
    this.getHeader('公告详情', 'public_top'); // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
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
.publicDetails{
  .details{
    padding-top: 90px;
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
