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
</div>
</template>

<script>
import AsyncValidator from 'async-validator';
import emitter from '@/common/js/mixins/emitter';

function noop() {}

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
}

export default {
  name: 'tsFormItem',
  componentName: 'tsFormItem',
  mixins: [emitter],
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: Boolean,
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    error(value) {
      this.validateMessage = value;
      this.validateState = value ? 'error' : '';
    },
    validateStatus(value) {
      this.validateState = value;
    }
  },
  computed: {
    // 标签的样式
    labelStyle() {
      var ret = {};
      if (this.form.labelPosition === 'top') return ret;
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.width = labelWidth;
      }
      return ret;
    },
    // 标签距离Input的距离
    contentStyle() {
      var ret = {};
      if (this.form.labelPosition === 'top') return ret;
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.marginLeft = labelWidth;
      }
      return ret;
    },
    form() {
      var parent = this.$parent;
      while (parent.$options.componentName !== 'tsForm') {
        parent = parent.$parent;
      }
      return parent;
    },
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
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isRequired: false
    };
  },
  methods: {
    validate(trigger, callback = noop) {
      var rules = this.getFilteredRule(trigger);
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
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';

        callback(this.validateMessage);
      });
    },
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
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }

      this.validate('change');
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('tsForm', 'ts.form.addField', [this]);
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
            return false;
          }
        });
        this.$on('ts.form.blur', this.onFieldBlur);
        this.$on('ts.form.change', this.onFieldChange);
      }
    }
  },
  beforeDestroy() {
    this.dispatch('tsForm', 'ts.form.removeField', [this]);
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
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
  }
  @modifier content{
    position: relative;
    @utils-clearfix;
  }
  @modifier error{
    color:red;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    transition: 0.3s;
  }
  @when required{
  .ts-form-item--label:before{
    content:'*';
    color: red;
    margin-right: 4px;
    }
  }
    }
  }
</style>
