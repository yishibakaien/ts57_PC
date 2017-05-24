<template lang="html">
    <div class="">
      <ts-title-block>大家在找</ts-title-block>
      <ts-grid>
        <ts-grid-item v-for="product in 12" :key="product" @click="handleViewProduct(product)">
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
export default {
};
</script>
