<template lang="html">
<div class="threeD">
  <threed-dress :chooseItem="Choose.confirm">
    <ts-button slot="uploadBtn" type="primary" @click="Dialog.show = true">
      上传店铺花型
    </ts-button>
    <div slot="productMenu" class="models-productMenu onepx-t">
      <ts-button :disabled="Collect.disabled" @click="handleCollectProduct">
        <i :class="Collect.isCollected?'icon-yishoucang':'icon-shoucang'"></i>
        {{Collect.isCollected?'取消收藏花型':'收藏花型'}}
      </ts-button>
        <ts-button :disabled="Collect.disabled" @click="handleGotoProduct">
          <i class="icon-huaxin"></i>
          花型详情
        </ts-button>
    </div>
  </threed-dress>
  <ts-dialog v-model="Dialog.show" width="90%" title="上传店铺花型" @confirm="handleChooseProduct" @cancel="handleCancelChoose">
    <ts-navbar v-model="selected">
      <ts-tab-item id="1">店铺上架花型</ts-tab-item>
      <ts-tab-item id="2">厂家供应花型</ts-tab-item>
    </ts-navbar>
  <ts-tab-container v-model="selected" class="models-tab-container">
    <ts-tab-container-item id="1">
      <ts-grid :data="Product.store.list">
        <ts-grid-item style="width:220px" v-for="(product,index) in Product.store.list" :key="product" @click="handleChooseStore(product,index)" :class="{'models-active':index===Choose.index}">
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
         <ts-button type="primary" @click="loadMoreProducts" v-if="Product.store.pageNO!==Product.store.totalPage&&Product.store.totalPage!==0">加载更多上架花型</ts-button>
      </div>
    </ts-tab-container-item>
    <ts-tab-container-item id="2">
      <ts-grid :data="Product.supplies.list">
        <ts-grid-item style="width:240px" v-for="(product,index) in Product.supplies.list" :key="product" @click="handleChooseStore(product,index)" :class="{'models-active':index===Choose.index}">
          <ts-image
           width="170"
           height="170"
           :canView="false"
           disabledHover
           :src="product.productPicUrl">
           </ts-image>
         </ts-grid-item>
      </ts-grid>
      <div class="center">
       <ts-button type="primary" @click="loadMoreSupplies" v-if="Product.supplies.pageNO!==Product.supplies.totalPage&&Product.supplies.totalPage!==0">加载更多供应花型</ts-button>
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
  getVisitCompanySupplyList,
  favoriteBus,
  favoriteIsFavorite
} from '@/common/api/api';
// import {
//   mapGetters
// } from 'vuex';
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
        confirm: '',
        index: ''
      },
      Params: {
        product: {},
        supplies: {}
      },
      Collect: {
        disabled: true,
        isCollected: false
      },
      selected: ''
    };
  },
  // computed:{
  //   ...mapGetters(['userInfo'])
  // },
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
    },
    Choose: {
      handler(val) {
        this.Collect.disabled = !val.confirm;
      },
      deep: true
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
    handleGotoProduct() {
      this.$router.push({
        name: 'flowerDetail',
        params: {
          id: this.Choose.item.id
        }
      });
    },
    // 点击选择花型
    handleChooseStore(item, index) {
      this.Choose.item = item;
      this.Choose.index = index;
    },
    // 收藏／取消花型
    async handleCollectProduct() {
      let res = (await favoriteBus({
        businessId: this.Choose.item.id,
        businessType: 1
      })).data;
      this.Collect.isCollected = res.message.indexOf('收藏') >= 0;
    },
    // 选择花型
    // ==>判断是否收藏过花型
    handleChooseProduct() {
      this.Dialog.show = false;
      let img = this.Choose.item.defaultPicUrl.indexOf('?') >= 0 ? this.Choose.item.defaultPicUrl.split('?')[0] : this.Choose.item.defaultPicUrl;
      this.convertImgToBase64(img, async(base64Img) => {
        this.Choose.confirm = base64Img;
        let res = (await favoriteIsFavorite({
          businessId: this.Choose.item.id,
          businessType: 1
        })).data.data;
        this.Collect.isCollected = res !== 0;
      });
    },
    // 取消选择
    handleCancelChoose() {
      this.Choose.confirm = '';
      this.Choose.index = '';
      this.Dialog.show = false;
    },
    // 加载更多店铺上架花型
    async loadMoreProducts() {
      this.Params.product.pageNO++;
      let data = (await getVistitCompanyProductsList(this.Params.product)).data.data;
      this.Product.store.list = this.Product.store.list.concat(data.list);
    },
    // 加载更多厂家供应花型
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
  @component active{
    box-shadow: 0 2px 4px 0 rgba(76,147,253,0.30), 0 0 6px 0 rgba(76,147,253,0.30);
  }
  @component productMenu{
    display: flex;
    text-align: center;
    height: 40px;
    align-items: center;
    border-top: 1px solid #eaeaea;
    button{
      flex:1;
      border-left: 1px solid #eaeaea;
      height: 40px;
    }
  }
}
</style>
