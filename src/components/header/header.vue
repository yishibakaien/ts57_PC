<template>
  <div class="header">
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
  .header
    box-sizing border-box
    width 1200px
    height 80px
    margin 0 auto
    background #fff000
</style>
