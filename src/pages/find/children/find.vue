<template>
<div class="find-wrapper">
  <div class="find-wrapper--left">
    <history-on-new></history-on-new>
    <every-looking></every-looking>
  </div>
  <div class="find-wrapper-right">
    <hot-search></hot-search>
  </div>
</div>
</template>

<script>
import EveryLooking from './find/findLooking';
import HistoryOnNew from './find/findUpdate';
import HotSearch from './find/findTopSearch';
export default {
  components: {
    HotSearch,
    HistoryOnNew,
    EveryLooking
  }
};
</script>
<style scoped>
@component-namespace find {
  @component wrapper {
    display: flex;
    @modifier left {
      flex-basis: 70%;
      margin-right: 16px;
    }
    @modifier right {
      flex-basis: 30%;
    }
  }
}
</style>
