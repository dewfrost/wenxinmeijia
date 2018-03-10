<template>
  <div class="index">
    <p @click="showToast">{{toastMsg}}</p>
    <p @click="showModal">{{modalMsg}}</p>
    <p @click="showLoading">loading 组件</p>
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
    this.getHeader();
  },
  methods: {
    getHeader () {
      eventBus.$emit('header', {
        title: '首页'
      });
    },
    getFooter () {
      eventBus.$emit('footer', {
        button: [],
        navShow: true
      });
    },
    showToast: function () {
      // 引用toast组件
      eventBus.$emit('toast', {
        icon: 'icon-chenggong',
        message: 'toast提示文字'
      });
    },
    showModal: function () {
      // 引用弹窗组件
      eventBus.$emit('modal', {
        title: '这是弹窗标题',
        content: '这是弹窗正文',
        callback: function () {
          console.log('调用弹窗成功');
        }
      });
    },
    showLoading: function () {
      // 引用弹窗组件
      eventBus.$emit('loading', true);
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
