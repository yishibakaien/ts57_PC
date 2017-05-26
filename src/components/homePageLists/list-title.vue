<template>
  <div class="list-title">
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
  padding 18px 0
  background #fff
  border-bottom 1px solid #f1f1f1
  .title-name
    display inline-block
    font-size 24px
    line-height 24px
    margin-left 32px
    color #4c93fd
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
      background #fff
      font-size 24px
      line-height 24px
      text-align center
      border-radius 50%
</style>
