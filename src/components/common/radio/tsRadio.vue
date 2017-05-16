<template>
<label :class="[{'is-active':model==label},{'is-disbaled':isDisabled},{'is-origin':type==='origin'}]" class="ts-radio" v-if="type!=='origin'">
    <input type="radio" :value="label" :name="name" v-model="model" :disabled="isDisabled" class="ts-radio-input">
    <span :style="value==label?activeStyle:null" class="ts-radio--inner">
      <slot></slot>
    </span>
</label>
<span v-else class="ts-radio--origin">
  <input type="radio" :name="name" :value="label" v-model="model" :disabled="isDisabled">
  <span>
    <slot></slot>
  </span>
</span>
</template>

<script>
import Emitter from '@/common/js/mixins/emitter';
export default {
  mixins: [Emitter],
  componentName: 'tsRadio',
  props: {
    // label---标签
    // value---值
    // name---原生属性：name
    // disabled---disabled
    // type---'block'/'origin' block就是方块型 origin就是原始状态
    label: {},
    value: {},
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
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
           this.dispatch('tsRadioGroup', 'input', [val]);
         } else {
           this.$emit('input', val);
         }
      }
    },
    // 单选组
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'tsRadioGroup') {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    // 是否禁用
    isDisabled() {
      return this.isGroup
          ? this._radioGroup.disabled || this.disabled
          : this.disabled;
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
@import '../../../common/css/var.css';
@component-namespace ts{
  @component radio{
    position: relative;
    display: inline-block;
    height:32px;
    vertical-align: middle;
    padding:10px;
    font-size: 14px;
    box-sizing: border-box;
    margin:6px 20px 6px 0;
    text-align: center;
    cursor: pointer;
    @modifier inner{
      display: inline-block;
    }
    @modifier origin{
      margin-top: 10px;
      display: inline-block;
      & + .ts-radio--origin{
        margin-left: 20px;
      }
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
