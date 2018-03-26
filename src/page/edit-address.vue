<template>
  <div class="editAddress">
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
        <span :class="{}">{{ showAddress(area) }}</span>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
    <div class="details_address">
      <textarea id="details-address" placeholder="请填写详细地址" v-model="user.description"></textarea>
    </div>
    <button @click="link">确认</button>
  </div>
</template>

<script>
export default {
  name: 'editAddress',
  data () {
    return {
      // 数据
      user: {},
      area: ['请选择'],
      isSameAddress: {}
    };
  },
  beforeMount: function () {
    this.getAddress();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('编辑收货地址', 'editAddress_top');
  },
  methods: {
    // 跳转页面，首先获取数据---接口
    getAddress: function () {
      this.axios.get('/address/userAddress', {
        params: {
          id: this.$route.query.id
        }
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.user = data.data;
            // 把虎丘的地址信息保存到isSameAddress，要用深拷贝
            this.isSameAddress = JSON.parse(JSON.stringify(data.data));
            // 把获取的省市区存入this.area，存为数组
            this.area = [];
            this.area.push(data.data.city);
          } else {
            this.toast(data.message);
          }
        });
    },
    selectAddress: function () {
      // 调用选择地址组件
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
          that.area = data;
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
      let nameResult = this.user.name.replace(/[\u4e00-\u9fa5]/g, '**');
      if (this.user.name === this.isSameAddress.name && this.user.phone === this.isSameAddress.phone && this.user.description === this.isSameAddress.description && this.area.join(' ') === this.isSameAddress.city) {
        this.toast('地址没有改动');
      } else if (!this.user.name) {
        this.toast('收货人不能为空');
      } else if (nameResult.length > 12 || nameResult.length < 0) {
        this.toast('收货人不能超过12个字符');
      } else if (!this.user.phone) {
        this.toast('联系电话不能为空');
      } else if (!/^(1[3-9])\d{9}$/.test(this.user.phone)) {
        this.toast('联系电话格式不正确');
      } else if ((this.area.length === 0) && (this.area.join(' ') !== this.isSameAddress.city)) {
        // 如果地址length为0，且省市区有了变动
        this.toast('请选择省市区');
      } else if ((this.area.length < 3) && (this.area.join(' ') !== this.isSameAddress.city)) {
        this.toast('必须选择省市区中每一项');
      } else if (!this.user.description) {
        this.toast('详细地址不能为空');
      } else if (this.user.description.length > 70) {
        this.toast('详细地址字数太多');
      } else {
        this.user.city = this.area[2] ? this.area.join(' ') : this.user.city;
        // 提交改动
        this.submit();
      }
    },
    submit () {
      this.axios.post('/address/userAddressEdit', {
        id: this.user.id,
        phone: this.user.phone,
        name: this.user.name,
        city: this.user.city,
        address: this.user.description
      })
      .then(({data}) => {
        if (data.status === 1) {
          this.$router.go(-1);
          this.toast('编辑成功');
        } else {
          this.toast(data.message);
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.editAddress{
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
      .iconfont{
        font-size: 26px;
        padding-left: 10px;
      }
    }
  }
  .details_address{
    textarea{
      // background: red;
      background: #fff;
      border-bottom: 1px solid #eaeaea;
      resize: none;
      padding: 0 30px;
      font-size: 24px;
      color: #333;
      font-family: '微软雅黑';
      padding: 25px 30px 0;
      line-height: 33px;
      display: flex;
      flex: 1;
      width: 100%;
      height: 170px;
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
