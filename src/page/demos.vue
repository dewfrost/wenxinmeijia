<template>
  <div class="index">
    <p @click="showToast">{{toastMsg}}</p>
    <p @click="pw">支付按钮</p>
    <p @click="showModal">{{modalMsg}}</p>
    <p @click="loading">loading 组件{{hidePhone(15644444444)}}</p>
    <p>倒计时：{{countdownTime (startTime, endTime)}}</p>
    <p class="move" :class="{'start': move, 'end': !move}">{{startTime}}</p>
  </div>
</template>

<script>
export default {
  name: 'demos',
  data () {
    return {
      toastMsg: 'toast 组件',
      modalMsg: 'modal 组件',
      startTime: 1519923600,
      endTime: 1522602000,
      leftTime: '',
      timeout0: '',
      move: true
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
    this.toggleMove();
    this.getHeader('首页', null, '右边', null, '返回');  // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    pw () {
      let that = this;
      this.goPay(function () {
        that.toast('支付成功');
      });
    },
    toggleMove () {
      if (this.move) {
        this.move = false;
      } else {
        this.move = true;
      }
    },
    countdownTime (startTime, endTime) {
      if (!startTime) {
        return ' 0 ';
      }
      // const startTime = new Date(startTime).getTime() / 1000 + (24 * 60 * 60 * parseInt(day));
      const nowTime = new Date().getTime() / 1000;
      this.leftTime = parseInt(endTime - nowTime);
      let that = this;
      that.timeout0 = setInterval(function () {
        if (that.leftTime > 0) {
          that.leftTime--;
          clearInterval(that.timeout0);
        } else {
          clearInterval(that.timeout0);
        }
      }, 1000);
      let d = Math.floor(that.leftTime / (60 * 60 * 24));
      let h = parseInt(that.leftTime / (60 * 60)) % 24;
      let m = parseInt(that.leftTime / 60 % 60);
      let s = parseInt(that.leftTime % 60);
      if (d) {
        return `${d}天${h}小时${m}分${s}秒`;
      } else {
        return `${h}小时${m}分${s}秒`;
      }
    },
    // 调用提交订单底部
    getFooter () {
      let that = this;
      this.getSubmitFooter('125', function () {
        that.toast('you');
      });
    },
    showToast: function () {
      // 引用toast组件
      this.toast('提示文字' + this.hidePhone(15614544444));
    },
    showModal: function () {
      let that = this; // 如果回调函数中用到this，则这行代码必须有
      // 引用弹窗组件
      this.modal('这是弹窗标题', '这是弹窗服饰股份的供热一个头特化工股份合格的合格合格分数高富帅正文', '这是按钮', function () {
        console.log('调用弹窗成功');
        console.log(that.modalMsg);
      }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
    }
  }
};
</script>

<style scoped>
.index{
  padding-bottom: 150px;
}
  p{
    margin-top: 150px;
    text-align: center;
  }
</style>