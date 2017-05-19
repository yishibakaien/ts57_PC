<template>
<span class="ts-tag" :class="[type?'ts-tag--'+type:'']" :style="{backgroundColor:bgColor,color:color}">
  <slot></slot>
</span>
</template>

<script>
/**
 * 类型：type--primary,gray,success,warning,danger
 * 背景色：bgColor
 * 字体颜色：color
 */
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return [
          'primary',
          'gray',
          'danger'
        ].indexOf(value) > -1;
      }
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
    min-width: 60px;
    height: 20px;
    padding: 3px 8px;
    background: rgba(76,147,253,0.50);
    border-radius: 65px;
    box-sizing: border-box;
    white-space: nowrap;
    line-height: 1;
    @modifier gray{
      background-color: var(--tag-gray-bgColor);
      color: var(--tag-gray-color);
    }
    @modifier primary{
      background-color: var(--tag-primary-bgColor);
      color: var(--tag-primary-color);
    }
    @modifier danger{
      background-color: var(--tag-danger-bgColor);
      color: var(--tag-danger-color);
    }
  }
}
</style>
