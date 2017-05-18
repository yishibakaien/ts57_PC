<template lang="html">
  <div class="shop">
    <v-header>
    	<search></search>
    </v-header>
    <v-nav></v-nav>
    <section class="shopManager-container">
        <div class="shopManager-container-left">
          <shop-manager-nav></shop-manager-nav>
        </div>
        <div class="shopManager-container-right">
          <router-view></router-view>
        </div>
    </section>
  </div>
</template>

<script>
	import { header, nav, search } from '@/components';
  import shopManagerNav from './children/nav';
export default {
  components: {
    'vHeader': header,
    'vNav': nav,
    search,
    shopManagerNav
  }
};
</script>

<style lang="css" scoped>
:root{
  --navBg:#F8F8F8;
  --bg:#fff;
}
  @component-namespace shopManager{
    @component container{
      margin-top: 1em;
      display: flex;
      max-width: 1200px;
      margin: 1em auto 0;
      @descendent left{
        background: var(--navBg);
        width: 256px;
      }
      @descendent right{
        @neat-span-columns 9;
        padding: 24px;
        background: var(--bg);
      }
    }
  }
</style>
