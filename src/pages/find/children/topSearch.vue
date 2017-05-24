<template lang="html">
    <div class="ts-content">
      <ts-title-block>爆款热搜</ts-title-block>
      <ts-grid>
        <ts-grid-item width="200px" v-for="(product,index) in BurstHotSearch.list" :key="product" @click="handleViewProduct(product.productId)">
          <span class="ranking hotSearch-rank" :class="'ranking_'+index" v-if="index<3"></span>
          <ts-image
           width="170"
           height="170"
           :canView="false"
           disabledHover
           v-lazy="product.defaultPicUrl">
           </ts-image>
           <template slot="footer" class="hotSearch-footer">
             <p>搜索量&nbsp;<span class="hotSearch-footer--searchNum">{{product.searchs}}</span></p>
             <p class="hotSearch-footer--total">共{{product.searchs}}款</p>
           </template>
         </ts-grid-item>
      </ts-grid>
    </div>
</template>

<script>
import {
  burstHotSearch
} from '@/common/api/api';
export default {
  data() {
    return {
      Params: {
        pageNO: 1,
        pageSize: 10
      },
      BurstHotSearch: {}
    };
  },
  async created() {
    this.BurstHotSearch = (await burstHotSearch(this.Params)).data.data;
  }
};
</script>

<style lang="css" scoped>
@component-namespace hotSearch{
  @component rank{
    position: absolute;
    z-index: 2;
  }
  @component footer{
    @modifier searchNum{
      color: #FF8400;
    }
    @modifier total{
      color:#999999;
    }
  }
}
</style>
