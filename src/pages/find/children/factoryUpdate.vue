<template lang="html">
  <div class="update">
    <ts-title-block class="topSearch-title">厂家上新</ts-title-block>
    <div class="update-container">
      <factory-update @viewProduct="handleViewProduct" @viewStore="handleViewStore" :data="NewProductList"></factory-update>
    </div>
    <pagination :page="pageData" @selectedPageNum="handleChangePage"></pagination>
  </div>
</template>

<script>
import factoryUpdate from '../component/factoryProduct';
import {
  getCompanyNewProductList
} from '@/common/api/api';
export default {
  data() {
    return {
      Params: {
        pageNo: 1,
        pageSize: 10
      },
      NewProductList: {},
      pageData: {}
    };
  },
  components: {
    factoryUpdate
  },
  methods: {
    handleViewProduct(id) {
      this.$router.push({
        path: `/product/${id}`
      });
    },
    handleViewStore() {},
    handleChangePage(number) {
      this.Params.pageNo = number;
    }
  },
  watch: {
    Params: {
      async handler(val) {
        this.NewProductList = (await getCompanyNewProductList(this.Params)).data.data;
      },
      deep: true
    }
  },
  async created() {
    this.NewProductList = (await getCompanyNewProductList(this.Params)).data.data;
    this.pageData = {
      maxNum: this.NewProductList.totalPage,
      pageNO: this.NewProductList.pageNO,
      pageNumArr: []
    };
  }
};
</script>
<style lang="css" scoped>
@component-namespace update{
  @component container{
    max-width: 1200px;
  }
}
</style>
