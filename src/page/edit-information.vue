<template>
  <div class="editInformation">
    <div class="head">
      <img :src="user.headImg" alt="头像" class="show_img">
      <label for="submitImg" class="img_label">
        <img class="camera" src="../assets/images/camera.png" alt="相机">
        <input id="submitImg" class="img_input" type="file" accept="image/*" @change="selectImg">
      </label>
    </div>
    <div class="show_option">
      <label for="name">用户昵称</label>
      <input id="name" type="text" v-model="user.name" placeholder="请输入昵称">
    </div>
    <div class="show_option">
      <label for="phone">手机号</label>
      <input id="phone" type="text" disabled="disabled" v-model="showPhone">
    </div>
    <p class="prompt">以下内容填写过后将不能修改</p>
    <div class="show_option select_sex">
      <label for="sex">性别</label>
      <input id="sex" type="text" placeholder="请填写您的性别" v-model="user.sex" @click="select">
     
    </div>
    <div class="show_option">
      <label for="age">年龄</label>
      <input id="age" type="text" placeholder="请填写您的年龄" v-model="user.age">
    </div>
    <button class="link" @click="link">确认</button>
  </div>
</template>

<script>
export default {
  name: 'editInformation',
  data () {
    return {
      user: {
        headImg: require('../assets/images/header.png'),
        name: '宓月',
        phone: 13700000000,
        sex: '',
        age: ''
      }
    };
  },
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    this.getHeader('', 'editInformation_top');
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  }, // 实例销毁前调用,解绑中间层的数据传输
  destroyed: function () {}, // 实例销毁后调用
  computed: {
    showPhone: function () {
      return this.hidePhone(this.user.phone);
    }
  },
  methods: {
    // 图片选择
    selectImg: function (e) {
      this.file = e.target.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', () => {
        this.user.headimgurl = reader.result;
      }, false);
      if (this.file) {
        reader.readAsDataURL(this.file);
        // this.getImgUrl();
      }
    },
    select: function () {

    },
    link: function () {
      let that = this; // 如果回调函数中用到this，则这行代码必须有
      this.modal('提示', '您已升级到经理L1级别，需要立即完善资料。', '确定', function (index) {
        that.$router.push('userCenter');
      }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.editInformation_top{
  border: none;
  background: transparent;
}
.editInformation{
  min-height:100%;
  background: url('../assets/images/edit_bgd.png') no-repeat #f5f5f5 right top;
  .head{
    margin: 70px auto 50px;
    position: relative;
    .show_img{
      width: 143px;
      height: 143px;
      border-radius: 50%;
      border: 5px solid #fff;
      margin: 0 auto;
      display: block;
    }
    .img_label{
      width: 37px;
      height: 37px;
      border-radius: 50%;
      box-shadow: 0 0 5px #ada6a6;
      position: absolute;
      background: #fff;
      bottom: -6px;
      right: 40%;
      .camera{
        width: 26px;
        height: 22px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -11px 0 0 -12.1px;
      }
      .img_input{
        position: absolute;
        left: -2000px;
        top: -100px;
      }
    }
  }
  .show_option{
    padding: 0 30px;
    line-height: 85px;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    
    input{
      background: transparent;
      font-size: 24px;
      text-align: right;
      min-width: 150px;
    }
  }
  .prompt{
    line-height: 60px;
    font-size: 20px;
    color: #999999;
    padding: 0 30px;
  }
  .link{
    width: 500px;
    height: 68px;
    border-radius: 4px;
    line-height: 68px;
    background: $color;
    color: #fff;
    font-size: 24px;
    display: block;
    margin: 121px auto 0;
  }
}
</style>
