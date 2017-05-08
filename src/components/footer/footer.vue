<template>
  <div class="footer">
    <div class="footer-desc">
      <p class="cooper">
        <span class="text">合作伙伴 - 中国针织工业协会花边分会</span>|
        <span class="text">指导单位：长乐市纺织局</span>
      </p>
      <p>
        <span class="text">新闻合作媒体 - 腾讯财经</span>|
        <span class="text">东方财富网</span>
      </p>
    </div>
    <div class="footer-cropy">
      <span class="text">©福建省长乐市坐视布管网络科技有限公司　闽ICP备14005607号-1</span>
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
  .footer
    text-align center
    border-top 1px solid #d8d8d8
    .footer-desc
      padding 16px 0 12px 0
      font-size 16px
      background #fff
      color #999
      .text
        display inline-block
        height 30px
        line-height 30px
        padding 0 12px
    .footer-cropy
      height 40px
      line-height 40px
      font-size 14px
      color #f8f8f8
      background #666
</style>
