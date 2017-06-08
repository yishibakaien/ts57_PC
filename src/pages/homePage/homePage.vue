<template>
<div class="homePage">
  <v-header>
    <search></search>
  </v-header>
  <v-nav></v-nav>
  <div class="swiper">
    <banner :items="bannerImgs" :width="1200" :height="300" :pagination="true" :auto-play="true" :speed="3000" :sync="false"></banner>
  </div>

  <div class="homePage-box">
    <div class="list">
      <!-- 求购列表 -->
      <purchase-list :purchase-list-obj="purchaseListObj"></purchase-list>
    </div>
    <div class="list">
      <!-- 供应列表 -->
      <supply-list :supply-list-obj="supplyListObj"></supply-list>
    </div>
    <div class="list">
      <!-- 入驻厂家 -->
      <entry-list :new-company-list="newCompanyList"></entry-list>
    </div>
    <div class="list">
      <!-- 优质厂家 -->
      <quality-company-list :message="companys"></quality-company-list>
    </div>
  </div>
</div>
</template>

<script>
import {
  header,
  nav,
  search,
  banner,
  purchaseList,
  supplyList,
  entryList,
  qualityCompanyList
} from '@/components';
// api 请求
import {
  listHomeBanners,
  listProductBuys,
  listCompanySupplys,
  findNewCompanyByIndex,
  qualityCompanyList1
} from '@/common/api/api';
export default {
  data() {
    return {
      imgs: [], // 轮播图假数据
      bannerImgs: [], // 真正的轮播图
      purchaseListObj: {}, // 求购列表
      supplyListObj: {}, // 供应列表
      newCompanyList: [], // 最新入驻
      companys: [] // 优质厂家
    };
  },
  components: {
    'vHeader': header,
    'vNav': nav,
    search,
    banner,
    purchaseList,
    supplyList,
    entryList,
    qualityCompanyList
  },
  created() {
    // 优质厂家
    qualityCompanyList1().then((res) => {
      this.companys = res.data.data.list;
    }).catch((res) => {});
    // =====
    // banner
    listHomeBanners().then(res => {
      let bannerArr = res.data.data;
      bannerArr.forEach(function(item) {
        item.src = item.picUrl;
        // 接口中暂时未提供轮播图的 跳转地址，先用百度代替
        item.href = 'https://www.baidu.com';
      });
      this.bannerImgs = bannerArr;
    }).catch(res => {});
    // ===
    // 获取求购列表
    listProductBuys({
      buyStatus: 0,
      pageNo: 1,
      pageSize: 4
    }).then(res => {
      let data = {
        type: 'buy',
        data: res.data.data.list
      };
      this.purchaseListObj = data;
    }).catch(res => {});
    // 获取供应列表
    listCompanySupplys({
      supplyStatus: 1, // 供应状态 1--供应中 2--已关闭
      pageNo: 1,
      pageSize: 4
    }).then(res => {
      // 这里需要格式化 type 以便于后面 baseItem 逐渐分辨到底是 supply 还是 buy
      let data = {
        type: 'supply',
        data: res.data.data.list
      };
      this.supplyListObj = data;
    }).catch(res => {});
    // 获取厂家入驻列表
    findNewCompanyByIndex({
      companyType: 1 // 1工厂 2 档口
    }).then(res => {
      this.newCompanyList = res.data.data;
    }).catch(res => {});
  }
};
</script>

<style lang="stylus" scoped>
  .homePage
    background #f2f2f2
    .swiper
      position absolute
      z-index 1
      left 0
      width 100%
      height 300px
      text-align center
      background #d8d8d8

    .homePage-box
      width 1200px
      margin 0 auto
      margin-top 300px
      padding 16px 0
      background #f2f2f2
      .list
        margin 32px 0
      .button
        width 20%
        margin-top 20px
</style>
