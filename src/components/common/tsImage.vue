<template lang="html">
  <div @mouseover="isSHow=true" @mouseout="isSHow=false" class="ts-image" :style="{width:width+'px',height:height+'px'}" @click="handleImg">
    <img class="ts-image-img" :data-src="picUrl" v-loadImage>
  </div>
</template>

<script>
import emitter from '@/common/js/mixins/emitter';
import {
  ALI_DOMAIN
} from '@/common/dict/const';
export default {
  computed: {
    picUrl: {
      get() {
        if (this.value.indexOf(ALI_DOMAIN) > -1) {
          return this.value;
        } else {
          return ALI_DOMAIN + this.value;
        }
      }
    }
  },
  mixins: [emitter],
  watch: {
    value(val) {
      this.dispatch('tsFormItem', 'ts.form.change', [val]);
    }
  },
  // src--图片SRC
  // width/height--图片宽高
  props: {
    src: String,
    value: {
      type: String,
      default: null
    },
    height: String,
    width: String
  },
  directives: {
    'loadImage': {
      bind(el, binding, vnode) {
        let img = new Image();
        img.src = el.dataset.src;
        el.style.cssText = 'transition: "";opacity: 0;';
        img.onload = function() {
          if (img.complete) {
            el.src = img.src;
            el.style.cssText = 'transition: .5s;opacity: 1;';
          }
        };
        img.onerror = function() {
          // TODO:加一个错误图片
        };
      },
      update(el, binding) {
        let img = new Image();
        img.src = el.dataset.src;
        el.style.cssText = 'transition: "";opacity: 0;';
        img.onload = function() {
          if (img.complete) {
            el.src = img.src;
            el.style.cssText = 'transition: .5s;opacity: 1;';
          }
        };
        img.onerror = function() {
          // TODO:加一个错误图片
        };
      }
    }
  },
  methods: {
    handleImg() {
      this.$emit('handleImg');
    }
  }
};
</script>

<style lang="css" scoped>
@import '../../common/css/var.css';
@component-namespace ts{
  @component image{
    color:#fff;
    overflow: hidden;
    display: inline-block;
    position: relative;
    border:1px solid rgba(155,155,155,0.1);
    box-sizing: border-box;
    vertical-align: middle;
    @descendent img{
      max-width: 100%;
      min-height: 100%;
      vertical-align: middle;
    }
    @descendent check{
      position: absolute 0 0 0 0;
      width: 100%;height: 100%;
      color: red;
      @modifier side{
        position: absolute 4px * * 4px;
      }
    }
    @descendent bottom{
      position: absolute * 0 0 0;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
      transition: 0.3s;
      color: var(--imageColor) var(--imageBtBg);
    }
  }
}
</style>
