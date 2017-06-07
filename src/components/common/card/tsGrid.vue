<template>
<div>
  <div class="ts-grids" :class="{'is-column':layOut==='column','is-table':type==='table','is-flexbox':type==='flexbox'}">
    <slot></slot>
  </div>
  <div class="ts-empty onepx" v-if="empty">
    <p class="ts-empty-text">{{emptyText}}</p>
  </div>
</div>
</template>

<script>
export default {
  /**
   * type -- 横 rows / 列 column
   * @type {Object}
   */
  props: {
    emptyText: {
      type: String,
      default: '暂无数据'
    },
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
    data: {
      type: [Array, Object]
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
  },
  computed: {
    empty() {
      if (this.data) {
        return !this.data || (this.data.length <= 0);
      }
    }
  }
};
</script>

<style lang="css" scoped>
@import '../../../common/css/_var.css';
@import '../../../common/css/mixin/setOnepx.css';
@component-namespace ts{
  @component empty{
    position: relative;
    text-align: center;
    height: 40px;
    width: 100%;
    @descendent text{
      position: absolute 50% * * 50%;
      transform: translate(-50%,-50%);
      color: gray;
    }
  }
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
      display: inline-flex;
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
