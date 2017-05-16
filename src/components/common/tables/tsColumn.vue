<template>
  <span>
    <slot></slot>
  </span>
</template>
<script>
export default {
  props: {
    dataKey: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    align: {
      type: String,
      default: 'left'
    },
    width: {
      type: String,
      default: '200px'
    },
    image: {
      type: Boolean,
      default: false
    },
    action: [String, Array, Object]
  }
};
</script>
<style>
</style>
