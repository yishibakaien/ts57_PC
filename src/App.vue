<template>
  <div>
    <div class="main-wrapper">
      <topbar></topbar>
      <!-- <v-header></v-header> -->

      <div class="main">

        <!-- <div class="nav-wrapper">
          <v-nav></v-nav>
        </div> -->

        <router-view :message="message"></router-view>

      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer :message="message"></v-footer>
    </div>
  </div>
</template>

<script>
import {topbar, header, nav, footer} from './components';

export default {
  data() {
    return {
      message: {
        desc: 'message form app.vue.',
        showLoading: false
      }
    };
  },
  components: {
    topbar,
    'vHeader': header,
    'vNav': nav,
    'vFooter': footer
  }
};
</script>

<style lang="stylus" scoped>

  .tab
    display flex
    height 40px
    line-height 40px
    text-align center
    .tab-item
      flex 1
      &.active
        color #fff
        background #3385ff
</style>
