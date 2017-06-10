<template>
<div>
  <div class="main-wrapper">
    <models></models>
    <topbar v-if='!isClauseRoute'></topbar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
  <div class="footer-wrapper" v-if='!isClauseRoute'>
    <v-footer></v-footer>
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
  created() {
    if (localStorage.getItem('x-token')) {
      this.$store.dispatch('getUserInfo');
    }
    // 每切换路由都会置顶
    window.addEventListener('hashchange', () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  },
  computed: {
    isClauseRoute() {
      return this.$route.path === '/clause';
    }
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
