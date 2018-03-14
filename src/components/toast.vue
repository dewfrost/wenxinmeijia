<template>
  <div class="toast">
    <div class="toast_wrap" :class="{'show_toast': show, 'toast_none': !show}">
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
      bottom: 50%;
      transform: translate(-50%, -50%);
      transition: all .4s;
      border-radius: 10px;
      background: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 1002;
      box-sizing: border-box;
      text-align: center;
      &.toast_none{
        opacity: 0;
        z-index: -1;
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
        font-size: 28px;
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
