<template>
  <div class="goods_car">
  </div>
</template>

<script>
export default {
  name: 'goodsCar',
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
        title: '购物车'
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
