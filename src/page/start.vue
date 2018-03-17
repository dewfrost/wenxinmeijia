<template>
  <div class="start" @click="clearTime">
    <img class="start-bg" src="../assets/images/start.png" alt="启动页">
  </div>
</template>

<script>
export default {
  name: 'start',
  data () {
    return {
      changeStartPage: ''
    };
  },
  beforeMount: function () {
    let that = this;
    eventBus.$emit('headerBox', {
      flag: true
    });
    // 定时跳转页面
    this.changeStartPage = setTimeout(function () {
      that.$router.replace('login');
    }, 2000);
  },
  methods: {
    clearTime: function () {
      // 取消定时跳转页面
      clearTimeout(this.changeStartPage);
      this.$router.replace('login');
    }
  }
};
</script>
<style lang="scss">
  .start {
    width: 100%;
    height: 100%;
    .start-bg {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 100%;
      display: block;
    }
  }
</style>