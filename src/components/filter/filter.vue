<!-- 索索结果的筛选器 -->
<template>
  <div class="filter">
    <div class="filter-container">
      <div class="category filter-list">
        <p class="filter-title">分类</p>
        <p class="filter-detail">
          <span class="item" v-for="item in categoryItems" :class="{active: categoryActiveItem===item}" @click="selectCategory(item)">{{item}}</span>
        </p>
      </div>
      <div class="component filter-list">
        <p class="filter-title">成分</p>
        <p class="filter-detail">
          <span class="item" v-for="item in componentItems" :class="{active: componentActiveItem===item}" @click="selectComponent(item)">{{item}}</span>
        </p>
      </div>
      <div class="stock filter-list">
        <p class="filter-title">库存盘点</p>
        <p class="filter-detail">
          <span class="item" v-for="item in stockItems" :class="{active: stockActiveItem===item}" @click="selectStock(item)">{{item}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '../../store/types';
import {searchMtd} from '../../common/api/api';
function _formateCategory(str) {
  if (str === '面料') {
    return 100010;
  } else if (str === '大边') {
    return 100011;
  } else if (str === '小边') {
    return 100012;
  } else if (str === '睫毛') {
    return 100013;
  } else if (str === '全部') {
    return '';
  }
};
function _formateStockType(str) {
  if (str === '有库存') {
    return 2;
  } else if (str === '需要开机') {
    return 0;
  } else if (str === '全部') {
    return '';
  }
};
export default {
  data() {
    return {
      categoryItems: ['全部', '面料', '大边', '小边', '睫毛'],
      componentItems: ['全部', '锦纶', '锦氨'],
      stockItems: ['全部', '有库存', '需要开机'],
      categoryActiveItem: '全部',
      componentActiveItem: '全部',
      stockActiveItem: '全部'
    };
  },
  methods: {
    selectCategory(item) {
      this.categoryActiveItem = item;
      searchMtd({
        category: _formateCategory(this.categoryActiveItem),
        stockType: _formateStockType(this.stockActiveItem),
        keywords: localStorage.searchText,
        pageSize: 15,  // 每页数量 默认10
        searchType: 2  // 搜索类型 1:店铺搜索 2:全局搜索
      }).then(res => {
        console.log(res);
        var _data = res.data;
        _data.searchText = localStorage.searchText;
        _data.category = _formateCategory(this.categoryActiveItem) || '';
        _data.stockType = _formateStockType(this.stockActiveItem) || 0;
        this.$store.commit(types.SEARCH_RESULT, _data);
      });
    },
    selectComponent(item) {
      this.componentActiveItem = item;
    },
    selectStock(item) {
      this.stockActiveItem = item;
      searchMtd({
        category: _formateCategory(this.categoryActiveItem),
        stockType: _formateStockType(this.stockActiveItem),
        keywords: localStorage.searchText,
        pageSize: 15,  // 每页数量 默认10
        searchType: 2  // 搜索类型 1:店铺搜索 2:全局搜索
      }).then(res => {
        console.log(res);
        var _data = res.data;
        _data.searchText = localStorage.searchText;
        _data.category = _formateCategory(this.categoryActiveItem) || '';
        _data.stockType = _formateStockType(this.stockActiveItem) || 0;
        this.$store.commit(types.SEARCH_RESULT, _data);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.filter
  .filter-container
    .filter-list
      display flex
      width 100%
      height 40px
      line-height 40px
      font-size 16px
      border-top 1px solid #d8d8d8
      &:last-child
        border-bottom 1px solid #d8d8d8
      .filter-title
        flex 0 0 200px
        box-sizing border-box
        width 200px
        height 40px
        text-align center
        background #e5e5e5
        color #666
        border-left 1px solid #d8d8d8
      .filter-detail
        flex 1
        box-sizing border-box
        height 40px
        background #fff
        border-right 1px solid #d8d8d8
        .item
          display inline-block
          height 40px
          line-height 40px
          width 80px
          text-align center
          cursor pointer
          &:hover
            color #4c93fd
          &.active
            color #4c93fd

</style>
