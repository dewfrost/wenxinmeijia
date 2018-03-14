<template>
  <div class="modal_wrap" :class="modalClass" v-show="modal">
    <div class="default" v-if="!show" :style="{ width: modalWidth + '%' }">
      <i class="iconfont icon-close" @click="close"></i>
      <span class="title">{{title}}</span>
      <div class="modal_content">
        <div class="text" v-html="content"></div>
      </div>
      <button class="btnClass" @click="buttonBox(callback)">{{ btnTitle }}</button>
    </div>
    <div class="address" v-if="show === 'address'">地址</div>
    <div class="pay_password" v-if="show === 'payPassword'">支付密码</div>
    <div class="images" v-if="show === 'images'">图片</div>
  </div>
</template>

<script>
// 引入文件

export default {
  name: 'modal',
  data () {
    return {
      modal: false, // 是否显示模态框
      show: 'default', // 显示类型，支付密码、选择地址或者图片。默认选择框
      modalWidth: 87.5, // 模态框宽度，百分比，默认70%
      modalClass: '', // 自定义类名
      title: '',
      content: '', // 模态框文字内容
      btnClass: '', // 自定义类名
      btnTitle: '', // 按钮内容
      callback: '' // 事件
    };
  },
  beforeMount: function () {
    // 监听事件
    this.getEvent();
  },
  beforeDestroy: function () {
    // 取消监听
    eventBus.$off('modal');
  },
  methods: {
    getEvent () {
      eventBus.$on('modal', (data) => {
        this.modal = true;
        this.modalClass = data.modalClass;
        this.width = data.width;
        this.show = data.show;
        this.content = data.content;
        this.btnClass = data.btnClass;
        this.title = data.title;
        this.btnTitle = data.btnTitle;
        this.callback = data.callback;
      });
    },
    close: function () {
      this.modal = false;
    },
    buttonBox: function () {
      this.callback();
      this.modal = false;
    }
  }
};
</script>

<style lang="scss">
  @import '../assets/css/base.scss';
  .modal_wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    transform: 0.3s;
    z-index: 100;
    .default{
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 32px 46px;
      border-radius: 6px;
      font-size: 24px;
      text-align: center;
      color: #333;
      i.iconfont{
        position: absolute;
        right: 14px;
        top: 14px;
        font-size: 28px;
        padding: 6px;
      }
      .title{
        font-size: 26px;
        display: block;
        padding-bottom: 28px;
        @include border;
      }
      .modal_content{
        padding: 36px 0 44px;
        text-align: left;
        .text{
          line-height: 40px;
          font-size: 24px;
        }
      }
      .btnClass{
        width: 100%;
        border-radius: 4px;
        background-color: #FFE5E6;
        color: $color;
        height: 68px;
        line-height: 68px;
        font-size: 24px;
      }
    }
  }
</style>
