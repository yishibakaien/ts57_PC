<template lang="html">
    <div class="">
      <ts-title-block>大家在找</ts-title-block>
      <ts-grid :data="History.list">
         <ts-grid-item v-for="(product,index) in History.list" :key="product" @click="handleViewResult(product.id)" >
           <ts-image
            width="170"
            height="170"
            :canView="false"
            disabledHover
            :src="product.searchSource">
            </ts-image>
            <template slot="footer" class="everyLooking-footer">
              <p>{{product.category | filterDict(dicTree.PRODUCT_TYPE,'name')}}</p>
              <p class="everyLooking-footer--time">{{product.createDate | customTime}}</p>
            </template>
          </ts-grid-item>
      </ts-grid>
      <ts-pagination type="page" :total="History.totalNum" :current="History.pageNO" :pageSize="History.pageSize" class="everyLooking-pagination" @change="handleChangePage"></ts-pagination>
    </div>
</template>

<script>
import {
  searchHistory
} from '@/common/api/api';
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      History: {},
      Params: {
        pageNo: 1,
        pageSize: 12
      },
      BurstHotSearch: {}
    };
  },
  computed: {
    ...mapGetters(['dicTree'])
  },
  watch: {
    Params: {
      async handler(val) {
        this.History = (await searchHistory(this.Params)).data.data;
      },
      deep: true
    }
  },
  methods: {
    // 页数改变
    handleChangePage(number) {
      this.Params.pageNo = number;
    },
    // 查看花型
    handleViewProduct(id) {
      this.goto(`/product/${id}`);
    },
    // 查看结果
    handleViewResult(id) {
      this.goto(`/catagory/${id}`);
    }
  },
  async mounted() {
    this.History = (await searchHistory(this.Params)).data.data;
  }
};
</script>
<style scoped>
@component-namespace everyLooking {
  @component pagination {
    margin: 7px auto;
    display: table;
  }
}
</style>
