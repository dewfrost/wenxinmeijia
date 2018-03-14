<template>
  <div class="index">
    <p @click="showToast">{{toastMsg}}</p>
    <p @click="showModal">{{modalMsg}}</p>
    <p @click="loading">loading 组件{{hidePhone(15644444444)}}</p>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      toastMsg: 'toast 组件',
      modalMsg: 'modal 组件'
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
    this.getHeader('首页', null, '右边');  // 第一个参数：header名字；第二个参数：添加的class类名；第三个参数：header右边的名字
  },
  methods: {
    getFooter () {
      eventBus.$emit('footer', {
        button: [],
        navShow: true
      });
    },
    showToast: function () {
      // 引用toast组件
      this.toast('提示文字' + this.hidePhone(15614544444), 'icon-chenggong1');
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
  p{
    margin-top: 200px;
    text-align: center;
  }
</style>
