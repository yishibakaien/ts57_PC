<template>
  <div class="nav">
    <div class="nav-box">
      <router-link to="/homePage" class="nav-item">首页</router-link>
      <router-link to="/findPage" class="nav-item">发现</router-link>
      <router-link to="/threeDDressPage" class="nav-item">3D试衣</router-link>
      <router-link to="/shopManagePage" class="nav-item">店铺管理</router-link>
      <router-link to="/personalCenterPage" class="nav-item">个人中心</router-link>
    </div>
  </div>
</template>

<script>
export default {};

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
