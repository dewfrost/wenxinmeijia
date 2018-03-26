<template>
  <div class="manageAddress">
    <div v-if="!address.length && isRequest" class="none_data">
      <p>此页面暂无内容</p>
    </div>
    <div class="manage_list" v-for="(item, index) in address" :key="index">
      <p class="name"> 
        <span>{{item.name}}</span>
        <span>{{item.phone}}</span>
      </p>
      <p class="address">
        {{item.city}}&nbsp;{{item.description}}
      </p>
      <div class="select">
        <span class="default iconfont" @click="selectAddress(index, item.id)" :class="{'icon-30xuanzhongyuanxingfill':item.default === 1,'icon-30xuanzhongyuanxing':!item.default !==1}">{{item.default === 1?"默认地址":"设为默认"}}</span>
        <p class="manage">
          <router-link :to="{path: 'editAddress', query:{id: item.id}}" tag="span" class="iconfont icon-iconfontedit">编辑</router-link>
          <span @click="del(index)" class="iconfont icon-shanchu1">删除</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manageAddress',
  data () {
    return {
      // 数据
      isRequest: false,
      address: []
    };
  },
  created: function () {},
  beforeMount: function () {
    // 获取用户地址
    this.getAddress();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('管理收货地址', 'manageAddress_top');
    this.getFooter();
  },
  methods: {
    // 是否设为默认地址
    selectAddress: function (index, id) {
      // 原来为默认地址的改为非默认
      this.address.forEach(function (obj, index) {
        if (obj.default === 1) {
          obj.default = 0;
        }
      });
      // 点击的变为默认地址
      this.address[index].default = 1;
      this.doDefaultAddress(this.address[index].id);
    },
    // 设为默认地址--接口
    doDefaultAddress (id) {
      this.axios.get('/address/setDefaultAddress', {
        params: {
          id: id
        }
      })
        .then(({data}) => {
          if (data.status === 1) {
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 跳转新地址页面
    getFooter () {
      let that = this;
      eventBus.$emit('footer', {
        button: [
          {
            inner: '添加新地址',
            callback: () => {
              that.$router.push('addAddress');
            }
          }
        ]
      });
    },
    // 获取地址列表接口
    getAddress: function () {
      this.axios.get('/address/addressList', {
      })
        .then(({data}) => {
          this.isRequest = true;
          if (data.status === 1) {
            for (let i = 0; i < data.data.length; i++) {
              // 如果是默认地址，则插到第一位，否则添加到最后一位
              if (parseInt(data.data[i].default) === 1) {
                this.address.unshift(data.data[i]);
              } else {
                this.address.push(data.data[i]);
              }
            }
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 删除地址--接口
    doDelAddress (index) {
      this.axios.get('/address/userAddressDel', {
        params: {
          id: this.address[index].id
        }
      })
      .then(({data}) => {
        if (data.status === 1) {
          this.address.splice(index, 1);
          this.toast('删除成功');
        } else {
          this.toast(data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 是否删除
    del: function (index) {
      // 判断删除的是否是默认地址
      if (this.address[index].default === 1) {
        this.toast('默认地址不能删除');
        return false;
      }
      this.modal('提示', '确定删除该收货地址？', '确定', () => {
        this.doDelAddress(index);
      }); // 第一个参数：弹窗头部标题；第二个参数：弹窗内容文字；第三个参数：按钮名字；第四个参数：按钮的回调函数
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.manageAddress{
  min-height: 100%;
  margin-top: 90px;
  position: relative;
  padding-bottom: 80px;
  position: relative;
  .none_data{
    background: url(../assets/images/none_01.png) no-repeat center center;
    position: absolute;
    top: 140px;
    left: 50%;
    transform: translateX(-50%);
    height: 300px;
    width: 80%;
    text-align: center;
    > p{
      color: #999;
      font-size: 24px;
      margin-top: 260px;
    }
  }
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
      padding: 0px 30px 12px;
      font-size: 23px;
      color: #999999;
      line-height: 34px;
      margin-top: -2px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
    }
    .select{
      display: flex;
      justify-content: space-between;
      padding: 15px 30px 15px;
      border-top: 1px solid #f5f5f5;
      .default{
        &:before{
        position: relative;
        top: 3px;
        left: 0;
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
