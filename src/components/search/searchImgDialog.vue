<template lang="html">
  <!-- @close="handleClose"  -->
  <ts-dialog :close-on-press-escape='false' v-model="dialog.show" width="60%" title="请框选图中要识别的区域">
    <cropper v-model="imageUrl" @getImage="handleGetImg"></cropper>
      <div class="search-editPic--menu">
        <ts-button type="primary" v-for="item in DICT.productType" :key="item.dicValue" @click="handleLookProduct(item.dicValue)">搜{{item.label}}</ts-button>
      </div>
    <div slot='footer'>
    </div>
  </ts-dialog>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import DICT from '@/common/dict';
import Cropper from '@/components/cropper/cropper.vue';
export default {
  data() {
    return {
      DICT: {
        productType: DICT.SupplyType
      },
      Progress: {
        interval: null
      },
      Pic: {
        destImg: '',
        url: ''
      }
    };
  },
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
  beforeDestroy() {
    this.$store.commit('SET_PROGRESS', 1);
    this.$store.commit('SET_HANDLE_STATUS', false);
    this.$store.commit('CLEAR_INTERVAL');
    this.$store.commit('SET_SEARCH_EMPTY');
    clearInterval(this.Progress.interval);
  },
  watch: {
    imageUrl(val) {
      this.image = val;
    },
    'search.id' (val) {
      this.$store.commit('SET_PROGRESS', 100);
      this.$store.commit('SET_HANDLE_STATUS', false);
      this.$store.commit('CLEAR_INTERVAL');
      clearInterval(this.Progress.interval);
      this.$emit('change', val);
    }
  },
  methods: {
    handleLookProduct(e) {
      let data = {
        encoded: this.Pic.destImg,
        category: e
      };
      this.$emit('check', data);
      sessionStorage.setItem('find-pic', JSON.stringify(data));
      // 选择图片区域的对话框关闭
      this.dialog.show = false;
      // 进度条显示
      this.$store.commit('SET_PROGRESS', 1);
      this.$store.commit('SET_HANDLE_STATUS', true);
      if (this.search.handleStatus) {
        this.Progress.interval = setInterval(() => {
          if (this.search.progress > 95) {
            this.$store.commit('SET_PROGRESS', 95);
            clearInterval(this.Progress.interval);
          } else {
            this.$store.commit('SET_PROGRESS', (Math.random() * (this.search.progress += 1) + (this.search.progress++)).toFixed(2));
          }
        }, 1500);
      }
    },
    handleGetImg(destImg) {
      this.Pic.destImg = destImg;
    },
    handleCropper() {
      this.$emit('change', this.$refs.canvas.toDataURL());
      this.dialog.show = false;
    }
  },
  computed: {
    ...mapGetters(['search', 'dicTree'])
  },
  components: {
    Cropper
  }
};
</script>

<style lang="css" scoped>
@component-namespace search{
  @component editPic {
    @modifier menu {
      text-align: center;
      clear: both;
      padding-top: 16px;
      button {
        margin: 0 4px;
      }
    }
  }
}
</style>
