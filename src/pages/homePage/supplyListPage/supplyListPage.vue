<template>
  <div class="supply-list-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="supply-list-page-box">

    </div>
  </div>
</template>

<script>
import {
  header,
  nav
} from '../../components';

export default {
  components: {
    'vHeader': header,
    'vNav': nav
  }
};
</script>

<style lang="stylus" scoped>
  .supply-list-page
    background #f2f2f2
    .supply-list-page-box
      width 1200px
      margin 0 auto
      margin-top 300px
      padding 16px 0
      background #f2f2f2
</style>
