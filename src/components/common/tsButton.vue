<template>
<button class="ts-button" @click="handleClick" :disabled="disabled" :class="['ts-button--'+type,'ts-button--'+size,{'is-disabled':disabled}]">
    <span class="ts-button-icon" v-if="icon || $slots.icon">
      <slot name="icon">
        <i v-if="icon" class="iconfont" :class={"iconfont-"+icon}></i>
      </slot>
    </span>
    <label class="ts-button-text">
      <slot></slot>
    </label>
</button>
</template>

<script>
export default {
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  },
  props: {
    icon: String,
    disabled: Boolean,
    type: {
      type: String,
      default: 'default',
      validator(val) {
        return [
          'default',
          'cancel',
          'primary',
          'warning',
          'plain',
          'text'
        ].indexOf(val) > -1;
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return [
          'small',
          'normal',
          'large'
        ].indexOf(value) > -1;
      }
    }
  }
};
</script>

<style lang="css" scoped>
@import "../../common/css/var.css";

@component-namespace ts {
  @component button {
    appearance: none;
    box-sizing: border-box;
    color: inherit;
    display: block;
    height:var(--button-height);
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    min-width:var(--button-width);
    &::after {
      background-color: #000;
      content: " ";
      opacity: 0;
      position: absolute 0 0 0 0;
    }
    &:not(.is-disabled):active::after {
      opacity: .1;
    }
    @descendent icon {
      vertical-align: middle;
      display: inline-block;
    }
    @modifier text {
      color: var(--button-plain-color);
      border:none;
      background-color: var(--button-plain-background-color);
    }
    @modifier default {
      color: var(--button-default-color);
      border:1px solid var(--button-cancel-color);
      background-color: var(--button-default-background-color);
    }
    @modifier plain {
      color: var(--button-plain-color);
      border:1px solid var(--button-plain-color);
      background-color: var(--button-plain-background-color);
    }
    @modifier primary {
      color: var(--button-primary-color);
      border:none;
      background-color: var(--button-primary-background-color);
    }
    @modifier warning {
      color: var(--button-warning-color);
      border:none;
      background-color: var(--button-warning-background-color);
    }
    @modifier cancel {
      color: var(--button-cancel-color);
      border:none;
      background-color: var(--button-cancel-background-color);
    }
    @modifier large {
      display: block;
      width: 100%;
    }
    @modifier normal {
      display: inline-block;
      padding: 0 12px;
    }
    @modifier small {
      display: inline-block;
      font-size: 12px;
      padding: 0 12px;
      height: 25px;
    }
    @when disabled {
      opacity: .6;
      cursor: not-allowed;
    }
  }
}
</style>
