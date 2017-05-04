<template>
<form class="ts-form" :class="[labelPosition?'ts-form--label-'+labelPosition:'',{'ts-form--inline':inline}]">
  <slot></slot>
</form>
</template>

<script>
export default {
  componentName: 'tsForm',
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    inline: Boolean
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
    this.$on('ts.form.addField', field => {
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on('ts.form.removeField', field => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    });
  },
  methods: {
    // 验证
    validate(callback) {
      let valid = true;
      let count = 0;
      // 如果验证的fields是空 => 调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true);
      }
      this.fields.forEach((field, index) => {
        field.validate('', errors => {
          if (errors) {
            errors = false;
          }
          if(typeof callback === 'function' && ++ count === this.fields.length){
            callback(valid)
          }
        });
      });
    },
    // 验证区域
    validateField(prop, cb){
      var field = this.fields.filter(field=>field.prop===prop)[0];
      if(field){
        throw new Error('输入正确的数据')
      };
      field.validate('',cb)
    }
  }
};
</script>

<style lang="css" scoped>
  @component-namespace ts{
    @component form{
      @modifier label-left{
        & .ts-form-item--label{
          text-align: left;
        }
      }
      @modifier label-top{
        & .ts-form-item--label{
          float: none;
          display: inline-block;
          text-align: left;
          padding-bottom: 10px;
        }
      }
      @inline {
        & .ts-form-item{
          display: inline-block;
          margin-right: 10px;
          vertical-align: top;
        }
        & .ts-form-item--label{
          float: none;
          display: inline-block;
        }
        & .ts-form-item--content{
        vertical-align: top;
          display: inline-block;
        }
        &.ts-form--label-top .ts-form-item--content{
        vertical-align: top;
          display: inline-block;
        }

      }
    }
  }
</style>
