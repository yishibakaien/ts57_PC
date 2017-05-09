<template>
  <div class="login-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="loginPage-box">
      <div class="login-wrapper">
        <login></login>
      </div>
    </div>
  </div>
</template>

<script>
import {header, nav, login} from '@/components';
export default {
  components: {
    'vHeader': header,
    'vNav': nav,
    login
  }
};
</script>

<style lang="stylus" scoped>
  .login-page
    .loginPage-box
      position relative
      width 100%
      height 731px
      background #ff7011
      .login-wrapper
        position absolute
        right 357px
        top 113px
</style>
