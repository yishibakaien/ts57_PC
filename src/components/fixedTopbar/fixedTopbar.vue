<template>
  <div class="fixed-topbar">
    <div class="search-wrapper">
      <search></search>
    </div>
  </div>
</template>

<script>
import search from '../search/search';
export default {
  components: {
    search
  }
};
</script>

<style lang="stylus" scoped>
  .fixed-topbar
    position fixed
    left 0
    top 0
    z-index 100
    height 60px
    width 100%
    background #ff7011
</style>
