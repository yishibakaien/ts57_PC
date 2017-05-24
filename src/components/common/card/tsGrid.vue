<template>
<div class="ts-grids" :class="{'is-column':type==='column'}">
  <slot></slot>
</div>
</template>

<script>
export default {
  /**
   * type -- 横 rows / 列 column
   * @type {Object}
   */
  props: {
    type: {
      type: String,
      default: 'row',
      validator(value) {
        return [
          'row',
          'column'
        ].indexOf(value) > -1;
      }
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
    flex-wrap:wrap;
    @when column{
      flex-direction: column;
    }
    &:after {
        @mixin setTopLine var(--grid-border-color);
    }
    &:before {
        @mixin setLeftLine var(--grid-border-color);
    }
  }
}
</style>
