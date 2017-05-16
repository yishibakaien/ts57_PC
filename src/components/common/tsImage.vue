<template lang="html">
  <div @mouseover="isSHow=true" @mouseout="isSHow=false" class="ts-image" :style="{width:width+'px',height:height+'px'}" @click="handleImg">
    <img class="ts-image-img" :src="src" :class="{'is-view':showOriginPic}">
  </div>
</template>

<script>
import emitter from '@/common/js/mixins/emitter';
import Popup from '@/common/js/utils/popup/';
// import {
//   ALI_DOMAIN
// } from '@/common/dict/const';
export default {
  data() {
    return {
      showOriginPic: false
    };
  },
  mixins: [emitter, Popup],
  watch: {
    src(val) {
      this.dispatch('tsFormItem', 'ts.form.change', [val]);
    }
  },
  // src--图片SRC
  // width/height--图片宽高
  props: {
    src: String,
    height: String,
    width: String,
    modal: {
      default: true
    },
    canView: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 2
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    }
  },
  directives: {
    'loadImage': {
      bind(el, binding, vnode) {
        let img = new Image();
        img.src = el.dataset.src;
        el.style.cssText = 'transition:"";opacity: 0';
        img.onload = function() {
          if (img.complete) {
            el.src = img.src;
            el.removeAttribute('data-src');
            el.style.cssText = 'transition:.5s;opacity: 1';
          }
        };
        img.onerror = function() {
          // TODO:加一个错误图片
        };
      },
      update(el, binding) {
        let img = new Image();
        img.src = el.dataset.src;
        if (!img.src) {
          el.style.cssText = 'transition:"";opacity: 0';
          img.onload = function() {
            if (img.complete) {
              el.src = img.src;
              el.removeAttribute('data-src');
              el.style.cssText = 'transition:.5s;opacity: 1';
            }
          };
          img.onerror = function() {
            // TODO:加一个错误图片
          };
        }
      }
    }
  },
  methods: {
    doClose() {
      this.$el.style.zIndex = 0;
      this.value = false;
      this._closing = true;
      this.onClose && this.onClose();
      setTimeout(() => {
        if (this.modal && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = this.bodyOverflow;
          document.body.style.paddingRight = this.bodyPaddingRight;
        }
        this.bodyOverflow = null;
        this.bodyPaddingRight = null;
      }, 200);
      this.opened = false;
      this.showOriginPic = false;
      if (!this.transition) {
        this.doAfterClose();
      }
    },
    handleImg() {
      this.$emit('handleImg');
      if (this.canView) {
        this.open();
        this.showOriginPic = true;
      }
    }
  }
};
</script>

<style lang="css" scoped>
@import '../../common/css/var.css';
@keyframes dialogfade {
  0% {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.3);
  }
  100% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0) scale(0.5);
  }
}
@keyframes imgfade {
  0% {
    opacity: 0;
    transform:scale(0.98);
  }
  100% {
    opacity: 1;
    transform:scale(1);
  }
}
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
      min-height:100%;
      vertical-align: middle;
      transition: all 0.3s;
      animation: imgfade .4s;
      &:hover{
        transform:scale(1.05);
      }
      @when view{
        transition:transform .8s;
        transform:translate(-50%, -50%) scale(0.5);
        position: fixed 50% 0 0 50%;
        animation: dialogfade .5s;
        perspective: 1000;
        backface-visibility: hidden;
        -webkit-user-select: none;
        backface-visibility: hidden;
        background: #fff;
      }
    }
    @descendent check{
      position: absolute 0 0 0 0;
      width: 100%;
      height: 100%;
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
