<template>
<div class="ts-grids">
  <slot></slot>
</div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 4
    }
  }
};
</script>

<style lang="css" scoped>
@import '../../../common/css/_var.css';
@import '../../../common/css/mixin/setOnepx.css';
@component-namespace ts{
  @component grids{
    position: relative;
    word-wrap: -1em;
    display: flex;
    &:before {
        @mixin setTopLine var(--grid-border-color);
    }
    &:after {
        @mixin setLeftLine var(--grid-border-color);
    }
  }
}
</style>
