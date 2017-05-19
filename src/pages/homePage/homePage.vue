<template>
  <div class="homePage">
    <v-header>
    	<search></search>
    </v-header>
    <v-nav></v-nav>
    <div class="swiper">
        <banner :items="imgs" :width="1200" :height="300" :pagination="true" :auto-play="true" :speed="3000" :sync="false"></banner>
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
      <button class="button button-block button-blue" @click="seeDetail">花型详情(需要登录才能浏览)</button>
      <button @click="logout" class="button button-block button-red" v-if="showBtn">退出登录</button>

    </div>
    <!-- <fixed-topbar></fixed-topbar> -->
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
import * as types from '@/store/types';

let imgs = [
  {
    src: 'http://i0.hdslb.com/bfs/archive/98548a7be48ab9929f02d2c51c2ab801841e5108.jpg',
    href: 'https://www.baidu.com'
  },
  {
    src: 'http://i0.hdslb.com/bfs/archive/056f5ad71f17a9fbb9581f16735768e3d9c54008.png',
    href: 'https://www.baidu.com'
  },
  {
    src: 'http://i0.hdslb.com/bfs/archive/98548a7be48ab9929f02d2c51c2ab801841e5108.jpg',
    href: 'https://www.baidu.com'
  },
  {
    src: 'http://i0.hdslb.com/bfs/archive/056f5ad71f17a9fbb9581f16735768e3d9c54008.png',
    href: 'https://www.baidu.com'
  }
];

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
  this.companys = res.data.data;
  }).catch((res) => {
  });
  // banner
    listHomeBanners().then((res) => {
      let bannerArr = res.data.data;
      console.log(res);
      bannerArr.forEach(function(item) {
        item.src = item.picUrl;
        // 接口中暂时未提供轮播图的 跳转地址，先用百度代替
        item.href = 'https://www.baidu.com';
      });
      this.bannerImgs = bannerArr;
      // 轮播图假数据
      this.imgs = imgs;
    }).catch(res => {
      console.log('error', res);
    });
    // 获取求购列表
    listProductBuys({
      buyStatus: 0,
      pageNo: 1,
      pageSize: 4
    }).then(res => {
      console.log('求购详情', res);
      // 这里需要格式化 type 以便于后面 baseItem 逐渐分辨到底是 supply 还是 buy
      let data = {
        type: 'buy',
        data: res.data.data.list
      };
      this.purchaseListObj = data;
    });
    // 获取供应列表
    listCompanySupplys({
      supplyStatus: 1, // 供应状态 1--供应中 2--已关闭
      pageNo: 1,
      pageSize: 4
    }).then(res => {
      console.log('供应详情', res);
      // 这里需要格式化 type 以便于后面 baseItem 逐渐分辨到底是 supply 还是 buy
      let data = {
        type: 'supply',
        data: res.data.data.list
      };
      this.supplyListObj = data;
    });
    // 获取厂家入驻列表
    findNewCompanyByIndex({
      companyType: 1 // 1工厂 2 档口
    }).then(res => {
      console.log('厂家入驻', res);
      this.newCompanyList = res.data.data;
    });
  },
  computed: {
    showBtn() {
      return this.$store.state.token;
    }
  },
  methods: {
    seeDetail() {
      if (this.$store.state.accessToken) {
        alert('这是花型详情页面');
      } else {
        this.$store.commit(types.LOGIN_MASK, true);
      }
    },
    logout() {
      this.$store.commit(types.LOGOUT);
    }
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
