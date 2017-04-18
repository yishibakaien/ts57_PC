<template>
  <div class="index">
    <v-header></v-header>
    <v-nav></v-nav>
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
  .index
    height 1200px
    background #f1f1f1
</style>
