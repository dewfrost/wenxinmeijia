<template>
  <div class="index">
    <p @click="showToast">{{toastMsg}}</p>
    <p @click="showModal">{{modalMsg}}</p>
    <p @click="showLoading">loading</p>
  </div>
    
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      toastMsg: 'toast',
      modalMsg: 'modal'
    };
  },
  beforeCreate: function () { // 创建之前
  },
  created: function () { // 创建之后
  },
  beforeMount: function () { // 挂载之前
    eventBus.$emit('header', {
      title: '标题'
    });
  },
  mounted: function () { // 挂载之后
    eventBus.$emit('footer', {
      button: [],
      navShow: true
    });
  },
  methods: {
    showToast: function () {
      eventBus.$emit('toast', {
        time: 3000,
        icon: 'icon-chenggong',
        message: 'toast提示'
      });
    },
    showModal: function () {
      eventBus.$emit('modal', {
        modal: true,
        content: '标收费高科技的生物化工路收费价格被罚款矛盾开始讲故事的激动啥题',
        btnTitle: '现在上传',
        type: 'download',
        callback: function () {
          eventBus.$emit('toast', {
            show: true,
            icon: 'icon-chenggong',
            toastMsg: '成功'
          });
        }
      });
    },
    showLoading: function () {
      eventBus.$emit('loading', {
        loadShow: true,
        timeOut: 1000
      });
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
