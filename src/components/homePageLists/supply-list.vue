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
      <ts-input type="textarea" :rows="6" :maxLength="60" placeholder="请填写供应花型的详细描述，如花高，宽幅等信息" v-model="text"></ts-input>
        <button @click="releaseSupply" class="button button-plain button-block button-plain-blue">发布供应</button>
      </div>
    </div>
    <div class="right-list">
      <list-tile :title-text="titleText"></list-tile>
      <div class="item-wrapper"  v-for="item in supplyListObj.data">
        <base-item :item="item" :type="supplyListObj.type" @supplyClick="goSupplyDetailPage"></base-item>
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
        title: '最新供应',
        extend: '更多供应',
        type: 'supply'
      },
      text: ''
    };
  },
  methods: {
    releaseSupply() {
      this.$router.push({
        path: '/releaseSupplyPage',
        query: {
          text: this.text
        }
      });
    },
    goSupplyDetailPage(id) {
      this.$router.push({
        path: '/supplyDetailPage',
        query: {
          supplyId: id
        }
      });
    }
  },
  components: {
    baseItem,
    listTile
  },
  props: {
    supplyListObj: {}
  }
};
</script>

<style lang="stylus" scoped>
basecolor = #4c93fd
.supply-list
  display flex
  box-sizing border-box
  width 100%
  height 384px
  .left-brand
    flex 0 0 267px
    width 267px
    height 384px
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
      .brand-desc
        height 40px
        line-height 40px
        font-size 16px
        color rgba(255, 255, 255, 0.6)
    .brand-body
      height 213px
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
        margin-top 36px
  .right-list
    flex 1
    .item-wrapper
      float left
      box-sizing border-box
</style>
