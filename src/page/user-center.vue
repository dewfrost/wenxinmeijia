<template>
  <div class="user_center_wrap">
  </div>
</template>

<script>
export default {
  name: 'userCenter',
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
    // this.getHeader('个人中心');
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

<style scoped>
</style>
