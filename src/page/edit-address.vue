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
        <span>{{ showAddress(area) }}</span>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
    <div class="details_address">
      <textarea id="details-address"placeholder="请填写详细地址" v-model="user.details_address"></textarea>
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
      user: {
        name: '宓知月',
        phone: '17000000000',
        details_address: '河南省郑州市金水区黄河路文化路交叉口向南50米兴田大厦205'
      },
      area: ['河南省郑州市金水区']
    };
  },
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    this.getHeader('编辑收货地址', 'editAddress_top');
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  }, // 实例销毁前调用,解绑中间层的数据传输
  destroyed: function () {}, // 实例销毁后调用
  methods: {
    selectAddress: function () {
      let that = this;
      eventBus.$emit('modal', {
        show: 'address',
        modal: true,
        btnTitle: '确认',
        callback: function (data) {
          that.area = eventBus.addressArr;
          that.userInfo.province = that.area[0];
          that.userInfo.city = that.area[1];
          that.userInfo.area = that.area[2];
          eventBus.$emit('modal', {
            modal: false
          });
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
      this.$router.push('manageAddress');
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
      font-size: 24px;
      text-align: right;
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
      background: #fff;
      border-bottom: 1px solid #eaeaea;
      width: 100%;
      height: 170px;
      resize: none;
      padding: 0 30px;
      font-size: 24px;
      color: #333;
      font-family: '微软雅黑';
      padding: 25px 30px 0;
      line-height: 33px;
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
