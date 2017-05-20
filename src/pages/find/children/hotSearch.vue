<template lang="html">
  <div class="hotSearch-wrapper">
    <div class="hotSearch-title">
      <i class="icon-baokuanresou"></i>
      爆款热搜
    </div>
    <div class="hotSearch-list">
      <ts-grid type="column">
        <ts-grid-item v-for="product in 3" :key="product" @click="handleViewProduct(product)">
          <ts-image
           width="300"
           height="300"
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
      <ts-button type="plain" size="large">更多爆款</ts-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
@component-namespace hotSearch{
  @component wrapper{
    min-width: 344px;
  }
  @component list{
    padding: 22px;
    background: #fff;
  }
  @component title{
    line-height: 58px;
    color: #fff;
    text-align: center;
    font-size: 36px;
    background: #FF494F;
  }
}
</style>
