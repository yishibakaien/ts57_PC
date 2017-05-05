<template>
  <div class="text-search-result-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="text-search-result-page-box">
      <p class="search-value">全部结果 > {{result.searchText}}</p>
      <v-filter></v-filter>
      <div class="result-container clearfix">
        <div class="result-item-wrapper"  v-for="item in result.data.list">
          <base-item :item="item" :type="'searchText'"></base-item>
        </div>
      </div>
      <div class="ifNone" v-if="result.data.list.length === 0">
        暂无更多搜索结果
      </div>
      <paginator :page-message="pageMessage"></paginator>
    </div>
  </div>
</template>

<script>
import {
  header,
  nav,
  baseItem,
  filter,
  paginator
} from '../../../components';
// // api 请求
import {search} from '../../../common/api/api';
import * as types from '../../../store/types';

export default {
  data() {
    return {
      aa: ''
    };
  },
  created() {
    // 处理搜索结果页刷新页面
    if (!this.$store.state.searchResult.searchText) {
      search({
        keywords: localStorage.searchText,
        pageSize: 15,  // 每页数量 默认10
        searchType: 2  // 搜索类型 1:店铺搜索 2:全局搜索
      }).then(res => {
        this.$router.push({
          path: 'textSearchResultPage'
        });
        // 储存搜索字段
        let _data = res.data;
        console.log('搜索结果页字段', _data);
        _data.searchText = localStorage.searchText;
        this.$store.commit(types.SEARCH_RESULT, _data);
      });
    }
  },
  components: {
    vHeader: header,
    vNav: nav,
    baseItem,
    vFilter: filter,
    paginator
  },
  computed: {
    result() {
      return this.$store.state.searchResult;
    },
    pageMessage() {
      let _data = this.$store.state.searchResult.data;
      let data = {};
      data.totalNum = _data.totalNum;
      data.totalPage = _data.totalPage;
      data.pageNO = _data.pageNO;
      return data;
    }
  }
};
</script>

<style lang="stylus" scoped>
.text-search-result-page
  background #f2f2f2
  .text-search-result-page-box
    width 1200px
    margin 0 auto
    padding 16px 0
    background #f2f2f2
    .search-value
      height 60px
      line-height 60px
      color #666
    .result-container
      width 100%
      margin 16px auto
      .result-item-wrapper
        float left
        margin-left 7px
        margin-top 8px
        &:nth-of-type(5n + 1)
          margin-left 0
    .ifNone
      text-align center
      height 100px
      line-height 100px
</style>
