<template>
<div class="entryList">
  <div class="entryList-search">
    <ts-input style="width:30%" @input="handleInput" placeholder="输入公司名称搜索" v-model="searchParam.companyName">
      <ts-button slot="append" size="small" @click="handleSearch"><i class="icon-sousuo"></i></ts-button>
    </ts-input>
  </div>
  <!-- Table -->
  <div class="entryList-table" v-if="showSearchItem">
    <ts-table :data="Search.list">
      <ts-column slot data-key="companyName" width="150px" align="center" name="公司名称"></ts-column>
      <ts-column slot data-key="USERATYPE" width="100px" align="center" name="公司类型"></ts-column>
      <ts-column slot data-key="phone" align="center" name="联系电话" width="130px"></ts-column>
      <ts-column slot data-key="DATE" align="center" name="地址"></ts-column>
      <ts-column slot align="center" name="操作" action="{'text':'进入官网','func':'handleGotoShop'}"></ts-column>
    </ts-table>
    <div class="entryList-pagination page">
      <ts-pagination type="page" :total="Search.totalNum" :current="Search.pageNO" @change="handleChangeCompanyNum" :pageSize="Search.pageSize"></ts-pagination>
    </div>
  </div>
  <!-- Tab -->
  <ts-navbar v-model="selected" v-if="!isShopRoute">
    <ts-tab-item class="entryList-tab-item" id="1">最新入驻</ts-tab-item>
    <ts-tab-item class="entryList-tab-item" id="2">优质厂家</ts-tab-item>
  </ts-navbar>
  <ts-tab-container v-model="selected" class="models-tab-container">
    <ts-tab-container-item id="2">
      <ts-grid :data="NewEntry" class="entryList-company">
        <ts-grid-item class="entryList-company-item item" v-for="product in Entry" :key="product" @click="handleGotoShop(product)">
          <ts-image width="260" height="150" :canView="false" disabledHover :src="product.pic">
          </ts-image>
          <div class="entryList-company-item--right">
            <qrcode :size="90" :val="`${getOrigin}/shop/${product.companyId}`"></qrcode>
            <ts-button type="plain" class="entryList-company-item--button">进入官网</ts-button>
          </div>
        </ts-grid-item>
      </ts-grid>
    </ts-tab-container-item>
    <ts-tab-container-item id="1">
      <div class="entryList-container" v-for="item in NewEntry">
        <factory-list @viewProduct="handleViewProduct" @viewStore="handleGotoShop" :data="item" :products="item.products">
          <template slot="header">
           <p></p>
         <ts-button type="text" class="entryList-more--button button" @click="handleGotoMore(item)">
           查看更多 <i class="icon-gengduo"></i>
         </ts-button>
         </template>
        </factory-list>
      </div>
    </ts-tab-container-item>
  </ts-tab-container>
</div>
</template>

<script>
import {
  findNewCompanys,
  searchCompany,
  qualityCompanyList1
} from '@/common/api/api';
import DICT from '@/common/dict/';
import debounce from 'lodash.debounce';
import qrcode from '@/components/qrcode/qrcode.vue';
// 属于发现--厂家上新模块
import factoryList from '../../../find/component/factoryProduct.vue';
export default {
  data() {
    return {
      DICT: {
        userType: DICT.userType
      },
      selected: '1',
      Entry: [],
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
      NewEntry: [],
      Search: {}
    };
  },
  computed: {
    getOrigin() {
      return window.location.origin;
    }
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
      this.goto(`/shop/${item.companyId}`);
    },
    handleViewProduct(item) {
      this.goto(`/product/${item.id}`);
    }
  },
  async created() {
    // this.Entry = (await findNewCompanys(this.Param)).data.data;
    // 最新入驻改为优质厂家
    this.Entry = (await qualityCompanyList1(this.Param)).data.data.list;
    // 最新入驻
    this.NewEntry = (await findNewCompanys(this.Param)).data.data;
  },
  components: {
    qrcode,
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
  @component tab-item{
    max-width: 150px;
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
.entryList-table {
  .handleAction {
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
    &:hover {
      color: #fff!important;
      background-color: #2475ef;
    }
  }
}
</style>
