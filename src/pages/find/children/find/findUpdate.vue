<template lang="html">
  <ts-section pageTitle="厂家上新" class="update-wrapper" id="anchor-update">
    <div slot="menu">
      <router-link tag="a" to="factoryUpdate" class="update-menu-more">
        更多新品
        <i class="icon-gengduo"></i>
      </router-link>
    </div>
    <div class="update-container">
      <factory-update @viewProduct="handleViewProduct" @viewStore="handleViewStore" :data="NewProductList"></factory-update>
    </div>
  </ts-section>
</template>

<script>
import factoryUpdate from '../../component/factoryProduct';
import {
  getCompanyNewProductList
} from '@/common/api/api';
export default {
  data() {
    return {
      Params: {
        pageNO: 1,
        pageSize: 5
      },
      NewProductList: {}
    };
  },
  components: {
    factoryUpdate
  },
  async created() {
    this.NewProductList = (await getCompanyNewProductList(this.Params)).data.data;
  },
  methods: {
    // 进去某个商品
    handleViewProduct(id) {
      this.$router.push({
        path: `/product/${id}`
      });
    },
    // 进去店铺
    handleViewStore(id) {
      this.$router.push({
        path: `/shop/${id}`
      });
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace update{
  @component container{
    margin:0 20px;
    padding-bottom: 1px;
    min-width: 800px;
  }
  @component menu{
    @descendent more{
      padding-right: 20px;
      i{
        padding-left: 10px;
      }
    }
  }
}
</style>
