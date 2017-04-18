<template>
  <div class="topbar">
    <div class="content">
      I am topbar
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
  .topbar
    height 30px
    line-height 30px
    font-size 14px
    background #f1f1f1
    .content
      width 1200px
      margin 0 auto
</style>
