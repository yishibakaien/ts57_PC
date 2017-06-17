
<template>
  <div class="purchase-item onepx">
    <div class="purchase-item-image-wrapper">
      <ts-image width="200" height="200" :canView="false" :src="item.buyPicUrl" disabledHover></ts-image>
      <p class="info">
        <span class="number">{{item.buyNum>0?`${item.buyNum} 码`:'大量现货'}}</span>
        <span class="status" v-if="item.buyStatus === 1">
        	<em v-if="item.buyTaskFlag === 1">我已接单</em>
        	<em v-else-if="item.buyTaskCount > 0">{{item.buyTaskCount}}人接单</em>
        	<em v-else>求购中</em>
        </span>
        <span class="status" v-if="item.buyStatus === 2">
        	<em v-if="item.buyTaskFlag === 2">已成交</em>
        	<em v-else>已完成</em>
        </span>
        <span class="status" v-if="item.buyStatus === 3">已关闭</span>
      </p>
    </div>
    <p class="purchase-item-title" :title="item.buyDesc">{{item.buyDesc}}
    </p>
    <div class="purchase-item-person onepx-t">
      <span class="name">{{item.userName}}</span>
      <span class="time">{{item.createDate | customTime}}</span>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		item: {}
	}
};
</script>

<style lang="stylus" scoped>
.purchase-item
  box-sizing border-box
  width 232px
  height 312px
  padding 16px
  background #fff
  /*border 1px solid #eaeaea*/
  cursor pointer
  transition .8s
  &:hover
    box-shadow  0 2px 4px 0 rgba(76,147,253,0.3), 0 0 6px 0 rgba(76,147,253,0.3)
  .purchase-item-image-wrapper
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
      background rgba(0, 0, 0, 0.4)
      font-size 14px
      .number
        float left
        margin-left 6px
      .status
        float right
        margin-right 6px
  .purchase-item-title
    position relative
    margin 16px 0
    width 200px
    height 25px
    font-size 16px
    line-height 25px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

  .purchase-item-person
    font-size 13px
    .name
      display inline-block
      width 120px
      line-height 39px
      color #666
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .time
      display inline-block
      float right
      line-height 39px
      color #999
</style>
