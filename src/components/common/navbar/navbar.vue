<template>
<div class="ts-navbar onepx-b">
  <slot></slot>
</div>
</template>

<script>
/**
 * ts-navbar
 * @module components/navbar
 * @desc 顶部 tab，依赖 tab-item
 *
 * @param {*} selected - 返回 item component 传入的 value
 *
 * @example
 * <ts-navbar :selected.sync="selected">
 *   <ts-tab-item value="订单">
 *     <span slot="label">订单</span>
 *   </ts-tab-item>
 * </ts-navbar>
 *
 * <ts-navbar :selected.sync="selected" fixed>
 *   <ts-tab-item :value="['传入数组', '也是可以的']">
 *     <span slot="label">订单</span>
 *   </ts-tab-item>
 * </ts-navbar>
 *
 */
export default {
  props: {
    value: {}
  },
  watch: {
    value(val) {
      this.$emit('change', val);
    }
  }
};
</script>

<style lang="css">
@import '../../../common/css/_var.css';
@component-namespace ts {
    @component navbar {
      background-color: #fff;
      display: flex;
      text-align: center;

      .ts-tab-item {
        padding: 17px 0;
        font-size: 15px;

        &:last-child {
          border-right: 0;
        }

        &.is-selected {
          border-bottom: 3px solid var(--navbar-color);
          color: var(--navbar-color);
          margin-bottom: -3px;
        }
      }
    }
  }
</style>
