<template lang="html">
  <ts-section pageTitle="厂家上新" class="update-wrapper">
    <div slot="menu">
      <router-link tag="a" to="factoryUpdate" class="update-menu-more">
        更多新品
        <i class="icon-gengduo"></i>
      </router-link>
    </div>
    <div class="update-container">
      <factory-update @viewProduct="handleViewProduct" @viewStore="handleViewStore" data="data"></factory-update>
    </div>
  </ts-section>
</template>

<script>
import factoryUpdate from '../../component/factoryProduct';
export default {
  components: {
    factoryUpdate
  },
  methods: {
    // 进去某个商品
    handleViewProduct(item) {},
    // 进去店铺
    handleViewStore(item) {}
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
