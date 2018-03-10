<template>
  <div class="loader-s" v-if="loadShow" @click="stopLoading()">
    <svg class="loading" width="60px" height="60px" viewBox="0 0 44 44">
        <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      loadShow: false,
      timeOut: null
    };
  },
  beforeCreate: function () {
  },
  created: function () {
  },
  beforeMount: function () {
    eventBus.$on('loading', (boolean) => {
      clearTimeout(this.timeOut);
      if (boolean) {
        this.timeOut = setTimeout(() => {
          this.loadShow = boolean;
        }, 300);
      } else {
        clearTimeout(this.timeOut);
        this.loadShow = boolean;
      }
    });
  },
  methods: {
    stopLoading () {
      this.loadShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
  html, body {
    height: 100%;
  }
  .loader-s {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(255, 255, 255, .5);
    z-index: 999;
    .loading {
      position: absolute;
      top: calc(50% - #{60px / 2});
      left: calc(50% - #{60px / 2});
      animation: rotator 1.4s linear infinite;
      .path {
        stroke: #E01016;
        stroke-dasharray: 126;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: dash 1.4s ease-in-out infinite;
      }
    }
  }
	@keyframes rotator {
    0% {
      transform: scale(0.5) rotate(0deg);
    }
    100% {
      transform: scale(0.5) rotate(270deg);
    }
	}
	@keyframes dash {
    0% {
      stroke-dashoffset: 126;
    }
    50% {
      stroke-dashoffset: 63;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 126;
      transform: rotate(450deg);
    }
	}
</style>
