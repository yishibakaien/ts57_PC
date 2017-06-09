<template>
<div class="company-item onepx" @click="handleGotoShop(message)">
  <div class="company-logo-box">
    <img class="company-logo" v-lazy="message.pic" v-errorImg>
  </div>
</div>
</template>

<script>
export default {
  props: ['message'],
  methods: {
    handleGotoShop(item) {
      this.goto(`/shop/${item.companyId}`);
    }
  }
};
</script>

<style lang="stylus" scoped>
  .company-item
    box-sizing border-box
    width 300px
    height 182px
    padding 16px
    cursor pointer
    transition 1s
    &:hover
      box-shadow 0 2px 4px 0 rgba(76,147,253,0.30), 0 0 6px 0 rgba(76,147,253,0.30)
    .company-logo-box
      width 100%
      height 100%
      .company-logo
        width 100%
        height 100%
</style>
