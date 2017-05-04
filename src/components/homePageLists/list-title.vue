<template>
  <div class="list-title">
    <span class="title-name" :style="{color: titleColor}">最新求购</span>
    <div class="right-nav">
      <span class="right-nav-text">更多求购</span>
      <i class="iconfont" :style="{background: titleColor}">字</i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleColor: {
      type: String
    }
  }
};
</script>

<style lang="stylus" scoped>
.list-title
  width 100%
  padding 18px 0
  background #fff
  border-bottom 1px solid #f1f1f1
  .title-name
    display inline-block
    font-size 24px
    line-height 24px
    margin-left 32px
  .right-nav
    float right
    margin-right 16px
    font-size 20px
    height 24px
    line-height 24px
    color #999
    cursor pointer
    .right-nav-text
      display inline-block
      vertical-align top
    .iconfont
      display inline-block
      vertical-align top
      height 24px
      width 24px
      font-size 24px
      line-height 24px
      color #fff
      text-align center
      border-radius 50%
</style>
