
<template>
  <div class="purchase-item">
    <div class="purchase-item-image-wrapper">
      <img class="image" alt="购买项">
      <p class="info">
        <span class="number">2000码</span>
        <span class="status">求购中</span>
      </p>
    </div>
    <p class="purchase-item-title">大量购买，有多少要多少大量购买，有多少要多少大量求购，有多少要多少啊啊啊啊啊啊
    </p>
    <div class="purchase-item-person">
      <span class="name">谭华美</span>
      <span class="time">2017-05-08</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.purchase-item
  box-sizing border-box
  width 232px
  height 354px
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
    height 50px
    line-height 25px
    overflow hidden
    text-overflow ellipsis

  .purchase-item-person
    padding 6px 0
    border-top 1px solid #d8d8d8
    .name
      display inline-block
      vertical-align top
      height 40px
      line-height 40px
      font-size 15px
      color #666
    .time
      display inline-block
      float right
      height 40px
      line-height 40px
      font-size 14px
      color #999
</style>
