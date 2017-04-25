<template>
  <div class="nav">
    <router-link to="/homePage" class="nav-item">首页</router-link>
    <router-link to="/findPage" class="nav-item">发现</router-link>
    <router-link to="/threeDDressPage" class="nav-item">3D试衣</router-link>
    <router-link to="/shopManagePage" class="nav-item">店铺管理</router-link>
    <router-link to="/personalCenterPage" class="nav-item">个人中心</router-link>
  </div>
</template>

<script>
export default {};

</script>

<style lang="stylus" scoped>
  .nav
    display flex
    height 40px
    line-height 40px
    text-align center
    background #fff
    .nav-item
      flex 1
      &.active
        color #fff
        background #3385ff
</style>
