<template>
<div class="ts-grid" @click="handleClick">
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
    cursor: pointer;
    box-sizing: border-box;
    word-wrap: 0;
    text-align: center;
    transition: .5s;
    padding: 15px;
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
      color: #666;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
