<template>
<div class="supply-list">
  <div class="left-brand">
    <div class="brand-header">
      <div class="brand-name">
        <i class="arrow"></i>
        <i class="arrow-bg"></i>
        <div class="left">
          <p class="brand-title">厂家供应</p>
          <p class="brand-desc">海量厂家真实供货渠道</p>
        </div>
        <div class="right">
          <i class="iconfont icon-gongying"></i>
        </div>
      </div>
    </div>
    <div class="brand-body">
      <ts-input type="textarea" class="supply-textarea" :rows="6" :maxLength="60" placeholder="请填写供应花型的详细描述，如花高，宽幅等信息" v-model="text"></ts-input>
      <ts-button type="plain" size="large" class="supply--button button" @click="releaseSupply">发布供应</ts-button>
    </div>
  </div>
  <div class="right-list">
    <list-tile :title-text="titleText"></list-tile>
    <div class="item-wrapper" v-for="item in data">
      <base-item :item="item" type="purchase" @purchaseClick="goPurchaseDetailPage"></base-item>
    </div>
  </div>
</div>
</template>

<script>
import baseItem from '../baseItem/baseItem';
import listTile from './list-title';
export default {
  data() {
    return {
      titleText: {
        title: '最新贸易商求购',
        extend: '更多求购',
        type: 'purchase'
      },
      data: [],
      text: ''
    };
  },
  watch: {
    purchaseListObj: {
      handler(val) {
        this.data = val.data;
      },
      deep: true
    }
  },
  props: ['purchaseListObj'],
  methods: {
    releaseSupply() {
      this.$router.push({
        path: '/releaseSupplyPage',
        query: {
          text: this.text
        }
      });
    },
    goPurchaseDetailPage(id) {
      this.goto(`/purchaseDetailPage?purchaseId=${id}`);
    }
  },
  components: {
    baseItem,
    listTile
  }
};
</script>

<style lang="stylus" scoped>
basecolor = #4c93fd
.supply-textarea
    max-height 120px
.supply--button.button
  height 48px
  margin-top 32px
  border-color #4c93fd
  color #4c93fd
  font-size 20px
  border-radius 4px
  letter-spacing 1px
.supply-list
  display flex
  box-sizing border-box
  width 100%
  min-height 344px
  background #fff
  .left-brand
    flex 0 0 267px
    width 267px
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
          .icon-gongying::before
          	position relative
          	top 14px
          	color rgba(255,255,255,.3)
      .brand-desc
        height 40px
        line-height 40px
        font-size 16px
        color rgba(255, 255, 255, 0.6)
    .brand-body
      height 176px
      padding 16px
      background #fff
      .input
        display block
        width 208px
        height 106px
        padding 12px
        font-size 16px
        &::-webkit-input-placeholder
          font-size 16px
      .button
        margin-top 26px
  .right-list
    flex 1
    .item-wrapper
      float left
      box-sizing border-box
</style>
