<template>
  <div class="user_center_wrap">
    <p @click="pw">45645646</p>
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
    let that = this;
    eventBus.$emit('modal', {
      title: '￥10.00',
      show: 'voucher',
      btnTitle: '立即领取',
      callback: function () {
        that.toast('领取成功');
      }
    });
    // this.getHeader('个人中心');
  },
  methods: {
    pw () {
      let that = this;
      eventBus.$emit('modal', {
        show: 'setPassword',
        btnTitle: '立即领取',
        callback: function () {
          that.toast('领取成功');
        }
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
