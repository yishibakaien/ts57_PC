<template>
<div>
  <v-header>
    <search></search>
  </v-header>
  <v-nav></v-nav>
  <!-- 发现 -->
  <div class="find">
    <carousel v-if="isIndex"></carousel>
    <div class="find-content">
      <router-view></router-view>
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
import Carousel from './children/find/findCarousel';
export default {
  components: {
    'vHeader': header,
    'vNav': nav,
    search,
    Carousel
  },
  watch: {
    // 是否回到发现首页 => 背景色变白
    isIndex(val) {
      document.querySelector('.main-wrapper').style.backgroundColor = !val ? '#fff' : '#F2F2F2';
    }
  },
  computed: {
    // 是否发现首页
    isIndex() {
      return this.$route.path.indexOf('index') >= 0;
    }
  }
};
</script>
<style scoped>
@component-namespace find {
  @component content {
    max-width: 1200px;
    margin: 1em auto;
  }
}
</style>
