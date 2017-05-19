<template>
  <section class="ts-filter">
    <div class="ts-filter-title">
      {{title}}
    </div>
    <div class="ts-filter-content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: ['title']
};
</script>

<style lang="css" scoped>
@import '../../common/css/_var.css';
@component-namespace ts{
  @component filter{
    border-top: var(--filterDottedBorder);
    border-left: var(--filterSolidBorder);
    border-right: var(--filterSolidBorder);
    border-bottom: none;
    display: table;
    width: 100%;
    &:last-child{
      border-bottom: var(--filterSolidBorder);
    }
    &:first-child{
      border-top: var(--filterSolidBorder);
    }
    @descendent title{
      background: var(--filterTitileBg);
      width: 12%;
      text-align: left;
      padding-left: 15px;
      line-height: 40px;
      display: table-cell;
    }
    @descendent content{
      padding: 1px 0;
      padding-left: 28px;
      vertical-align: middle;
      display: table-cell;
    }
  }
}
</style>
