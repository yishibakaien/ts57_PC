<template>
<div class="entryList">
  <div class="update-container" v-for="item in Entry">
    <factory-list @viewProduct="handleViewProduct" @viewStore="handleGotoShop" :data="item" :products="item.products">
      <template slot="header">
        <p></p>
        <a @click="handleGotoMore(item)">查看更多 <i class="icon-gengduo"></i></a>
      </template>
    </factory-list>
  </div>
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
  methods: {
    // 查看更多---浏览店铺的全部花型
    handleGotoMore(item) {
      this.goto(`/shop/${item.id}/allmeterial`);
    },
    // 查看店铺的首页
    handleGotoShop(id) {
      this.goto(`/shop/${id}`);
    },
    handleViewProduct(id) {
      this.goto(`/shop/${id}`);
    }
  },
  async created() {
    this.Entry = (await findNewCompanys(this.Param)).data.data;
  },
  components: {
    factoryList
  }
};
</script>

<style lang="css" scoped>
</style>
