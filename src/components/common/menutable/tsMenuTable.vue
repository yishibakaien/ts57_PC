<template>
<div class="ts-menuTable">
  <!-- 头部 -->
  <div class="ts-menuTable-header">
    <slot name="header-left">
    </slot>
    <div class="ts-menuTable-header--right">
      <slot name="header-right"></slot>
    </div>
  </div>
  <div class="ts-menuTable-content">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  props: ['prop']
};
</script>

<style lang="css" scoped>
@import '../../../common/css/var.css';
@component-namespace ts{
  @component menuTable{
    border: var(--menuTableHeaderBorder);
    margin-bottom: 16px;
    @descendent header{
      padding:0 10px;
      background: var(--menuTableHeaderBg);
      line-height: 40px;
      border-bottom: var(--menuTableHeaderBorder);
      display: flex;
      @modifier right{
        flex:1;
        text-align: right;
      }
    }
    @descendent content{
      min-height: 100px;
      display: table;
    }
  }
}
</style>
