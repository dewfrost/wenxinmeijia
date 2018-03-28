<template>
  <div class="accountBind">
    <div class="bind wechat" @click="bind('wechat')"> <!-- 传入绑定的类型 -->
      <span class="bind_list iconfont icon-weixin">微信绑定</span>
      <p class="is_bind">
        <span class="weixin">{{wechat ? '已绑定' : '去绑定'}}</span>
        <i class="iconfont icon-you"></i>
      </p>
    </div>
    <div class="bind zhifubao" @click="bind('zhifubao')"> <!-- 传入绑定的类型 -->
      <span class="bind_list iconfont icon-zhifubao">支付宝绑定</span>
      <p class="is_bind">
        <span class="phone" >{{showZhifubao}}</span>
        <span class="unbind" v-if="zhifubao">解绑</span>
        <i class="iconfont icon-you"></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accountBind',
  data () {
    return {
      // 数据
      wechat: false,
      zhifubao: ''
    };
  },
  beforeMount: function () {
    this.getZhifubao();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('账户绑定', 'accountBind_top');
  }, // 挂载之后
  computed: {
    showZhifubao () {
      if (!this.zhifubao) {
        return '未绑定';
      } else if ((/@/g).test(this.zhifubao)) {
        return this.zhifubao.replace(/(\w{2})\w*(@)/, '$1***$2');
      } else {
        return this.zhifubao.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      }
    }
  },
  methods: {
    // 绑定
    bind: function (type) {
      // 支付宝
      if (type === 'zhifubao') {
        // 绑定支付宝
        if (!this.zhifubao) {
          this.$router.push('zfbBind');
        } else {
          // 解绑
          this.$router.push('zfbUnbind');
        }
      } else {
        // 微信
        if (this.wechat) {
          this.toast('微信已绑定');
        } else {
          this.$router.push('weixinBind');
        }
      }
    },
    // 绑定支付宝账号
    getZhifubao () {
      this.axios.get('/user/zhifubao', {
      })
      .then(({data}) => {
        if (data.status === 1) {
          this.zhifubao = data.data[0].zhifubao;
          this.wechat = data.data[0].weixin;
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
.accountBind{
 padding-top: 90px;
  min-height: 100%;
  background: #f5f5f5;
  &:before{
    content: '';
    display: block;
    width: 100%;
    height: 20px;
  }
  .bind{
      padding: 0 30px;
      line-height: 85px;
      background: #fff;
      border-bottom: 1px solid #eaeaea;
      display: flex;
      justify-content: space-between;
      &.wechat{
        .bind_list{
          &:before{
            color: #00b30d;
          }
        }
      }
      &.zhifubao{
        .bind_list{
          &:before{
            color: #00a0e9;
          }
        }
      }
      .bind_list{
        display: flex;
        align-items: center;
        &.iconfont{
          font-size: 24px;
        }
        &:before{
          padding-right: 10px;
          font-size: 30px;
        }
      }
      .is_bind{
        .weixin{
          color: #999;
        }
        .phone{
          color: #999;
        }
        .unbind{
          color: $color;
          margin-left: 10px;
        }
        .iconfont{
          font-size: 30px;
          padding-left: 10px;
        }
      }
    }
}
</style>
