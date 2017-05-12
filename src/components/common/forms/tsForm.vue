<template>
<form class="ts-form" :class="[labelPosition?'ts-form--label-'+labelPosition:'']">
  <slot></slot>
</form>
</template>

<script>
export default {
  name: 'tsForm',

  componentName: 'tsForm',

  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    rules() {
      this.validate();
    }
  },
  data() {
    return {
      fields: []
    };
  },
  created() {
    this.$on('ts.form.addField', (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on('ts.form.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  },
  methods: {
    validate(callback) {
      let valid = true;
      let count = 0;
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true);
      }
      this.fields.forEach((field, index) => {
        field.validate('', errors => {
          if (errors) {
            valid = false;
          }
          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid);
          }
        });
      });
    },
    validateField(prop, cb) {
      var field = this.fields.filter(field => field.prop === prop)[0];
      if (!field) { throw new Error('must call validateField with valid prop string!'); }

      field.validate('', cb);
    }
  }
};
</script>
