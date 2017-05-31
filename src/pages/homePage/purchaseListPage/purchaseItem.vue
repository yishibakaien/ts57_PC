
<template>
  <div class="purchase-item">
    <div class="purchase-item-image-wrapper">
      <img v-lazy="item.buyPicUrl" class="image" alt="购买项" />
      <p class="info">
        <span class="number">{{item.buyNum}}码</span>
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
    <div class="purchase-item-person">
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
  height 328px
  padding 16px
  background #fff
  border 1px solid #d8d8d8
  cursor pointer
  &:hover
    border 1px solid rgba(76, 147, 253, 0.8)
    box-shadow 0 0 5px rgba(76, 147, 253, 0.8)
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
      background rgba(0, 0, 0, 0.4);
      .number
        float left
        margin-left 6px
        font-size 18px
      .status
        float right
        margin-right 6px
        font-size 14px
  .purchase-item-title
    position relative
    margin 16px 0
    width 200px
    height 25px
    line-height 25px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

  .purchase-item-person
    padding 6px 0
    border-top 1px solid #d8d8d8
    .name
      display inline-block
      width 120px
      height 40px
      line-height 40px
      font-size 15px
      color #666
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .time
      display inline-block
      float right
      height 40px
      line-height 40px
      font-size 14px
      color #999
</style>
