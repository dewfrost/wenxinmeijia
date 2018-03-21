<template>
  <div class="editInformation">
    <div class="head">
      <label for="submitImg" class="img_label">
        <img class="show_img" :src="user.headimgurl" alt="头像">
        <span class="camera">
          <img class="camera_img" src="../assets/images/camera.png" alt="相机">
        </span>
        <input id="submitImg" class="img_input" type="file" accept="image/*" @change="selectImg">
      </label>
    </div>
    <div class="show_option">
      <label for="name">用户昵称</label>
      <input id="name" type="text" v-model="user.nickname" placeholder="请输入昵称">
    </div>
    <div class="show_option">
      <label for="phone">手机号</label>
      <input id="phone" type="text" disabled="disabled" v-model="showPhone">
    </div>
    <p class="prompt">以下内容填写过后将不能修改</p>
    <div class="show_option select_sex">
      <label for="sex">性别</label>
      <input id="sex" type="text" placeholder="请填写您的性别" :disabled="sexDisabled" v-model="user.sex" @click="select">
    </div>
    <div class="show_option">
      <label for="age">年龄</label>
      <input id="age" type="text" placeholder="请填写您的年龄" :disabled="ageDisabled" v-model="user.age">
    </div>
    <button class="link" @click="submit">确认</button>
  </div>
</template>

<script>
export default {
  name: 'editInformation',
  data () {
    return {
      user: {
        headimgurl: require('../assets/images/header.png'),
        nickname: '宓月',
        phone: null,
        sex: '',
        age: ''
      },
      sexDisabled: false,
      ageDisabled: false,
      isSameInfo: null
    };
  },
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    this.getInfo();
    this.getHeader('', 'editInformation_top');
    this.isSameInfo = JSON.parse(JSON.stringify(this.user));
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
    getInfo () {
      this.axios.get('/user/info', {
      })
        .then(({data}) => {
          console.log(data);
          if (data.status === 1) {
            this.user = data.data;
            // 如果获取到性别，则不能修改
            if (data.data.sex) {
              this.sexDisabled = true;
            }
            // 如果获取到年龄，则不能修改
            if (data.data.age) {
              this.ageDisabled = true;
            }
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 图片选择
    selectImg: function (e) {
      this.file = e.target.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', () => {
        this.user.headImg = reader.result;
      }, false);
      if (this.file) {
        reader.readAsDataURL(this.file);
        // this.getImgUrl();
      }
    },
    select: function () {
    },
    submit: function () {
      if ((this.isSameInfo.headImg === this.user.headImg) && (this.isSameInfo.name === this.user.name)) {
        this.toast('资料没有改动');
      } else if (!this.user.name) {
        this.toast('请填写用户昵称');
      } else {
        this.toast('资料修改成功');
        this.$router.go(-1);
      }
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
    .img_label{
      width: 147px;
      height: 143px;
      border-radius: 50%;
      margin: 0 auto;
      display: block;
      border-radius: 50%;
      -webkit-box-shadow: 0 0 5px #ada6a6;
      box-shadow: 0 0 5px #ada6a6;
      position: relative;
      .show_img{
        width: 143px;
        height: 143px;
        border-radius: 50%;
        border: 5px solid #fff;
        margin: 0 auto;
        display: block;
      }
      .camera{
        width: 36px;
        height: 36px;
        position: absolute;
        left: 70%;
        top: 76%;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 0 5px #ada6a6;
        -webkit-box-shadow: 0 0 5px #ada6a6;
        .camera_img{
          width: 27px;
          height: 22px;
          margin: 6px auto 6px;
          display: block;
          display: block;
        }
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
    label{
      flex: 1;
      display: inline-block;
    }
    input{
      background: transparent;
      font-size: 24px;
      text-align: right;
      width: 300px;
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
