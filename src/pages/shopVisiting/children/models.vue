<template lang="html">
<div class="threeD">
  <threed-dress :chooseItem="Choose.confirm">
    <ts-button slot="uploadBtn" type="primary" @click="Dialog.show = true">
      上传店铺花型
    </ts-button>
    <div slot="productMenu" class="models-productMenu onepx-t">
      <a>收藏花型</a>
      <a>花型详情</a>
    </div>
  </threed-dress>
  <ts-dialog v-model="Dialog.show" width="90%" @confirm="handleChooseProduct" @cancel="handleCancelChoose">
    <ts-navbar v-model="selected">
      <ts-tab-item id="1">店铺上架花型</ts-tab-item>
      <ts-tab-item id="2">厂家供应花型</ts-tab-item>
    </ts-navbar>
  <ts-tab-container v-model="selected" class="models-tab-container">
    <ts-tab-container-item id="1">
      <ts-grid :data="Product.store.list">
        <ts-grid-item style="width:220px" v-for="product in Product.store.list" :key="product" @click="handleChooseStore(product)">
          <ts-image
           width="160"
           height="160"
           :canView="false"
           disabledHover
           :src="product.defaultPicUrl">
           </ts-image>
         </ts-grid-item>
      </ts-grid>
      <div class="center">
         <ts-button type="primary" @click="loadMoreProducts" v-if="Product.store.pageNO!==Product.store.totalPage,Product.store.totalPage!==0">加载更多上架花型</ts-button>
      </div>
    </ts-tab-container-item>
    <ts-tab-container-item id="2">
      <ts-grid :data="Product.supplies.list">
        <ts-grid-item style="width:240px" v-for="product in Product.supplies.list" :key="product" @click="handleChooseStore(product)">
          <ts-image
           width="170"
           height="170"
           :canView="false"
           disabledHover
           :src="product.defaultPicUrl">
           </ts-image>
         </ts-grid-item>
      </ts-grid>
      <div class="center">
       <ts-button type="primary" @click="loadMoreSupplies" v-if="Product.supplies.pageNO!==Product.supplies.totalPage,Product.supplies.totalPage!==0">加载更多供应花型</ts-button>
      </div>
    </ts-tab-container-item>
   </ts-tab-container>
  </ts-dialog>
</div>
</template>

<script>
import threedDress from '../../3DDress/component/3Ddresss.vue';
import {
  getVistitCompanyProductsList,
  getVisitCompanySupplyList
} from '@/common/api/api';
export default {
  data() {
    return {
      Dialog: {
        show: false
      },
      Product: {
        store: [],
        supplies: []
      },
      Choose: {
        item: '',
        confirm: ''
      },
      Params: {
        product: {},
        supplies: {}
      },
      selected: ''
    };
  },
  components: {
    threedDress
  },
  watch: {
    async selected(val) {
      if (val === '1') {
        if (!this.Product.store.length) {
          this.Product.store = (await getVistitCompanyProductsList(this.Params.product)).data.data;
        }
      } else {
        if (!this.Product.supplies.length) {
          this.Product.supplies = (await getVisitCompanySupplyList(this.Params.supplies)).data.data;
        }
      }
    }
  },
  created() {
    this.selected = '1';
    let params = {
      pageNO: 1,
      pageSize: 10,
      companyId: this.$route.params.id
    };
    this.Params.product = JSON.parse(JSON.stringify(params));
    this.Params.supplies = JSON.parse(JSON.stringify(params));
  },
  methods: {
    handleChooseStore(item) {
      this.Choose.item = item.defaultPicUrl;
    },
    handleChooseProduct() {
      this.Choose.confirm = this.Choose.item;
      this.Dialog.show = false;
    },
    handleCancelChoose() {
      this.Choose.confirm = '';
      this.Dialog.show = false;
    },
    async loadMoreProducts() {
      this.Params.product.pageNO++;
      let data = (await getVistitCompanyProductsList(this.Params.product)).data.data;
      this.Product.store.list = this.Product.store.list.concat(data.list);
    },
    async loadMoreSupplies() {
      this.Params.supplies.pageNO++;
      let data = (await getVisitCompanySupplyList(this.Params.supplies)).data.data;
      this.Product.supplies.list = this.Product.supplies.list.concat(data);
    }
  }
};
</script>

<style lang="css" scoped>
.center{
  text-align: center;
  margin: 10px auto;
}
@component-namespace models{
  @component tab-container{
    max-height: 50vh;
    overflow-y: auto;
  }
  @component productMenu{
    display: flex;
    text-align: center;
    height: 40px;
    align-items: center;
    a{
      flex:1;
    }
    a + a {
      border-left: 1px solid #eaeaea;
    }
  }
}
</style>
