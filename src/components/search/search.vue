<template>
  <div class="search">

    <input class="search-input" @keyup.13="searchText" type="text" v-model="text" placeholder="可输入厂名或花型编号查找">
    <div class="choose-pic">
      <!-- <i class="iconfont">字</i> -->
      <pic-upload class="choose-input" ref="fileUpload"></pic-upload>
      <!-- <input class="choose-input" type="file" title="上传图片搜图"> -->
    </div>
    <div class="search-btn" title="搜索" @click="searchText">
        搜索
    </div>
  </div>
</template>

<script>
import picUpload from '../picUpload/picUpload';
import * as types from '../../store/types';
import {search} from '../../common/api/api';
export default {
  data() {
    return {
      text: ''
    };
  },
  components: {
    picUpload
  },
  methods: {
    searchText() {
      if (!this.text) {
        alert('请输入搜索内容');
        return;
      }
      search({
        keywords: this.text,
        pageSize: 15,  // 每页数量 默认10
        searchType: 2  // 搜索类型 1:店铺搜索 2:全局搜索
      }).then(res => {
        this.$router.push({
          path: 'textSearchResultPage'
        });
        // 储存搜索字段
        let _data = res.data;
        console.log(this.text);
        _data.searchText = this.text;
        this.$store.commit(types.SEARCH_RESULT, _data);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
  .search
    position relative
    width 590px
    height 40px
    box-sizing border-box
    border 2px solid #4c93fd
    font-size 0
    .search-input
      display inline-block
      width 442px
      height 24px
      line-height 24px
      padding 6px 0 6px 12px
      vertical-align top
      font-size 16px
      border 0
      &::-webkit-input-placeholder
        font-size 14px
        line-height 24px
    .choose-pic
      position absolute
      right 134px
      top 0
      height 36px
      width 40px
      padding 0 4px
      // overflow hidden
      .iconfont
        display inline-block
        position absolute
        z-index 1
        right 0
        width 40px
        height 36px
        line-height 36px
        padding 0 4px
        font-size 18px
        color #3385ff
        text-align center
      .choose-input
        position absolute
        z-index 2
        right 0
        top 0
        height 36px
        width 40px
        padding 0 4px
        // opacity 0
        // background transparent
        cursor pointer
    .search-btn
      display inline-block
      height 36px
      line-height 36px
      width 132px
      vertical-align top
      font-size 20px
      text-align center
      background #4c93fd
      color #fff
      cursor pointer
</style>
