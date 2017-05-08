<template>
<div :class="[type === 'textarea' ? 'ts-textarea' : 'ts-input',{'is-disabled': disabled}]">
  <!-- input -->
  <input class="ts-input--inner" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :maxlength="maxlength" :minlength="minlength" :autocomplete="autoComplete" :autofocus="autofocus"
    :min="min" :max="max" :step="step" :value="currentValue" ref="input" @input="handleInput" @focus="handleFocus" @blur="handleBlur" :class="{'is-validateEvent':validateEvent}">
    <div class="ts-input--append" v-if="$slots.append">
       <slot name="append"></slot>
     </div>
  <!-- textarea -->
  <textarea v-if="type === 'textarea'" :class="{'is-validateEvent':validateEvent}" class="ts-textarea--inner" :value="currentValue" @input="handleInput" ref="textarea" :name="name" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :rows="rows" :autofocus="autofocus"
    :maxlength="maxlength" :minlength="minlength" @focus="handleFocus" @blur="handleBlur">
   </textarea>
 </div>
 </template>
<script>
import emitter from '@/common/js/mixins/emitter';
export default {
  data() {
    return {
      currentValue: this.value
    };
  },
  mixins: [emitter],
  props: {
    value: [String, Number],
    placeholder: String,
    readonly: Boolean,
    autofocus: Boolean,
    disabled: Boolean,
    name: String,
    rows: {
      type: Number,
      default: 2
    },
    type: {
      type: String,
      default: 'text'
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    maxlength: Number,
    minlength: Number,
    max: {},
    min: {},
    step: {},
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    'value' (val, oldValue) {
      this.setCurrentValue(val);
    }
  },
  computed: {
    validating() {
      return this.$parent.validateState === 'validating';
    }
  },
  methods: {
    setCurrentValue(value) {
      if (value === this.currentValue) {
        return;
      }
      this.currentValue = value;
      if (this.validateEvent) {
        this.dispatch('tsFormItem', 'ts.form.change', [value]);
      }
    },
    handleFocus(event) {
      this.$emit('focus', event);
    },
    handleBlur(event) {
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('tsFormItem', 'ts.form.blur', [this.currentValue]);
      }
    },
    handleInput(event) {
      const value = event.target.value;
      this.$emit('input', value);
      this.setCurrentValue(value);
      this.$emit('change', value);
    }
  }
};
</script>
<style lang="css" scoped>
@import '../../common/css/var.css';
@component-namespace ts{
  @component input {
    position: relative;
    display: inline-table;
    width: 100%;
    margin:2px 0;
    @modifier inner{
      appearance: none;
      background-color: var(--input-fill);
      background-image: none;
      border: var(--input-border);
      box-sizing: border-box;
      color: var(--input-color);
      display: table-cell;
      height: var(--input-height);
      line-height: 1;
      outline: none;
      padding: 3px 10px;
      transition: var(--border-transition-base);
      width: 100%;
      &::placeholder {
        color: var(--input-placeholder-color);
      }
      &:hover {
        border-color: var(--input-hover-border);
      }
      &:focus {
        outline: none;
      }
    }
    @modifier append{
      color:var(--input-append-color);
      vertical-align: middle;
      display: table-cell;
      position: relative;
      border: var(--input-border);
      border-left: none;
      padding: 0 10px;
      width: 1%;
      white-space: nowrap;
      cursor: pointer;
      &:hover{
        color:var(--input-append-hover-color);
      }
    }
    @when disabled {
    .ts-input--inner {
      background-color: var(--input-disabled-fill);
      border-color: var(--input-disabled-border);
      color: var(--input-disabled-color);
      cursor: not-allowed;
    }
  }
  }
  @component textarea {
      display: inline-block;
      width: 100%;
      vertical-align: bottom;
      @modifier inner {
        resize:none!important;
        display: block;
        resize: vertical;
        padding: 5px 7px;
        line-height: 1.5;
        box-sizing: border-box;
        width: 100%;
        color: var(--input-color);
        background-color: var(--input-fill);
        background-image: none;
        border: var(--input-border);
        border-radius: var(--input-border-radius);
        transition: var(--border-transition-base);
        &::placeholder {
          color: var(--input-placeholder-color);
        }
        &:hover {
          border-color: var(--input-hover-border);
        }
        &:focus {
          outline: none;
        }
      }
      @when disabled {
      .ts-textarea--inner {
        background-color: var(--input-disabled-fill);
        border-color: var(--input-disabled-border);
        color: var(--input-disabled-color);
        cursor: not-allowed;
      }
    }
    }
}
.is-error {
  .is-validateEvent{
    transition: 0.3s;
    border-color: red;
  }
}
</style>
