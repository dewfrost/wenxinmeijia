<template>
  <div class="info_wrap">
  </div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {
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
    // this.getHeader('消息', 'info_header');
  },
  methods: {
    getFooter () {
      eventBus.$emit('footer', {
        button: [],
        navShow: true
      });
    }
  }
};
</script>

<style lang="scss">
  .info_header.header_top{
    span.iconfont{
      display: none;
    }
  }
</style>
