<template lang="html">
  <div class="productIndex">
<div v-for="(item,index) in CompanyProducts">
  <ts-title-block :bodyStyle="{'font-size':'20px'}">
    <i class="icon-huaxin"></i>&nbsp;{{item.className}}
    <a slot="menu">
        更多&nbsp;&nbsp;<i class="icon-gengduo"></i>
    </a>
  </ts-title-block>
  <ts-grid>
    <ts-grid-item :style="{'width':item.className==='爆款'?'400px':'240px'}" v-for="(product,e) in item.list" :key="product" @click="handleViewProduct(product.id)">
      <span class="topRanking productIndex-rank" :class="'topRanking_'+e"></span>
      <ts-image
       width="170"
       height="170"
       :canView="false"
       disabledHover
       src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=786556999,3276981424&fm=58&s=31746C32C0757B9003682FEF0300A024&bpow=121&bpoh=75">
       </ts-image>
       <p class="allmeterial-product--number">{{product.productNo}}</p>
       <template slot="footer">
         ¥{{product.price}}/{{product.priceUnit | filterDict(DICT.PriceUnits) }}
         <ts-tag>{{product.publishStatus | filterDict(DICT.PublishStatus,'label2')}}</ts-tag>
       </template>
     </ts-grid-item>
  </ts-grid>
</div>
</div>
</template>

<script>
import {
  getVisitUserProductCategoryList,
  getVisitSystemProductCategoryList,
  getCompanyBindingProductList
} from '@/common/api/api';
import DICT from '@/common/dict';
export default {
  data() {
    return {
      // 数据字典
      DICT: {
        PublishStatus: DICT.PublishStatus,
        PriceUnits: DICT.PriceUnits
      },
      CategoryList: [],
      CompanyProducts: [],
      Params: {
        pageSize: 3,
        pageNo: 1,
        companyId: '',
        classId: ''
      }
    };
  },
  methods: {
    handleViewProduct() {}
  },
  async created() {
    // ========
    // 绑定公司ID
    this.Params.companyId = this.$route.params.id;
    // ========
    // 获取所有分类  => 做循环加载使用
    let UserCategories = (await getVisitUserProductCategoryList({
      companyId: this.$route.params.id,
      pageNo: 1,
      pageSize: 1000
    })).data.data.list;
    let SystemCategories = (await getVisitSystemProductCategoryList({
      companyId: this.$route.params.id
    })).data.data;
    this.CategoryList = [...SystemCategories, ...UserCategories];
    // =============
    // 循环加载
    for (let i in this.CategoryList) {
      this.Params.classId = this.CategoryList[i].id;
      let lists = (await getCompanyBindingProductList(this.Params)).data.data.list;
      this.CompanyProducts.push({
        classId: this.CategoryList[i].id,
        className: this.CategoryList[i].className,
        list: lists
      });
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace productIndex{
  @component rank{
    position: absolute;
    z-index: 2;
  }
}
</style>
