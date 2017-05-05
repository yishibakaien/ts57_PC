<template>
  <div class="purchase-list">
    <div class="left-brand">
      <div class="brand-header">
        <div class="brand-name">
          <div class="left">
            <p class="brand-title">档口求购</p>
            <p class="en">PURCHASE</p>
          </div>
          <div class="right">
            <i class="iconfont">字</i>
          </div>
        </div>
        <p class="brand-desc">海量档口真实采购需求</p>
      </div>
      <div class="brand-body">
        <textarea class="input" maxlength="60" placeholder="请填写需求购买花型的详细描述，如花高，宽幅等信息"></textarea>
        <button class="button button-plain button-block button-plain-blue">发布求购</button>
      </div>
    </div>
    <div class="right-list">
      <list-tile :title-text="titleText"></list-tile>
<<<<<<< HEAD
      <div class="item-wrapper"  v-for="item in [1,2,3,4]">
        <base-item></base-item>
=======
      <div class="item-wrapper"  v-for="item in purchaseListObj.data">
        <base-item :item="item" :type="purchaseListObj.type"></base-item>
>>>>>>> all
      </div>
    </div>
  </div>
</template>

<script>
import baseItem from '../baseItem/baseItem';
import listTile from './list-title';
export default {
<<<<<<< HEAD
=======
  props: {
    purchaseListObj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
>>>>>>> all
  data() {
    return {
      titleText: {
        color: '#4c93fd',
        title: '最新求购',
        extend: '更多求购'
      }
    };
  },
  components: {
    baseItem,
    listTile
<<<<<<< HEAD
  },
  props: {
    message: {
      type: Object
    }
=======
>>>>>>> all
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
      height 188px
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
        margin-top 16px
  .right-list
    flex 1
    .item-wrapper
      float left
      box-sizing border-box
</style>
