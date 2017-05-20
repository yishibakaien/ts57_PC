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
      <div class="find-wrapper--left">
        <history-on-new></history-on-new>
        <every-looking></every-looking>
      </div>
      <div class="find-wrapper-right">
        <hot-search></hot-search>
      </div>
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
      max-width: 1200px;
      margin:1em auto;
      display: flex;
      @modifier left{
        flex-basis: 70%;
        margin-right: 16px;
      }
      @modifier right{
        flex-basis: 30%;
      }
    }
  }
</style>
