<template>
  <div class="select_address">
    <div v-if="!address.length && isRequest" class="none_data">
      <p>此页面暂无内容</p>
    </div>
    <div class="manage_list" v-for="(item, index) in address" :key="index" @click="backSubmit(index)">
      <p class="name">
        <span>{{item.name}}</span>
        <span>{{item.phone}}</span>
      </p>
      <p class="address">
        <span class="default">{{item.default ? '[默认地址]' : ''}}</span>
        <span>{{item.city}} {{item.description}}</span>
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
      isRequest: false,
      address: []
    };
  },
  beforeMount: function () {
    this.getAddressList();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('选择收货地址', 'selectAddress_top', '管理', function () {
      this.$router.push('manageAddress');
    });
    this.getFooter();
  },
  methods: {
    getAddressList () {
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
    backSubmit (index) {
      this.axios.post('/order_pay/choice_address', {
        aid: this.address[index].id
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.$router.go(-1);
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
.select_address{
  padding-top: 90px;
  min-height:100%;
  background: #f5f5f5;
  position: relative;
  .none_data{
    background: url(../assets/images/none_01.png) no-repeat center center;
    position: absolute;
    top: 230px;
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
  .manage_list{
    margin-top: 20px;
    height: 140px;
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
      height: 60px;
      padding: 0px 30px;
      font-size: 22px;
      color: #999999;
      // float: right;
      display: flex;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      span.default{
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
