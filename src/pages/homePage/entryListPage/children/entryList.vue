<template>
<div class="entryList">
  <factory-list @viewProduct="handleViewProduct" @viewStore="handleViewStore" :data="Entry">
    <template slot="header">
      <p>&nsbp;</p>
      <p>查看更多&nsbp;<i class="icon-gengduo"></i></p>
    </template>
  </factory-list>
</div>
</template>

<script>
import {
  findNewCompanys
} from '@/common/api/api';
// 属于发现--厂家上新模块
import factoryList from '../../../find/component/factoryProduct.vue';
export default {
  data() {
    return {
      Param: {
        companyType: 1
      },
      Entry: []
    };
  },
  async created() {
    this.Entry = (await findNewCompanys(this.Param)).data.data;
  },
  methods: {
    handleViewProduct() {},
    handleViewStore() {}
  },
  components: {
    factoryList
  }
};
</script>

<style lang="css" scoped>
</style>
