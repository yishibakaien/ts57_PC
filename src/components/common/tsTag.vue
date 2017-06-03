<template>
<span class="ts-tag" :class="[type?'ts-tag--'+type:'',shape?'ts-tag--'+shape:'']" :style="{backgroundColor:bgColor,color:color}">
  <div :class="{'ts-tag-text':!!closable}">
    <slot></slot>
  </div>
<!--  v-if="closable" -->
<i class="ts-tag-close" v-if="closable" @click="handleClose">&times;</i>
</span>
</template>

<script>
/**
 * 类型：type--primary,gray,success,warning,danger
 * 形状--square 方形 round 椭圆
 * 背景色：bgColor
 * 字体颜色：color
 */
export default {
  methods: {
    handleClose(event) {
      this.$emit('close', event);
    }
  },
  props: {
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return [
          'primary',
          'gray',
          'danger',
          'transparent'
        ].indexOf(value) > -1;
      }
    },
    shape: {
      type: String,
      default: 'round',
      validator(value) {
        return [
          'round',
          'square'
        ].indexOf(value) > -1;
      }
    },
    closable: {
      type: Boolean,
      default: false
    },
    bgColor: String,
    color: String
  }
};
</script>

<style lang="css" scoped>
@import '../../common/css/_var.css';
@component-namespace ts{
  @component tag{
    display: inline-block;
    padding: 3px 8px;
    background: rgba(76,147,253,0.50);
    box-sizing: border-box;
    white-space: nowrap;
    line-height: 1;
    position: relative;
    @modifier gray{
      background-color: var(--tag-gray-bgColor);
      color: var(--tag-gray-color);
    }
    @descendent close{
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translate(-50%,-50%);
      font-size: 18px;
      cursor: pointer;
    }
    @descendent text{
      padding-right: 20px;
    }
    @modifier primary{
      background-color: var(--tag-primary-bgColor);
      color: var(--tag-primary-color);
    }
    @modifier danger{
      background-color: var(--tag-danger-bgColor);
      color: var(--tag-danger-color);
    }
    @modifier transparent{
      background: #fff;
      border: 1px solid #e9e9e9;
      &:hover{
        border-color: var(--tag-primary-bgColor);
        background: #fff1e9;
      }
    }
    @modifier round{
      border-radius: 65px;
    }
    @modifier square{
      border-radius: 0;
    }
  }
}
</style>
