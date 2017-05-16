<template>
  <div class="header">
    <div class="header-box">
      <div class="brand">
        <div class="brand-img">
        	<a href="homePage"><img src="../../../static/images/统搜57.png" alt="logo"/></a>
        </div>
      </div>
      <div class="search-wrapper">
        <!--<search></search>-->
        <slot></slot>
      </div>
      <div class="concat">
        <div class="tel">400-801-3357</div>
        <div class="text">
          <i class="iconfont">字</i><span>免费热线</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import search from '../search/search';
export default {
//  components: {
//      search
//  }
};
</script>

<style lang="stylus" scoped>
  .header
    /*position relative*/
    box-sizing border-box
    height 120px
    width 100%
    background #fff
    .header-box
      width 1200px
      margin 0 auto
      .brand
        height 120px
        float left
        .brand-img
          margin-top 23px
          font-size 36px
          line-height 50px
        .brand-title
          line-height 25px
          font-size 18px
          color #999
      .search-wrapper
        /*position absolute
        margin-left 300px
        margin-top 40px*/
        float left
        margin 40px 0 0 140px
        width 700px
      .concat
        float right
        height 120px
        text-align center
        .tel
          height 33px
          line-height 33px
          margin-top 35px
          font-size 24px
          color #ff8400
        .text
          height 25px
          line-height 25px
          font-size 18px
          color #666
</style>
