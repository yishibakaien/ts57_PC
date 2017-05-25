<template>
<div class="ts-grids" :class="{'is-column':layOut==='column','is-table':type==='table','is-flexbox':type==='flexbox'}">
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
    layOut: {
      type: String,
      default: 'row',
      validator(value) {
        return [
          'row',
          'column'
        ].indexOf(value) > -1;
      }
    },
    type: {
      type: String,
      default: 'flexbox',
      validator(value) {
        return [
          'table',
          'flexbox'
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
    @when table{
      display: table;
      .ts-grid{
        display: table-cell;
      }
    }
    @when flexbox{
      display: flex;
      flex-wrap:wrap;
    }
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
