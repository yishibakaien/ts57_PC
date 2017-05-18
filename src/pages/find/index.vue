<template>
<div>
  <v-header>
    <search></search>
  </v-header>
  <v-nav></v-nav>
  <!-- 发现 -->
  <div class="find">
    <carousel></carousel>
    <div class="find-wrapper">
      <every-looking></every-looking>
      <history-on-new></history-on-new>
      <hot-search></hot-search>
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
import Carousel from './children/carousel';
import EveryLooking from './children/everyLooking';
import HistoryOnNew from './children/historyOnNew';
import HotSearch from './children/hotSearch';
export default {
  components: {
    'vHeader': header,
    'vNav': nav,
    search,
    HotSearch,
    HistoryOnNew,
    EveryLooking,
    Carousel
  }
};
</script>
<style scoped>
  @component-namespace find{
    @component wrapper{
      margin-top: 1em;
      max-width: 1200px;
      margin: 1em auto 0;
    }
  }
</style>
