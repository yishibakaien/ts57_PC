<template>
<div class="ts-title-block">
  <span class="ts-title-block-title">
    <slot></slot>
  </span>
</div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
:root{
  --title-block-border-color:#E5E5E5;
}
@component-namespace ts{
  @component title-block{
    text-align: center;
      margin: 30px 0;
    @descendent title{
      font-size: 32px;
      line-height: 45px;
      position: relative;
      &:before{
        content:' ';
        position: absolute 50% * * 0;
        background: var(--title-block-border-color);
        size: 160px 1px;
        transform: translate(-130%,-50%);
      }
      &:after{
        content:' ';
        position: absolute 50% 0 * *;
        background: var(--title-block-border-color);
        size: 160px 1px;
        transform: translate(130%,-50%);
      }
    }
  }
}
</style>
