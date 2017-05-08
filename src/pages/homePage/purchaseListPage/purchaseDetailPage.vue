
<template>
  <div class="purchase-detail-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="purchase-detail-page-box">
      <div class="purchase-detail-left">

      </div>
      <div class="purchase-detail-right">

      </div>
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
    box-sizing border-box
    width 1200px
    margin 0 auto
    padding 16px 0
    background #fff
</style>
