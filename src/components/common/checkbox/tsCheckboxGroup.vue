<template lang="html">
  <div class="ts-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from '@/common/js/mixins/emitter';
export default {
  componentName: 'tsCheckboxGroup',
  mixins: [Emitter],
  props: {
    value: {}
  },
  watch: {
    value(val) {
      // 向上传递给FormItem => 表单验证&提交
      this.dispatch('tsFormItem', 'ts.form.change', [val]);
    }
  }
};
</script>

<style lang="css">
</style>
