<template>
  <div class="toast">
    <div class="toast-wrap" :class="{'show-toast': show, 'toast-none': !show}">
      <div class="icon" :class="{'show-icon': icon, 'icon-none': !icon}">
        <i class="iconfont" :class="icon"></i>
      </div>
      <div class="text">{{toastMsg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  data () {
    return {
      toastMsg: '',
      show: false,
      time: null,
      icon: null
    };
  },
  beforeMount: function () {
    let toast = this;
    eventBus.$on('toast', function (data) {
      toast.show = true;
      toast.toastMsg = data.message;
      toast.icon = data.icon;
      toast.time = data.time;
      if (toast.show) {
        setTimeout(() => {
          toast.show = false;
          console.log(toast.time);
        }, toast.time || 2000);
      }
    });
  },
  beforeDestroy: function () {
    this.show = false;
  }
};
</script>

<style lang="scss" scoped>
.toast {
  z-index: 100;
  .toast-wrap {
    position: fixed;
    line-height: 120px;
    padding: 0 30px;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%);
    transition: all .4s;
    border-radius: 15px;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1002;
    box-sizing: border-box;
    text-align: center;
    &.toast-none{
      opacity: 0;
      z-index: -1;
    }
    .icon.show-icon{
      min-width: 150px;
      z-index: 3;
    }
    .icon.icon-none{
      opacity: 0;
      z-index: -1;
    }
    .iconfont{
      font-size: 34px;
      color: #fff;
      line-height: 1.4;
    }
    .text {
      font-size: 14px;
      color: #fff;
      max-width: 80vw;
    }
  }
}
</style>
