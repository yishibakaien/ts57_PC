<template>
<label :class="[{'is-active':value===label},{'is-disbaled':isDisabled},{'origin':type==='origin'}]" class="ts-radio" v-if="type!=='origin'">
    <input type="radio" :value="label" :name="name" v-model="value" :disabled="isDisabled" class="ts-radio-input">
    <span :style="value===label?activeStyle:null" class="ts-radio--inner">
      <slot></slot>
    </span>
</label>
<span v-else>
  <input type="radio" :value="label" :name="name" v-model="value" :disabled="isDisabled">
  <span>
    <slot></slot>
  </span>
</span>
</template>

<script>
export default {
  props: {
    // label---标签
    // name---原生属性：name
    // disabled---disabled
    // type---'block'/'origin' block就是方块型 origin就是原始状态
    label: {},
    name: String,
    disabled: Boolean,
    type: {
      type: String,
      default: 'block',
      validator(value) {
        return [
          'block',
          'origin'
        ].indexOf(value) > -1;
      }
    }
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
    height:34px;
    padding:10px;
    box-sizing: border-box;
    margin-right: 20px;
    text-align: center;
    cursor: pointer;
    @modifier inner{
      display: inline-block;
    }
    @when active{
      color:var(--radioColor);
    &:after{
      position:absolute 0 0 0 0;
      content: ' ';
      border: var(--radio-checked-color);
    }
    }
    @descendent input{
      display: none;
    }
  }
}
</style>
