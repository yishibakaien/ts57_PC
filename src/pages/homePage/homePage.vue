<template>
  <div class="homePage">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="swiper">
      banner-zone
    </div>
    <div class="homePage-box">
      <button class="button button-block button-blue" @click="seeDetail">花型详情(需要登录才能浏览)</button>
      <button @click="logout" class="button button-block button-red" v-if="showBtn">退出登录</button>
      <pic-upload class="file-upload" ref="fileUpload"></pic-upload>
    </div>

    <!-- <fixed-topbar></fixed-topbar> -->
  </div>
</template>

<script>
import { header, nav, picUpload, fixedTopbar } from '../../components';
import { listHomeBanners } from '../../common/api/api';
import * as types from '../../store/types';

export default {
  components: {
    'vHeader': header,
    'vNav': nav,
    picUpload,
    fixedTopbar
  },
  created() {
    listHomeBanners().then(res => {
      console.log('首页banner', res);
    }).catch(res => {
      console.log('error', res);
    });
  },
  computed: {
    showBtn() {
      return this.$store.state.token;
    }
  },
  methods: {
    seeDetail() {
      if (this.$store.state.accessToken) {
        alert('这是花型详情页面');
      } else {
        this.$store.commit(types.LOGIN_MASK, true);
      }
    },
    logout() {
      this.$store.commit(types.LOGOUT);
    }
  }
};
</script>

<style lang="stylus" scoped>
  .homePage
    background #f2f2f2
    .swiper
      position absolute
      z-index 1
      left 0
      width 100%
      height 300px
      text-align center
      background #d8d8d8

    .homePage-box
      width 1200px
      margin 0 auto
      margin-top 300px
      padding 16px 0
      background #fff
      .button
        width 20%
        margin-top 20px
    .file-upload
      display block
      height 80px
      width 80px

</style>
