<template lang="html">
  <div class="3d">
    <v-header>
      <search></search>
    </v-header>
    <v-nav></v-nav>
    <div class="threeD-wrapper">
        <threed-dress></threed-dress>
    </div>
  </div>
</template>
<script>
import {
  header,
  nav,
  search
} from '@/components';
import threedDress from './component/3Ddresss.vue';
export default {
  components: {
    'vHeader': header,
    'vNav': nav,
    search,
    threedDress
  }
};
</script>
<style lang="css" scoped>
@component-namespace threeD{
  @component wrapper{
    margin-top: 10px;
    max-width: 1200px;
    margin: 1em auto;
  }
}
</style>
