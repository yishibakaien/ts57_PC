<template>
  <div class="company-list-item">
    <div class="company-item">
      <div class="company-logo-box">
        <img class="company-logo" v-lazy="message.companyHeadIcon" v-errorImg>
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
    width 299px
    height 182px
    padding 16px
    background #fff
    border-left 1px solid #eaeaea
    border-bottom 1px  solid #eaeaea
    cursor pointer
    transition .8s
    &:hover
      box-shadow 0 2px 4px 0 rgba(76,147,253,0.30), 0 0 6px 0 rgba(76,147,253,0.30)
    .company-logo-box
      width 100%
      height 100%
      background #f1f1f1
      .company-logo
        width 100%
        height 100%
</style>
