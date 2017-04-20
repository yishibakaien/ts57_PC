<template>
  <div class="login-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="login-wrapper">
      <login></login>
    </div>
  </div>
</template>

<script>
import {header, nav, login} from '../../../components';
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
    .login-wrapper
      background #f1f1f1
      padding: 16px;
</style>
