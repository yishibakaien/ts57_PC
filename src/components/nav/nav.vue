<template>
<div class="nav">
  <div class="nav-box">
    <router-link :to="item.path" :key="item.path" class="nav-item" v-for="item in navItem">{{item.name}}</router-link>
  </div>
</div>
</template>

<script>
export default {
  props: {
    // 默认的导航条
    navItem: {
      type: [Array, Object],
      default: function() {
        return [{
          path: '/homePage',
          name: '首页'
        }, {
          path: '/find',
          name: '发现'
        }, {
          path: '/threeDDressPage',
          name: '3D试衣'
        }, {
          path: '/shopManagePage',
          name: '网店管理'
        }, {
          path: '/personalCenterPage',
          name: '个人中心'
        }];
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  .nav
    width 100%
    background #4c93fd
    .nav-box
      width 1200px
      height 40px
      margin 0 auto
      text-align center
      .nav-item
        display inline-block
        float left
        height 36px
        line-height 36px
        width 150px
        margin-top 2px
        color #fff
        &.active
          color #4c93fd
          background #fff
</style>
