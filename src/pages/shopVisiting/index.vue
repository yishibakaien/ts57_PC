<template lang="html">
  <div class="shopVisiting">
    <v-header>
    	<search></search>
    </v-header>
    <!-- 背景图 -->
    <intro-pic></intro-pic>
    <!-- nav -->
    <v-nav :navItem="navItem"></v-nav>
    <!-- 子页面 -->
    <div class="shopVisiting-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {
  header,
  nav,
  search
} from '@/components';
import {
  mapGetters,
  mapActions
} from 'vuex';
import introPic from './children/introPic';
import navItem from './nav';
export default {
  data() {
    return {
      navItem: navItem
    };
  },
  methods: {
    ...mapActions(['getCompanySimpleInfo', 'getCompanyInfoByUserId'])
  },
  computed: {
    ...mapGetters(['companySimpleInfo'])
  },
  async created() {
    document.querySelector('.main-wrapper').style.backgroundColor = '#fff';
    // 获取店铺信息
    await this.getCompanySimpleInfo(this.$route.params.id);
    await this.getCompanyInfoByUserId(this.companySimpleInfo.userId);
  },
  components: {
    'vHeader': header,
    'vNav': nav,
    introPic,
    search
  }
};
</script>

<style lang="css" scoped>
@component-namespace shopVisiting{
  @component wrapper{
    margin-top: 10px;
    background: #fff;
    max-width: 1200px;
    margin: 1em auto;
  }
}
</style>
