<template>
  <div class="entry-list">
    <div class="left-brand">
      <div class="brand-header">
        <div class="brand-name">
          <div class="left">
            <p class="brand-title">厂家入驻</p>
            <p class="en">ENTRY</p>
          </div>
          <div class="right">
            <i class="iconfont">字</i>
          </div>
        </div>
        <p class="brand-desc">不容错过 坐视布管</p>
      </div>
      <div class="brand-body">
        <!-- <textarea class="input" maxlength="60" placeholder="请填写需求购买花型的详细描述，如花高，宽幅等信息"></textarea> -->
        <div class="entry-nav-box clearfix">
          <div class="entry-nav-item">
            <i class="iconfont entry-nav-icon">字</i>
            <p class="entry-nav-text">卖花型</p>
          </div>
          <div class="entry-nav-item">
            <i class="iconfont entry-nav-icon">字</i>
            <p class="entry-nav-text">找订单</p>
          </div>
          <div class="entry-nav-item">
            <i class="iconfont entry-nav-icon">字</i>
            <p class="entry-nav-text">谈合作</p>
          </div>
          <div class="entry-nav-item">
            <i class="iconfont entry-nav-icon">字</i>
            <p class="entry-nav-text">找档口</p>
          </div>
        </div>
        <div class="entry-button-box">
          <button class="button button-plain button-block button-plain-pink">申请入驻</button>
        </div>
      </div>
    </div>
    <div class="right-list">
      <list-tile :title-text="titleText"></list-tile>
      <div class="item-wrapper"  v-for="item in newCompanyList">
        <entry-list-item :item="item"></entry-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import listTile from './list-title';
import entryListItem from './entry-list-item';
export default {
  data() {
    return {
      titleText: {
        title: '厂家入驻',
        color: '#ff7478',
        extend: '更多厂家',
        type: 'entry'
      }
    };
  },
  components: {
    listTile,
    entryListItem
  },
  props: {
    newCompanyList: {
      type: Array
    }
  }
};
</script>

<style lang="stylus" scoped>
basecolor = #ff7478
.entry-list
  display flex
  box-sizing border-box
  width 100%
  .left-brand
    flex 0 0 267px 164 +322
    width 267px
    height 486px
    .brand-header
      height 132px
      padding 16px
      color #fff
      font-family 'Microsoft YaHei'
      background basecolor
      .brand-name
        display flex
        .left
          flex 1
          .brand-title
            font-size 36px
            height 45px
            line-height 45px
          .en
            font-size 24px
            height 25px
            line-height 30px
            color rgba(255, 255, 255, 0.6)
        .right
          flex 0 0 60px
          width 60px
          height 75px
          line-height 75px
          .iconfont
            font-size 60px
            color rgba(255, 255, 255, 0.6)
      .brand-desc
        height 80px
        line-height 80px
        font-size 20px
        color rgba(255, 255, 255, 0.6)
    .brand-body
      background #fff
      .entry-nav-box
        color #666
        .entry-nav-item
          box-sizing border-box
          padding 16px
          width 50%
          height 120px
          float left
          border 1px solid #f7f7f7
          text-align center
          cursor pointer
          &:hover
            color #ff7478
          .entry-nav-icon
            display inline-block
            font-size 36px
            line-height 60px
          .entry-nav-text
            font-size 18px
            line-height 30px
      .entry-button-box
        padding 16px
        .button
          width 100%
  .right-list
    flex 1
    .item-wrapper
      float left
      box-sizing border-box
</style>
