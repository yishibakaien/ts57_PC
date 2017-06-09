<template lang="html">
  <div class="hotSearch-wrapper">
    <div slot="menu">
      <div class="hotSearch-title">
        爆款热搜
        <i class="icon-baokuanresou"></i>
      </div>
    </div>
    <div class="hotSearch-list">
      <ts-grid layOut="column" :data="BurstHotSearch">
        <ts-grid-item v-for="(product,index) in BurstHotSearch" :key="product" @click="handleViewProduct(product.productId)">
          <span class="ranking hotSearch-rank" :class="'ranking_'+index" v-if="index<3"></span>
          <ts-image
           width="220"
           height="220"
           :canView="false"
           disabledHover
           :src="product.defaultPicUrl">
           </ts-image>
           <template slot="footer" class="hotSearch-footer">
             <p>搜索量&nbsp;<span class="hotSearch-footer--searchNum">{{product.searchs}}</span></p>
             <p class="hotSearch-footer--total">共{{product.searchs}}款</p>
           </template>
         </ts-grid-item>
      </ts-grid>
      <router-link to="topSearch">
        <ts-button type="plain" size="large"  class="hotSearch-search" :disabled="isEmpty">更多爆款</ts-button>
      </router-link>
    </div>
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
        pageSize: 5
      },
      BurstHotSearch: {}
    };
  },
  computed: {
    isEmpty() {
      return !this.BurstHotSearch.length;
    }
  },
  methods: {
    handleViewProduct(id) {
      this.goto(`/product/${id}`);
    }
  },
  async created() {
    this.BurstHotSearch = (await burstHotSearch(this.Params)).data.data.list;
  }
};
</script>

<style lang="css" scoped>
@component-namespace hotSearch{
  @component list{
    padding: 22px;
    background: #fff;
  }
  @component footer{
    @modifier searchNum{
      color: #FF8400;
    }
    @modifier total{
      color:#999999;
    }
  }
  @component search{
    margin-top: 26px;
  }
  @component wrapper{
    min-width: 294px;
  }
  @component title{
    line-height: 45px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    background: #FF494F;
  }
  @component rank{
    position: absolute;
    z-index: 2;
  }
}
</style>
