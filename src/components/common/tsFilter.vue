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
@import '../../common/css/var.css';
@component-namespace ts{
  @component filter{
    border: var(--filterBorder);
    border-bottom:none;
    display: table;
    width: 100%;
    @descendent title{
      border-right: var(--filterBorder);
      background: var(--filterTitileBg);
      width: 14.5%;
      line-height: 56px;
      text-align: center;
      vertical-align: middle;
      display: table-cell;
    }
    @descendent content{
      padding: 6px 0;
      padding-left: 28px;
      vertical-align: middle;
      display: table-cell;
    }
    &:last-child{
      border-bottom: var(--filterBorder)
    }
  }
}
</style>
