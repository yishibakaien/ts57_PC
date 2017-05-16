<template>
  <div class="supply-list-page">
    <v-header>
    	<search></search>
    </v-header>
    <v-nav></v-nav>
    <div class="supply-list-page-box">
      我是供应列表页面
      <!-- 筛选器 -->
      <div class="filter-container">
        <div class="category filter-list">
          <p class="filter-title">供应分类</p>
          <p class="filter-detail">
            <span class="item" v-for="item in categoryItems" :class="{active: categoryActiveItem===item}">{{item}}</span>
          </p>
        </div>
        <div class="component filter-list">
          <p class="filter-title">供应布样</p>
          <p class="filter-detail">
            <span class="item" v-for="item in componentItems" :class="{active: componentActiveItem===item}">{{item}}</span>
          </p>
        </div>
      </div>
      <!-- 列表 -->
      <div class="supply-list-item-wrapper clearfix">
        <div class="item-wrapper" v-for="item in [1,1,1,1,1,1,1]">
          <supply-item></supply-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  header,
  nav,
  search
} from '@/components';
import supplyItem from './supplyItem';
export default {
  data() {
    return {
      categoryItems: ['全部', '面料', '大边', '小边', '睫毛'],
      componentItems: ['全部', '成品', '胚布'],
      categoryActiveItem: '全部',
      componentActiveItem: '全部'
    };
  },
  components: {
    'vHeader': header,
    'vNav': nav,
    search,
    supplyItem
  }
};
</script>

<style lang="stylus" scoped>
  .supply-list-page
    background #fff
    .supply-list-page-box
      width 1200px
      margin 0 auto
      padding 16px 0
      background #fff
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
      .supply-list-item-wrapper
        margin-top 32px
        .item-wrapper
          float left
          margin-left 10px
          margin-top 10px
          &:nth-of-type(5n + 1)
            margin-left 0
</style>
