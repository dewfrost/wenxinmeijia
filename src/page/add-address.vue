<template>
  <div class="addAddress">
    <div class="information">
      <label for="name">收货人</label>
      <input type="text" id="name" v-model="user.name" placeholder="请输入收货人姓名">
    </div>
    <div class="information">
      <label for="phone">联系电话</label>
      <input type="number" id="phone" v-model="user.phone" placeholder="请输入收货人电话">
    </div>
    <div class="information" @click="selectAddress">
      <span>省市区</span>
      <div class="select">
        <span>{{ showAddress(user.area) }}</span>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
    <div class="details_address">
      <textarea class="details_add" id="details-address" placeholder="请填写详细地址" v-model="user.details_address" ref="textArea"></textarea>
    </div>
    <div class="default" @click="defaultSelect">
      <span>设为默认</span>
      <span class="iconfont" :class="{'icon-30xuanzhongyuanxing':!select,'icon-30xuanzhongyuanxingfill':select}"></span>
    </div>
    <button @click="link">确认</button>
  </div>
</template>

<script>
export default {
  name: 'addAddress',
  data () {
    return {
      // 数据
      no_address: require('../assets/images/none_01.png'),
      user: {
        name: '',
        phone: '',
        details_address: '',
        area: ['请选择']
      },
      select: false,
      type: null,
      isFirstAddress: false
    };
  },
  beforeMount: function () {
    // 获取地址列表是否为空来判断是否强制第一条设置成默认
    this.getAddressList();
  },
  mounted: function () {
    this.showSelect();
    this.getHeader('添加新地址', 'addAddress_top');
  },
  methods: {
    getAddressList () {
      this.axios.get('/address/addressList', {
      })
      .then(({data}) => {
        if (data.status === 1) {
          if (!data.data.length) {
            this.isFirstAddress = true;
            this.select = true;
          }
        } else {
          // this.toast(data.message);
        }
      });
    },
    selectAddress: function () {
      let that = this;
      eventBus.$emit('modal', {
        show: 'address',
        addressShow: true,
        callBack: function (data) {
          for (let i = data.length; i > 0; i--) {
            if (data[i] === '请选择') {
              data.splice(i, 1);
            }
          }
          that.user.area = data;
        }
      });
    },
    /* 文字截断 */
    showAddress: function (arr) {
      if (arr.join(' ').length > 21) {
        arr[1] = arr[1].slice(0, 3) + '..';
        if (arr.join(' ').length > 21) {
          arr[2] = arr[2].slice(0, 3) + '..';
        }
      }
      return arr.join(' ');
    },
    // 点击确认跳转编辑收货地址
    link: function () {
      // 检查是表单填写是否正确
      if (!this.user.name) {
        this.toast('姓名不能为空');
      } else if (!this.user.phone) {
        this.toast('手机号不能为空');
      } else if (!/^(1[3-9])\d{9}$/.test(this.user.phone)) {
        this.toast('手机号格式不正确');
      } else if (this.user.area[0] === '请选择') {
        this.toast('请选择省市区');
      } else if (parseInt(this.user.area.length) < 3) {
        this.toast('必须选择省市区中每一项');
      } else if (!this.user.details_address) {
        this.toast('详细地址不能为空');
      } else if (this.user.details_address.length > 70) {
        this.toast('详细地址字数太多');
      } else {
        this.user.city = this.user.city || this.user.area[1];
        // 提交改动
        this.submit();
      }
    },
    submit () {
      // 判断类型,默认地址传1，不是默认不传值
      if (this.select) {
        this.type = 1;
      } else {
        this.type = '';
      }
      this.axios.post('/address/addAddress', {
        phone: this.user.phone,
        name: this.user.name,
        city: this.user.area.join(' '),
        address: this.user.details_address,
        is_default: this.type
        // 声明一个类型
      })
      .then(({data}) => {
        if (data.status === 1) {
          // this.$router.push('manageAddress');
          this.$router.go(-1);
        } else {
          this.toast(data.message);
        }
      });
    },
    // 切换是否为默认地址
    defaultSelect: function () {
      if (this.isFirstAddress) {
        this.toast('系统默认第一条为默认地址');
        return false;
      }
      this.select = !this.select;
    },
    showSelect () {
      let slace = eventBus.slace;
      this.$refs.textArea.style['transform'] = 'scale(' + (1 / slace) + ')';
      this.$refs.textArea.style['-ms-transform'] = 'scale(' + (1 / slace) + ')';
      this.$refs.textArea.style['-moz-transform'] = 'scale(' + (1 / slace) + ')';
      this.$refs.textArea.style['-webkit-transform'] = 'scale(' + (1 / slace) + ')';
      this.$refs.textArea.style['-o-transform'] = 'scale(' + (1 / slace) + ')';
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.addAddress{
  padding-top: 90px;
  min-height: 100%;
  background: #f5f5f5;
  .information{
    &:first-child{
      margin-top: 20px;
    }
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    line-height: 85px;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    input{
      width: 300px;
      font-size: 24px;
      text-align: right;
    }
    label{
      width: 150px;
    }
    .select{
      span{
        color: #666;
      }
      .iconfont{
        font-size: 26px;
        padding-left: 10px;
      }
    }
  }
  .details_address{
    width: 640px;
    .details_add{
      margin-top: 30px;
      margin-left: 120px;
      background: #fff;
      border-bottom: 1px solid #eaeaea;
      width: 100%;
      height: 110px;
      resize: none;
      padding: 0 30px;
      font-size: 14px;
      color: #333;
      font-family: '微软雅黑';
      padding: 0px 30px 0;
      line-height: 33px;
      // display: flex;
      // flex: 1;
    }
  }
  .default{
    margin-top: 60px;
    line-height: 85px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    .iconfont{
      font-size: 32px;
      color: #999999;
    }
    .icon-30xuanzhongyuanxingfill{
      color: $color;
    }
  }
  button{
    width: 500px;
    line-height: 68px;
    border-radius: 4px;
    background: $color;
    color: #fff;
    font-size: 24px;
    text-align: center;
    display: block;
    margin: 0 auto;
    margin-top: 130px;
  }
}
</style>
