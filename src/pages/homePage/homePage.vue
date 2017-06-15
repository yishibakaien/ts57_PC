<template>
<div class="homePage">
  <v-header>
    <search></search>
  </v-header>
  <v-nav></v-nav>
  <div class="swiper">
    <ts-image :src="banner" height="350" class="home-image" :canView="false" disabledHover></ts-image>
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
      <entry-list :new-company-list="newCompanyList"></entry-list>
    </div>
    <div class="list">
      <!-- 优质厂家 -->
      <div class="quality-company-list">
        <div class="left-brand onepx-r">
          <img class="quality-company-pic" src="/static/images/youzhichangjia.png">
        </div>
        <div class="right-list">
          <div class="item-wrapper">
            <ts-carousel height="546px" autoplay-speed="6000" autoplay @change="handleChangeCompany" arrow="always" easing='linear'>
              <ts-carousel-item v-for="company in companys">
                <ts-grid>
                  <ts-grid-item style="width:300px;height:183px" v-for="item in company" @click="handleViewProduct(item.id)">
                    <ts-image width="268" height="150" :canView="false" disabledHover :src="item.pic">
                    </ts-image>
                  </ts-grid-item>
                </ts-grid>
              </ts-carousel-item>
            </ts-carousel>
          </div>
        </div>
      </div>
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
  supplyList,
  entryList,
  qualityCompanyList
} from '@/components';
import {
  mapGetters
} from 'vuex';
import {
  // listHomeBanners,
  listProductBuys,
  qualityCompanyList1,
  listCompanySupplys,
  findNewCompanyByIndex
} from '@/common/api/api';
export default {
  data() {
    return {
      CompanyListParam: {
        pageNo: 1,
        pageSize: 50
      },
      companys: [],
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
      return `http://zsbgdev.oss-cn-shenzhen.aliyuncs.com/banner/indexBanner.jpg?x-oss-process=image/resize,w_${width},h_350,m_fill`;
    }
  },
  components: {
    'vHeader': header,
    'vNav': nav,
    search,
    purchaseList,
    supplyList,
    entryList,
    qualityCompanyList
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
    handleChangeCompany() {
      // this.CompanyListParam.pageNo++;
    },
    handleViewProduct(id) {
      this.goto(`/shop/${id}`);
    },
    async index() {
      let data = (await qualityCompanyList1(this.CompanyListParam)).data.data.list;
      let result = [];
      for (var i = 0, len = data.length; i < len; i += 9) {
        result.push(data.slice(i, i + 9));
      }
      this.companys = result;
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
    .quality-company-list
      width 100%
      height 546px
      background #fff
      .left-brand
        float left
      .right-list
        padding-left 300px
</style>
