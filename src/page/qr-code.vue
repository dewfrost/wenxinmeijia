<template>
  <div class="qrcode" v-if="flag">
    <img :src="endShowImg" alt="" />
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
export default {
  name: 'qrCode',
  data: function () {
    return {
      flag: true,
      tempData: [], // 保存用户的信息，用来判断是否有变化
      qrcodeImg: null,
      userId: null,
      headImg: null,
      endShowImg: null, // 最后生成的图片
      baseUrl: 'https://51zhijianxiu.cn/',
      imgArr: [
        // require('../assets/images/goods3.png'),
        // require('../assets/images/qrcode_img.png'),
        require('../assets/images/qrcode_bg1.png')
      ],
      listImg: [],
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
  },
  beforeMount: function () {
    // 对接口前调用画图
    // this.NewCanvas();
    // 存储到服务器，否则因为画布污染会报错
    this.pushServer();
  },
  mounted: function () {
    this.getHeader('', 'qrcode_header');
  },
  methods: {
    pushServer: function () {
      this.getStart();
    },
    getStart: function () {
      this.axios.get('/user/get_code', {
        params: {
          url: window.location.href.split('#')[0]
        }
      })
        .then((data) => {
          if (data.data.status === 1) {
            this.loading();
            // 如果本地有缓存的图片，不用往服务器上传图
            this.inOutStorage(data);
            // 用户名字
            this.userName = data.data.data.nickname;
            // 用户id
            this.userId = data.data.data.id;
            // 用户二维码图片
            this.qrcodeImg = data.data.data.img;
            // 用户头像
            this.headImg = data.data.data.headimgurl;
            // 如果图片是同源路径
            if (/wenxin.ewtouch.com\//g.test(this.headImg)) {
              // 如果头像是同源地址的头像
              this.imgArr.push(this.headImg);
              this.getQrcode();
            } else {
              // 否则，存到本地服务器
              this.saveServerImg(this.headImg, 1, this.userId, this.baseUrl + 'static/upload1.php');
            }
            // 微信浏览器请求
            if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {
              this.wechatShare(data);
            }
            this.flag = true;
          } else {
            this.modal('提示', data.data.message, '确定', () => {
              this.$router.go(-1);
            }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
            this.loading(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    inOutStorage (data) {
      // 把用户信息填到数组里面
      this.tempData[0] = (data.data.data.nickname);
      this.tempData[1] = (data.data.data.headimgurl);
      // 如果当前获取到的用户信息和缓存里的有变动，则二维码重新加载，否则用缓存里面的图片
      if (localStorage.storageEndImg && localStorage.tempData && data.data.data.nickname === JSON.parse(localStorage.tempData)[0] && data.data.data.headimgurl === JSON.parse(localStorage.tempData)[1]) {
        this.loading(false);
        this.flag = true;
        this.endShowImg = JSON.parse(localStorage.storageEndImg);
        return false;
      } else {
        localStorage.removeItem('qrcodeImg');
        localStorage.removeItem('tempData');
      }
    },
    getQrcode: function () {
      this.saveServerImg(this.qrcodeImg, 2, this.userId, this.baseUrl + 'static/upload2.php');
    },
    saveServerImg: function (img, index, id, url) {
      this.axios.post(url, {filecode: img, userId: id})
        .then((data) => {
          let imgData = data.data;
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
          this.loading(false);
          this.modal('提示', '生成出错了，请刷新重试', '确定', () => {
            this.$router.go(-1);
          }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
        });
    },
    // 初始创建绘画页面
    NewCanvas: function () {
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
      this.loading(false);
    },
    wechatShare (data) {
      // wx是微信sdk的方法，需要下载包----weixin-js-sdk
      let _data = data.data.data.config;
      // let _code = data.data.data.id;
      let _link = data.data.data.link;
      wx.config({
        debug: false,
        appId: _data.appId,
        timestamp: _data.timestamp,
        nonceStr: _data.nonceStr,
        signature: _data.signature,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
      });
      wx.ready(function () {
        wx.onMenuShareAppMessage({
          title: '指尖秀科技', // 分享标题
          desc: '秀在指尖', // 分享描述
          link: _link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://51zhijianxiu.cn/static/qrcodeimg/logo.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // alert('分享成功');
          },
          cancel: function () {
            // alert('分享已取消');
          }
        });
        wx.onMenuShareTimeline({
          title: '指尖秀科技', // 分享标题
          link: _link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://51zhijianxiu.cn/static/qrcodeimg/logo.png', // 分享图标
          success: function () {
            // alert('分享成功');
          },
          cancel: function () {
            // alert('分享已取消');
          }
        });
      });
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