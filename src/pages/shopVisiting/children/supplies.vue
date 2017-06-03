<template lang="html">
<div class="allmeterial-wrapper">
  <div class="allmeterial-filter">
    <ts-filter title="供应分类">
      <ts-radio-group v-model="Params.supplyTypes">
        <ts-radio :label="null">全部</ts-radio>
        <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">{{item.name}}</ts-radio>
      </ts-radio-group>
    </ts-filter>
    <ts-filter title="供应布样">
      <ts-radio-group v-model="Params.supplyShapes">
        <ts-radio :label="null">全部</ts-radio>
        <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_SHAPE" :key="item.dicValue">{{item.name}}</ts-radio>
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
         ¥{{product.price}}/{{product.priceUnit | filterDict(DICT.PriceUnits) }}
         <ts-tag>{{product.publishStatus | filterDict(DICT.PublishStatus,'label2')}}</ts-tag>
       </template>
     </ts-grid-item>
  </ts-grid>
  <pagination :page="pageData" @selectedPageNum="handleChangePage"></pagination>

</div>
</template>

<script>
import {
  getVisitCompanySupplyList
} from '@/common/api/api';
import DICT from '@/common/dict';
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      // 数据字典
      DICT: {
        PublishStatus: DICT.PublishStatus,
        PriceUnits: DICT.PriceUnits
      },
      Params: {
        pageSize: 10,
        pageNo: 1,
        companyId: '',
        supplyTypes: null,
        supplyShapes: null
      },
      pageData: {},
      CategoryList: [],
      ProductList: {}
    };
  },
  watch: {
    Params: {
      async handler(val) {
        this.ProductList = (await getVisitCompanySupplyList(val)).data.data;
        this.pageData = {
          maxNum: this.ProductList.totalPage,
          pageNO: this.ProductList.pageNO,
          pageNumArr: []
        };
      },
      deep: true
    }
  },
  async created() {
    // 绑定公司ID
    this.Params.companyId = this.$route.params.id;
  },
  computed: {
    ...mapGetters(['dicTree'])
  },
  methods: {
    handleViewProduct(id) {
      this.$router.push({
        path: `/product/${id}`
      });
    },
    handleChangePage(number) {
      this.Params.pageNo = number;
    }
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
