<template>
<div class="entryList">
  <!--<div class="entryList-search">
    <ts-input style="width:30%" @input="handleInput" placeholder="输入公司名称搜索" v-model="searchParam.companyName">
      <ts-button slot="append" size="small" @click="handleSearch"><i class="icon-sousuo"></i></ts-button>
    </ts-input>
  </div>-->
  <div v-if="!showSearchItem">
    <div class="entryList-container" v-for="item in Entry">
      <factory-list @viewProduct="handleViewProduct" @viewStore="handleGotoShop" :data="item" :products="item.products">
        <template slot="header">
        <p></p>
      <ts-button type="text" class="entryList-more--button button" @click="handleGotoMore(item)">
        查看更多 <i class="icon-gengduo"></i>
      </ts-button>
      </template>
      </factory-list>
    </div>
  </div>
  <div v-else>
    <ts-grid :data="Search.list" class="textSearch-data">
      <ts-grid-item style="width:240px" v-for="product in Search.list" :key="product" @click="handleGotoShop(product)">
        <ts-image width="170" height="170" :canView="false" disabledHover :src="product.companyHeadIcon">
        </ts-image>
        <p class="allmeterial-product--number">{{product.companyName}}</p>
      </ts-grid-item>
    </ts-grid>
    <ts-pagination type="page" :total="Search.totalNum" class="entryList-pagination page" :current="Search.pageNO" @change="handleChangeCompanyNum" :pageSize="Search.pageSize"></ts-pagination>
  </div>
</div>
</template>

<script>
import {
  findNewCompanys,
  searchCompany
} from '@/common/api/api';
import debounce from 'lodash.debounce';
// 属于发现--厂家上新模块
import factoryList from '../../../find/component/factoryProduct.vue';
export default {
  data() {
    return {
      Param: {
        companyType: 1
      },
      searchParam: {
        companyName: '',
        pageNo: 1,
        pageSize: 10
      },
      showSearchItem: false,
      Entry: [],
      Search: {}
    };
  },
  methods: {
    // 搜索
    async handleSearch() {
      this.showSearchItem = true;
      this.Search = (await searchCompany(this.searchParam)).data.data;
    },
    async handleChangeCompanyNum(e) {
      this.searchParam.pageNo = e;
      this.Search = (await searchCompany(this.searchParam)).data.data;
    },
    handleInput: debounce(function(item, event) {
      if (item.length === 0) {
        this.searchParam.pageNo = 1;
        this.showSearchItem = false;
      }
    }, 2000),
    // 查看更多---浏览网店的全部花型
    handleGotoMore(item) {
      this.goto(`/shop/${item.id}/allProducts`);
    },
    // 查看网店的首页
    handleGotoShop(item) {
      this.goto(`/shop/${item.id}`);
    },
    handleViewProduct(item) {
      this.goto(`/product/${item.id}`);
    }
  },
  async created() {
    this.Entry = (await findNewCompanys(this.Param)).data.data;
  },
  components: {
    factoryList
  }
};
</script>

<style lang="css" scoped>
@component-namespace entryList{
  @component search{
    margin: 10px 0;
  }
  @component pagination{
    &.page{
      display: table;
      margin: 7px auto;
    }
  }
  @component more{
    @modifier button{
      &.button{
        height: 45px;
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>
