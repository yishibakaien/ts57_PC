<template lang="html">
  <div class="update">
    <ts-title-block class="topSearch-title">厂家上新</ts-title-block>
    <div class="update-container">
      <div v-for="item in NewProductList">
        <factory-update @viewProduct="handleViewProduct" @viewStore="handleViewStore" :data="item" :products="item.productList">
          <template slot="header">
            <p>新增&nbsp;<span>{{item.newCount}}</span>&nbsp;款／共&nbsp;<span>{{item.totalCount}}</span>&nbsp;款</p>
            <p>{{ item.publishDate | customTime }}</p>
          </template>
        </factory-update>
      </div>
    </div>
    <ts-button @click="handleMore" type="plain" class="topSearch-button">
      加载更多厂家
    </ts-button>
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
      NewProductList: []
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
    handleViewProduct(item) {
      this.goto(`/product/${item.id}`);
    },
    handleMore() {
      this.Params.pageNo++;
    },
    // 进去店铺
    handleViewStore(item) {
      this.goto(`/shop/${item.companyId}`);
    }
  },
  watch: {
    Params: {
      async handler(val) {
        let data = (await getCompanyNewProductList(this.Params)).data.data.list;
        this.NewProductList = this.NewProductList.concat(data);
      },
      deep: true
    }
  },
  async created() {
    this.NewProductList = (await getCompanyNewProductList(this.Params)).data.data.list;
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
  @component button{
    display: table;
    margin: 10px auto;
  }
}
</style>
