<template>
<transition name="dialog-fade">
  <div class="ts-dialog--wrapper" v-show="visible" @click.self="handleWrapperClick">
    <div class="ts-dialog" ref="dialog" :style="{width:boxWidth}">
      <!-- 头部 -->
      <div class="ts-dialog--header onepx-b" :style="{textAlign:titleNeedCenter?'center':''}">
        <span class="ts-dialog--title">{{title}}</span>
        <slot name="title">
        </slot>
        <div class="ts-dialog--headerbtn" v-if="!titleNeedCenter">
          <i v-if="showClose" class="ts-dialog--close" @click="close">&times</i>
        </div>
      </div>
      <!-- 正文内容 -->
      <div class="ts-dialog--body" v-if="rendered">
        <slot></slot>
      </div>
      <!-- 底部 -->
      <div class="ts-dialog--footer onepx-t">
        <template v-if="!$slots.footer">
        <button type="button" class="ts-dialog--button is-cancel" v-if="type==='confirm'" @click="handleClose">取消</button>
        <button type="button" class="ts-dialog--button is-confirm" v-if="type==='confirm'" @click="handleConfirm">{{alertText}}</button>
        <button type="button" class="ts-dialog--button is-confirm" v-if="type==='alert'" @click="handleConfirm">{{alertText}}</button>
      </template>
        <!-- {{$slots.default}} -->
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import emitter from '@/common/js/mixins/emitter';
import Popup from '@/common/js/utils/popup/';
export default {
  mixins: [Popup, emitter],
  computed: {
    // 如果不写单位自动加上px
    // 写了单位就取%
    boxWidth() {
      if (this.width.indexOf('%') < 0) {
        return this.width + 'px';
      } else {
        return this.width;
      }
    }
  },
  props: {
    // title----标题
    // modal----是否需要modal层
    // lockScroll----不允许滚动
    // closeOnClickModal----点击modal层可以关闭
    // closeOnPressEscape----按下esc关闭
    // showClose----显示关闭按钮
    // titleNeedCenter----标题需要居中？（居中：关闭按钮会隐藏）
    // width--默认宽度是160px
    // alertText--底部框按钮确定的文字
    width: {
      type: String,
      default: '50%'
    },
    type: {
      type: String,
      default: 'confirm',
      validator(value) {
        return [
          'alert',
          'confirm'
        ].indexOf(value) > -1;
      }
    },
    alertText: {
      type: String,
      default: '确定'
    },

    title: {
      type: String
    },
    titleNeedCenter: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('input', val);
      if (val) {
        this.$emit('open');
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
        });
      } else {
        this.$emit('close');
      }
    }
  },
  methods: {
    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.close();
      }
    },
    handleConfirm() {
      this.$emit('confirm');
    },
    handleClose() {
      this.$emit('close');
    }
  },
  mounted() {
    if (this.value) {
      this.rendered = true;
      this.open();
    }
  }
};
</script>

<style lang="css" scoped>
@import '../../common/css/var.css';
@component-namespace ts{
  @component dialog{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    background: #fff;
    box-sizing: border-box;
    margin-bottom: 50px;
    @modifier wrapper{
      position: fixed 0 0 0 0;
      overflow: auto;
      margin: 0;
    }
      @modifier header{
      padding: 10px;
      box-sizing: border-box;
      min-height: 44px;
    }
      @modifier close{
      cursor: pointer;
      color: #333;
      font-size: 1.4rem;
      &:hover{
        color:grey;
      }
    }
       @modifier title{
      vertical-align: sub;
      color: #333;
      }
      @modifier body{
      padding: 20px;
      font-size: 16px;
    }
      @modifier headerbtn{
      float: right;
    }
      @modifier footer{
      text-align: center;
      background-color:var(--dialogFooterBg);
      box-sizing: border-box;
      height: 40px;
      align-items: center;
      display: flex;
      padding-left: 10px;
    }
    @modifier button{
      border: none;
      background-color:var(--dialogFooterBg);
      border-right: 1px solid var(--dialogRightButton);
      flex: 1;
      height: 40px;
      cursor: pointer;
      transition: .3s;
      font-size: 16px;
      @when cancel{
        color: var(--dialogCancelButton);
        &:hover{
          color:#333 #f2f2f2;
        }
      }
      @when confirm {
        color: var(--dialogConfirmButton);
        &:hover{
          color:#3385ff #f2f2f2;
        }
      }
    }
  }
}

.dialog-fade-enter-active {
    animation: dialog-fade-in .3s;
  }

  .dialog-fade-leave-active {
    animation: dialog-fade-out .3s;
  }

  @keyframes dialog-fade-in {
    0% {
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes dialog-fade-out {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
  }

</style>
