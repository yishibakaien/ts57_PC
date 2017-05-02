<template>
<div :class="containerClasses" class="ts-select-container">
  <input ref="search" v-model="searchField" :class="placeholderClasses" class="ts-select-placeholder ts-select-container" :readonly="!search" :placeholder="placeholder" @blur="close" @input="inputSearch" @click.self="toggleOpened">
  <transition name="ts-select-fade">
    <div v-show="opened" :style="optionStyles" :class="optionClasses" class="ts-select-options">
      <template v-if="options.length===0">
					<button disabled class="is-white ts-select--option">
						<slot name="no-results">
							暂无数据
						</slot>
					</button>
				</template>
      <template v-else>
					<button v-for="(option,i) in options" @click="selectOption(i)" :class="[' is-white',selected===i?'is-info':'','ts-select-option']">
						{{label!==undefined?option[label]:option}}
					</button>
				</template>
    </div>
  </transition>
</div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String
    },
    value: {
      type: null
    },
    search: {
      type: Boolean,
      default: false
    },
    maxItems: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      opened: false,
      searchField: '',
      saveSearchField: '',
      selected: undefined
    };
  },
  methods: {
    // toggle打开
    toggleOpened() {
      this.opened ? this.close() : this.open();
    },
    // 打开
    open() {
      if (this.opened) {
        return;
      }
      this.searchField = this.saveSearchField;
      this.$refs.search.focus();
      this.inputSearch();
      this.opened = true;
    },
    // 关闭
    close() {
      if (!this.opened) {
        return;
      }
      this.opened = false;
      this.saveSearchField = this.searchField;
      this.searchField = this.textSelected;
      this.$refs.search.blur();
      this.inputSearch();
    },
    // 选择的值
    selectVModel() {
      if (this.options.indexOf(this.value) === -1) {
        return;
      }
      this.selected = this.options.indexOf(this.value);
    },
    // 触发选择后的事件
    selectOption(i) {
      this.selected = i;
      this.searchField = this.textSelected;
      this.saveSearchField = '';
      this.$emit('change', this.options[i]);
    },
    // 输入搜索
    inputSearch() {
      this.$emit('searchFilter', this.searchField);
    }
  },
  watch: {
    value() {
      this.selectVModel();
    },
    options(_, old) {
      var i = this.options.indexOf(old[this.selected]);
      if (i > -1) {
        this.selected = i;
      };
    }
  },
  created() {
    this.selectVModel();
  },
  computed: {
    // classes
    // ======
    containerClasses() {
      return {
        'ts-select-container--active': this.opened
      };
    },
    placeholderClasses() {
      return {
        'is-hovered': this.opened
      };
    },
    optionClasses() {
      return {
        'is-hovered': this.opened
      };
    },
    // =====
    // 选项的总高度： 每一个35px
    optionStyles() {
      let styles = {};
      if (this.options.length > this.maxItems) {
        styles.height = 35 * this.maxItems + 'px';
      }
    },
    // 选中的item
    selectedItem() {
      return this.options[this.selected];
    },
    // 选中的item的文字=>显示在框内
    textSelected() {
      if (!this.options[this.selected]) {
        return '';
      }
      return this.label ? this.selectedItem[this.label] : this.selectedItem;
    }
  }
};
</script>
<style lang="css" scoped>
@import '../../../common/css/var.css';
@component-namespace ts{
  @component select{
    @descendent option{
    width: 100%;
    line-height:var(--selectHeight);
    appearance: none;
    position: relative;
    border: var(--selectBorder);
    border-top:none;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    background: #fff;
    padding: 0;
    }
    @descendent placeholder{
      appearance: none;
      line-height: 1.5;
      padding-left: .75em;
      padding-right: 2.5em;
      position: relative;
      border: var(--selectBorder);
      display: block;
      outline: none;
    }
    @descendent container{
      position: relative;
      width: 100%;
      cursor: pointer;
      transition: 0.5s;
      &:hover{
        border-color:#D1D1D1;
      }
      @modifier active {
        &:after {
          transform: rotate(-225deg);
          margin-top: 0;
        }
      }
      &:after {
        transition: all 0.2s ease;
        border: 1px solid #4C93FD;
        border-right: 0;
        border-top: 0;
        content: " ";
        display: block;
        height: 0.5em;
        pointer-events: none;
        position: absolute;
        transform: rotate(-45deg);
        width: 0.5em;
        right: 1.125em;
        top: 50%;
        margin-top: -.375em;
      }
    }
    @descendent options {
        appearance:none;
        line-height: 1.5;
        position: relative;
        border-bottom: var(--selectBorder);
        display: block;
        overflow: auto;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
    }
    @descendent placeholder {
      box-sizing: border-box;
      width: 100%;
      height:var(--selectHeight);
    }
}
}
.ts-select-fade-enter-active{
  transition: all 0.2s ease;
}
.ts-select-fade-leave-active{
  transition: all 0.1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.ts-select-fade-enter, .ts-select-leave-active{
  padding-top: 10px;
  opacity: 0
}
</style>
