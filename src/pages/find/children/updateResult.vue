<template>
<div class="update-result-wrapper">
  <p class="update-result-tip">
    <span class="ranking update-result-tip-ranking" :class="`ranking_${$route.params.id}`" v-if="$route.params.id<3"></span> 周搜索量
    <span class="update-result-tip--count">{{$route.query.searchs}}</span>／共<span class="update-result-tip--count">{{$route.query.sameCount}}</span>款，排行<span class="update-result-tip--ranking">{{$route.params.id}}</span>位
  </p>
  <ts-grid :data="Search.list" class="update-result-data">
    <ts-grid-item style="width:240px" v-for="product in Search.list" :key="product" @click="handleGotoProduct(product.id)">
      <ts-image width="170" height="170" :canView="false" disabledHover :src="product.defaultPicUrl">
      </ts-image>
      <p class="update-result-product--number">{{product.productNo}}</p>
      <template slot="footer">
         <span v-if="product.price>0&&!!product.price">¥{{product.price/100}}/{{product.priceUnit | filterDict(DICT.PriceUnits) }}</span>
        <span v-else>价格面议</span>
       </template>
    </ts-grid-item>
  </ts-grid>
  <ts-button type="plain" @click="handleLoadMore">加载更多爆款</ts-button>
</div>
</template>

<script>
import DICT from '@/common/dict';
import {
  searchGetHot
} from '@/common/api/api';
export default {
  data() {
    return {
      Search: {},
      // 数据字典
      DICT: {
        PriceUnits: DICT.PriceUnits
      },
      Params: {
        pageNo: 1,
        pageSize: 10,
        rank: ''
      }
    };
  },
  watch: {
    Params: {
      async handler(val) {
        this.Search = (await searchGetHot(val)).data.data;
      },
      deep: true
    }
  },
  methods: {
    handleLoadMore(number) {
      this.Params.pageNo++;
    },
    handleGotoProduct(id) {
      this.goto(`/product/${id}`);
    }
  },
  created() {
    this.Params.rank = this.$route.params.id;
  }
};
</script>

<style lang="css" scoped>
@component-namespace update-result{
  @component product{
    @modifier number{
      font-size: 16px;
      margin-top: 10px;
      text-align: left;
      max-width: 200px;
      @utils-ellipsis;
    }
  }
  @component data{
    margin-bottom: 16px;
  }
  @component wrapper{
    text-align: center;
  }
  @component tip{
    text-align: center;
    font-size: 20px;
    margin: 16px auto;
    @modifier count{
      color:#3385ff;
    }
    @descendent ranking{
      vertical-align: middle;
    }
    @modifier ranking{
      color:#ff8400;
    }
    span{
      margin: 0 4px;
    }
  }
}
</style>
