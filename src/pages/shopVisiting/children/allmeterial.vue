<template lang="html">
<div class="allmeterial-wrapper">
  <div class="allmeterial-filter">
    <ts-filter title="花型分类">
      <ts-radio-group v-model="Filter.classId" @change="handleFilterCategorys">
        <ts-radio :label="null">全部</ts-radio>
        <ts-radio :label="item.id" v-for="item in CategoryList" :key="item.id">{{item.className}}</ts-radio>
      </ts-radio-group>
    </ts-filter>
  </div>
  <ts-grid>
    <ts-grid-item style="width:240px" v-for="product in ProductList.list" :key="product" @click="handleViewProduct(product.id)">
      <ts-image
       width="170"
       height="170"
       :canView="false"
       disabledHover
       v-lazy="product.defaultPicUrl">
       </ts-image>
       <p class="allmeterial-product--number">{{product.productNo}}</p>
       <template slot="footer">
         ¥{{product.price}}/{{product.priceUnit | filterDict(DICT.PriceUnits) }}
         <ts-tag>{{product.publishStatus | filterDict(DICT.PublishStatus,'label2')}}</ts-tag>
       </template>
     </ts-grid-item>
  </ts-grid>
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
      // 数据字典
      DICT: {
        PublishStatus: DICT.PublishStatus,
        PriceUnits: DICT.PriceUnits
      },
      Params: {
        pageSize: 10,
        pageNo: 1,
        companyId: ''
      },
      CategoryList: [],
      ProductList: {}
    };
  },
  watch: {
    Filter: {
      // 如果选择全部 => 获取店铺花型列表
      // 如果有值 => 店铺分类绑定的花型列表
      async handler(val) {
        if (!val.classId) {
          this.ProductList = (await getVistitCompanyProductsList(this.Params)).data.data;
        } else {
          let data = Object.assign({}, this.Params, this.Filter);
          this.ProductList = (await getCompanyBindingProductList(data)).data.data;
        }
      },
      deep: true
    }
  },
  async created() {
    // 绑定好公司ID
    this.Params.companyId = this.$route.params.id;
    // 查全部
    this.ProductList = (await getVistitCompanyProductsList(this.Params)).data.data;
    // ==========
    // 分类
    // 当不存在自定义分类=>查系统的
    // 当存在自定义分类=>查自定义的
    this.CategoryList = (await getVisitUserProductCategoryList({
      companyId: this.$route.params.id,
      pageNo: 1,
      pageSize: 1000
    })).data.data.list;
    if (!this.CategoryList.length) {
      this.CategoryList = (await getVisitSystemProductCategoryList({
        companyId: this.$route.params.id
      })).data.data;
    }
    // =======
  },
  computed: {
    ...mapGetters(['dicTree'])
  },
  methods: {
    handleFilterCategorys() {}
  }
};
</script>

<style lang="css" scoped>
@component-namespace allmeterial{
  @component filter{
    margin-bottom: 16px;
  }
  @component product{
    @modifier number{
      font-size: 16px;
      line-height: 40px;
      @utils-ellipsis;
    }
  }
}
</style>
