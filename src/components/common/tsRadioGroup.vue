<template lang="html">
  <div class="ts-raido-group" :class="{'is-bordered':bordered}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tsRadioGroup',
  componentName: 'tsRadioGroup',
  props: {
    value: {},
    fill: String,
    textColor: String,
    disabled: Boolean,
    bordered: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      this.$emit('change', val);
    }
  }
};
</script>
<style lang="css" scoped>
@import '../../common/css/var.css';
  .is-bordered{
    .ts-radio{
      &:before{
        position:absolute 0 0 0 0;
        content: ' ';
        border:var(--radio-bordered-color);
      }
    }
  }
</style>
