<template>
  <div class="base-item-wrapper">
    <div class="base-item">
      <div class="img-container">
        <img class="item-image" src="/static/images/pattern.jpg">
      </div>
      <div class="item-desc">
        <h2 class="desc-title">供应 200码</h2>
        <p class="desc-text">急需这款面料，有货的快来联系</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" scoped>
.base-item
  box-sizing border-box
  width 233px
  height 323px
  padding 16px
  background #fff
  border-left 1px solid #d8d8d8
  &:hover
    position relative
    border 1px solid rgba(76, 147, 253, 0.8)
    box-shadow 0 0 5px rgba(76, 147, 253, 0.8)
    z-index 1
  .img-container
    width 200px
    height 200px
    overflow hidden
    background #f2f2f2
    .item-image
      width 100%
      position relative
      top 50%
      transform translateY(-50%)
  .item-desc
    .desc-title
      font-size 24px
      font-weight 200
      height 40px
      line-height 40px
      margin-top 16px
      color #333
    .desc-text
      height 36px
      line-height 36px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      color #999
</style>
