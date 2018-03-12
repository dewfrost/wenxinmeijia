<template>
  <div id="app">
    <div id="app-height" ref="appHeight"></div>
    <!-- 头部 -->
    <headerTem id="headerTem"></headerTem>
    <div id="content" @scroll="toggleHead" ref="appContent">
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
    <div id="footerOut">
      <footerBar id="footerBar"></footerBar>
    </div>
    <modal id="modal"></modal>
    <loading></loading>
    <toast></toast>
  </div>
</template>

<script>
// 头部
  import headerTem from './components/header.vue';
  import footerBar from './components/footer.vue';
  import modal from './components/modal.vue';
  import loading from './components/loading.vue';
  import toast from './components/toast.vue';

  export default {
    name: 'app',
    data () {
      return {// 数据
        widthBox: 0, // 盒子宽
        heightBox: 0, // 盒子高
        transitionName: 'slide-right',
        roter: this.$route.name,
        scrollRouteArr: [
          'index'
        ]
      };
    },
    beforeMount: function () { // 挂载之前
      this.widthBox = window.screen.width;
      this.heightBox = window.screen.height;
    },
    watch: {
      // 页面切换方式
      '$route' (to, from, savedPosition) {
        let num = Math.random() * 4;
        if (num < 1) {
          return (this.transitionName = 'slide-right');
        } else if (num < 2) {
          return (this.transitionName = 'slide-left');
        } else if (num < 3) {
          return (this.transitionName = 'slide-top');
        } else {
          return (this.transitionName = 'slide-bottom');
        }
      }
    },
    mounted: function () {
      this.showWindowSize();
      this.$nextTick(function () {
        this.showWindowSize();
      });
      window.addEventListener('keydown', (e) => {
        if (e.keyCode === 116 || (e.keyCode === 82 && e.ctrlKey)) this.reHeight();
      });
    },
    beforeUpdate: function () { // 数据更新时调用,在渲染之前
      this.showWindowSize();
    },
    updated: function () {}, // 数据更新后,渲染后调用(禁止)
    beforeDestroy: function () {}, // 实例销毁前调用,解绑中间层的数据传输
    destroyed: function () {}, // 实例销毁后调用
    methods: {
      isWechat () {
        if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {
          return true;
        } else {
          return false;
        }
      },
      reHeight: function () {
        sessionStorage.removeItem('jiuyuMediaHeight');
      },
      toggleHead: function (e) {
        if (this.scrollRouteArr.indexOf(this.roter) === -1) return false;
        eventBus.$emit('contentScroll', this.$refs.appContent.scrollTop + this.$refs.appContent.clientHeight);
      },
      showWindowSize: function () { // 更改变形
        if (sessionStorage.jiuyuMediaHeight && sessionStorage.jiuyuMediaHeight !== 0) {
          this.heightBox = parseFloat(sessionStorage.jiuyuMediaHeight);
        } else {
          this.heightBox = parseFloat(this.$refs.appHeight.clientHeight);
          sessionStorage.jiuyuMediaHeight = this.heightBox;
        }
        let slace = this.widthBox / 640;
        // body
        let BigBox = document.getElementsByTagName('body')[0];
        BigBox.style.width = this.widthBox + 'px';
        BigBox.style.height = this.heightBox + 'px';
        BigBox.style.overflow = 'hidden';
        BigBox.style.maxWidth = '640px';
        // #app
        let AppBox = document.getElementById('app');
        AppBox.style.width = this.widthBox + 'px';
        AppBox.style.height = this.heightBox + 'px';
        AppBox.style.overflow = 'hidden';
        // #content
        let ContentBox = document.getElementById('content');
        let HeaderBox = document.getElementById('headerTem');
        let footerOut = document.getElementById('footerOut');
        let modal = document.getElementById('modal');
        let ListArr = [ContentBox, HeaderBox, footerOut, modal];
        for (let i = 0; i < ListArr.length; i++) {
          ListArr[i].style['transform'] = 'scale(' + slace + ')';
          ListArr[i].style['-ms-transform'] = 'scale(' + slace + ')';
          ListArr[i].style['-moz-transform'] = 'scale(' + slace + ')';
          ListArr[i].style['-webkit-transform'] = 'scale(' + slace + ')';
          ListArr[i].style['-o-transform'] = 'scale(' + slace + ')';
        }
        ContentBox.style['overflow-x'] = 'hidden';
        ContentBox.style['overflow-y'] = 'auto';
        ContentBox.style['height'] = (parseFloat(this.heightBox) / slace) + 'px';
        modal.style['height'] = (parseFloat(this.heightBox) / slace) + 'px';
        footerOut.style['top'] = parseFloat(this.heightBox) + 'px';
      }
    },
    components: {
      headerTem,
      footerBar,
      modal,
      loading,
      toast
    }
  };
</script>

<style lang="scss">
  @import url("//at.alicdn.com/t/font_577847_lrj1ej4orvi2uik9.css");
  /* 样式重置reset */
  *, ::before, ::after {
    box-sizing: border-box
  }

  /*清除浮动*/
  .clearfix:after{
    content: '';
    display: block;
    clear: both;
  }

  body, ul, h1, h2, h3, h4, h5, h6, p, dl, div, dd, hr, fieldset {
    margin: 0;
  }

  ul, input, textarea, button, option, div, ol, fieldset, legend {
    padding: 0;
  }

  html {
    font-size: 0px;
    font-size: 24px;
    font-family: "微软雅黑, Helvetica";
  }
  
  body,
  body button {
    font-family: "微软雅黑, Helvetica";
  }

  ul {
    list-style: none;
  }

  img, button {
    border-style: none;
  }

  a, input, button {
    text-decoration: none;
    outline: none;
  }

  /* ios input样式清除 */
  input,
  textarea {
    border: 0;
    outline: none;
    -webkit-appearance: none;
  }

  /* number样式清除 */
  input[type=number] {
    -moz-appearance:textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* 上下拉动滚动条时卡顿、慢 */
  body {
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  /* ios和android下触摸元素时出现半透明灰色遮罩 */
  a {
    -webkit-tap-highlight-color:rgba(255,255,255,0);
  }
  #app-height {
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
  }
  #content,
  #headerTem,
  #modal{
    width: 640px;
    transform-origin: 0 0;
  }
  #content {
    height: 100%;
  }
  #headerTem {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    &.show{
      transition: all 1s;
      margin-top: 0;
      background-color: rgba(0,0,0,0.6);
    }
    &.hide{
      transition: all 1s;
      margin-top: -50%;
    }
  }

  #footerOut {
        width: 640px;
        transform-origin: 0 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 5;
    }
    #footerBar {
        width: 640px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 5;
    }
  .child-view {
    position: absolute;
    width:100%;
    transition: all 0.3s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0px);
    transform: translate(50px, 0px);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0px);
    transform: translate(-50px, 0px);
  }
  .slide-top-enter, .slide-top-leave-active {
    opacity: 0;
    -webkit-transform: translate(0px, 50px);
    transform: translate(0px, 50px);
  }
  .slide-bottom-leave-active, .slide-bottom-enter {
    opacity: 0;
    -webkit-transform: translate(0px, -50px);
    transform: translate(0px, -50px);
  }
</style>
