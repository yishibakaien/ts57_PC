<template lang="html">
  <div class="ts-raido-group" :class="{'is-bordered':bordered}">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from '@/common/js/mixins/emitter';
export default {
  name: 'tsRadioGroup',
  mixins: [Emitter],
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
      this.dispatch('tsFormItem', 'ts.form.change', [this.value]);
    }
  }
};
</script>
<style lang="css" scoped>
@import '../../../common/css/_var.css';
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
