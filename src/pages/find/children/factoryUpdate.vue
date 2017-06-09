<template lang="html">
  <div class="update">
    <ts-title-block class="topSearch-title">厂家上新</ts-title-block>
    <div class="update-container">
      <factory-update @viewProduct="handleViewProduct" @viewStore="handleViewStore" :data="NewProductList.list"></factory-update>
    </div>
    <ts-pagination type="page" :total="NewProductList.totalNum" :current="NewProductList.pageNO" :pageSize="NewProductList.pageSize" class="topSearch-pagination" @change="handleChangePage"></ts-pagination>
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
      pageData: {
        pageNumArr: [],
        maxNum: 1,
        pageNO: 1
      }
    };
  },
  computed: {
    length() {
      return this.NewProductList.list.length > 0;
    }
  },
  components: {
    factoryUpdate
  },
  methods: {
    handleViewProduct(id) {
      this.goto(`/product/${id}`);
    },
    handleViewStore(id) {
      this.goto(`/shop/${id}`);
    },
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
@component-namespace topSearch{
  @component container{
    max-width: 1200px;
  }
  @component pagination{
    margin: 7px auto;
    display: table;
  }
}
</style>
