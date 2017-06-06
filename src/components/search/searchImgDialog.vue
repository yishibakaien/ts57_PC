<template lang="html">
  <ts-dialog :close-on-press-escape='false' @close="handleClose" v-model="dialog.show" width="60%" title="请框选图中要识别的区域">
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
  props: {
    imageUrl: String,
    dialog: {
      type: Object,
      default: function(argument) {
        return {
          show: false
        };
      }
    }
  },
  watch: {
    imageUrl(val) {
      this.image = val;
    }
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleGetImg(destImg) {
      this.$emit('change', destImg);
    },
    handleCropper() {
      this.$emit('change', this.$refs.canvas.toDataURL());
      this.dialog.show = false;
    }
  },
  components: {
    Cropper
  }
};
</script>

<style lang="css">
</style>
