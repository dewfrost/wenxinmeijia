<template>
  <div class="selectAddress">
    <div class="manage_list" v-for="(item, index) in address" :key="index" @click="backSubmit()">
      <p class="name">
        <span>{{item.name}}</span>
        <span>{{item.phone}}</span>
      </p>
      <p class="address">
        <span>{{item.defaultAddress ? '[默认地址]' : ''}}</span>
        {{item.address}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectAddress',
  data () {
    return {
      // 数据
      address: [
        {
          name: '杨阳洋',
          phone: '13245678998',
          address: '河南省郑州市郑东新区农业南路街道如意西路建业大厦F座2306',
          defaultAddress: true
        },
        {
          name: '杨阳洋',
          phone: '13245678998',
          address: '河南省郑州市郑东新区农业南路街道如意西路建业大厦F座2306',
          defaultAddress: false
        },
        {
          name: '杨阳洋',
          phone: '13245678998',
          address: '河南省郑州市郑东新区农业南路街道如意西路建业大厦F座2306',
          defaultAddress: false
        }
      ]
    };
  },
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    this.getHeader('选择收货地址', 'selectAddress_top', '管理', function () {
      this.$router.push('manageAddress');
    });
    this.getFooter();
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  }, // 实例销毁前调用,解绑中间层的数据传输
  destroyed: function () {}, // 实例销毁后调用
  methods: {
    backSubmit () {
      this.$router.go(-1);
    },
    // 是否设为默认地址
    selectAddress: function (index, id) {
      // 原来为默认地址的改为非默认
      this.address.forEach(function (obj, index) {
        if (obj.select === 1) {
          obj.select = 0;
        }
      });
      // 点击的变为默认地址
      this.address[index].select = 1;
    },
    // 跳转新地址页面
    getFooter () {
      let that = this;
      eventBus.$emit('footer', {
        button: [
          {
            inner: '新增收货地址',
            callback: () => {
              that.$router.push('addAddress');
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.selectAddress{
  padding-top: 90px;
  min-height:100%;
  background: #f5f5f5;
  .manage_list{
    margin-top: 20px;
    background: #fff;
    .name{
      display: flex;
      justify-content: space-between;
      padding: 5px 30px 0px;
      font-size: 24px;
      color: #333333;
      line-height: 57px;
    }
    .address{
      padding: 0px 30px 15px;
      font-size: 22px;
      color: #999999;
      span{
        color: $color;
      }
    }
    .select{
      display: flex;
      justify-content: space-between;
      padding: 15px 30px 15px;
      border-top: 1px solid #f5f5f5;
      .default{
        &:before{
        font-size: 30px;
        padding-right: 10px;
        }
        font-size: 24px;
         &.icon-30xuanzhongyuanxingfill{
          color: $color;
        }
      }
      .manage{
        font-size: 24px;
        color: #666666;
        span{
          &:before{
          font-size: 30px;
          padding-right: 10px;
          }
          &.iconfont{
          font-size: 24px;
        }
        }
        
      }
    }
  }
  button{
    width: 100%;
    height: 80px;
    background: $color;
    color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    font-size: 26px;
  }
}
</style>
