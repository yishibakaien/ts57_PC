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
  <ts-grid :data="Entry" class="entryList-company">
    <ts-grid-item class="entryList-company-item item" v-for="product in Entry" :key="product" @click="handleGotoShop(product)">
      <ts-image width="260" height="150" :canView="false" disabledHover :src="product.pic">
      </ts-image>
      <div class="entryList-company-item--right">
        <ts-image width="90" height="90" :canView="false" disabledHover :src="product.pic">
        </ts-image>
        <ts-button type="plain" class="entryList-company-item--button">进入官网</ts-button>
      </div>
    </ts-grid-item>
  </ts-grid>
</div>
</template>

<script>
import {
  // findNewCompanys,
  searchCompany,
  qualityCompanyList1
} from '@/common/api/api';
import DICT from '@/common/dict/';
import debounce from 'lodash.debounce';
// 属于发现--厂家上新模块
import factoryList from '../../../find/component/factoryProduct.vue';
export default {
  data() {
    return {
      DICT: {
        userType: DICT.userType
      },
      // Param: {
      //   companyType: 1
      // },
      Param: {
        pageNo: 1,
        pageSize: 999
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
  watch: {
    Search: {
      handler(val) {
        if (val.list) {
          val.list.forEach(item => {
            item.USERATYPE = this.filterDict(item.companyType, DICT.userType);
          });
        }
      },
      deep: true
    }
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
    // this.Entry = (await findNewCompanys(this.Param)).data.data;
    // 最新入驻改为优质厂家
    this.Entry = (await qualityCompanyList1(this.Param)).data.data.list;
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
      text-align: right;
      margin: 10px 0;
  }
  @component table{
      min-height: 630px;
  }
  @component company{
    @descendent item{
      background: #fff;
      margin: 4px;
      &.item{
        width: 392px;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      @modifier right{
        text-align: right;
        display: flex;
        align-items: stretch;
        flex-direction: column;
        height: 150px;
        justify-content: space-between;
      }
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
<style>
  .entryList-table{
    .handleAction{
      display: inline-block;
      padding: 0 12px;
      color: #fff;
      border: none;
      background-color: #4C93FD;
      line-height: 150%;
      outline: 0;
      overflow: hidden;
      position: relative;
      text-align: center;
      min-width: 80px;
      cursor: pointer;
      margin: 6px 0;
      vertical-align: middle;
      &:hover{
        color:#fff!important;
        background-color: #2475ef;
      }
    }
  }
</style>
