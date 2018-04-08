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
    <div class="sex" @click="doSelect('sex')">
      <span class="name">性别</span>
      <span class="details">
        <span class="placeholder" :class="{'selected': user.sex}">{{user.sex || '请选择性别'}}</span>
        <i class="iconfont" :class="{'icon-shang': showSexSelect, 'icon-jiantou': !showSexSelect}" v-if="!sexDisabled"></i>
      </span>
      <div class="sex_select" v-show="showSexSelect">
        <div class="select_line" v-for="(item,index) in sexArr" @click="selectSex(index, sexArr)" :key="index">
          <span>{{item}}</span>
          <i class="iconfont icon-30xuanzhongyuanxing"></i>
        </div>
      </div>
    </div>
    <div class="sex" @click="doSelect('age')">
      <span class="name">年龄</span>
      <span class="details">
        <span class="placeholder" :class="{'selected': user.age}">{{user.age || '请选择年龄'}}</span>
        <i class="iconfont" :class="{'icon-shang': showAgeSelect, 'icon-jiantou': !showAgeSelect}" v-if="!ageDisabled"></i>
      </span>
      <div class="sex_select" v-show="showAgeSelect">
        <div class="select_line" v-for="(item,index) in ageArr" @click="selectAge(index, ageArr)" :key="index">
          <span>{{item}}</span>
          <i class="iconfont icon-30xuanzhongyuanxing"></i>
        </div>
      </div>
    </div>
    <button class="link" @click="submit">确认</button>
  </div>
</template>

<script>
export default {
  name: 'editInformation',
  data () {
    return {
      sexArr: ['男', '女'],
      user: {
        headimgurl: null,
        nickname: '',
        phone: null,
        sex: '',
        age: ''
      },
      showPhone: '',
      sexDisabled: false,
      ageDisabled: false,
      isSameInfo: null,
      file: '',
      showSexSelect: false,
      showAgeSelect: false,
      ageArr: []
    };
  },
  beforeMount: function () {
    this.getAgeArr();
  },
  mounted: function () {
    this.getInfo();
    this.getHeader('', 'editInformation_top');
  },
  methods: {
    // 年龄选择点击事件
    selectSex (index, obj) {
      this.user.sex = obj[parseInt(index)];
    },
    // 性别选择点击事件
    selectAge (index, obj) {
      this.user.age = obj[parseInt(index)];
    },
    getAgeArr () {
      this.ageArr = ['12岁及以下'];
      for (let i = 13; i < 80; i++) {
        this.ageArr.push(i);
      }
      this.ageArr.push('80岁及以上');
      console.log(this.ageArr);
    },
    getInfo () {
      this.axios.get('/user/info', {
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.user = data.data;
            // 获取到用户手机号之后隐藏中间四位
            this.showPhone = this.hidePhone(this.user.phone);
            // 保存用户信息，来判断是否变动资料
            this.isSameInfo = JSON.parse(JSON.stringify(this.user));
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
    // 图片选择，赋值给file
    selectImg: function (e) {
      this.file = e.target.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', () => {
        this.user.headimgurl = reader.result;
      }, false);
      if (this.file) {
        if (this.file.size >= 1048576) {
          this.toast('上传图片过大');
          return false;
        }
        reader.readAsDataURL(this.file);
      }
    },
    getImgUrl: function () {
      // 如果图片没有改变，直接请求修改接口，否则先把图片存到服务器，成功了之后请求修改接口
      if (!this.file) {
        this.doEdit();
      } else {
        let fm = new window.FormData();
        fm.append('picname', this.file);
        this.axios.post('https://51zhijianxiu.cn/static/upload.php', fm, {headers: {'Content-Type': 'multipart/form-data'}, transformRequest: [function (data) { return data; }]})
          .then(({data}) => {
            if (data.status === 1) {
              this.user.headimgurl = data.url;
              this.doEdit();
            } else {
              this.toast(data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    // 执行修改
    doEdit: function () {
      this.axios.post('/user/editInfo', {
        headimgurl: this.user.headimgurl,
        nickname: this.user.nickname,
        sex: this.user.sex,
        age: this.user.age
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.toast('资料修改成功');
            this.$router.go(-1);
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    doSelect: function (type) {
      if (type === 'sex') {
        if (this.sexDisabled) {
          this.toast('已不能修改');
          return false;
        }
        this.showAgeSelect = false;
        this.showSexSelect = !this.showSexSelect;
      } else {
        if (this.ageDisabled) {
          this.toast('已不能修改');
          return false;
        }
        this.showSexSelect = false;
        this.showAgeSelect = !this.showAgeSelect;
      }
    },
    submit: function () {
      if ((this.isSameInfo.headimgurl === this.user.headimgurl) && (this.isSameInfo.nickname === this.user.nickname) && (this.isSameInfo.sex === this.user.sex) && (this.isSameInfo.age === this.user.age)) {
        this.toast('资料没有改动');
      } else if (!this.user.nickname) {
        this.toast('请填写用户昵称');
        return false;
      }
      let result = this.user.nickname.replace(/[\u4e00-\u9fa5]/g, '**');
      let checkName = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
      if (result.length > 16 || result.length < 0) {
        // 判断长度是否合法
        this.toast('昵称太长');
      } else if (!checkName.test(this.user.nickname)) {
        // 判断昵称填写是否合法xxx
        this.toast('昵称不能有特殊字符');
      } else {
        // 发送修改请求
        this.getImgUrl();
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
      color: #333;
    }
  }
  // 性别，年龄选框
  .sex{
    padding: 0 30px;
    line-height: 85px;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .placeholder{
      color: #666;
      margin-right: 10px;
      &.selected{
        color: #333;
      }
    }
    .iconfont{
      font-size: 30px;
      color: #999;
      position: relative;
      top: 2px;
    }
    .sex_select{
      max-height: 520px;
      overflow-y: auto;
      position: absolute;
      z-index: 9;
      top: 100%;
      left: 0;
      width: 100%;
      .select_line{
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        padding: 0 30px;
        border-bottom: 1px solid #e6e6e6;
      }
    }
  }
  .age{
    padding: 0 30px;
    line-height: 85px;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .placeholder{
      color: #666;
      margin-right: 10px;
      &.selected{
        color: #333;
      }
    }
    .iconfont{
      font-size: 30px;
      color: #999;
      position: relative;
      top: 2px;
    }
    .age_select{
      max-height: 520px;
      overflow-y: auto;
      position: absolute;
      z-index: 9;
      top: 100%;
      left: 0;
      width: 100%;
      .select_line{
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        padding: 0 30px;

      }
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
