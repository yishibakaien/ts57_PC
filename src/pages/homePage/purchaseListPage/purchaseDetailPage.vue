
<template>
  <div class="purchase-detail-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="purchase-detail-page-box">
      我是求购详情页
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
.purchase-detail-page
  background #f2f2f2
  .purchase-detail-page-box
    width 1200px
    margin 0 auto
    margin-top 300px
    padding 16px 0
    background #f2f2f2
</style>
