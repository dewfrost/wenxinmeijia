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
    this.getHeader();
  },
  methods: {
    getHeader () {
      eventBus.$emit('header', {
        title: '消息'
      });
    },
    getFooter () {
      eventBus.$emit('footer', {
        button: [],
        navShow: true
      });
    }
  }
};
</script>

<style scoped>
</style>
