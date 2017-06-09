<template>
  <!-- simple -->
<ul class="ts-pagination" :class="{'is-simple':type==='simple'}" v-if="type==='simple'">
  <a @click="goto(1)" :class="{'is-disabled':currentPage<1}">首页</a>
  <a v-show="currentPage != 1" :class="{'is-disabled':currentPage<1}" @click="currentPage-- && goto(currentPage--)">上一页</a>
  <strong><i>{{currentPage}}</i>/{{total}}</strong>
  <a v-show="total != currentPage && total != 0 " @click="currentPage++ && goto(currentPage++)" :class="{'is-disabled':currentPage<1}">下一页</a>
  <a @click="goto(total)" :class="{'is-disabled':currentPage===total||currentPage<1}" class="ts-pagination--end">尾页</a>
  <span :class="{'is-disabled':total<=0}">
    每页显示
      <ts-select :disabled="total<=0" style="width:70px" :options='showItems' v-model="item" @change="handleChangeItem(item)" class="ts-pagination--select"></ts-select>
    条
  </span>
</ul>
<!-- page -->
<ul class="ts-pagination" v-else>
  <li class="ts-pagination-prev" :class="{'is-disabled':currentPage === 1}" @click="prev">
    <a>
      <span><<</span>
    </a>
  </li>
  <li :class="{'is-active':currentPage === 1}" @click="changePage(1)"><a>1</a></li>
  <li v-if="currentPage - 3 > 1" class="ts-pagination--jump-prev" @click="fastPrev">
    <a>
      <span><<</span>
    </a>
  </li>
  <li v-if="currentPage - 2 > 1" @click="changePage(currentPage - 2)"><a>{{ currentPage - 2 }}</a></li>
  <li v-if="currentPage - 1 > 1" @click="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
  <li v-if="currentPage != 1 && currentPage != allPages" class="ts-pagination active"><a>{{ currentPage }}</a></li>
  <li v-if="currentPage + 1 < allPages" @click="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
  <li v-if="currentPage + 2 < allPages" @click="changePage(currentPage + 2)"><a>{{ currentPage + 2 }}</a></li>
  <li v-if="currentPage + 3 < allPages" class="ts-pagination--jump-next" @click="fastNext"><a><span>>></span></a></li>
  <li v-if="allPages > 1" :class="{'is-active':currentPage === allPages}" @click="changePage(allPages)"><a>{{ allPages }}</a></li>
  <li class="ts-pagination-next" :class="{'is-disabled':currentPage === allPages}" @click="next">
    <a><span>>></span></a>
  </li>
</ul>
</template>

<script>
const prefixCls = 'ts-';
export default {
  data() {
    return {
      item: '10',
      prefixCls: prefixCls,
      currentPage: this.current,
      currentPageSize: this.pageSize
    };
  },
  watch: {
    current(val) {
      this.currentPage = val;
    },
    pageSize(val) {
      this.currentPageSize = val;
    }
  },
  props: {
    current: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: 'simple',
      validator(val) {
        return [
          'simple',
          'page'
        ].indexOf(val) > -1;
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: Number,
    showItems: {
      type: Array,
      default: function() {
        return [10, 20, 30];
      }
    }
  },
  computed: {
    allPages() {
      const allPage = Math.ceil(this.total / this.currentPageSize);
      return (allPage === 0) ? 1 : allPage;
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
    },
    changePage(page) {
      if (this.currentPage !== page) {
        this.currentPage = page;
        this.$emit('change', page);
      }
    },
    prev() {
      const current = this.currentPage;
      if (current <= 1) {
        return false;
      }
      this.changePage(current - 1);
    },
    next() {
      const current = this.currentPage;
      if (current >= this.allPages) {
        return false;
      }
      this.changePage(current + 1);
    },
    fastPrev() {
      const page = this.currentPage - 5;
      if (page > 0) {
        this.changePage(page);
      } else {
        this.changePage(1);
      }
    },
    fastNext() {
      const page = this.currentPage + 5;
      if (page > this.allPages) {
        this.changePage(this.allPages);
      } else {
        this.changePage(page);
      }
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace ts{
  @component pagination{
    display: inline-block;
    &.active{
      background-color: #4C93FD;
          border-color: #4C93FD;
          a, &:hover a {
              color: #fff;
          }
    }
    &:after {
        content: '';
        display: block;
        height: 0;
        clear: both;
        overflow: hidden;
        visibility: hidden;
    }
    &.is-simple{
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
    li{
      display: inline-block;
      float: left;
      min-width: 32px;
      background: #fff;
      height: 32px;
      line-height: 30px;
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: all .2s ease-in-out;
      margin: 2px;
      &:hover {
        border-color: #4C93FD;
        a {
            color: #4C93FD;
        }
      }
      @when active{
        background-color: #4C93FD;
            border-color: #4C93FD;
            a, &:hover a {
                color: #fff;
            }
      }
      @when disabled{
         cursor:not-allowed;
          a {
              color: #ccc;
          }
          &:hover {
                border-color: #eaeaea;
                a {
                    color: #ccc;
                    cursor: not-allowed;
                }
            }
       }
    }
    &--jump-prev, &--jump-next {
      &:after {
          content: "•••";
          display: block;
          letter-spacing: 1px;
          color: #ccc;
          text-align: center;
      }
      span{
            display: none;
        }
      &:hover {
          &:after{
              display: none;
          }
          span{
                display: inline;
            }
      }
    }
  }
}
</style>
