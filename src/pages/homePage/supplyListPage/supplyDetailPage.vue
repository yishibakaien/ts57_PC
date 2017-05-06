<template>
  <div class="supply-detail-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="supply-detail-page-box">
      我是供应详情页面
    </div>
  </div>
</template>

<script>
import {
  header,
  nav
} from '../../../components';

export default {
  components: {
    'vHeader': header,
    'vNav': nav
  }
};
</script>

<style lang="stylus" scoped>
  .supply-detail-page
    background #f2f2f2
    .supply-detail-page-box
      width 1200px
      margin 0 auto
      padding 16px 0
      background #f2f2f2
</style>
