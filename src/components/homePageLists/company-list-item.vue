<template>
  <div class="company-list-item">
    <div class="company-item">
      <div class="company-logo-box">
        <img class="company-logo" :src="message.companyHeadIcon" v-errorImg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" scoped>
.company-list-item
  .company-item
    box-sizing border-box
    width 299.5px
    height 160.5px
    padding 16px
    background #fff
    border-left 1px solid #d8d8d8
    border-bottom 1px  solid #d8d8d8
    cursor pointer
    &:hover
      position relative
      border 1px solid rgba(76, 147, 253, 0.8)
      box-shadow 0 0 5px rgba(76, 147, 253, 0.8)
      z-index 1
    .company-logo-box
      width 100%
      height 100%
      background #f1f1f1
      .company-logo
        width 100%
        height 100%
</style>
