<template>
  <div class="base-item-wrapper">
    <div class="base-item" :itemId="item.id">
      <div class="img-container">
        <img class="item-image" :src="picUrl">
      </div>
      <div class="item-desc">
        <h2 class="desc-title">{{type==="supply" ? "供应" : "求购"}} {{num}}{{unit}}</h2>
        <p class="desc-text">{{desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    // 区分是求购还是供应
    type: {
      type: String
    }
  },
  data() {
    return {
      num: '',
      desc: '',
      picUrl: ''
    };
  },
  computed: {
    unit() {
      let s;
      if (this.type === 'supply') {
        s = this.item.supplyUnit;
        this.num = this.item.supplyNum;
        this.desc = this.item.supplyDesc;
        this.picUrl = this.item.productPicUrl;
      }
      if (this.type === 'buy') {
        s = this.item.buyUnit;
        this.num = this.item.buyNum;
        this.desc = this.item.buyDesc;
        this.picUrl = this.item.buyPicUrl;
      }
      console.log('s', s);
      if (s === 400010) {
        return '码';
      }
      if (s === 400011) {
        return '公斤';
      }
      if (s === 400012) {
        return '条';
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.base-item
  box-sizing border-box
  width 233px
  height 323px
  padding 16px
  background #fff
  border-left 1px solid #d8d8d8
  cursor pointer
  &:hover
    position relative
    border 1px solid rgba(76, 147, 253, 0.8)
    box-shadow 0 0 5px rgba(76, 147, 253, 0.8)
    z-index 1
  .img-container
    width 200px
    height 200px
    overflow hidden
    background #f2f2f2
    .item-image
      width 100%
      position relative
      top 50%
      transform translateY(-50%)
  .item-desc
    .desc-title
      font-size 24px
      font-weight 200
      height 40px
      line-height 40px
      margin-top 16px
      color #333
    .desc-text
      height 36px
      line-height 36px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      color #999
</style>
