<template>
<div class="quality-company-list">
  <div class="left-brand onepx-r">
    <img class="quality-company-pic" src="/static/images/youzhichangjia.png">
  </div>
  <div class="right-list">
    <div class="item-wrapper">
      <ts-carousel height="546px" v-model="value1" arrow="never" autoplay :autoplay-speed="3000" easing='linear'>
        <ts-carousel-item>
          <ts-grid :data="companys">
            <ts-grid-item style="width:300px;height:183px" v-for="item in companys"  @click="handleViewProduct(item.id)">
              <ts-image width="268" height="150" :canView="false" disabledHover :src="item.pic">
              </ts-image>
            </ts-grid-item>
          </ts-grid>
        </ts-carousel-item>
      </ts-carousel>
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
        color: '#333',
        title: '优质厂家',
        extend: '查看更多'
      },
      Param: {
        pageNo: 1,
        pageSize: 9
      },
      companys: [],
      value1: 0
    };
  },
  async created() {
    this.companys = (await qualityCompanyList1(this.Param)).data.data.list;
    // let count = 9 - this.companys.length;
    // for (let i = 0; i <= count; i++) {
    //   this.companys = this.companys.concat(this.companys);
    // }
    // this.companys = this.companys.splice(0, 9);
    // 优质厂家
  },
  components: {
    listTile,
    companyListItem
  }
};
</script>
