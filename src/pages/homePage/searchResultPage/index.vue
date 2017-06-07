<template lang="html">
  <div class="search">
    <v-header>
  		<search></search>
  	</v-header>
  	<v-nav></v-nav>
    <div class="search-wrapper">
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
  }
};
</script>

<style lang="css" scoped>
@component-namespace search{
  @component wrapper{
    max-width: 1200px;
padding: 8px 6px;
margin: 10px auto;
background: #fff;
  }
}
</style>
