<template>
  <div class="supply-list">
    <div class="left-brand">
      <div class="brand-header">
        <div class="brand-name">
          <div class="left">
            <p class="brand-title">厂家供应</p>
          </div>
          <div class="right">
            <i class="iconfont">字</i>
          </div>
        </div>
        <p class="brand-desc">海量厂家真实供货渠道</p>
      </div>
      <div class="brand-body">
        <textarea class="input" maxlength="60" placeholder="请填写需求购买花型的详细描述，如花高，宽幅等信息" v-model="text"></textarea>
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
      height 70px
      padding 12px 16px
      color #fff
      font-family 'Microsoft YaHei'
      background basecolor
      .brand-name
        display flex
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
            font-size 42px
            color rgba(255, 255, 255, 0.6)
      .brand-desc
        height 40px
        line-height 40px
        font-size 16px
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
