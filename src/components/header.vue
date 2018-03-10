<template>
  <div class="header-top" :class="topClass" v-show="flag">
    <span class="iconfont icon-back_light back" @click="leftMethod"></span>
    <h1 class="header-h1">{{title}}</h1>
    <span class="header-left" v-if="right" @click="rightMethod">{{right}}</span>
  </div>
</template>

<script>
export default {
  name: 'headerBox',
  data () {
    return {// 数据
      topClass: '', // 头部类名
      flag: true, // 是否需要头部
      title: '', // 标题
      right: '', // 右侧字
      leftBack: '', // 左侧事件(默认返回上一级)
      rightBack: '' // 右侧事件
    };
  },
  beforeCreate: function () { // 创建之前
  },
  created: function () { // 创建之后
  },
  beforeMount: function () { // 挂载之前
    let box = this;
    eventBus.$on('header', function (data) {
      box.topClass = data.topClass; // 头部类名
      box.flag = !data.flag; // 是否显示头部(默认显示)
      box.title = data.title; // 标题
      box.right = data.right; // 右侧字
      box.leftBack = data.leftBack; // 左侧事件(默认返回上一级)
      box.rightBack = data.rightBack; // 右侧事件
    });
  },
  beforeDestroy: function () { // 实例销毁前调用,解绑中间层的数据传输
    eventBus.$off('headerBox');
  },
  methods: {
    headerDefault: function () {
      this.topClass = ''; // 头部类名
      this.flag = true; // 是否需要头部
      this.title = ''; // 标题
      this.right = ''; // 右侧字
      this.leftBack = ''; // 左侧事件(默认返回上一级)
      this.rightBack = ''; // 右侧事件
    },
    leftMethod: function () {
      if (!this.leftBack) return this.$router.go(-1);
      else return this.leftBack();
    },
    rightMethod: function () {
      if (this.rightBack) return this.rightBack();
    }
  }
};
</script>
<style lang="scss">
  .header-top {
    width: 100%;
    height: 90px;
    line-height: 90px;  
    position: relative;
    text-align: center;
    background: #fff;
    color: #333;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      width: 90px;
      height: 90px;
      font-size: 32px;
      color: inherit;
    }
    .header-h1 {
      font-size: 30px;
      font-weight: normal;
      color: inherit;
    }
    .header-left {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 20px;
      color: inherit;
    }
  }
</style>
