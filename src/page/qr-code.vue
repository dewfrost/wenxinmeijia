<template>
  <div class="qrcode" v-if="flag">
    <img :src="endShowImg" alt="" />
  </div>
</template>
<script>
// import wx from 'weixin-js-sdk';
export default {
  name: 'qrCode',
  data: function () {
    return {
      flag: true,
      tempData: [], // 保存用户的信息，用来判断是否有变化
      qrcodeImg: null,
      userId: null,
      endShowImg: null, // 最后生成的图片
      baseUrl: 'http://www.jiliya.net.cn/',
      imgArr: [
        require('../assets/images/goods3.png'),
        require('../assets/images/qrcode_img.png'),
        require('../assets/images/qrcode_bg1.png')
      ],
      listImg: [
        // 'http://www.cwfpp.cn/static/headimg/201801041718411840000003623391614.jpg'
      ],
      userName: '带你去美甲',
      size: [
        { // 二维码
          x: 0.34 * window.screen.width,
          y: 0.775 * window.screen.height,
          width: 0.3125 * window.screen.width,
          height: 0.182 * window.screen.height
        },
        { // 头像
          x: 0.125 * window.screen.width,
          y: 0.012 * window.screen.height,
          width: 0.178 * window.screen.width,
          height: 0.178 * window.screen.width
        },
        { // 背景
          x: 0,
          y: 0,
          width: window.screen.width,
          height: window.screen.height
        },
        { // 文字
          x: 0.214 * window.screen.width,
          y: 0.141 * window.screen.height,
          font: window.screen.height / 48
        }
      ]
    };
  },
  created: function () {
    this.loading();
    // 存储到服务器，否则因为画布污染会报错
    // this.pushServer();
    // 微信浏览器请求
    // if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {
    //   this.wechatShare();
    // }
  },
  beforeMount: function () {
    this.getHeader('', 'qrcode_header');
    // 对接口前调用画图
    this.NewCanvas();
  },
  mounted: function () {
  },
  methods: {
    loading: function () {
      eventBus.$emit('loading', true);
    },
    pushServer: function () {
      this.getStart();
    },
    getStart: function () {
      this.axios.post('/users/QRCode')
        .then((data) => {
          if (data.data.status === 200) {
            // 把用户信息填到数组里面
            this.tempData[0] = (data.data.data.username);
            this.tempData[1] = (data.data.data.headimg);
            // 如果当前获取到的用户信息和缓存里的有变动，则二维码重新加载，否则用缓存里面的图片
            if (localStorage.storageEndImg && localStorage.tempData && data.data.data.username === JSON.parse(localStorage.tempData)[0] && data.data.data.headimg === JSON.parse(localStorage.tempData)[1]) {
              eventBus.$emit('loading', false);
              this.flag = true;
              this.endShowImg = JSON.parse(localStorage.storageEndImg);
              return false;
            } else {
              localStorage.removeItem('qrcodeImg');
              localStorage.removeItem('tempData');
            }
            this.userName = data.data.data.username;
            this.userId = data.data.data.number;
            this.qrcodeImg = data.data.data.path;
            if (data.data.data.headimg === 'http://www.jiliya.net.cn/static/headimg/default.png') {
              this.imgArr.push('./static/headimg/default.png');
              this.getQrcode();
            } else if (/www.jiliya.net.cn\//g.test(data.data.data.headimg)) {
              // data.data.data.headimg = data.data.data.headimg.replace(/http:\/\/www\.jiliya\.net\.cn/, '');
              this.imgArr.push(data.data.data.headimg);
              this.getQrcode();
              // this.saveServerImg(data.data.data.headimg, 1, data.data.data.number, this.baseUrl + 'static/upload1.php');
            } else {
              this.saveServerImg(data.data.data.headimg, 1, data.data.data.number, this.baseUrl + 'static/upload1.php');
            }
            this.flag = true;
          } else {
            eventBus.$emit('loading', false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getQrcode: function () {
      this.saveServerImg(this.qrcodeImg, 2, this.userId, this.baseUrl + 'static/upload2.php');
    },
    saveServerImg: function (img, index, id, url) {
      this.axios.post(url, {filecode: img, userId: id})
        .then((msg) => {
          let imgData = msg.data;
          if (/headimg/g.test(imgData.data)) {
            // 此处要赋值
            imgData.data = imgData.data.replace(/headimg/g, 'static/headimg');
          } else if (/qrcodeimg/g.test(imgData.data)) {
            imgData.data = imgData.data.replace(/qrcodeimg/g, 'static/qrcodeimg');
          }
          this.imgArr.push(imgData.data);
          if (index === 2) {
            // this.createCanvas();
            // 添加二维码上的头像
            this.imgArr.push(this.imgArr[1]);
            this.NewCanvas();
          } else {
            this.getQrcode();
          }
        })
        .catch(() => {
          eventBus.$emit('loading', false);
          this.modal('生成出错了，请刷新重试');
        });
    },
    // 初始创建绘画页面
    NewCanvas: function () {
      // console.log(this.imgArr);
      this.canvas = document.createElement('canvas');
      let num = 3;
      this.canvas.width = num * window.screen.width;
      this.canvas.height = num * window.screen.height;
      if (this.canvas.getContext) {
        let length = this.imgArr.length - 1;
        this.doCanvas(this.canvas.getContext('2d'),
          this.size[length].width,
          this.size[length].height,
          this.size[length].x,
          this.size[length].y,
          this.imgArr.pop(),
          // console.log(this.imgArr);
          num);
      }
    },
    // 开始绘画
    doCanvas: function (ctx, width, height, x, y, src, num) {
      // 背景图
      let img = new Image();
      ctx.font = '32px 微软雅黑 bolder';
      img.onload = () => {
        ctx.drawImage(img, x * num, y * num, width * num, height * num);
        let length = this.imgArr.length - 1;
        if (length >= 0) {
          this.doCanvas(ctx,
            this.size[length].width,
            this.size[length].height,
            this.size[length].x,
            this.size[length].y,
            this.imgArr.shift(),
            num);
        } else {
          this.textCanvas(ctx, num);
        }
      };
      // img.crossOrigin = '*';
      img.src = src;
    },
    // 绘制文字
    textCanvas: function (ctx, num) {
      ctx.font = this.size[3].font * num + 'px 微软雅黑 bolder';
      // 二维码名字颜色
      ctx.fillStyle = '#333';
      let left = ctx.measureText(this.userName.substring(0, 16)).width / 2;
      ctx.fillText(this.userName.substring(0, 16), this.size[3].x * num - left, this.size[3].y * num);
      this.showCanvas();
    },
    // 生成图片
    showCanvas: function () {
      this.endShowImg = this.canvas.toDataURL('image/png');
      // 把二维码图片缓存到本地存储
      localStorage.storageEndImg = JSON.stringify(this.endShowImg);
      // 把名字、头像、二维码缓存到本地存储
      localStorage.tempData = JSON.stringify(this.tempData);
      eventBus.$emit('loading', false);
    },
    wechatShare () {
      // wx是微信sdk的方法，需要下载包----weixin-js-sdk
      // this.axios.post('/users/QRCode', {
      //   url: window.location.href.split('#')[0]
      // })
      //   .then((data) => {
      //     if (data.data.status === 200) {
      //       // console.log(data.data.data.jsapi_config);
      //       let _data = data.data.data.jsapi_config;
      //       let _code = data.data.data.number;
      //       wx.config({
      //         debug: false,
      //         appId: _data.appId,
      //         timestamp: _data.timestamp,
      //         nonceStr: _data.nonceStr,
      //         signature: _data.signature,
      //         jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareWeibo']
      //       });
      //       wx.ready(function () {
      //         wx.onMenuShareAppMessage({
      //           title: '季利亚', // 分享标题
      //           desc: '全球精选————轻奢购物网站', // 分享描述
      //           link: 'http://api.jiliya.net.cn/home/wechat/BrowserType?number=' + _code, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //           imgUrl: 'http://www.jiliya.net.cn/static/qrcodeimg/logo.png', // 分享图标
      //           type: '', // 分享类型,music、video或link，不填默认为link
      //           dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      //           success: function () {
      //             // alert('分享成功');
      //             eventBus.$emit('toast', {message: '分享成功'});
      //           },
      //           cancel: function () {
      //             // alert('分享已取消');
      //             eventBus.$emit('toast', {message: '分享已取消'});
      //           }
      //         });
      //         wx.onMenuShareTimeline({
      //           title: '季利亚', // 分享标题
      //           link: 'http://api.jiliya.net.cn/home/wechat/BrowserType?number=' + _code, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //           imgUrl: 'http://www.jiliya.net.cn/static/qrcodeimg/logo.png', // 分享图标
      //           success: function () {
      //             // alert('分享成功');
      //             eventBus.$emit('toast', {message: '分享成功'});
      //           },
      //           cancel: function () {
      //             // alert('分享已取消');
      //             eventBus.$emit('toast', {message: '分享已取消'});
      //           }
      //         });
      //       });
      //     } else {
      //       eventBus.$emit('toast', {message: data.message});
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    }
  }
};
</script>

<style lang='scss'>
.qrcode_header.header_top{
  background-color: transparent;
  border: none;
  color: #333;
  .back.iconfont{
    position: absolute;
    top: 36%;
    left: 0;
  }
}
.qrcode {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  img, canvas {
    width: 100%;
    height: auto;
    display: block;
  }
}
</style>-->