
<template>
<div class="supply-item onepx">
  <div class="supply-item-image-wrapper" @click="clickMethod">
    <!-- <img v-lazy="" class="image" alt="供应项"> -->
    <ts-image width="200" height="200" :canView="false" :src="item.productPicUrl" disabledHover></ts-image>
    <p class="info">
      <span class="number">
        	{{item.supplyNum}}&nbsp;{{item.supplyUnit | filterDict(dicTree.PRODUCT_UNIT,'name') }}
      </span>
      <span class="time">{{item.createDate | customTime}}</span>
    </p>
  </div>
  <p class="supply-item-title" :title="item.supplyDesc">{{item.supplyDesc}}
  </p>
  <div class="supply-item-company onepx-t">
    <!-- <img :src="item.userHeadIcon" v-errorImg class="company-avatar" /> -->
    <ts-image width="25" height="25" shape="round" :canView="false" :src="item.userHeadIcon" disabledHover style="vertical-align:initial"></ts-image>
    <span class="company-name">{{item.userName}}</span>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
export default {
  methods: {
    clickMethod() {
      this.$emit('clickMethod');
    }
  },
  computed: {
    ...mapGetters(['dicTree'])
  },
  props: {
    item: {}
  }
};
</script>

<style lang="stylus" scoped>
.supply-item
  box-sizing border-box
  width 232px
  height 311px
  padding 16px
  background #fff
  cursor pointer
  transition .8s
  &:hover
    box-shadow  0 2px 4px 0 rgba(76,147,253,0.3), 0 0 6px 0 rgba(76,147,253,0.3)
  .supply-item-image-wrapper
    position relative
    width 200px
    height 200px
    overflow hidden
    .image
      width 100%
      position relative
      top 50%
      transform translateY(-50%);
    .info
      position absolute
      bottom 0
      width 200px
      height 32px
      line-height 32px
      color #fff
      background rgba(0, 0, 0, 0.4);
      font-size 14px
      .number
        float left
        margin-left 6px
      .time
        float right
        margin-right 6px
  .supply-item-title
    position relative
    margin 16px 0
    width 200px
    height 25px
    line-height 25px
    overflow hidden
    font-size 16px
    text-overflow ellipsis
    white-space nowrap

  .supply-item-company
    padding-top 6px
    .company-avatar
      display inline-block
      vertical-align top
      height 26px
      width 26px
      border-radius 50%
    .company-name
      display inline-block
      line-height 26px
      width 138px
      color #999
      font-size 13px
      margin-left 6px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
