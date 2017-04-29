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
@import '../../../common/css/var.css';
@component-namespace ts{
  @component filter{
    border: var(--filterBorder);
    border-bottom:none;
    display: flex;
    @descendent title{
      border-right: var(--filterBorder);
      background: var(--filterTitileBg);
      width: 14.5%;
      line-height: 56px;
      text-align: center;
      display: inline-block;
    }
    @descendent content{
      flex:1;
      margin-left: 28px;
      align-self: center;
    }
    &:last-child{
      border-bottom: var(--filterBorder)
    }
  }
}
</style>
