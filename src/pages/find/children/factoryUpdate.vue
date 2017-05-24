<template lang="html">
  <div class="update">
    <ts-title-block class="topSearch-title">厂家上新</ts-title-block>
    <div class="update-container">
      <factory-update @viewProduct="handleViewProduct" @viewStore="handleViewStore" :data="NewProductList"></factory-update>
    </div>
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
        pageNO: 1,
        pageSize: 10
      },
      NewProductList: {}
    };
  },
  components: {
    factoryUpdate
  },
  methods: {
    handleViewProduct() {},
    handleViewStore() {}
  },
  async created() {
    this.NewProductList = (await getCompanyNewProductList(this.Params)).data.data;
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
