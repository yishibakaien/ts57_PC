<template>
  <div class="header">
    <div class="header-box">
      <div class="brand">
        	<router-link to="/homePage">
            <img src="/static/images/统搜57.png">
          </router-link>
          <!-- <slot></slot> -->
      </div>
      <div class="search-wrapper">
        <slot></slot>
      </div>
      <div class="concat">
        <div class="tel">400-801-3357</div>
        <div class="text">
          <i class="iconfont icon-kefu"></i> <span>免费热线</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="stylus" scoped>
  .header
    width 100%
    background #fff
    .header-box
      max-width 1200px
      height 120px
      position relative
      margin 0 auto
      z-index 2
      .brand
        min-width 158px
        min-height 74px
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      .search-wrapper
        margin auto
        position absolute
        top 0
        left 0
        bottom 0
        right 0
        width 50%
        height 25%
      .concat
        text-align center
        position: absolute;
        top: 50%;
        right 0;
        transform: translateY(-50%);
        .tel
          font-size 24px
          color #ff8400
        .text
          height 25px
          line-height 25px
          font-size 18px
          color #666
</style>
