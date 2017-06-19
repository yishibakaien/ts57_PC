<template>
<div>
  <v-header>
    <search></search>
  </v-header>
  <v-nav></v-nav>
  <div class="entry-wrapper">
    <ts-title-block>入驻信息</ts-title-block>
		<entry-list></entry-list>
  </div>
</div>
</div>
</template>
<script>
import {
  header,
  nav,
  search
} from '@/components';
import EntryList from './children/entryList.vue';
export default {
  components: {
    'vHeader': header,
    'vNav': nav,
    search,
    EntryList
  }
};
</script>
<style scoped>
@component-namespace entry {
  @component wrapper {
    max-width: 1200px;
    margin: 10px auto;
  }
}
</style>
