<template>
<div class="ts-progress">
  <div class="ts-progress-bar">
    <div class="ts-progress-bar-outer" :style="{height: strokeWidth + 'px'}">
      <div class="ts-progress-bar-inner" :style="barStyle">
        <div class="ts-progress-bar-innerText">{{percentage}}%</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 0,
      required: true
    },
    status: {
      type: String
    },
    strokeWidth: {
      type: Number,
      default: 16
    },
    width: {
      type: Number,
      default: 126
    }
  },
  computed: {
    barStyle() {
      var style = {};
      style.width = this.percentage + '%';
      return style;
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace ts{
  @component progress{
    position: relative;
    line-height: 1;
  }
  @component progress-bar{
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    box-sizing: border-box;
    @descendent outer {
      height: 6px;
      border-radius: 100px;
      background-color: #e4e8f1;
      overflow: hidden;
      position: relative;
      vertical-align: middle;
    }
    @descendent inner {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      transition: .6s;
      border-radius: 2px 0 0 2px;
      background-color: #4c93fd;
      text-align: right;
      border-radius: 100px;
      line-height: 1;
      @utils-vertical-center;
    }
    @descendent innerText {
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      font-size: 12px;
      margin: 0 5px;
    }
  }

}
</style>
