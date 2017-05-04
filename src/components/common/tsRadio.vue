<template>
<label :class="[{'is-active':value===label},{'is-disbaled':isDisabled}]" class="ts-radio">
    <input type="radio" :value="label" :name="name" v-model="value" :disabled="isDisabled" class="ts-radio-input">
    <span :style="value===label?activeStyle:null" class="ts-radio--inner">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    label: {},
    name: String,
    disabled: Boolean
  },
  computed: {
    // 设置值
    value: {
      get() {
        return this._radioGroup.value;
      },
      set(val) {
        this._radioGroup.$emit('input', val);
      }
    },
    // 单选组
    _radioGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'tsRadioGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    // 是否禁用
    isDisabled() {
      return this.disabled || this._radioGroup.disabled;
    },
    // 高亮
    activeStyle() {
      return {
        backgroundColor: this._radioGroup.fill || '',
        borderColor: this._radioGroup.fill || '',
        color: this._radioGroup.textColor || '',
        boxShadow: this._radioGroup.fill ? `-1px 0 0 0 ${this._radioGroup.fill}` : ''
      };
    }
  }
};
</script>

<style lang="css" scoped>
@import '../../common/css/var.css';
@component-namespace ts{
  @component radio{
    position: relative;
    display: inline-block;
    width: 90px;
    text-align: center;
    line-height: 32px;
    @modifier inner{
      display: inline-block;
      white-space: nowrap;
      vertical-align: middle;
      cursor: pointer;
    }
    @descendent input{
      display: none;
      &:checked{
        & + .ts-radio--inner{
          width: 90px;
          color:var(--radioColor);
          border: 1px solid;
          box-sizing: border-box;
          background: var(--radioBg);
        }
      }
    }
  }
}
</style>
