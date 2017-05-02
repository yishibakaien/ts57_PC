<template lang="html">
  <div class="shopManager-nav">
    <p class="shopManager-nav-title">
      店铺管理
    </p>
    <ul>
      <router-link :to="item.path" tag="li" exact active-class="active" v-for="item in navItem" class="shopManager-nav-menu" :key="item.path">{{item.name}}</router-link>
    </ul>
  </div>
</template>

<script>
import nav from '../nav';
export default {
  data() {
    return {
      navItem: nav
    };
  }
};
</script>

<style lang="css" scoped>
@import '../../../common/css/var.css';
@component-namespace shopManager{
  @component nav{
  /*店铺标题*/
    @descendent title{
      font-size: 24px;
      margin: 50px 0 24px 0;
      text-align: center;
    }
    /*导航条*/
    @descendent menu{
      line-height: 40px;
      transition: 0.3s;
      cursor: pointer;
      padding-left: 85px;
      &:hover{
        color:var(--navHoverColor) var(--navHoverBg)
      }
    }
  }
}
.active{
  color:var(--navHoverColor) var(--navHoverBg)
}
</style>
