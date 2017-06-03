<template lang="html">
  <div class="shopVisiting all">
    <v-header>
    	<search>
    	  <ts-select class="shopVisiting-select" data-key-name="label" data-val-name="dicValue" :options='DICT.SearchType' v-model="search"></ts-select>
    	</search>
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
import DICT from '@/common/dict';
import introPic from './children/introPic';
import navItem from './nav';
export default {
  data() {
    return {
      DICT: {
        SearchType: DICT.SearchType
      },
      search: '',
      navItem: navItem
    };
  },
  methods: {
    ...mapActions(['getCompanyInfo'])
  },
  computed: {
    ...mapGetters(['companyInfo'])
  },
  async created() {
    document.querySelector('.main-wrapper').style.backgroundColor = '#fff';
    // 获取店铺信息
    await this.getCompanyInfo({
      companyId: this.$route.params.id
    });
    this.search = 1;
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
  @component select{
    width: 88px;
    min-width: 80px;
    margin-right: 5px;
  }
}
</style>
<style lang="scss">
.shopVisiting.all {
  .ts-select-toggle {
      border: none;
      background: rgba(155, 155, 155, .1);
  }
}
</style>
