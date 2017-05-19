<template>

<div class="ts-grid" :style="getStyle" @click="handleClick">
  <slot></slot>
  <div class="ts-grid--footer" v-if="$slots.footer">
    <slot name="footer"></slot>
  </div>
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
@import '../../../common/css/_var.css';
@import '../../../common/css/mixin/setOnepx.css';
@component-namespace ts{
  @component grid{
    position: relative;
    padding: 4px;
    box-sizing: border-box;
    flex:1;
    word-wrap: 0;
    text-align: center;
    transition: .5s;
    padding: 16px;
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
    @modifier footer{
      padding-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
