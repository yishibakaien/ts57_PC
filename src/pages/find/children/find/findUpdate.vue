<template lang="html">
  <ts-section pageTitle="厂家上新" class="update-wrapper" id="anchor-update">
    <div slot="menu">
      <router-link tag="a" to="factoryUpdate" class="update-menu-more">
        更多新品
        <i class="icon-gengduo"></i>
      </router-link>
    </div>
    <div class="update-container" v-for="item in NewProductList.list">
      <factory-update @viewProduct="handleViewProduct" @viewStore="handleViewStore" :data="item" :products="item.productList">
        <template slot="header">
          <p>新增&nbsp;<span>{{item.newCount}}</span>&nbsp;款／共&nbsp;<span>{{item.totalCount}}</span>&nbsp;款</p>
          <p>{{ item.publishDate | customTime }}</p>
        </template>
      </factory-update>
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
    handleViewProduct(item) {
      this.goto(`/product/${item.id}`);
    },
    // 进去店铺
    handleViewStore(item) {
      this.goto(`/shop/${item.companyId}`);
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
