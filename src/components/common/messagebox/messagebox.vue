<template>
<div class="ts-messagebox-wrapper">
  <transition name="messagebox-fade">
    <div class="ts-messagebox" v-show="value">
      <div class="ts-messagebox-header" v-if="title!==''">
        <!-- 提示标题  -->
        <div class="ts-messagebox-title onepx-b">
          {{title}}
        </div>
        <!-- 消息正文 -->
        <div class="ts-messagebox-content" v-if="message!==''">
          <div class="ts-messagebox-message" v-html="message"></div>
        </div>
        <!-- 底部按钮 -->
        <div class="ts-messagebox-btns">
          <button type="button" name="button" class="ts-messagebox-btn ts-messagebox-cancel" v-show="showCancelButton" @click="handleAction('cancel')" :class="cancelButtonClass">
        {{cancelButtonText}}
        </button>
          <button type="button" name="button" class="ts-messagebox-btn ts-messagebox-confirm" v-show="showConfirmButton" @click="handleAction('confirm')" :class="confirmButtonClass">
        {{confirmButtonText}}
        </button>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import Popup from '@/common/js/utils/popup/';
export default {
  data() {
    return {
      title: '',
      message: '',
      type: '',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      callback: null
    };
  },
  mixins: [Popup],
  props: {
    modal: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
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
  methods: {
    doClose() {
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
      if (!this.transition) {
        this.doAfterClose();
      }
    },
    handleAction(action) {
      var callback = this.callback;
      // 隐藏对话框
      this.value = false;
      // 回调
      callback(action);
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace ts {
   @component messagebox {
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate3d(-50%, -50%, 0);
     background-color: #fff;
     width: 30%;
     border-radius: 3px;
     font-size: 16px;
     transition: .4s;
     -webkit-user-select: none;
     overflow: hidden;
     backface-visibility: hidden;
     @descendent header {
      box-sizing: border-box;
      min-height: 44px;
     }
     @descendent content {
       padding: 10px 20px 15px;
       border-bottom: 1px solid #ddd;
       min-height: 36px;
       position: relative;
     }
     @descendent title {
       text-align: center;
       margin-bottom: 0;
       font-size: 16px;
       padding: 12px;
       font-weight: bold;
       color: #333;
     }

     @descendent message {
       color: #999;
       margin: 0;
       text-align: center;
       line-height: 36px;
     }

     @descendent btns {
       display: flex;
       height: 40px;
       line-height: 40px;
       background: #F8F8F8;
     }

     @descendent btn {
       line-height: 35px;
       display: block;
       background-color: #fff;
       flex: 1;
       margin: 0;
       border: 0;
       &:focus {
         outline: none;
       }

       &:active {
         background-color: #fff;
       }
     }

     @descendent cancel {
       width: 50%;
       border-right: 1px solid #ddd;
       &:active {
         color: #000;
       }
     }

     @descendent confirm {
       color: #26a2ff;
       width: 50%;
       &:active {
        color: #26a2ff;
       }
     }
   }
 }

.messagebox-fade-enter-active {
   animation: messagebox-fade-in .3s;
 }

 .messagebox-fade-leave-active {
   animation: messagebox-fade-out .3s;
 }

 .messagebox-fade-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) translateY(20px);
  }
  .messagebox-fade-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) translateY(20px);
  }

</style>
