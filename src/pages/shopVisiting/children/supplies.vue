<template lang="html">
<div class="allmeterial-wrapper">
  <div class="allmeterial-filter">
    <ts-filter title="供应分类">
      <ts-radio-group v-model="Params.supplyType" @change="handleFilterSupplyTypes">
        <ts-radio :label="null">全部</ts-radio>
        <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">{{item.name}}</ts-radio>
      </ts-radio-group>
    </ts-filter>
    <ts-filter title="供应布样">
      <ts-radio-group v-model="Params.supplyShapes" @change="handleFilterSupplyShapes">
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
       :src="product.productPicUrl">
       </ts-image>
       <p class="allmeterial-product--number">{{product.productNo}}</p>
       <template slot="footer">
         <span class="allmeterial-desc">{{product.supplyDesc}}</span>
       </template>
     </ts-grid-item>
  </ts-grid>
<ts-pagination type="page" :total="ProductList.totalNum"  :current="ProductList.pageNO" :pageSize="ProductList.pageSize" @change="handleChangePage" class="allmeterial-pagination"></ts-pagination>
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
        SupplyStatus: DICT.SupplyStatus,
        PriceUnits: DICT.PriceUnits
      },
      Params: {
        pageSize: 10,
        pageNo: 1,
        companyId: '',
        supplyType: null,
        supplyShapes: null
      },
      CategoryList: [],
      ProductList: {}
    };
  },
  watch: {
    Params: {
      async handler(val) {
        this.ProductList = (await getVisitCompanySupplyList(val)).data.data;
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
        path: `/supplyDetailPage`,
        query: {
          supplyId: id
        }
      });
    },
    handleFilterSupplyTypes(e) {
      this.Params = Object.assign({}, this.Params, {
        supplyType: e,
        pageNo: 1
      });
    },
    handleFilterSupplyShapes(e) {
      this.Params = Object.assign({}, this.Params, {
        supplyShapes: e,
        pageNo: 1
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
  @component pagination{
    display: table;
      margin:7px auto;
  }
  @component desc{
    @utils-ellipsis;
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
}
</style>
