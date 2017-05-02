<template lang="html">
  <div class="ts-raido-group">
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
    disabled: Boolean
  },
  watch: {
    value(val) {
      this.$emit('change', val);
    }
  }
};
</script>
