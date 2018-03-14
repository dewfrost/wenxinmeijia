<template>
  <div class="info_details_wrap">
  </div>
</template>

<script>
export default {
  name: 'infoDetails',
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
    this.getHeader('消息详情');
  },
  methods: {
  }
};
</script>

<style lang="scss">
</style>
