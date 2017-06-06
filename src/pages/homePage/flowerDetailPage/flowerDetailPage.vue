<template>
<div class="flower-detail">
  <v-header>
    <search></search>
  </v-header>
  <v-nav></v-nav>
  <div class="flower-detail-wrapper">
    <product-intro></product-intro>
    <update-product></update-product>
  </div>
</div>
</template>

<script>
import {
  header,
  nav,
  search
} from '@/components';
import ProductIntro from './children/productIntro.vue';
import UpdateProduct from './children/updateProducts.vue';
export default {
  components: {
    vHeader: header,
    vNav: nav,
    search,
    ProductIntro,
    UpdateProduct
  },
  created() {
    document.querySelector('.main-wrapper').style.background = '#fff';
    this.$store.dispatch('getProduct', this.$route.params.id);
  }
};
</script>

<style scoped>
@component-namespace flower-detail {
  @component wrapper {
    max-width: 1200px;
    margin: 10px auto;
  }
}
</style>
