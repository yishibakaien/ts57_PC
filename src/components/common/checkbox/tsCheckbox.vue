<template>
<label class="ts-checkbox">
    <span class="ts-checkbox--input"
      :class="{
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-focus': focus,
        'is-circle': type==='circle'
      }">
      <span class="ts-checkbox--inner"></span>
      <input
        class="ts-checkbox--original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
      </span>
      <span class="ts-checkbox--label" v-if="$slots.default || label">
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
      </span>
  </label>

</template>
<script>
import Emitter from '@/common/js/mixins/emitter';
export default {
  mixins: [Emitter],
  componentName: 'tsCheckbox',
  data() {
    return {
      selfModel: false,
      focus: false
    };
  },
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    checked: Boolean,
    name: String,
    type: String
  },
  computed: {
    model: {
      get() {
        // this.store / this.value / this.selfModel
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel;
      },
      set(val) {
        // 多选数组=>向父组件派发事件
        if (this.isGroup) {
          this.dispatch('tsCheckboxGroup', 'input', [val]);
        } else if (this.value !== undefined) {
          // value为定义时触发input
          this.$emit('input', val);
        } else {
          this.selfModel = val;
        }
      }
    },
    // 判断是否checked
    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model; // 如果 model 是布尔型，直接返回 model
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1; // 如果 model 是数组,返回其中是否包含 label
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === true; // 如果 model 不是null，也不是 undefined,返回 model 是否完全等价于 true
      }
    },
    // 如果父组件是多选组，则返回它的value，否则返回当前多选的 value
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    // 是否群组:它将一直向父级查找到el-checkbox-group，如果有则返回true，否则返回false
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        // 暂定
        if (parent.$options.componentName !== 'tsCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    // 添加到Store
    addToStore() {
      // 如果 model 是数组，且不包含 label，就加入label
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        // 否则 model = true
        this.model = true;
        console.log(this.model);
      }
    },
    // 处理change
    handleChange(ev) {
      this.$emit('change', ev);
      if (this.isGroup) {
        this.$nextTick(() => {
          this.dispatch('tsCheckboxGroup', 'change', [this._checkboxGroup.value]);
        });
      }
    }
  },
  created() {
    // checked为真时候才能进行
    this.checked && this.addToStore();
  }
};
</script>

<style lang="css" scoped>
  @import "../../../common/css/_var.css";
  @component-namespace ts{
    @component checkbox{
      color : var(--checkbox-color);
      position: relative;
      white-space: nowrap;
      cursor: pointer;
      display: inline-block;
      @utils-user-select none;
      & + .ts-checkbox{
        margin-left: 15px;
      }
      @modifier inner{
        display: inline-block;
        position: relative;
        border: 1px solid var(--checkbox-border-color);
        box-sizing: border-box;
        z-index: 1;
        border-radius: 2px;
        rect: 18px 18px var(--checkbox-bg);
        transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),
                    background-color .25s cubic-bezier(.71,-.46,.29,1.46);
        &:hover{
          border-color: var(--checkbox-checked-bg);
        }
        &:after{
          position:absolute 1px * * 5px;
          content: " ";
          border: 2px solid var(--checkbox-bg);
          border-left: 0;
          border-top: 0;
          size:4px 8px;
          transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
          transform-origin: center;
          transform: rotate(45deg) scaleY(0);
        }
      }
      @modifier original{
        display: none;
      }
      @modifier input{
        outline: none;
        display: inline-block;
        line-height: 1;
        position: relative;
        vertical-align: middle;
        @when focus {
          .ts-checkbox--inner{
            border-color: var(--checkbox-checked-bg);
          }
        }
        @when circle{
          .ts-checkbox--inner{
            circle: 18px *;
          }
        }
        @when checked{
          .ts-checkbox--inner{
            background-color: var(--checkbox-checked-bg);
            border-color: var(--checkbox-checked-bg);
            &:after{
              transform: rotate(45deg) scaleY(1);
            }
          }
        }
        @when disabled{
          & + .ts-checkbox--label{
            color: var(--checkbox-disabled-color);
            cursor:not-allowed;
          }
          .ts-checkbox--inner{
            cursor: not-allowed;
            background-color: var(--checkbox-disabled-bg);
            border-color: var(--checkbox-disabled-color);
            &:after{
                cursor: not-allowed;
                border-color: var(--checkbox-disabled-bg);
            }
            & + .el-checkbox--label{
              cursor:not-allowed;
            }
          }
          &.is-checked{
            .ts-checkbox--inner{
              background-color: var(--checkbox-disabled-bg);
              border-color: var(--checkbox-disabled-color);
              &:after{
                border-color: var(--checkbox-disabled-bg);
              }
            }
          }
        }
      }
      @modifier label{
        padding-left: 4px;
      }
    }
  }
</style>
