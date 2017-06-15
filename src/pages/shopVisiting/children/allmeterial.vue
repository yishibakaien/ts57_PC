<template lang="html">
<div class="allmeterial-wrapper">
  <div class="allmeterial-filter">
    <ts-filter title="花型分类">
      <ts-radio-group v-model="Filter.classId" @change="handleFilterCategorys">
        <ts-radio :label="null">全部</ts-radio>
        <ts-radio :label="item.id" v-for="item in CategoryList.system" :key="item.id">{{item.className}}</ts-radio>
        <!-- <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">{{item.name}}</ts-radio> -->
          <ts-radio :label="item.id" v-for="item in CategoryList.user" :key="item.id">{{item.className}}</ts-radio>
      </ts-radio-group>
    </ts-filter>
  </div>
  <ts-grid :data="ProductList.list">
    <ts-grid-item style="width:240px" v-for="product in ProductList.list" :key="product" @click="handleViewProduct(product.id)">
      <ts-image
       width="170"
       height="170"
       :canView="false"
       disabledHover
       :src="product.defaultPicUrl">
       </ts-image>
       <p class="allmeterial-product--number">{{product.productNo}}</p>
       <template slot="footer">
         <span v-if="product.price>0&&!!product.price">¥{{product.price/100}}/{{product.priceUnit | filterDict(DICT.PriceUnits) }}</span>
         <span v-else>价格面议</span>
       </template>
     </ts-grid-item>
  </ts-grid>
<ts-pagination type="page" :total="ProductList.totalNum"  :current="ProductList.pageNO" :pageSize="ProductList.pageSize" @change="handleChangePage" class="allmeterial-pagination"></ts-pagination>
</div>
</template>

<script>
import {
  getVisitSystemProductCategoryList,
  getVisitUserProductCategoryList,
  getCompanyBindingProductList,
  getVistitCompanyProductsList
} from '@/common/api/api';
import DICT from '@/common/dict';
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      Filter: {
        classId: null
      },
      Infinite: {
        loading: false,
        wrapperHeight: 0
      },
      // 数据字典
      DICT: {
        PriceUnits: DICT.PriceUnits
      },
      Params: {
        pageSize: 10,
        pageNo: 1,
        companyId: '',
        category: null
      },
      CategoryList: {
        system: [],
        user: []
      },
      ProductList: []
    };
  },
  watch: {
    Params: {
      async handler(val) {
        this.ProductList = (await getVistitCompanyProductsList(val)).data.data;
      },
      deep: true
    },
    Filter: {
      // 如果选择全部 => 获取网店花型列表
      // 如果有值 => 网店分类绑定的花型列表
      async handler(val) {
        if (!val.classId) {
          this.ProductList = (await getVistitCompanyProductsList(this.Params)).data.data;
        } else {
          let data = Object.assign({}, this.Params, this.Filter, {
            category: null
          });
          this.ProductList = (await getCompanyBindingProductList(data)).data.data;
        }
      },
      deep: true
    }
  },
  async created() {
    // 绑定好公司ID
    this.Params.companyId = this.$route.params.id;
    // ==========
    // 分类
    // 当不存在自定义分类=>查系统的
    // 当存在自定义分类=>查自定义的
    this.CategoryList.user = (await getVisitUserProductCategoryList({
      companyId: this.$route.params.id,
      pageNo: 1,
      pageSize: 1000
    })).data.data.list;
    this.CategoryList.system = (await getVisitSystemProductCategoryList({
      companyId: this.$route.params.id
    })).data.data;
    // =======
  },
  computed: {
    ...mapGetters(['dicTree'])
  },
  methods: {
    handleChangePage(number) {
      this.Params.pageNo = number;
    },
    handleFilterCategorys(e) {
      this.Params = Object.assign({}, this.Params, {
        category: e,
        pageNo: 1
      });
    },
    handleViewProduct(id) {
      this.goto(`/product/${id}`);
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace allmeterial{
  @component filter{
    margin-bottom: 16px;
  }
  @component pagination{
    display: table;
    margin:7px auto;
  }
  @component product{
    @modifier number{
      font-size: 16px;
      margin-top: 10px;
      max-width: 200px;
      text-align: left;
      @utils-ellipsis;
    }
  }
}
</style>
