<template>
<section class="ts-section">
  <!-- 头部 -->
  <div class="ts-section-header onepx-b">
    <!-- 头部——标题 -->

    <p class="ts-section-header--title" v-if="!$slots.title">
      <span v-if="!pageTitle" v-text="$route.name"></span>
      <span v-else>{{pageTitle}}</span>
    </p>
    <p class="ts-section-header--title" v-else>
      <slot name="title"></slot>
    </p>
    <div class="ts-section-header--menu">
      <!-- 头部——菜单 -->
      <slot name="menu">
      </slot>
    </div>
  </div>
  <!--  内容-->
  <div class="ts-section-content">
    <slot></slot>
  </div>
  <!-- 尾部 -->
  <div class="ts-section-footer">
    <slot name="footer"></slot>
  </div>
</section>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace ts{
  @component section {
    background: #fff;
    /*头部*/
    @descendent header{
      display: flex;
      align-items: center;
      @modifier title{
        font-size: 24px;
        font-weight: 600;
        line-height: 34px;
        padding:12px;
      }
      @modifier menu{
        flex:1;
        text-align: right;
        padding-right: 6px;
      }
    }
    /*内容*/
    @descendent content{
        padding-top:20px;
        min-height: 100px;
    }
    /*尾部*/
    @descendent footer{
      margin-top:24px;
    }
  }
}
</style>
