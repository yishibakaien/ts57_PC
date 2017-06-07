<template>
<div class="supply-detail-page">
  <v-header>
    <search></search>
  </v-header>
  <v-nav></v-nav>
  <div class="supply-detail-box">
    <div class="supply-detail-wrap clearfix">
      <div class="supply-detail-nav">
        <router-link to="homePage">首页</router-link> >
        <router-link to="supplyListPage">厂家供应</router-link> >
        <span>供应详情</span>
      </div>
      <div class="supply-detail-left fl">
        <supply-content :obj="resData"></supply-content>
      </div>
      <div class="supply-detail-right fr">
        <supply-list :item="resData"></supply-list>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  header,
  nav,
  search
} from '@/components';
import supplyContent from './supply-content';
import supplyList from './supply-list';
import {
  getCompanySupply
} from '@/common/api/api';

export default {
  data() {
    return {
      param: {
        id: ''
      },
      resData: {}
    };
  },
  components: {
    'vHeader': header,
    'vNav': nav,
    search,
    supplyContent,
    supplyList
  },
  created() {
    this.getCompanySupplyMethod();
  },
  methods: {
    getCompanySupplyMethod() {
      this.param.id = this.$route.query.supplyId;
      getCompanySupply(this.param.id).then((res) => {
        if (res.data.code === 0) {
          this.resData = res.data.data;
          console.log(this.resData);
        }
      }).catch();
    }
  }
};
</script>

<style lang="scss" scoped>
.supply-detail-box {
    width: 100%;
    min-height: 700px;
    background: #fff;
    .supply-detail-wrap {
        margin: 0 auto;
        width: 1200px;
    }
}

.supply-detail-wrap {
    padding-bottom: 60px;
}

.supply-detail-nav {
    padding: 30px 0;
    a,
    span {
        font-size: 16px;
        color: #999;
    }
    a:hover {
        color: #4C93FD;
    }
}
</style>
