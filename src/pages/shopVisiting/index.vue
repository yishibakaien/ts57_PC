<template lang="html">
  <div class="shopVisiting all">
    <v-header>
    	<search :inputPlaceHolder='inputPlaceHolder' :globalLook='false' @check="handleLookProduct" @change="handleGetResult" @search-text="handleSearchText">
        <ts-select slot="select" class="shopVisiting-select" data-key-name="label" data-val-name="dicValue" :options='DICT.SearchType' v-model="searchSelect"  :disabled="search.handleStatus"></ts-select>
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
import DICT from '@/common/dict/';
import {
  mapGetters,
  mapActions
} from 'vuex';
import introPic from './children/introPic';
import navItem from './nav';
export default {
  data() {
    return {
      DICT: {
        SearchType: DICT.SearchType
      },
      inputPlaceHolder: '可输入编号查找',
      searchSelect: 1,
      navItem: navItem
    };
  },
  watch: {
    searchSelect(val) {
      this.inputPlaceHolder = val === 1 ? '可输入编号查找' : '可输入花型编号或者厂家进行搜索';
    }
  },
  methods: {
    ...mapActions(['getCompanyInfo']),
    // // 选择分类的时候
    async handleLookProduct(item) {
      await this.$store.dispatch('getSearchEncoded', {
        companyId: this.$route.params.id,
        category: item.category,
        encoded: item.encoded,
        searchType: this.searchSelect === 1 ? Number(`${this.companyInfo.companyType}00`) : 300
      });
    },
    handleSearchText(val) {
      if (this.searchSelect === 1) {
        this.$router.push({
          path: `searchtext`,
          query: {
            search: val,
            searchType: 1
          }
        });
      } else {
        this.$router.push({
          path: '/search/text',
          query: {
            search: val,
            searchType: 2
          }
        });
      }
    },
    handleGetResult(val) {
      if (this.searchSelect === 1) {
        this.$router.push({
          path: `searchimage`,
          query: {
            imgId: val
          }
        });
      } else {
        this.$router.push({
          path: '/search/image',
          query: {
            imgId: val
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters(['companyInfo', 'search', 'userInfo'])
  },
  async created() {
    if (this.userInfo.userType === 1) {
      this.navItem = this.navItem.filter(item => item.path !== 'supplies');
    }
    // 默认选择第一个 店内
    this.searchSelect = 1;
    document.querySelector('.main-wrapper').style.backgroundColor = '#fff';
    // 获取网店信息
    await this.getCompanyInfo({
      companyId: this.$route.params.id
    });
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
  @component select {
    width: 88px;
    min-width: 80px;
    max-width: 80px;
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
