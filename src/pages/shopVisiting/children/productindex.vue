<template lang="html">
  <div class="productIndex">
    <div v-for="(item,index) in CompanyProducts">
      <ts-title-block :bodyStyle="{'font-size':'20px'}">
        <i class="icon-huaxin"></i>&nbsp;{{item.className}}
        <a slot="menu" v-if="!!item.list.length" @click="handleGoto(item)">
            更多&nbsp;&nbsp;<i class="icon-gengduo"></i>
        </a>
      </ts-title-block>
      <ts-grid :type="item.className==='全部花型'?'flexbox':'table'" :data="item.list">
        <ts-grid-item :style="{'width':item.classId===22659?'400px':'240px'}" v-for="(product,e) in item.list" :key="product" @click="handleViewProduct(product.id)">
          <span class="topRanking productIndex-rank" :class="'topRanking_'+e" v-if="item.classId===22659"></span>
          <ts-image
           width="170"
           height="170"
           :canView="false"
           disabledHover
           :src="product.defaultPicUrl">
           </ts-image>
           <p class="productIndex-product--number">{{product.productNo}}</p>
           <template slot="footer">
             <span v-if="product.price>0&&!!product.price">¥{{product.price}}/{{product.priceUnit | filterDict(DICT.PriceUnits) }}</span>
             <span v-else>价格面议</span>
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
  getCompanyBindingProductList,
  getVistitCompanyProductsList
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
        pageSize: 5,
        pageNo: 1,
        companyId: null,
        classId: null
      }
    };
  },
  methods: {
    handleViewProduct(id) {
      this.$router.push({
        path: `/product/${id}`
      });
    },
    handleGoto(item) {
      if (item.className === '全部花型') {
        this.$router.push({
          path: `/shop/${this.Params.companyId}/allProducts`
        });
      } else {
        this.$router.push({
          path: 'catagory',
          query: {
            name: item.className,
            catagoryId: item.classId
          }
        });
      }
    }
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
      // 如果为爆款=>加载3款，
      // 其他加载5款
      this.Params.pageSize = this.CategoryList[i].id === 22659 ? 3 : 5;
      let lists = (await getCompanyBindingProductList(this.Params)).data.data.list;
      this.CompanyProducts.push({
        classId: this.CategoryList[i].id,
        className: this.CategoryList[i].className,
        list: lists
      });
    }
    // ===========
    // 加载全部花型
    this.Params.pageSize = 10;
    this.Params.classId = null;
    this.CompanyProducts.push({
      classId: '',
      className: '全部花型',
      list: (await getVistitCompanyProductsList(this.Params)).data.data.list
    });
  }
};
</script>

<style lang="css" scoped>
@component-namespace productIndex{
  @component rank{
    position: absolute;
    z-index: 2;
    left:16px;
  }
  @component product{
    @modifier number{
      font-size: 16px;
      line-height: 40px;
    }
  }
}
</style>
