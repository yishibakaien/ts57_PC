<template>
<ul class="ts-pagination">
  <a @click="goto(1)" :class="{'is-disabled':currentPage===1}">首页</a>
  <a v-show="currentPage != 1" @click="currentPage-- && goto(currentPage--)">上一页</a>
  <!-- TODO:显示1，2，3，4，5之类的页码 -->
  <!-- <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}">
    <a>{{index}}</a>
  </li> -->
  <strong><i>{{currentPage}}</i>/{{totalPages}}</strong>
  <a v-show="totalPages != currentPage && totalPages != 0 " @click="currentPage++ && goto(currentPage++)">下一页</a>
  <a @click="goto(totalPages)" :class="{'is-disabled':currentPage===totalPages}" class="ts-pagination--end">尾页</a>
  <span :class="{'is-disabled':totalPages<=0}">
    每页显示
      <ts-select :disabled="totalPages<=0" style="width:70px" :options='showItems' v-model="item" @change="handleChangeItem(item)" class="ts-pagination--select"></ts-select>
    条
  </span>
</ul>
</template>

<script>
export default {
  data() {
    return {
      item: '',
      currentPage: ''
    };
  },
  watch: {
    current(val) {
      this.currentPage = val;
    }
  },
  props: {
    current: Number,
    totalPages: Number,
    showItems: {
      type: Array,
      default: function() {
        return [10, 20, 30];
      }
    }
  },
  methods: {
    goto(index) {
      if (index === this.currentPage) {
        return;
      }
      this.currentPage = index;
      this.$emit('change', this.currentPage);
    },
    // 改变显示多少页
    handleChangeItem(item) {
      this.$emit('page-size-change', item);
    }
  },
  computed: {
    // TODO:可以放在首页的分页 带有省略号的
    pages() {
      let page = [];
      if (this.currentPage < this.showItem) {
        // 如果当前的激活的项 小于要显示的条数
        // 总页数和要显示的条数那个大就显示多少条
        let i = Math.min(this.item, this.totalPages);
        while (i) {
          page.unshift(i--);
        }
      } else {
        // 当前页数大于显示页数了
        let middle = this.currentPage - Math.floor(this.item / 2);
        let i = this.item;
        if (middle > (this.totalPages - this.showItem)) {
          middle = (this.totalPages - this.showItem) + 1;
        }
        while (i--) {
          page.push(middle++);
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace ts{
  @component pagination{
    display: inline-block;
    @modifier select{
      margin:  0 8px;
    }
    a,strong{
      padding-right:16px;
    }
    @modifier end{
      margin-right: 14px;
    }
    i{
      color: #4C93FD;
    }
    .is-disabled{
      cursor: not-allowed;
      color:#d8d8d8;
      &:hover{
        color:#d8d8d8;
      }
    }
  }
}
</style>
