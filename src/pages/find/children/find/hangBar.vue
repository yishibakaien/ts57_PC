<template lang="html">
  <!-- 悬浮条 -->
  <div class="hangBar-wrapper">
    <div class="hangBar-item is-title">
      <span>发现</span>
    </div>
    <div class="hangBar-item" @click="goAnchor('#anchor-update')">
      <span>厂家上新</span>
    </div>
    <div class="hangBar-item"  @click="goAnchor('#anchor-looking')">
      <span>大家在找</span>
    </div>
    <div class="hangBar-item" v-show="backTop" @click="goTop">
      <span>
        <p class="hangBar-item-triangle"></p>
        <p>顶部</p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backTop: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.showTopBar);
    });
  },
  methods: {
    // 锚点定位 => 无动画
    goAnchor(selector) {
      var anchor = this.$parent.$el.querySelector(selector);
      document.body.scrollTop = document.documentElement.scrollTop = anchor.offsetTop;
    },
    goTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    showTopBar() {
      let viewHeight = document.documentElement.clientHeight;
      var toTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (toTop >= viewHeight) {
        this.backTop = true;
      } else {
        this.backTop = false;
      }
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace hangBar{
  @component wrapper{
    position: fixed * 2px 4px *;
    z-index:99;
  }
  @component item{
    size:60px 60px;
    cursor: pointer;
    color: #fff;
    text-align: center;
    background: rgba(102, 102, 102, 0.6);
    border-bottom: 1px solid;
    position: relative;
    @descendent triangle{
       triangle: 10px top #fff;
    }
    @when title{
      cursor: default;
      background: rgba(76, 147, 253, .8);
    }
    span{
      position: absolute 50% *  * 50%;
      transform: translate(-50%,-50%);
      line-height: 150%;
    }
    &:last-child{
      border-bottom:none;
    }
  }
}
</style>
