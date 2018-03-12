<template>
  <div class="footer" v-show="show">
    <div v-if="other" v-html="other.inner" :class="other.class"></div>
    <div class="footer_but">
      <div v-for="(item,index) in button" :key="index" v-html="item.inner" :class="item.class" @click="item.callback"></div>
    </div>
    <div v-if="nav.length"></div>
  </div>
</template>

<script>
export default {
  name: 'footerBox',
  data () {
    return {// 数据
      show: false,
      other: {
        inner: '',
        class: ''
      },
      button: [
        {
          inner: '123',
          class: '',
          callback: () => {}
        }
      ],
      nav: []
    };
  },
  beforeMount: function () {
    this.getEvent();
  },
  methods: { // 大杂烩,开心就好
    // 监听事件函数
    getEvent () {
      eventBus.$on('footer', (data) => {
        if (!data) {
          this.show = false;
        } else {
          if (data.other) this.other = data.other;
          if (data.nav) this.nav = data.nav;
          data.button = this.button;
        }
      });
    }
  }
};
</script>
<style lang="scss">
  @import '../assets/css/base.scss';
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    .footer_but {
      display: flex;
      div {
        flex-grow: 1;
        text-align: center;
        line-height: 80px;
      }
    }
  }
</style>

