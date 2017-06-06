<template lang="html">
  <ts-dialog v-model="Search.dialog" width="60%" title="请框选图中要识别的区域">
    <cropper v-model="imageUrl" @getImage="handleGetImg"></cropper>
    <div>
      <slot></slot>
    </div>
    <div slot='footer'>
    </div>
  </ts-dialog>
</template>

<script>
import Cropper from '@/components/cropper/cropper.vue';
export default {
  data() {
    return {
      // image: '',
      Search: {
        dialog: false
      }
    };
  },
  props: ['imageUrl', 'value'],
  watch: {
    imageUrl(val) {
      this.image = val;
    },
    value(val) {
      this.$emit('input', val);
      this.Search.dialog = val;
    }
  },
  methods: {
    handleGetImg(destImg) {
      this.$emit('change', destImg);
    },
    handleCropper() {
      this.$emit('change', this.$refs.canvas.toDataURL());
      this.Search.dialog = false;
    }
  },
  components: {
    Cropper
  }
};
</script>

<style lang="css">
</style>
