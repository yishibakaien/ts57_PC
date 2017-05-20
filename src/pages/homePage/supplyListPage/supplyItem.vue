
<template>
  <div class="supply-item">
    <div class="supply-item-image-wrapper">
      <img :src="item.productPicUrl" class="image" alt="供应项">
      <p class="info">
        <span class="number">
        	{{item.supplyNum}}
        	<span v-if="item.supplyUnit === 400010">码</span>
        	<span v-if="item.supplyUnit === 400011">公斤</span>
        	<span v-if="item.supplyUnit === 400012">条</span>
        	<span v-if="item.supplyUnit === 400013">吨</span>
        </span>
        <span class="time">{{item.createDate | customTime}}</span>
      </p>
    </div>
    <p class="supply-item-title" :title="item.supplyDesc">{{item.supplyDesc}}
    </p>
    <div class="supply-item-company">
      <img v-lazy="item.userHeadIcon" class="company-avatar" />
      <span class="company-name">{{item.username}}</span>
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
.supply-item
  box-sizing border-box
  width 232px
  height 335px
  padding 16px
  background #fff
  border 1px solid #d8d8d8
  cursor pointer
  &:hover
    border 1px solid rgba(76, 147, 253, 0.8)
    box-shadow 0 0 5px rgba(76, 147, 253, 0.8)
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
      .number
        float left
        margin-left 6px
        font-size 18px
      .time
        float right
        margin-right 6px
        font-size 14px
  .supply-item-title
    position relative
    margin 16px 0
    width 200px
    height 25px
    line-height 25px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

  .supply-item-company
    padding 6px 0
    border-top 1px solid #d8d8d8
    .company-avatar
      display inline-block
      vertical-align top
      height 40px
      width 40px
      border-radius 50%
    .company-name
      display inline-block
      vertical-align top
      height 40px
      line-height 40px
      width 138px
      margin-left 6px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
