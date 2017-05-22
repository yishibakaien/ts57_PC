<template lang="html">
  <div class="update">
    <title-block class="topSearch-title">厂家上新</title-block>
    <div class="update-container">
      <factory-update @viewProduct="handleViewProduct" @viewStore="handleViewStore" data="data"></factory-update>
    </div>
  </div>
</template>

<script>
import TitleBlock from '../component/titleBlock.vue';
import factoryUpdate from '../component/factoryProduct';
export default {
  components: {
    TitleBlock,
    factoryUpdate
  },
  methods: {
    handleViewProduct() {},
    handleViewStore() {}
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
