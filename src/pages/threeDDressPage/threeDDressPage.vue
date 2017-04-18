<template>
  <div class="threeDDress">
    <v-header></v-header>
    <v-nav></v-nav>
    I am threeDDress
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
