<template>
  <div class="base-item-wrapper">
    <div class="base-item" :itemId="item.id" @click="itemClick(item.id)">
      <div class="img-container">
        <img class="item-image" :src="picUrl">
      </div>
      <div class="item-desc">
        <h2 class="desc-title">{{productNo}}{{typeComputed}} {{num}}{{unit}}</h2>
        <p class="desc-text">
          {{desc}}
          <span class="time" v-if="time">{{time}}</span>
        </p>
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
    // 区分是求购还是供应 还是文本搜索
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
    typeComputed() {
      if (this.type === 'supply') {
        return '供应';
      } else if (this.type === 'purchase') {
        return '求购';
      } else if (this.type === 'searchText') {
        return '';
      }
    },
    productNo() {
      if (this.type === 'searchText') {
        return this.item.productNo;
      } else {
        return '';
      }
    },
    time() {
      if (this.item.time) {
        return this.item.time;
      } else {
        return '';
      }
    },
    unit() {
      let unit;
      if (this.type === 'supply') {
        unit = this.item.supplyUnit;
        this.num = this.item.supplyNum;
        this.desc = this.item.supplyDesc;
        this.picUrl = this.item.productPicUrl;
      }
      if (this.type === 'buy') {
        unit = this.item.buyUnit;
        this.num = this.item.buyNum;
        this.desc = this.item.buyDesc;
        this.picUrl = this.item.buyPicUrl;
      }
      if (this.type === 'searchText') {
        this.picUrl = this.item.defaultPicUrl;
        this.desc = this.item.companyName;
      }
      if (unit === 400010) {
        return '码';
      }
      if (unit === 400011) {
        return '公斤';
      }
      if (unit === 400012) {
        return '条';
      }
    }
  },
  methods: {
    itemClick(id) {
      console.log(id);
      console.log(this.type);
      if (this.type === 'buy') {
        console.log('purchaseClick');
        this.$emit('purchaseClick', id);
      }
      if (this.type === 'supply') {
        console.log('supplyClick');
        this.$emit('supplyClick', id);
      }
      if (this.type === 'searchText') {
        console.log('searchTextClick');
        this.$emit('searchTextClick', id);
      }
      console.log('clicked');
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
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .desc-text
      position relative
      height 36px
      line-height 36px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      color #999
      .time
        position absolute
        right 0
</style>
