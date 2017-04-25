<template>
  <div class="search">
    <input class="search-input" type="text" placeholder="请输入花型编号或厂名">
    <div class="choose-pic">
      <!-- <i class="iconfont">字</i> -->
      <pic-upload class="choose-input" ref="fileUpload"></pic-upload>
      <!-- <input class="choose-input" type="file" title="上传图片搜图"> -->
    </div>
    <div class="search-btn" title="搜索">
        <i class="iconfont">字</i>
    </div>
  </div>
</template>

<script>
import picUpload from '../picUpload/picUpload';
export default {
  components: {
    picUpload
  }
};
</script>

<style lang="stylus" scoped>
  .search
    position relative
    width 400px
    height 40px
    border 2px solid #3385ff
    font-size 0
    .search-input
      display inline-block
      width 324px
      height 24px
      line-height 24px
      padding 8px
      vertical-align top
      font-size 16px
      border 0
      &::-webkit-input-placeholder
        font-size 14px
        line-height 24px
    .choose-pic
      position absolute
      right 60px
      top 0
      height 40px
      width 40px
      padding 0 4px
      overflow hidden
      .iconfont
        display inline-block
        position absolute
        z-index 1
        right 0
        width 40px
        height 40px
        line-height 40px
        padding 0 4px
        font-size 18px
        color #3385ff
        text-align center
      .choose-input
        position absolute
        z-index 2
        right 0
        top 0
        height 40px
        width 40px
        padding 0 4px
        // opacity 0
        // background transparent
        cursor pointer
    .search-btn
      display inline-block
      height 40px
      line-height 40px
      width 60px
      vertical-align top
      font-size 20px
      text-align center
      background #3385ff
      color #fff
      cursor pointer
</style>
