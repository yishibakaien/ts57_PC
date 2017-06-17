<template>
<div class="pagination">
  <span class="page" @click="upPage">上一页</span>
  <span class="page" :class="[page.pageNO===1?'active':'']" @click="selectedPageNum(1)">1</span>
  <span v-if="showOne">···</span>
  <span class="page" :class="[page.pageNO===pageNum?'active':'']" v-for="pageNum in page.pageNumArr" @click="selectedPageNum(pageNum)">{{pageNum}}</span>
  <span v-if="showTwo">···</span>
  <span class="page" :class="[page.pageNO===page.maxNum?'active':'']" @click="selectedPageNum(page.maxNum)" v-if="page.maxNum > 1">{{page.maxNum}}</span>
  <span class="page" @click="downPage">下一页</span>
</div>
</template>

<script>
export default {
  data() {
    return {
      showOne: false,
      showTwo: false
    };
  },
  props: {
    page: {
      type: Object
    }
  },
  watch: {
    'page.maxNum' (val) {
      if (val > 9) {
        this.pageNumArrRest();
      } else if (val <= 2) {
        this.page.pageNumArr = [];
        this.showPointTwo();
        this.showPointOne();
      } else {
        this.page.pageNumArr = [];
        for (let i = 2; i < val; i++) {
          this.page.pageNumArr.push(i);
        }
        this.showPointTwo();
        this.showPointOne();
      }
    }
  },
  methods: {
    selectedPageNum(num) {
      this.page.pageNO = num;
      this.pageNumArrRest();
      this.$emit('selectedPageNum', num);
    },
    upPage() {
      if (this.page.pageNO === 1) {
        return;
      }
      this.page.pageNO--;
      this.selectedPageNum(this.page.pageNO);
    },
    downPage() {
      if (this.page.pageNO === this.page.maxNum) {
        return;
      }
      this.page.pageNO++;
      this.selectedPageNum(this.page.pageNO);
    },
    pageNumArrRest() {
      let _ = this;
      _.page.pageNumArr = [];
      let j = _.page.pageNO - 2;
      if (_.page.pageNO <= 4) {
        if (_.page.maxNum >= 10) {
          for (let i = 2; i < 9; i++) {
            _.page.pageNumArr.push(i);
          }
        } else if (_.page.maxNum <= 2) {
          _.page.pageNumArr = [];
        } else {
          for (let i = 2; i < _.page.maxNum; i++) {
            _.page.pageNumArr.push(i);
          }
        }
        _.showPointTwo();
        _.showPointOne();
        return;
      }
      if (_.page.pageNO > (_.page.maxNum - 5)) {
        if (_.page.maxNum >= 10) {
          for (let i = (_.page.maxNum - 1); i > (_.page.maxNum - 8); i--) {
            _.page.pageNumArr.unshift(i);
          }
        } else if (_.page.maxNum <= 2) {
          _.page.pageNumArr = [];
        } else {
          for (let i = 2; i < _.page.maxNum; i++) {
            _.page.pageNumArr.push(i);
          }
        }
        _.showPointTwo();
        _.showPointOne();
        return;
      }
      for (let i = 0; i < 7; i++) {
        _.page.pageNumArr.push(j);
        j++;
      }
      _.showPointTwo();
      _.showPointOne();
    },
    showPointTwo() {
      let _ = this;
      if (_.page.pageNumArr && (_.page.pageNumArr[_.page.pageNumArr.length - 1] + 1) === _.page.maxNum) {
        _.showTwo = false;
      } else {
        if (_.page.maxNum <= 9) {
          _.showTwo = false;
        } else {
          _.showTwo = true;
        }
      }
    },
    showPointOne() {
      let _ = this;
      if (_.page.pageNumArr && (_.page.pageNumArr[0] - 1) === 1) {
        _.showOne = false;
      } else {
        if (_.page.maxNum <= 9) {
          _.showOne = false;
        } else {
          _.showOne = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
    max-width: 660px;
    margin: 50px auto;
    text-align: center;
}
.page {
    display: inline-block;
    padding: 5px;
    margin-right: 8px;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    text-align: center;
		transition: .8s;
    border: 1px solid #e5e5e5;
    background: #fff;
    color: #333;
    cursor: pointer;
    &:hover {
        border-color: #4c93fd;
    }
}

.active {
    background: #4C93FD;
    color: #fff;
    border: 0;
}
</style>
