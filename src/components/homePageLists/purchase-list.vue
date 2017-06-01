<template>
  <div class="purchase-list">
    <div class="left-brand">
      <div class="brand-header">
        <div class="brand-name">
        	<i class="arrow"></i>
        	<i class="arrow-bg"></i>
          <div class="left">
            <p class="brand-title">档口求购</p>
            <p class="brand-desc">海量档口真实采购需求</p>
          </div>
          <div class="right">
            <i class="icon-qiugou"></i>
          </div>
        </div>
      </div>
      <div class="brand-body">
        <ts-input type="textarea" :rows="6" :maxLength="60" placeholder="请填写求购花型的详细描述，如花高，宽幅等信息" v-model="text"></ts-input>
        <button @click="releasePurchase" class="button button-plain button-block button-plain-blue">发布求购</button>
      </div>
    </div>
    <div class="right-list">
      <list-tile :title-text="titleText"></list-tile>
      <div class="item-wrapper"  v-for="item in purchaseListObj.data">
        <base-item :item="item" :type="purchaseListObj.type" @purchaseClick="goPurchaseDetailPage" :key="item"></base-item>
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
        color: '#4c93fd',
        title: '最新求购',
        extend: '更多求购',
        type: 'purchase'
      },
      text: ''
    };
  },
  props: {
    purchaseListObj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    releasePurchase() {
      this.$router.push({
        path: '/releasePurchasePage',
        query: {
          text: this.text
        }
      });
    },
    goPurchaseDetailPage(id) {
      this.$router.push({
        path: '/purchaseDetailPage',
        query: {
          purchaseId: id
        }
      });
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
.purchase-list
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
          .icon-qiugou
            font-size 44px
            color rgba(255, 255, 255, 0.6)
            &::before 
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
