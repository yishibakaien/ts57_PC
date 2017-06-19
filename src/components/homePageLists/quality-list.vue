<template lang="html">
  <!-- 优质厂家 -->
  <div class="quality-company-list">
    <div class="left-brand onepx-r">
      <img class="quality-company-pic" src="/static/images/youzhichangjia.png">
    </div>
    <div class="right-list">
      <div class="item-wrapper">
        <ts-carousel height="546px" autoplay-speed="6000" dots="none" autoplay arrow="always" easing='linear'>
          <ts-carousel-item v-for="(company,index) in companys" :key="index">
            <ts-grid>
              <ts-grid-item style="width:300px;height:183px" v-for="item in company" @click="handleViewProduct(item.companyId)">
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
import {
  qualityCompanyList1
} from '@/common/api/api';
export default {
  data() {
    return {
      CompanyListParam: {
        pageNo: 1,
        pageSize: 50
      },
      companys: []
    };
  },
  methods: {
    handleViewProduct(id) {
      this.goto(`/shop/${id}`);
    }
  },
  async created() {
    let data = (await qualityCompanyList1(this.CompanyListParam)).data.data.list;
    let result = [];
    for (var i = 0, len = data.length; i < len; i += 9) {
      result.push(data.slice(i, i + 9));
    };
    this.companys = result;
  }
};
</script>

<style lang="stylus" scoped>
.quality-company-list
  width 100%
  height 546px
  background #fff
  .left-brand
    float left
  .right-list
    padding-left 300px
</style>
