<template lang="html">
  <div class="hotSearch-wrapper">
    <div slot="menu">
      <div class="hotSearch-title">
        爆款热搜
        <i class="icon-baokuanresou"></i>
      </div>
    </div>
    <div class="hotSearch-list">
      <ts-grid type="column">
        <ts-grid-item v-for="(product,index) in 3" :key="product" @click="handleViewProduct(product)">
          <span class="ranking hotSearch-rank" :class="'ranking_'+index" v-if="index<3"></span>
          <ts-image
           width="220"
           height="220"
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
      <router-link to="topSearch">
        <ts-button type="plain" size="large">更多爆款</ts-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
@component-namespace hotSearch{
  @component list{
    padding: 22px;
    background: #fff;
  }
  @component title{
    line-height: 45px;
    color: #fff;
    text-align: center;
    font-size: 22px;
    background: #FF494F;
  }
  @component rank{
    position: absolute;
    z-index: 2;
  }
}
</style>
