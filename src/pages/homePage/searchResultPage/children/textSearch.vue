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
			      <ts-radio-group v-model="Filter.categorys" @change="Params.categorys = Filter.categorys">
			        <ts-radio :label="null">全部</ts-radio>
			        <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">{{item.name}}</ts-radio>
			      </ts-radio-group>
			    </ts-filter>
					<ts-filter title="库存盘点">
					 <ts-radio-group v-model="Filter.isStock" @change="Params.isStock = Filter.isStock">
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
			       <p class="allmeterial-product--number">{{product.productNo}}</p>
			       <template slot="footer">
			         ¥{{product.price}}/{{product.priceUnit | filterDict(DICT.PriceUnits) }}
			         <ts-tag>{{product.publishStatus | filterDict(DICT.PublishStatus,'label2')}}</ts-tag>
			       </template>
			     </ts-grid-item>
			  </ts-grid>
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
        pageNo: 1
      }
    };
  },
  methods: {
    handleGotoShop(id) {
      this.$router.push({
        path: `/shop/${id}`
      });
    },
    handleGotoProduct(id) {
      this.$router.push({
        path: `/product/${id}`
      });
    }
  },
  watch: {
    searchValue(val) {
      this.Params.keywords = val;
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
	@component tab-item{
		max-width: 150px;
	}
}
</style>
