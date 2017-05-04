
<template>
  <div class="purchase-list-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="purchase-list-page-box">

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
.purchase-list-page
  background #f2f2f2
  .purchase-list-page-box
    width 1200px
    margin 0 auto
    margin-top 300px
    padding 16px 0
    background #f2f2f2
</style>
