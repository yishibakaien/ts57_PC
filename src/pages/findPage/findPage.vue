<template>
  <div class="find">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="find-box">
      I am find.
    </div>
  </div>
</template>

<script>
import {header, nav} from '../../components';
export default {
  components: {
    'vHeader': header,
    'vNav': nav
  }
};
</script>

<style lang="stylus" scoped>
  .find
    background #f2f2f2
    .find-box
      width 1200px
      margin 0 auto
</style>
