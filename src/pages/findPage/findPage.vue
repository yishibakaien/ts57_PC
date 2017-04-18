<template>
  <div class="find">
    <v-header></v-header>
    <v-nav></v-nav>
    I am find
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

</style>
