<template>
<div>
  <table>
    <thead>
      <tr>
        <th v-for="(item,e) in rule" :class="'col_'+(e+1)" :style="getStyle(item)" @click="thColClick(item)"> {{item.name}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(trData,rowIndex) in tables(data,rule)" :class="'row_'+(rowIndex+1)" @click="bodyTrClick(data[rowIndex])">
        <td v-for="(tdData,colIndex) in trData" :style="getStyle(rule[colIndex])" :class="'col_'+(colIndex+1)" >
          <ts-image :src="tdData" v-if="rule[colIndex].image" :width="imgWidth" :height="imgHeight"></ts-image>
          <span v-else>{{tdData}}</span>
          <template v-if="tdData===null && rule[colIndex].action">
              <span v-for="actionItem in changeAction(rule[colIndex].action)" @click.stop="fireAction(actionItem, data[rowIndex])" class="handleAction">
                {{actionItem.text}}
              </span>
            </template>
        </td>
      </tr>
    </tbody>
  </table>
  <slot></slot>
</div>
</template>
<script>
import {parseText, isObject} from '@/common/js/utils';
export default {
  data() {
    return {
      rule: []
    };
  },
  props: {
    data: [Object, Array],
    imgWidth: {
      type: String,
      default: '90'
    },
    imgHeight: {
      type: String,
      default: '90'
    }
  },
  mounted() {
    this.$children.forEach(child => {
      let obj = {};
      for (let p in child._props) {
        obj[p] = child[p];
      };
      this.rule.push(obj);
    });
  },
  methods: {
    changeAction(action) {
      var actionArr = [];
      if (action && !isObject(action)) {
        actionArr = parseText(action);
      };
      if (isObject(actionArr)) {
        actionArr = actionArr.length > 1 ? actionArr : [actionArr];
        return actionArr;
      };
    },
    render(tdData, rule) {
      if (rule.filter) {
        let filter = rule.filter;
        if (typeof filter === 'string') {
          tdData = (this[filter] && this[filter](tdData)) || tdData;
        } else {
          var theOne = filter.filter(o => o.key === tdData);
          if (theOne.length > 0) {
            tdData = theOne[0].value;
          };
        }
      }
      return tdData;
    },
    tables(data, rule) {
      let arr = data.slice(0);
      let _arr = [];
      arr.forEach(trData => {
        let __arr = [];
        for (let i = 0; i < rule.length; i++) {
          __arr.push(trData[rule[i].dataKey] || null);
        }
        _arr.push(__arr);
      });
      return _arr;
    },
    getStyle(col) {
      return {
        'text-align': col.align,
        'width': col.width,
        'height': col.height
      };
    },
    thColClick(item) {
      this.$emit('th-col-click', item);
    },
    bodyTrClick(item) {
      this.$emit('body-tr-click', item);
    },
    fireAction(action, rowData) {
      if (typeof action.func === 'string') {
        if (this.$parent[action.func]) {
          this.$parent[action.func](rowData);
        } else {
          this.$parent.$parent[action.func](rowData);
        }
      }
      if (typeof action.func === 'function') {
        action.func(rowData);
      }
    }
  }
};
</script>
<style scoped>
table {
  width: 100%;
  max-width: 100%;
  border: 1px solid #d7d7d7;
  border-spacing: 0;
  border-collapse: collapse;
}

tr {
  border-bottom: 1px solid #e4e4e4;
  transition: .5s;
  &:hover{
  background: #F8F8F8;
  }
}

td,
th {
  padding: 10px;
  border: 1px solid #D1D1D1;
}

th {
  background: #F8F8F8;
  box-shadow: 0 1px 0 0 rgba(209,209,209,0.50);
  font-weight: 400;
}
.handleAction{
  display: inline-block;
  padding: 8px 4px;
  cursor: pointer;
  transition: .3s;
  &:hover{
    color:#4C93FD;
  }
}
</style>
