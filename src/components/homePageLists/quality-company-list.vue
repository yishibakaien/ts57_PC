<template>
<div class="quality-company-list">
  <div class="left-brand onepx-r">
    <img class="quality-company-pic" src="/static/images/youzhichangjia.png">
  </div>
  <div class="right-list">
    <div class="item-wrapper">
      <!-- <ts-carousel v-model="value1" arrow="always" autoplay :autoplay-speed="3000" easing='linear'> -->
        <!-- <ts-carousel-item> -->
          <ts-grid>
            <ts-grid-item style="width:300px;height:183px" v-for="item in companys" @click="handleViewProduct(item.id)">
              <ts-image
               width="268"
               height="150"
               :canView="false"
               disabledHover
               :src="item.pic">
               </ts-image>
             </ts-grid-item>
          </ts-grid>
        <!-- </ts-carousel-item> -->
      <!-- </ts-carousel> -->
    </div>
  </div>
</div>
</template>

<script>
import listTile from './list-title';
import {
  qualityCompanyList1
} from '@/common/api/api';
import companyListItem from './company-list-item';
export default {
  data() {
    return {
      titleText: {
        companys: [],
        value1: 0,
        color: '#333',
        title: '优质厂家',
        extend: '查看更多'
      }
    };
  },
  created() {
    // 优质厂家
    qualityCompanyList1().then((res) => {
      this.companys = res.data.data.list;
      let count = 9 - this.companys.length;
      for (let i = 0; i <= count; i++) {
        this.companys = this.companys.concat(this.companys);
      }
      this.companys = this.companys.splice(0, 9);
    }).catch((res) => {});
  },
  components: {
    listTile,
    companyListItem
  },
  props: ['message']
};
</script>

<style lang="stylus" scoped>
.quality-company-list
  display flex
  box-sizing border-box
  width 100%
  background #fff
  .left-brand
    flex 0 0 300px
    width 300px
    height 546px
    .quality-company-pic
      width 100%
      height 100%
  .right-list
    flex 1
    background #fff
    .item-wrapper
      display:flex
      flex-wrap wrap
</style>
