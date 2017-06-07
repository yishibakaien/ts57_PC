<template>
  <div
    class="ts-tab-container">
    <div
      ref="wrap"
      class="ts-tab-container-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="css">
  @component-namespace ts {
    @component tab-container {
      overflow: hidden;
      position: relative;
      @descendent wrap {
        display: flex;
      }
    }
  }
</style>

<script>
/**
 * ts-tab-container
 * @desc 面板，搭配 tab-container-item 使用
 * @module components/tab-container
 *
 * @param {number|string} [value] - 当前激活的 tabId
 *
 * @example
 * <ts-tab-container v-model="selected">
 *   <ts-tab-container-item id="1"> 内容A </ts-tab-container-item>
 *   <ts-tab-container-item id="2"> 内容B </ts-tab-container-item>
 *   <ts-tab-container-item id="3"> 内容C </ts-tab-container-item>
 * </ts-tab-container>
 */
export default {
  name: 'ts-tab-container',

  props: {
    value: {}
  },
  data() {
    return {
      currentActive: this.value
    };
  },
  watch: {
    value(val) {
      this.currentActive = val;
    },
    currentActive(val, oldValue) {
      this.$emit('input', val);
    }
  }
};
</script>
<style scoped>
  @component-namespace ts{
    @component tab-container{
          margin-top: 16px;
    }
  }
</style>
