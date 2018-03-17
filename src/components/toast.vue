<template>
  <div class="toast">
    <div class="toast_wrap" :class="{'show_toast': show, 'toast_none': !show, 'hasIcon': icon}">
      <div class="icon" :class="{'show_icon': icon, 'icon_none': !icon}">
        <i class="iconfont" :class="icon"></i>
      </div>
      <div class="text">{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  data () {
    return {
      message: '',
      show: false,
      time: null,
      icon: null,
      timeout: null
    };
  },
  beforeMount: function () {
    this.getEvent();
  },
  beforeDestroy: function () {
    this.show = false;
  },
  methods: {
    getEvent () {
      let toast = this;
      eventBus.$on('toast', function (data) {
        // 如果toast还没消失
        if (toast.show) {
          return false;
        }
        if (!data) {
          toast.show = false;
        } else {
          toast.show = true;
        }
        toast.message = data.message;
        toast.icon = data.icon;
        if (toast.show) {
          toast.timeout = setTimeout(() => {
            toast.show = false;
            clearTimeout(toast.timeout);
          }, 2000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/css/base.scss';
  .toast {
    z-index: 100;
    .toast_wrap {
      width: 50%;
      position: fixed;
      line-height: 120px;
      padding: 0 14px;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      transition: opacity .4s;
      border-radius: 8px;
      background: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 1002;
      text-align: center;
      &.hasIcon{
        // width: 60%;
        border-radius: 6px;
      }
      &.toast_none{
        opacity: 0;
        left: 999px;
        top: 999px;
      }
      .icon.show_icon{
        min-width: 150px;
        z-index: 3;
      }
      .icon.icon_none{
        opacity: 0;
        z-index: -1;
      }
      .iconfont{
        font-size: 42px;
        color: #fff;
        line-height: 1.4;
        margin-top: 10px;
      }
      .text {
        font-size: 14px;
        line-height: 2.6;
        color: #fff;
      }
    }
  }
</style>
