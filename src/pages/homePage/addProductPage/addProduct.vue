<template>
<div class="flower-add">
  <v-header>
    <search></search>
  </v-header>
  <v-nav></v-nav>
  <div class="flower-add-wrapper">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import {
  header,
  nav,
  search
} from '@/components';
export default {
  components: {
    vHeader: header,
    vNav: nav,
    search
  },
  created() {
    document.querySelector('.main-wrapper').style.background = '#fff';
  }
};
</script>

<style scoped>
@component-namespace flower-add {
  @component wrapper {
    max-width: 1200px;
    margin: 10px auto;
  }
}
</style>
