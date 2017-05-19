
<template>
  <div class="purchase-detail">
    <v-header>
    	<search></search>
    </v-header>
    <v-nav></v-nav>
    <div class="purchase-detail-box">
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
  nav,
  search
} from '@/components';

export default {
  components: {
    'vHeader': header,
    'vNav': nav,
    search
  }
};
</script>

<style lang="stylus" scoped>
</style>
