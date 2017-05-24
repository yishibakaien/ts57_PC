<template>
  <a class="ts-tab-item"
    @click="$parent.$emit('input', id)"
    :class="{ 'is-selected': $parent.value === id }">
    <div class="ts-tab-item-label">
      <slot></slot>
    </div>
  </a>
</template>

<script>
/**
 * mt-tab-item
 * @module components/tab-item
 * @desc 搭配 navbar 使用
 * @param {*} id - 选中后的返回值，任意类型
 * @param {slot} - 文字
 *
 * @example
 * <mt-nav-item>
 *   订单
 * </mt-nav-item>
 */
export default {
  name: 'mt-tab-item',

  props: ['id']
};
</script>

<style lang="css">
  @component-namespace ts {
    @component tab-item {
      display: block;
      padding: 7px 0;
      flex: 1;
      text-decoration: none;
      @descendent label {
        color: inherit;
        line-height: 1;
      }
    }
  }
</style>
