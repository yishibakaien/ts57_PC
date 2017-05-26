<template lang="html">
    <div class="">
      <ts-title-block>{{$route.query.name}}</ts-title-block>
      <ts-grid>
        <ts-grid-item v-for="(product,e) in ProductList.list" :key="product" @click="handleViewProduct(product.id)">
          <ts-image
           width="170"
           height="170"
           :canView="false"
           disabledHover
           :src="product.defaultPicUrl">
           </ts-image>
           <p class="catagoryProduct-product--number">{{product.productNo}}</p>
           <template slot="footer">
             ¥{{product.price}}/{{product.priceUnit | filterDict(DICT.PriceUnits) }}
             <ts-tag>{{product.publishStatus | filterDict(DICT.PublishStatus,'label2')}}</ts-tag>
           </template>
         </ts-grid-item>
      </ts-grid>
    </div>
</template>

<script>
import {
  getCompanyBindingProductList
} from '@/common/api/api';
import DICT from '@/common/dict';
export default {
  data() {
    return {
      Params: {
        pageNO: 1,
        pageSize: 10,
        companyId: '',
        classId: ''
      },
      // 数据字典
      DICT: {
        PublishStatus: DICT.PublishStatus,
        PriceUnits: DICT.PriceUnits
      },
      ProductList: {}
    };
  },
  methods: {
    handleViewProduct() {}
  },
  async created() {
    this.Params.companyId = this.$route.params.id;
    this.Params.classId = this.$route.query.catagoryId;
    this.ProductList = (await getCompanyBindingProductList(this.Params)).data.data;
  }
};
</script>
