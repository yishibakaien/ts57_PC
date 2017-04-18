<template>
  <div class="footer">
  I am footer {{message.desc}}
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

</style>
