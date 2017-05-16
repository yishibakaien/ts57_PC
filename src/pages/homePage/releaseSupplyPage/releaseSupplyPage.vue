
<template>
  <div class="release-supply-page">
    <v-header>
    	<search></search>
    </v-header>
    <v-nav></v-nav>
    <div class="release-supply-page-box">
      <h1 class="title">发布厂家供应</h1>
      <div class="release-supply-container">

        <div class="release-supply-items">
          <div class="supply-item">
            <span class="need">*</span>
            <span class="text">花型分类：</span>
          </div>
          <div class="supply-item">
            <span class="need">*</span>
            <span class="text">大货类型：</span>
          </div>
          <div class="supply-item">
            <span class="need">&nbsp;&nbsp;</span>
            <span class="text">供应数量：</span>
          </div>
          <div class="supply-item">
            <span class="need">*</span>
            <span class="text">花型图片：</span>
          </div>
          <div class="supply-item">
            <span class="need">*</span>
            <span class="text">求购说明：</span>
          </div>
        </div>

        <div class="release-supply-detail">
          <div class="supply-categroy line">
            <span class="items active">面料</span>
            <span class="items">大边</span>
            <span class="items">小边</span>
            <span class="items">睫毛</span>
          </div>
          <div class="supply-type line">
            <span class="items">胚布</span>
            <span class="items">成品</span>
          </div>
          <div class="line">
            <input class="supply-num" type="text" placeholder="请输入供应数量">
            <select class="supply-unit" name="" id="">
              <option value="">公斤</option>
              <option value="">码</option>
              <option value="">吨</option>
            </select>
          </div>
          <div class="line">
            <input type="file">
          </div>
          <div class="supply-desc-box">
            <textarea class="supply-desc" name="" id="" cols="30" rows="10" placeholder="请输入供应说明" v-model="text"></textarea>
          </div>
          <div class="release-btn-box">
            <button class="button button-block button-blue">发布供应</button>
          </div>
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

export default {
  data() {
    return {
      text: ''
    };
  },
  created() {
    this.text = this.$route.query.text;
  },
  components: {
    'vHeader': header,
    'vNav': nav,
    search
  }
};
</script>

<style lang="stylus" scoped>
.release-supply-page
  background #fff
  .release-supply-page-box
    width 1200px
    margin 0 auto
    padding 16px 0
    background #fff
    .title
      font-size 24px
      height 100px
      line-height 100px
      padding 0 60px
      border-bottom 1px solid #d8d8d8
    .release-supply-container
      width 800px
      display flex
      margin 50px auto
      .release-supply-items
        flex 0 0 150px
        width 150px
        text-align center
        .supply-item
          height 60px
          .need
            display inline-block
            vertical-align top
            font-size 20px
            color #ff7011
            margin-top 6px
          .text
            display inline-block
            vertical-align top
            margin-top 5px
      .release-supply-detail
        flex 1
        .line
          height 60px
          .items
            display inline-block
            box-sizing border-box
            padding 8px 20px
            margin-left 20px
            color #666
            cursor pointer
            border 1px solid #d8d8d8
            &.active
              background #4c93fd
              color #fff
              border 0
            &:first-child
              margin-left 0
          .supply-num
            padding 6px
            font-size 16px
          .supply-unit
            padding 6px
            margin-left 20px
            font-size 16px
        .supply-desc-box
          .supply-desc
            display inline-block
            width 100%
            padding 12px
            font-size 16px
        .release-btn-box
          padding 40px 0
          width 200px
</style>
