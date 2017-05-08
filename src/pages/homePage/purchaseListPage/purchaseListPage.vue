
<template>
  <div class="purchase-list-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="purchase-list-page-box">
      我是求购列表页面
      <!-- 筛选器 -->
      <div class="filter-container">
        <div class="category filter-list">
          <p class="filter-title">求购分类</p>
          <p class="filter-detail">
            <span class="item" v-for="item in categoryItems" :class="{active: categoryActiveItem===item}" >{{item}}</span>
          </p>
        </div>
        <div class="component filter-list">
          <p class="filter-title">求购布样</p>
          <p class="filter-detail">
            <span class="item" v-for="item in componentItems" :class="{active: componentActiveItem===item}" >{{item}}</span>
          </p>
        </div>
        <div class="stock filter-list">
        <p class="filter-title">接受开机</p>
        <p class="filter-detail">
          <span class="item" v-for="item in isStartUpItems" :class="{active: isStartUpActiveItem===item}" >{{item}}</span>
        </p>
      </div>
      </div>
      <!-- 列表 -->
      <div class="pruchase-list-item-wrapper clearfix">
        <div class="item-wrapper" v-for="item in [1,1,1,1,1,1,1]">
          <purchase-item></purchase-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  header,
  nav
} from '../../../components';

import purchaseItem from './purchaseItem';
export default {
  data() {
    return {
      categoryItems: ['全部', '面料', '大边', '小边', '睫毛'],
      componentItems: ['全部', '成品', '胚布'],
      isStartUpItems: ['全部', '接受', '不接受'],
      categoryActiveItem: '全部',
      componentActiveItem: '全部',
      isStartUpActiveItem: '全部'
    };
  },
  components: {
    'vHeader': header,
    'vNav': nav,
    purchaseItem
  }
};
</script>

<style lang="stylus" scoped>
.purchase-list-page
  background #fff
  .purchase-list-page-box
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
    .pruchase-list-item-wrapper
      margin-top 32px
      .item-wrapper
        float left
        margin-left 10px
        margin-top 10px
        &:nth-of-type(5n + 1)
          margin-left 0
</style>
