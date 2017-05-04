<template>
  <div class="entry-list-item">
    <div class="entry-base-item">
      <div class="img-container">
        <div class="img-wrapper">
          <img class="item-image" src="/static/images/pattern.jpg">
        </div>
        <div class="img-wrapper">
          <img class="item-image" src="/static/images/pattern.jpg">
        </div>
      </div>
      <div class="item-desc">
        <div class="company-avatar">
          <img src="/static/images/pattern.jpg" width="31" height="31">
        </div>
        <h2 class="desc-title">福建坐视布管蕾丝厂呵呵呵呵呵</h2>
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
.entry-list-item
  box-sizing border-box
  width 310px
  height 210px
  padding 16px
  background #fff
  border-left 1px solid #d8d8d8
  border-bottom 1px  solid #d8d8d8
  &:hover
    position relative
    border 1px solid rgba(76, 147, 253, 0.8)
    box-shadow 0 0 5px rgba(76, 147, 253, 0.8)
    z-index 1
  .entry-base-item
    width 278px
    height 210px
    .img-container
      width 278px
      height 127.5px
      overflow hidden
      background #f2f2f2
      .img-wrapper
        width 132px
        height 127.5px
        overflow hidden
        &:first-child
          float left
        &:last-child
          float right
        .item-image
          width 100%
          position relative
          top 50%
          transform translateY(-50%)
    .item-desc
      display flex
      padding 16px 0
      .company-avatar
        flex 0 0 31px
        width 31px
        height 31px
      .desc-title
        flex 1
        font-weight 200
        height 31px
        line-height 31px
        margin-left 10px
        font-size 20px
        color #333
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
</style>
