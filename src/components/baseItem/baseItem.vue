<template>
<div class="base-item-wrapper">
  <div class="base-item" :itemId="item.id" @click="itemClick(item.id)">
    <div class="img-container">
      <ts-image :src="picUrl" width="200" height="200" :canView="false" disabledHover></ts-image>
    </div>
    <div class="item-desc">
      <h2 class="desc-title" v-show="false"><span>{{productNo}}{{typeComputed}} </span>{{num}}{{unit}}</h2>
      <h2 class="desc-title">{{desc}}</h2>
      <span class="time" v-if="time">{{time}}</span>
    </div>
    <p class="onepx-t footer">
      <ts-image shape="round" :src="userHeadIcon" width="30" height="30" :canView="false" disabledHover></ts-image>&nbsp;&nbsp;{{userName}}
    </p>

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
      picUrl: '',
      userName: ''
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
      this.$nextTick(() => {
        if (this.type === 'supply') {
          unit = this.item.supplyUnit;
          this.num = this.item.supplyNum;
          this.desc = this.item.supplyDesc;
          this.picUrl = this.item.productPicUrl;
          this.userName = this.item.userName;
          this.userHeadIcon = this.item.userHeadIcon;
        }
        if (this.type === 'purchase') {
          unit = this.item.buyUnit;
          this.num = this.item.buyNum;
          this.desc = this.item.buyDesc;
          this.picUrl = this.item.buyPicUrl;
          this.userName = this.item.userName;
          this.userHeadIcon = this.item.userHeadIcon;
        }
        if (this.type === 'searchText') {
          this.picUrl = this.item.defaultPicUrl;
          this.desc = this.item.companyName;
        }
      });
      let unit;
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
      if (this.type === 'purchase') {
        this.$emit('purchaseClick', id);
      }
      if (this.type === 'supply') {
        this.$emit('supplyClick', id);
      }
      if (this.type === 'searchText') {
        this.$emit('searchTextClick', id);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.footer
  line-height 40px
  text-overflow ellipsis
  white-space nowrap
  font-size 14px
  color #999
.base-item
  box-sizing border-box
  width 233px
  height 294px
  padding 16px
  background #fff
  border-left 1px solid #eaeaea
  cursor pointer
  transition .8s
  &:hover
    position relative
    box-shadow 0 2px 4px 0 rgba(76,147,253,0.30), 0 0 6px 0 rgba(76,147,253,0.30)
    z-index 1
  .img-container
    width 200px
    height 200px
    overflow hidden
    .item-image
      width 100%
      position relative
      top 50%
      transform translateY(-50%)
  .item-desc
    .desc-title
      font-size 16px
      font-weight 200
      height 30px
      line-height 30px
      margin 4px 0
      color #333
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      span
      	color #333
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
