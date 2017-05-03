<template>
<div class="ts-form-item" :class="{
          'is-error': validateState==='error',
          'is-required': isRequired || required
          }">
  <label :for="prop" class="ts-form-item--label" :style="labelStyle" v-if="label">
    {{label}}
  </label>
  <div class="ts-form-item--content" :style="contentStyle">
    <slot></slot>
    <div class="ts-form-item--error" v-if="validateState === 'error'&&form.showMessage">
      {{validateMessage}}
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import emitter from '@/common/js/mixins/emitter'

function noop() {};

function getPropByPath(obj, path) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;

  for (let len = keyArr.length; i < len - 1; ++i) {
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      throw new Error('please transfer a valid prop path to form item!');
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]]
  };
};
export default {
  componentName: 'tsFormItem',
  mixins: [emitter],
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: Boolean,
    rules: Array,
    error: String,
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('tsForm', 'el.form.addField', [this]);
    }
    let initialValue = this.fieldValue;
    if (Array.isArray(initialValue)) {
      initialValue = [].concat(initialValue);
    }
    Object.defineProperty(this, 'initialValue', {
      value: initialValue
    });
    let rules = this.getRules();
    if (rules.length) {
      rules.every(rule => {
        if (rule.required) {
          this.isRequired = true;
          return;
        }
      })
    }
    this.$on('ts.form.blur', this.onFieldBlur);
    this.$on('ts.form.change', this.onFieldChange);
  },
  methods: {
    // 获取Rules
    getRules() {
      var formRules = this.form.rules;
      var selfRuels = this.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(selfRuels || formRules || []);
    },
    getFilteredRule(trigger) {
      var rules = this.getRules();
      return rules.filter(rule => {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
      });
    },
    // 验证
    validate(trigger, callback = noop) {
      var rules = this.getFilterdRule(trigger);
      if (!rules || rules.length === 0) {
        callback();
        return true;
      }
      var descriptor = {};
      descriptor[this.prop] = rules;
      var validator = new AsyncValidator(descriptor);
      var model = {};
      model[this.prop] = this.fieldValue;
      validator.validate(model, {
        firstFields: true
      }, (errors, fields) => {
        this.validateMessage = errors ? errors[0].message : '';
        callback(this.validateMessage);
      });
    },
    // 当文本域发生变化
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }
      this.validate('change');
    },
    // 当文本域失去焦点
    onFieldBlur() {
      this.validate('blur')
    },
  },
  watch: {
    error(val) {
      this.validateMessage = value;
    }
  },
  beforeDestroy() {
    this.dispatch('tsForm', 'el.form.removeField', [this]);
  },
  data() {
    return {
      // 验证消息
      validateMessage: '',
      // 是否禁用验证
      validateDisabled: false,
      validator: {},
      isRequired: false
    }
  },
  computed: {
    // 标签的样式
    labelStyle() {
      var style = {};
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (this.form.lablePosition === 'top') {
        return style;
      }
      if (labelWidth) {
        style.width = labelWidth;
      }
      return style;
    },
    // 内容的样式
    contentStyle() {
      var style = {};
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (this.form.lablePosition === 'top' || this.form.inline) {
        return style;
      }
      if (labelWidth) {
        style.marginLeft = labelWidth;
      }
      return style;
    },
    // ?????
    form() {
      var parent = this.$parent;
      while (parent.$options.componentName) {
        parent = parent.$parent;
      }
    },
    // 区域的值
    fieldValue: {
      cache: false,
      get() {
        var model = this.form.model;
        if (!model || !this.prop) {
          return;
        }
        var path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }
        return getPropByPath(model, path).v;
      }
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace ts{
  @component form-item{
    margin-bottom: 22px;
    @utils-clearfix;
    @modifier label{
      text-align: right;
      vertical-align: middle;
      float: left;
      line-height: 1;
      padding: 10px;
      box-sizing: border-box;
    }
    @modifier content{
      line-height: 36px;
      position: relative;
      @utils-clearfix;
    }
    @modifier err{
      color:red;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
      left: 0;
    }
    @when required{
      .ts-form-item--label:before{
        content:'*';
        color: red;
        margin-right: 4px;
      }
    }
    @when error{
    & .ts-input--inner,
    & .ts-textarea--inner {
      border-color: var(--color-danger);
    }
    }
  }
}
</style>
