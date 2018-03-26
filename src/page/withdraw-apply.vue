<template>
  <div class="withdrawApply">
    <!-- 本次可提现的金额 -->
    <p class="apply">
      本次可提现：
      <span>￥{{applyPrice}}</span>
    </p>
    <!-- 请输入金额 -->
    <p class="withdrawApply_money">
      <i class="iconfont icon-tixian"></i>
      <input class="placeholder" type="number" v-model="price" placeholder="请输入提现金额">
    </p>
    <!-- 提现方式 -->
    <p class="select">提现方式</p>
    <div class="list">
      <div class="linePay_payType" v-for="(item,index) in payType" @click="toggleType(index)" :key="index">
        <div class="left">
          <i class="iconfont" :class="item.icon"></i>
          <span>{{item.title}}</span>
        </div>
        <div class="right">
          <span class="bind" :class="{'gray' : !alipay_id, 'red' : alipay_id}" v-if="index === 1">{{alipay_id ? showAlipay : '未绑定'}}</span>
          <span class="bind gray" v-if="index === 0">{{wechatIsBind ? '已绑定' : '未绑定'}}</span>
          <i class="iconfont" :class="{'icon-30xuanzhongyuanxingfill' : activeNum === index, 'icon-30xuanzhongyuanxing' : activeNum !== index}"></i>
        </div>
      </div>
    </div>
    <!-- 提现规则 -->
    <div class="rules">
      <p class="rules_list">提现规则：</p>
      <p class="rules_list">1. 限每天提现{{frequency}}次，每次限额{{quota}}元</p>
      <p class="rules_list">2. 提现到账周期：T+{{cycle}} </p>
      <p class="rules_list">3. 提现手续费： {{charge}} %</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'withdrawApply',
  data () {
    return {
      applyPrice: '',
      alipay_id: '',
      price: '',
      wechatIsBind: false,
      activeNum: 0,
      payType: [  // 支付方式
        {
          title: '微信',
          icon: 'icon-weixin',
          state: false
        },
        {
          title: '支付宝',
          icon: 'icon-zhifubao',
          state: true
        }
      ],
      frequency: '',
      quota: '',
      cycle: '',
      charge: '',
      type: null
    };
  },
  beforeMount: function () {
    this.getInfo();
  }, // 挂载之前
  mounted: function () {
    this.getHeader('提现申请', 'withdrawApply_top');
    this.getFooter();
  },
  computed: {
    showPhone: function () {
      return this.hidePhone(this.user.phone);
    },
    showAlipay () {
      // 如果是邮箱
      if ((/@/g).test(this.alipay_id)) {
        this.alipay_id = this.alipay_id.replace(/(\w{2})\w*(@)/, '$1***$2');
        return this.alipay_id;
      } else { // 如果是手机号
        this.alipay_id = this.alipay_id.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        return this.alipay_id;
      }
    }
  },
  methods: {
    // 调用底部
    getFooter () {
      eventBus.$emit('footer', {
        button: [
          {
            inner: '提交',
            callback: () => {
              this.submit();
            }
          }
        ]
      });
    },
    // 提交-接口
    submit () {
      if (!this.price) {
        this.toast('提现金额不能为空');
      } else if (parseFloat(this.price) <= 0) {
        this.toast('提现金额不合法');
        // 如果小数点后超过两位
      } else if (/\./g.test(this.price) && this.price.toString().split('.')[1].length > 2) {
        this.toast('提现金额需小数后至多两位');
      } else if (parseFloat(this.price) > parseFloat(this.quota)) {
        this.toast('提现金额超出每日限额');
      } else if (parseFloat(this.price) > parseFloat(this.applyPrice)) {
        this.toast('可用提现金额不足');
      } else if (this.activeNum === 0 && !this.wechatIsBind) {
        this.modal('提示', '提现需绑定微信账号，快去绑定吧！', '去绑定', (index) => {
          this.$router.push({path: 'weixinBind'});
        });
      } else if (!this.alipay_id) {
        this.modal('提示', '提现需绑定支付宝账号，快去绑定吧！', '去绑定', (index) => {
          this.$router.push({path: 'zfbBind'});
        });
      } else {
        let that = this;
        // 判断类型
        if (this.activeNum === 0) {
          // 第一个参数，订单号， 第二个参数成功事件，第三个参数，如果是withdraw1，则是微信提现，如果是withdraw2，则是支付宝提现,第四个参数：金钱数
          this.goPay('', function () {
            that.toast('提现成功');
            that.$router.go(-1);
          }, 'withdraw1', this.price);
        } else {
          // 第一个参数，订单号， 第二个参数成功事件，第三个参数，如果是withdraw1，则是微信提现，如果是withdraw2，则是支付宝提现,第四个参数：金钱数
          this.goPay('', function () {
            that.$router.push('withdrawSuccess');
          }, 'withdraw2', this.price);
        }
      }
    },
    // 选择支付类型
    toggleType: function (index) {
      this.activeNum = index;
    },
    // 获取数据
    getInfo () {
      this.axios.post('/withdrawals/apply_page', {
      })
        .then(({data}) => {
          if (data.status === 1) {
            this.applyPrice = data.data.money;
            this.alipay_id = data.data.zhifubao;
            this.wechatIsBind = data.data.weixin;
            this.frequency = data.data.config.frequency;
            this.quota = data.data.config.quota;
            this.cycle = data.data.config.cycle;
            this.charge = data.data.config.charge;
          } else {
            this.toast(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
.withdrawApply_top{
  border: none;
}
.withdrawApply{
  background: #f5f5f5;
  padding-top: 90px;
  min-height: 100%;
  position: relative;
  .apply{
    padding: 0 24px;
    line-height: 60px;
    background: #ffe5e6;
    font-size: 22px;
    color: $color;
  }
  .withdrawApply_money{
    line-height: 140px;
    padding: 0 24px;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    .icon-tixian{
      color: $color;
      font-size: 36px;
      padding-right: 24px;
    }
    input{
      font-size: 28px;
      height: 48px;
      font-size: 40px;
      border-left: 1px solid #e0e0e0;
      text-indent: 23px;
    }
    input::-webkit-input-placeholder{
      color:#999;
      font-size: 28px;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
      font-size: 28px;
      color:#999;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      font-size: 28px;
      color:#999;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
      font-size: 28px;
      color:#999;
    }
  }
  .select{
    margin-top: 30px;
    line-height: 80px;
    padding: 0 24px;
    color: #666666;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
  }
  .list{
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    padding: 0 24px;
    .linePay_payType{
      line-height: 80px;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      .left{
        display: flex;
        align-items: center;
        .iconfont{
          font-size: 32px;
          padding-right: 8px;
          position: relative;
          top: 4px;
        }
        .icon-zhifubao{
          color: #00a0e9;
        }
        .icon-weixin{
          color: #00b30d;
        }
        .icon-yue{
          color: #fd8f01;
        }
      }
      .right{
        .bind{
          color: #999999;
          font-size: 20px;
        }
        .red{
          color: $color;
        }
        .iconfont{
          font-size: 32px;
          padding-left: 13px;
          position: relative;
          top: 2px;
        }
        .icon-30xuanzhongyuanxingfill{
          color: $color;
        }
        .icon-30xuanzhongyuanxing{
          color: #999999;
        }
      }
      &:last-child{
        border: none;
      }
    }
  }
  .rules{
    padding: 24px 24px 0;
    font-size: 20px;
    color: #999999;
    .rules_list{
      line-height: 35px;
    }
  }
  .submit{
    width: 100%;
    height: 80px;
    line-height: 80px;
    background: $color;
    color: #fff;
    font-size: 26px;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
