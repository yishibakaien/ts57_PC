<template>
  <div
    v-show="id === $parent.currentActive"
    class="ts-tab-container-item">
    <slot></slot>
  </div>
</template>
 
<script>
/**
 * ts-tab-container-item
 * @desc 搭配 tab-container 使用
 * @module components/tab-container-item
 *
 * @param {number|string} [id] - 该项的 id
 *
 * @example
 * <ts-tab-container v-model="selected">
 *   <ts-tab-container-item id="1"> 内容A </ts-tab-container-item>
 *   <ts-tab-container-item id="2"> 内容B </ts-tab-container-item>
 *   <ts-tab-container-item id="3"> 内容C </ts-tab-container-item>
 * </ts-tab-container>
 */
export default {
  props: ['id']
};
</script>

<style>
  @component-namespace ts {
    @component tab-container-item {
      flex-shrink: 0;
      width: 100%;
    }
  }
</style>
