<template>
  <div class="modal_wrap" :class="modalClass" v-show="modal">
    <div class="default" v-if="!show" :style="{ width: modalWidth + '%' }">
      <i class="iconfont icon-icon--" @click="close"></i>
      <div class="bg_img" :class="type"></div>
      <div class="bottom">
        <div class="modal_content">
          <div class="text" v-html="content"></div>
        </div>
        <button :class="btnClass" @click="buttonBox(callback)">{{ btnTitle }}</button>
      </div>
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
      modalWidth: 70, // 模态框宽度，百分比，默认70%
      type: 'download', // 模态框中间图标显示类型，共有error/download/bonus三种。默认error
      modalClass: '', // 自定义类名
      content: '', // 模态框文字内容
      btnClass: '', // 自定义类名
      btnTitle: '', // 按钮内容
      callback: '' // 事件
    };
  },
  beforeMount: function () {
    // 监听事件
    this.changeShow();
  },
  beforeDestroy: function () {
    // 取消监听
    eventBus.$off('modal');
  },
  methods: {
    changeShow: function () {
      eventBus.$on('modal', (data) => {
        console.log(data);
        this.modal = true;
        this.modalClass = data.modalClass;
        this.width = data.width;
        this.show = data.show;
        this.type = data.type;
        this.content = data.content;
        this.btnClass = data.btnClass;
        this.btnTitle = data.btnTitle;
        this.callback = data.callback;
      });
    },
    close: function () {
      this.modal = false;
    },
    buttonBox: function () {
      return this.callback();
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
    background: rgba(0, 0, 0, 0.6);
    transform: 0.3s;
    z-index: 100;
    .default{
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      &::before{
        position: absolute;
        content: '';
        display: block;
        width: 1px;
        background-color: #C9C9C9;
        height: 160px;
        height: 30vh;
        left: 50%;
        top: -140px;
        z-index: -1;
      }
      .icon-icon--{
        font-size: 38px;
        color: #fff;
        position: absolute;
        top: -180px;
        padding: 8px;
      }
      .bg_img{
        width: 100%;
        height: 212px;
        background: url('../assets/images/modal_bg.png') no-repeat top center;
        border-radius: 20px 20px 0 0;
        background-size: cover;
        position: relative;
        &::before{
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 144px;
          height: 144px;
          margin-top: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.15);
        }
        &::after{
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 88px;
          height: 88px;
          margin-top: 8px;
          border-radius: 50%;
          background: url('../assets/images/error.png') no-repeat #fff center center;
        }
        &.download::after{
          background: url('../assets/images/download.png') no-repeat #fff center center;
        }
        &.bonus::after{
          background: url('../assets/images/bonus.png') no-repeat #fff center center;
        }
      }
      .bottom{
        width: 100%;
        background-color: #fff;
        border-radius: 0 0 20px 20px;
        text-align: center;
        padding: 60px 54px 50px;
        .modal_content{
          .text{
            font-size: 24px;
            line-height: 42px;
            color: #666;
          }
        }
        button{
          margin-top: 50px;
          height: 72px;
          color: #fff;
          font-size: 26px;
          line-height: 72px;
          width: 260px;
          border-radius: 36px;
          background-color: #FF5C44;
          position: relative;
          &::before{
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            content: '';
            display: block;
            width: 80%;
            margin: 0 auto;
            height: 40px;
            box-shadow: 0 6px 40px #FF5C44;
          }
        }
      }
    }
  }
</style>
