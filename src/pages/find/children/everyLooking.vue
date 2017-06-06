<template lang="html">
    <div class="">
      <ts-title-block>大家在找</ts-title-block>
      <ts-grid :data="History.list">
         <ts-grid-item v-for="(product,index) in History.list" :key="product" @click="handleViewProduct(product.productId)">
           <ts-image
            width="170"
            height="170"
            :canView="false"
            disabledHover
            :src="product.defaultPicUrl">
            </ts-image>
            <template slot="footer" class="everyLooking-footer">
              <p>{{product.category | filterDict(dicTree.PRODUCT_TYPE,'name')}}</p>
              <p class="everyLooking-footer--time">{{product.createDate | customTime}}</p>
            </template>
          </ts-grid-item>
      </ts-grid>
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
  methods: {
    handleViewProduct(id) {
      this.$router.push({
        path: `/product/${id}`
      });
    }
  },
  async created() {
    this.History = (await searchHistory(this.Params)).data.data;
  }
};
</script>
