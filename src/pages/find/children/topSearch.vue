<template lang="html">
    <div class="ts-content">
      <title-block>爆款热搜</title-block>
      <ts-grid>
        <ts-grid-item v-for="(product,index) in 12" :key="product" @click="handleViewProduct(product)">
          <span class="ranking topSearch-rank" :class="'ranking_'+index" v-if="index<3"></span>
          <ts-image
           width="170"
           height="170"
           :canView="false"
           disabledHover
           src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/6e5157df050b7a94d30b7418bd54f92a_121_121.jpg">
           </ts-image>
           <template slot="footer">
             <span>面料</span>
             <ts-tag>有库存</ts-tag>
           </template>
         </ts-grid-item>
      </ts-grid>
    </div>
</template>

<script>
import TitleBlock from '../component/titleBlock.vue';
export default {
  components: {
    TitleBlock
  }
};
</script>

<style lang="css" scoped>
@component-namespace topSearch{
  @component rank{
    position: absolute;
    z-index: 2;
  }
}
</style>
