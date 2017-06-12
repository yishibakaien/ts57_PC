<template>
  <div class="quality-company-list">
    <div class="left-brand onepx-r">
      <img class="quality-company-pic" src="/static/images/youzhichangjia.png">
    </div>
    <div class="right-list">
      <div class="item-wrapper">
        <company-list-item :message="item" v-for="item in message"></company-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import listTile from './list-title';
import companyListItem from './company-list-item';
export default {
  data() {
    return {
      titleText: {
        color: '#333',
        title: '优质厂家',
        extend: '查看更多'
      }
    };
  },
  components: {
    listTile,
    companyListItem
  },
  props: ['message']
};
</script>

<style lang="stylus" scoped>
.quality-company-list
  display flex
  box-sizing border-box
  width 100%
  .left-brand
    flex 0 0 300px
    width 300px
    height 546px
    .quality-company-pic
      width 100%
      height 100%
  .right-list
    flex 1
    background #fff
    .item-wrapper
      display:flex
      flex-wrap wrap
</style>
