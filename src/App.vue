<template>
<div>
  <div class="main-wrapper">
    <models></models>
    <topbar></topbar>

    <div class="main">
      <router-view :message="message"></router-view>
    </div>
  </div>
  <div class="footer-wrapper">
    <v-footer :message="message"></v-footer>
  </div>
  <login-mask></login-mask>
</div>
</template>

<script>
import {
  topbar,
  footer,
  loginMask,
  models
} from '@/components';

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
    loginMask,
    models,
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
<style lang="css">
@import './common/css/main.css';
@import 'static/css/pc_reset.css';
</style>
