<template>
<div class="ts-grid" :style="getStyle" @click="handleClick">
  <slot></slot>
</div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      this.$emit('click');
    }
  },
  computed: {
    getStyle() {
      const rows = this.$parent.rows;
      if (!rows || rows === 4) {
        return;
      }
      const styles = {};
      styles.width = `${100 / rows}%`;
      return styles;
    }
  }
};
</script>
<style lang="css" scoped>
@import '../../../common/css/var.css';
@component-namespace ts{
  @component grid{
    position: relative;
    padding: 4px;
    box-sizing: border-box;
    width:calc(100/4)%;
    display: table-cell;
    word-wrap: 0;
    transition: .5s;
    &:before {
    @mixin setRightLine var(--grid-border-color);
    }
    &:after {
      @mixin setBottomLine var(--grid-border-color);
    }
    &:active,
    &:hover {
        box-shadow: 0 2px 4px 0 var(--grid-hover-border-color), 0 0 6px 0 var(--grid-hover-border-color);
    }
  }
}
</style>
