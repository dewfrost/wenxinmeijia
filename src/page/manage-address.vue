<template>
  <div class="manageAddress">
    <div class="manage_list" v-for="(item, index) in address" :key="index">
      <p class="name">
        <span>{{item.name}}</span>
        <span>{{item.phone}}</span>
      </p>
      <p class="address">
       {{item.address}}
      </p>
      <div class="select">
        <span class="default iconfont" @click="selectAddress(index, item.id)" :class="{'icon-30xuanzhongyuanxingfill':item.select === 1,'icon-30xuanzhongyuanxing':!item.select !==1}">{{item.select === 1?"默认地址":"设为默认"}}</span>
        <p class="manage">
          <router-link to="editAddress" tag="span" class="iconfont icon-iconfontedit">编辑</router-link>
          <span @click="del(item.id, index)" class="iconfont icon-shanchu1">删除</span>
        </p>
      </div>
    </div>
    <button @click="link">添加新地址</button>
  </div>
</template>

<script>
export default {
  name: 'manageAddress',
  data () {
    return {
      // 数据
      address: [
        {
          name: '宓知月',
          phone: '17000000000',
          address: '河南省郑州市金水区南河路较细路交叉口大幅度小区7层706',
          select: 1
        },
        {
          name: '宓知月',
          phone: '17000000000',
          address: '河南省郑州市金水区南河路较细路交叉口大幅度小区7层706',
          select: 2
        },
        {
          name: '宓知月',
          phone: '17000000000',
          address: '河南省郑州市金水区南河路较细路交叉口大幅度小区7层706',
          select: 2
        }
      ]
    };
  },
  created: function () {},
  beforeMount: function () {}, // 挂载之前
  mounted: function () {
    this.getHeader('管理收货地址', 'manageAddress_top');
  }, // 挂载之后
  beforeUpdate: function () {}, // 数据更新时调用,在渲染之前
  updated: function () {}, // 数据更新后,渲染后调用(禁止)
  beforeDestroy: function () {
    eventBus.$emit('header', false);
  }, // 实例销毁前调用,解绑中间层的数据传输
  destroyed: function () {}, // 实例销毁后调用
  methods: {
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
    link: function () {
      this.$router.push('addAddress');
    },
    // 是否删除
    del: function (id, index) {
      let that = this; // 如果回调函数中用到this，则这行代码必须有
      this.modal('提示', '确定删除该收货地址？', '确定', function (index) {
        that.address.splice(index, 1);
      }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.manageAddress{
  margin-top: 90px;
  position: relative;
  &:before{
    content: '';
    width: 100%;
    height: 20px;
    display: block;
    background: #f5f5f5;
  }
  .manage_list{
    &:after{
      content: '';
      width: 100%;
      height:20px;
      display: block;
      background: #f5f5f5; 
    }
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
      font-size: 24px;
      color: #999999;
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
