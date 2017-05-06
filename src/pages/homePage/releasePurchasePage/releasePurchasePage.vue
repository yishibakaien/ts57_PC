<template>
  <div class="release-purchase-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="release-purchase-page-box">
      <h1 class="title">发布求购信息</h1>
      <div class="release-purchase-container">

        <div class="release-purchase-items">
          <div class="purchase-item">
            <span class="need">*</span>
            <span class="text">花型分类：</span>
          </div>
          <div class="purchase-item">
            <span class="need">*</span>
            <span class="text">大货类型：</span>
          </div>
          <div class="purchase-item">
            <span class="need">*</span>
            <span class="text">是否接受开机：</span>
          </div>
          <div class="purchase-item">
            <span class="need">&nbsp;&nbsp;</span>
            <span class="text">供应数量：</span>
          </div>
          <div class="purchase-item">
            <span class="need">*</span>
            <span class="text">花型图片：</span>
          </div>
          <div class="purchase-item">
            <span class="need">*</span>
            <span class="text">求购说明：</span>
          </div>
        </div>

        <div class="release-purchase-detail">
          <div class="purchase-categroy line">
            <span class="items active">面料</span>
            <span class="items">大边</span>
            <span class="items">小边</span>
            <span class="items">睫毛</span>
          </div>
          <div class="purchase-type line">
            <span class="items">胚布</span>
            <span class="items">成品</span>
          </div>
          <div class="line">
            <span class="items">接受</span>
            <span class="items">不接受</span>
          </div>
          <div class="line">
            <input class="purchase-num" type="text" placeholder="请输入求购数量">
            <select class="purchase-unit" name="" id="">
              <option value="">公斤</option>
              <option value="">码</option>
              <option value="">吨</option>
            </select>
          </div>
          <div class="line">
            <input type="file">
          </div>
          <div class="purchase-desc-box">
            <textarea class="purchase-desc" name="" id="" cols="30" rows="10" placeholder="请输入求购说明" v-model="text"></textarea>
          </div>
          <div class="release-btn-box">
            <button class="button button-block button-blue">发布求购</button>
          </div>
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
    'vNav': nav
  }
};
</script>

<style lang="stylus" scoped>
.release-purchase-page
  background #fff
  .release-purchase-page-box
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
    .release-purchase-container
      width 800px
      display flex
      margin 50px auto
      .release-purchase-items
        flex 0 0 150px
        width 150px
        text-align center
        .purchase-item
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
      .release-purchase-detail
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
          .purchase-num
            padding 6px
            font-size 16px
          .purchase-unit
            padding 6px
            margin-left 20px
            font-size 16px
        .purchase-desc-box
          .purchase-desc
            display inline-block
            width 100%
            padding 12px
            font-size 16px
        .release-btn-box
          padding 40px 0
          width 200px
</style>
