<template>
<section>
  <slot v-if="show"></slot>
  <ts-menu-table v-else>
    <div slot="header-left">
      <ts-checkbox :disabled="true"></ts-checkbox>
    </div>
    <ts-menu-table-item width="1%">
      暂无数据
    </ts-menu-table-item>
  </ts-menu-table>
</section>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  props: ['prop'],
  watch: {
    prop(val) {
      this.show = this.prop.length > 0;
    }
  }
};
</script>
