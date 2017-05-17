<template>
<div v-clickoutside="clickedOutside" class="ts-select">
  <div @click="toggleDropdown" class="ts-select-toggle" :class="{'is-open':open, 'is-disabled':disabled}">{{selected}}
  </div>
  <transition name="ts-select-fade">
    <ul v-if="open" class="ts-select-wrapper">
      <li v-for="item in parsedDataList" @click="setVal(item)" :class="{'is-selected':selected == item.name}">{{item.name}}</li>
    </ul>
  </transition>
</div>
</template>
<script>
import Clickoutside from '@/common/js/clickoutside';
export default {
  props: ['options', 'dataDefault', 'dataKeyName', 'dataValName', 'disabled', 'value'],
  data() {
    return {
      // 选中
      selected: '',
      optionName: 'name',
      // option的id
      optionId: 'id',
      // 是否打开
      open: false,
      // 从options复制过来的
      parsedDataList: []
    };
  },
  watch: {
    value(val) {
      if (val) {
        try {
          let data = this.parseData(this.options).filter(item => item.id.toString() === val.toString());
          this.updateValue(data[0]);
        } catch (e) {
          console.log(e);
        }
      } else {
        this.updateValue('');
        this.selected = this.dataDefault || ' ';
      }
    },
    options(val) {
      this.parseData(val);
    }
  },
  directives: {
    Clickoutside
  },
  created() {
    // set key & value name for options
    if (this.dataKeyName && this.dataValName) {
      // 比如设置： data-key-name="label" data-val-name="id"
      this.optionName = this.dataKeyName;
      this.optionId = this.dataValName;
    }
    this.parseData(this.options);
    // 设置数据
    if (this.value) {
      try {
        let data = this.parsedDataList.filter(item => item.id.toString() === this.value.toString());
        this.updateValue(data[0]);
      } catch (e) {
        console.log(e);
      }
    } else {
      this.updateValue('');
      this.selected = this.dataDefault || ' ';
    }
  },
  methods: {
    // 设置值
    setVal(val) {
      if (!this.disabled) {
        // 更新
        this.updateValue(val);
        // 关闭
        this.toggleDropdown();
        this.$emit('change', val);
      }
    },
    // 更新数据
    updateValue(data) {
      this.selected = data.name;
      this.$emit('input', data.id);
    },
    // toggle显示
    toggleDropdown() {
      if (!this.disabled) {
        this.open = !this.open;
      }
    },
    // 复制
    parseData(dataList) {
      // 如果-
      if (dataList.length === 0) {
        return;
      } else {
        var retDataList = [];
        for (var index in Object.keys(dataList)) {
          var item = dataList[index];
          var key = this.optionName;
          var val = this.optionId;
          // 可能为数组也可能为数组对象
          retDataList.push({
            name: item[key] || item,
            id: item[val] || item
          });
        }
        this.parsedDataList = retDataList;
        return retDataList;
      }
    },
    // 点击外部
    clickedOutside() {
      this.open = false;
    }
  }
};
</script>
<style lang="css" scoped>
  @import "../../../common/css/var.css";
@component-namespace ts{
  @component select{
    position: relative;
    display: inline-block;
    width: 100%;
    cursor: pointer;
    text-align: left;
    vertical-align: middle;
    @descendent wrapper{
      max-height: 300px;
      overflow: auto;
    }
    @descendent toggle{
      border: 1px solid #cfcfcf;
      min-height: 30px;
      line-height: 30px;
      padding: 0 10px;
      box-sizing: border-box;
      &:after{
        transition: all 0.2s ease;
        border: var(--select-border);
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
      @when open{
        &:after{
          transform: rotate(-225deg);
          margin-top: 0;
        }
      }
      @when disabled{
        background-color: #f8f8f8;
        color: #bbb;
        cursor: not-allowed;
        border: 1px solid #eef1f6;
      }
    }
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
      position: absolute * 0 * 0;
      border: 1px solid #cfcfcf;
      border-top: none;
      z-index: 199;
      background: #fff;
      box-sizing: border-box;
    }
    li{
      padding:0 10px;
      line-height: 30px;
      white-space:nowrap;
      min-height: 30px;
      border-bottom: 1px solid #cfcfcf;
      transition: .5s;
      &:last-child{
        border-bottom:none;
      }
      @when selected{
        background: #f1f1f1;
      }
      &:hover{
        background: #fafafa;
      }
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
