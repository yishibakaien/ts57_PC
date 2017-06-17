<template>
  <div class="list-title onepx-b">
    <span class="title-name">{{titleText.title}}</span>
    <div class="right-nav" @click="goListPage">
      <span class="right-nav-text">{{titleText.extend}}</span>
      <i class="iconfont icon-gengduo"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleText: {
      type: Object
    }
  },
  methods: {
    goListPage() {
      let _path = '';
      _path = '/' + this.titleText.type + 'ListPage';
      this.$router.push({
        path: _path
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.list-title
  width 100%
  padding 12px 0
  background #fff
  .title-name
    display inline-block
    font-size 20px
    line-height 24px
    margin-left 32px
    font-weight bold
    color #333
  .right-nav
    float right
    margin-right 16px
    font-size 16px
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
      height 18px
      width 18px
      background #fff
      font-size 18px
      line-height 24px
      text-align center
      border-radius 50%
</style>
