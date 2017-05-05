<!-- created by cloud_cb on 2017/5/5. -->
<template>
  <div class="paginator">
    <div class="paginator-container">
      <div class="paginator-btn paginator-btn-left">
        <button class="button button-default">上一页</button>
      </div>
      <div class="paginator-btn-num-box">
        <div class="paginator-btn-num" v-for="n in totalPage.pageArr" :class="{active: totalPage.pageNO === n}">
          <span>{{n}}</span>
        </div>
      </div>
      <div class="paginator-btn paginator-btn-right">
        <button class="button button-default" disabled>下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    pageMessage: {
      type: Object
    }
  },
  computed: {
    totalPage() {
      let obj = {};
      let pageArr = [];
      obj.pageNO = this.pageMessage.pageNO;
      // 当前页码
      // let pageNo = this.pageMessage.pageNo;
      // 总页码
      let totalPage = this.pageMessage.totalPage;

      if (totalPage < 10) {
        for (let i = 1; i <= totalPage; i++) {
          pageArr.push(i);
        }
      } else if (totalPage >= 10) {
        for (let i = 1; i <= 8; i++) {
          pageArr.push(i);
        }
        pageArr.push('...');
        pageArr.push(totalPage);
      }
      obj.pageArr = pageArr;
      return obj;
    }
  }
};
</script>

<style lang="stylus" scoped>
.paginator
  .paginator-container
    display flex
    background #fff
    .paginator-btn,
    .paginator-btn-num-box,
      float left
      margin 0 8px
      .paginator-btn-num
        float left
        padding 12px
        line-height 18px
        height 18px
        text-align center
        border-top 1px solid #d8d8d8
        border-bottom 1px solid #d8d8d8
        border-left 1px solid #d8d8d8
        &.active
          background #4c93fd
          color #fff
        &:last-child
          border-right 1px solid #d8d8d8
</style>
