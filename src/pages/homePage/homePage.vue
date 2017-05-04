<template>
  <div class="homePage">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="swiper">
        <banner :items="imgs" :width="1200" :height="300" :pagination="true" :auto-play="true" :speed="3000" :sync="false"></banner>
    </div>

    <div class="homePage-box">
      <div class="list">
        <purchase-list></purchase-list>
      </div>
      <div class="list">
        <supply-list></supply-list>
      </div>
      <div class="list">
        <entry-list></entry-list>
      </div>
      <div class="list">
        <quality-company-list></quality-company-list>
      </div>
      <button class="button button-block button-blue" @click="seeDetail">花型详情(需要登录才能浏览)</button>
      <button @click="logout" class="button button-block button-red" v-if="showBtn">退出登录</button>

    </div>
    <!-- <fixed-topbar></fixed-topbar> -->
  </div>
</template>

<script>
import { header, nav, fixedTopbar, banner, purchaseList, supplyList, entryList, qualityCompanyList } from '../../components';
import { listHomeBanners } from '../../common/api/api';
import * as types from '../../store/types';

const imgs = [
  {
    src: 'http://i0.hdslb.com/bfs/archive/98548a7be48ab9929f02d2c51c2ab801841e5108.jpg',
    href: 'https://www.baidu.com'
  },
  {
    src: 'http://i0.hdslb.com/bfs/archive/056f5ad71f17a9fbb9581f16735768e3d9c54008.png',
    href: 'https://www.baidu.com'
  },
  {
    src: 'http://i0.hdslb.com/bfs/archive/98548a7be48ab9929f02d2c51c2ab801841e5108.jpg',
    href: 'https://www.baidu.com'
  },
  {
    src: 'http://i0.hdslb.com/bfs/archive/056f5ad71f17a9fbb9581f16735768e3d9c54008.png',
    href: 'https://www.baidu.com'
  }
];

export default {
  data() {
    return {
      imgs: []
    };
  },
  components: {
    'vHeader': header,
    'vNav': nav,
    fixedTopbar,
    banner,
    purchaseList,
    supplyList,
    entryList,
    qualityCompanyList
  },
  created() {
    listHomeBanners().then(res => {
      console.log('首页banner', res);
      // 假装请求到banner图
      this.imgs = imgs;
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
      background #f2f2f2
      .list
        margin 32px 0
      .button
        width 20%
        margin-top 20px

</style>
