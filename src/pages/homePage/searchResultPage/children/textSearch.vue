<template lang="html">
		<div class="textSearch-wrapper">
			<ts-navbar v-model="selected" v-if="!isShopRoute">
				<ts-tab-item class="textSearch-tab-item" id="1">搜索花型结果</ts-tab-item>
				<ts-tab-item class="textSearch-tab-item" id="2">搜索厂家结果</ts-tab-item>
			</ts-navbar>
			<ts-tab-container v-model="selected" class="models-tab-container">
				<!-- 搜索花型 -->
				<ts-tab-container-item id="1">
				<div class="textSearch-filter">
			    <ts-filter title="分类">
			      <ts-radio-group v-model="Filter.categorys" @change="handleChangeCategorys">
			        <ts-radio :label="null">全部</ts-radio>
			        <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">{{item.name}}</ts-radio>
			      </ts-radio-group>
			    </ts-filter>
					<ts-filter title="库存盘点">
					 <ts-radio-group v-model="Filter.isStock" @change="handleChangeIsStock">
						 <ts-radio :label="null">全部</ts-radio>
						 <ts-radio :label="item.dicValue" v-for="item in DICT.isStock" :key="item.id">{{item.label}}</ts-radio>
					 </ts-radio-group>
				 </ts-filter>
			  </div>
				<ts-grid :data="Search.list" class="textSearch-data">
			    <ts-grid-item style="width:240px" v-for="product in Search.list" :key="product" @click="handleGotoProduct(product.id)">
			      <ts-image
			       width="170"
			       height="170"
			       :canView="false"
			       disabledHover
			       :src="product.defaultPicUrl">
			       </ts-image>
			       <p class="textSearch-product--number">{{product.productNo}}</p>
			       <template slot="footer">
							 <span v-if="product.price>0&&!!product.price">¥{{product.price/100}}/{{product.priceUnit | filterDict(DICT.PriceUnits) }}</span>
 		          <span v-else>价格面议</span>
			       </template>
			     </ts-grid-item>
			  </ts-grid>
				<ts-pagination type="page" class="textSearch-pagination" :total="Search.totalNum" :current="Search.pageNO" :pageSize="Search.pageSize" @change="handleChangeProductNum"></ts-pagination>
			</ts-tab-container-item>
			<!-- 搜索厂家 -->
			<ts-tab-container-item id="2">
			<ts-grid :data="SearchCompany.list" class="textSearch-data">
				<ts-grid-item style="width:240px" v-for="product in SearchCompany.list" :key="product" @click="handleGotoShop(product.id)">
					<ts-image
					 width="170"
					 height="170"
					 :canView="false"
					 disabledHover
					 :src="product.companyHeadIcon">
					 </ts-image>
					 <p class="allmeterial-product--number">{{product.companyName}}</p>
				 </ts-grid-item>
			</ts-grid>
			<ts-pagination type="page" :total="SearchCompany.totalNum" class="textSearch-pagination" :current="SearchCompany.pageNO" @change="handleChangeCompanyNum" :pageSize="SearchCompany.pageSize"></ts-pagination>
		</ts-tab-container-item>
			</ts-tab-container>
	  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import DICT from '@/common/dict';
import {
  searchMtd,
  searchCompany
} from '@/common/api/api';
export default {
  data() {
    return {
      selected: '1',
      // 数据字典
      DICT: {
        PublishStatus: DICT.PublishStatus,
        PriceUnits: DICT.PriceUnits,
        isStock: DICT.isStock
      },
      Filter: {
        categorys: null,
        isStock: null
      },
      Search: {},
      SearchCompany: {},
      Params: {
        pageSize: 10,
        pageNo: 1,
        categorys: null,
        isStock: null,
        keywords: ''
      },
      CompanySearchParams: {
        pageSize: 10,
        companyname: '',
        companyType: 1,
        pageNo: 1
      }
    };
  },
  methods: {
    handleGotoShop(id) {
      this.goto(`/shop/${id}`);
    },
    handleChangeProductNum(number) {
      this.Params.pageNo = number;
    },
    handleChangeCompanyNum(number) {
      this.CompanySearchParams.pageNo = number;
    },
    handleGotoProduct(id) {
      this.goto(`/product/${id}`);
    },
    handleChangeCategorys() {
      this.Params.categorys = this.Filter.categorys;
      this.Params.pageNo = 1;
    },
    handleChangeIsStock() {
      this.Params.isStock = this.Filter.isStock;
      this.Params.pageNo = 1;
    }
  },
  watch: {
    searchValue(val) {
      this.Params = Object.assign({}, this.Params, {
        keywords: val,
        pageNo: 1
      });
    },
    async selected(val) {
      if (val === '2') {
        this.CompanySearchParams.companyname = this.$route.query.search;
      }
    },
    Params: {
      async handler(val) {
        this.Search = (await searchMtd(val)).data.data;
      },
      deep: true
    },
    CompanySearchParams: {
      async handler(val) {
        this.SearchCompany = (await searchCompany(val)).data.data;
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['dicTree']),
    isShopRoute() {
      return this.$route.path.indexOf('/shop/') >= 0;
    },
    searchValue() {
      return this.$route.query.search;
    }
  },
  async created() {
    this.Params = Object.assign({}, this.Params, {
      keywords: this.$route.query.search,
      searchType: this.$route.query.searchType,
      companyId: this.isShopRoute ? this.$route.params.id : null
    });
  }
};
</script>

<style lang="css" scoped>
@component-namespace textSearch{
	@component filter{
		background: #fff;
	}
	@component data{
		margin: 16px 0;
		background: #fff;
	}
	@component pagination{
		display: table;
		margin: 7px auto;
	}
	@component product{
		@modifier number{
      font-size: 16px;
      margin-top: 10px;
      text-align: left;
			max-width: 200px;
      @utils-ellipsis;
    }
  }
	@component tab-item{
		max-width: 150px;
	}
}
</style>
