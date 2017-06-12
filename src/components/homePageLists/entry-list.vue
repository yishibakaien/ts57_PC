<template>
<div class="entry-list">
  <div class="left-brand">
    <div class="brand-header">
      <div class="brand-name">
        <i class="arrow"></i>
        <i class="arrow-bg"></i>
        <div class="left">
          <p class="brand-title">商家入驻</p>
          <p class="brand-desc">布容错过 坐视布管</p>
        </div>
        <div class="right">
          <i class="iconfont icon-ruzhu"></i>
        </div>
      </div>
    </div>
    <div class="brand-body">
      <!-- <textarea class="input" maxlength="60" placeholder="请填写需求购买花型的详细描述，如花高，宽幅等信息"></textarea> -->
      <div class="entry-nav-box clearfix">
        <div class="entry-nav-item">
          <i class="iconfont entry-nav-icon icon-huaxin"></i>
          <p class="entry-nav-text">卖花型</p>
        </div>
        <div class="entry-nav-item">
          <i class="iconfont entry-nav-icon icon-dingdan"></i>
          <p class="entry-nav-text">找订单</p>
        </div>
        <div class="entry-nav-item">
          <i class="iconfont entry-nav-icon icon-hezuo"></i>
          <p class="entry-nav-text">谈合作</p>
        </div>
        <div class="entry-nav-item">
          <i class="iconfont entry-nav-icon icon-dangkou"></i>
          <p class="entry-nav-text">找客户</p>
        </div>
      </div>
      <div class="entry-button-box">
        <ts-button type="plain" size="large" class="addProduct--button button" @click="handleGotoAddProduct">新增花型</ts-button>
      </div>
    </div>
  </div>
  <div class="right-list">
    <list-tile :title-text="titleText"></list-tile>
    <div class="entry-flexbox">
      <entry-list-item :item="item" v-for="item in newCompanyList"></entry-list-item>
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
        title: '最新入驻',
        extend: '更多商家',
        type: 'entry'
      }
    };
  },
  methods: {
    handleGotoAddProduct() {
      this.$router.push({
        path: '/product/add'
      });
    }
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
<style lang="scss" scoped>
.entry-flexbox {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
}
</style>
<style lang="stylus" scoped>
basecolor = #4c93fd
.entry-list
  display flex
  box-sizing border-box
  width 100%
  .addProduct--button.button
    height 48px
    margin-top 24px
    border-color #4c93fd
    border-radius 4px
    color #4c93fd
    font-size 20px
    border-radius 4px
    letter-spacing 1px
  .left-brand
    flex 0 0 267px 164 +322
    width 267px
    height: 453px;
    background: #fff;
    .brand-header
      height 86px
      padding 12px
      color #fff
      font-family 'Microsoft YaHei'
      background basecolor
      .brand-name
        display flex
        position relative
        .arrow
        	position absolute
        	top -12px
        	left -12px
        	width 0
        	height 0
        	border-top 27px solid #f6f6f6
        	border-right 27px solid transparent
        .arrow-bg
        	position absolute
        	top -12px
        	left -12px
        	width 30px
        	height 30px
        	background url('/static/images/assets/icon/arrow.png')
        .left
          flex 1
          .brand-title
            font-size 28px
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
            font-size 44px
            color rgba(255, 255, 255, 0.6)
          .icon-ruzhu::before
          	position relative
          	top 14px
          	color rgba(255,255,255,.3)
      .brand-desc
        height 40px
        line-height 40px
        font-size 16px
        color rgba(255, 255, 255, 0.6)
    .brand-body
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
          .entry-nav-icon
            display inline-block
            font-size 36px
            line-height 60px
          .entry-nav-text
            font-size 16px
            line-height 30px
          .icon-dangkou::before
          	color #666
      .entry-button-box
        padding 14px
        .button
          width 100%
  .right-list
    flex 1
</style>
