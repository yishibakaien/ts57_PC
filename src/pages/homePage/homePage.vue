<template>
<div class="homePage">
  <v-header>
    <search></search>
  </v-header>
  <v-nav></v-nav>
  <div class="swiper">
    <!-- autoplay :autoplay-speed="5000" -->
    <ts-carousel v-model="value" arrow="hover" trigger="hover" autoplay :autoplay-speed="5000" easing='linear'>
      <ts-carousel-item v-for="(item,index) in banners.static">
        <ts-image :src="item+banner" height="350" class="home-image" :canView="false" disabledHover></ts-image>
      </ts-carousel-item>
      <ts-carousel-item style="cursor:pointer">
        <ts-image :src="`${banners.dynamic[0]}${banner}`" @click.native="handleGotoAnchor('#bestCompany')" height="350" class="home-image" :canView="false" disabledHover></ts-image>
      </ts-carousel-item>
      <ts-carousel-item style="cursor:pointer">
        <ts-image :src="`${banners.dynamic[1]}${banner}`" @click.native="handleGotoMyShop" height="350" class="home-image" :canView="false" disabledHover></ts-image>
      </ts-carousel-item>
    </ts-carousel>
  </div>
  <div class="homePage-box">
    <div class="list" v-if="userInfo.userType!==1">
      <!-- 求购列表 -->
      <purchase-list :supply-list-obj="supplyListObj"></purchase-list>
    </div>
    <div class="list" v-if="userInfo.userType!==2">
      <!-- 供应列表 -->
      <supply-list :purchase-list-obj="purchaseListObj"></supply-list>
    </div>
    <div class="list">
      <!-- 入驻厂家 -->
      <entry-list></entry-list>
    </div>
    <!-- 优质厂家 -->
    <div class="list" id="bestCompany">
      <quality-list :new-company-list="newCompanyList"></quality-list>
    </div>
  </div>
</div>
</template>

<script>
import {
  header,
  nav,
  search,
  purchaseList,
  entryList,
  supplyList,
  qualityList
} from '@/components';
import {
  mapGetters
} from 'vuex';
import {
  // listHomeBanners,
  listProductBuys,
  listCompanySupplys,
  findNewCompanyByIndex
} from '@/common/api/api';
import {
  BANNER
} from '@/common/dict/const';
export default {
  data() {
    return {
      CompanyListParam: {
        pageNo: 1,
        pageSize: 50
      },
      // banner图
      banners: BANNER,
      value: 0,
      total: 1,
      purchaseListObj: {}, // 求购列表
      supplyListObj: {}, // 供应列表
      newCompanyList: [] // 最新入驻
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    banner() {
      let width = document.body.clientWidth || document.documentElement.clientWidth;
      return `?x-oss-process=image/resize,w_${width},h_350,m_fill`;
    }
  },
  components: {
    'vHeader': header,
    'vNav': nav,
    search,
    purchaseList,
    supplyList,
    entryList,
    qualityList
  },
  watch: {
    userInfo: {
      handler(val) {
        this.index();
      },
      deep: true
    }
  },
  methods: {
    handleGotoMyShop() {
      this.$router.push('/shopManagePage');
    },
    handleGotoAnchor(selector) {
      var anchor = this.$parent.$el.querySelector(selector);
      document.body.scrollTop = document.documentElement.scrollTop = anchor.offsetTop;
    },
    handleViewProduct(id) {
      this.goto(`/shop/${id}`);
    },
    async index() {
      // =====
      // banner
      // ====
      // listHomeBanners().then(res => {
      //   let bannerArr = res.data.data;
      //   this.bannerImgs = bannerArr;
      // }).catch(res => {});
      // ====
      // 获取求购列表
      // ====
      this.purchaseListObj = {
        type: 'buy',
        data: (await listProductBuys({
          buyStatus: 0,
          pageNo: 1,
          pageSize: 4
        })).data.data.list
      };
      // ======
      // 获取供应列表
      // =======
      this.supplyListObj = {
        type: 'supply',
        data: (await listCompanySupplys({
          supplyStatus: 1, // 供应状态 1--供应中 2--已关闭
          pageNo: 1,
          pageSize: 4
        })).data.data.list
      };
      // ========
      // 获取厂家入驻列表
      // ========
      this.newCompanyList = (await findNewCompanyByIndex({
        companyType: 1 // 1工厂 2 档口
      })).data.data;
    }
  },
  created() {
    this.index();
  }
};
</script>
<style>
.home-image {
  img {
    width: 100vw;
  }
}
</style>
<style lang="stylus" scoped>
  .homePage
    background #f2f2f2
    .swiper
      width 100%
      height 350px
      text-align center
      background #d8d8d8

    .homePage-box
      width 1200px
      margin 0 auto
      padding 16px 0
      background #f2f2f2
      .list
        margin 32px 0
      .button
        width 20%
        margin-top 20px
</style>
