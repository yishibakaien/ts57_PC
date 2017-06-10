<template lang="html">
  <div class="factory">
    <div class="factory-row" v-for="store in data">
      <div class="factory-row--left" :style="{'width':width}">
        <ts-image
         width="100"
         height="100"
         :canView="false"
         disabledHover
         class="factory-company--cover"
         :src="store.companyHeadIcon"></ts-image>
        <p class="factory-company--title">{{store.companyName}}</p>
         <router-link :to="{ name: 'shop', params: { id: store.companyId }}" tag="span">
          <ts-button type="plain" size="large" class="factory-company--button" @click="handleViewStore(store.companyId)">
            访问店铺
          </ts-button>
          </router-link>
      </div>
      <div class="factory-row--right">
        <div class="factory-list-block onepx-l onepx-r">
          <p>新增<span>{{store.newCount}}</span>款／共<span>{{store.totalCount}}</span>款</p>
          <p>{{ getPublishDate | customTime }}</p>
        </div>
        <ts-grid :data="store.productList">
          <ts-grid-item v-for="product in store.productList" :key="product" @click="handleViewProduct(product.id)" :style="{'width':width}">
            <ts-image
             width="170"
             height="170"
             :canView="false"
             disabledHover
             :src="product.defaultPicUrl">
             </ts-image>
             <p class="factory-product--number">{{product.productNo}}</p>
             <template slot="footer">
               {{product.category | filterDict(dicTree.PRODUCT_TYPE,'name')}}
               <ts-tag>{{product.publishStatus | filterDict(DICT.PublishStatus,'label')}}</ts-tag>
             </template>
           </ts-grid-item>
        </ts-grid>
      </div>
  </div>

  </div>
</template>

<script>
import DICT from '@/common/dict';
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      // 数据字典
      DICT: {
        PublishStatus: DICT.PublishStatus
      }
    };
  },
  props: {
    data: [Array, Object],
    width: {
      type: String,
      default: '200px'
    }
  },
  computed: {
    ...mapGetters(['dicTree']),
    getPublishDate() {
      let firstPublish = this.data[0].productList[0];
      if (firstPublish) {
        return firstPublish.publishDate;
      }
    }
  },
  methods: {
    // 进去某个商品
    handleViewProduct(item) {
      this.$emit('viewProduct', item);
    },
    // 进去店铺
    handleViewStore(item) {
      this.$emit('viewStore', item);
    }
  }
};
</script>

<style lang="css" scoped>
:root{
  --grid-border-color:#eaeaea;
}
@import '../../../common/css/_var.css';
@import '../../../common/css/mixin/setOnepx.css';
@component-namespace factory{
  @component row{
    display: table;
    width: 100%;
    table-layout: fixed;
    position: relative;
    margin-bottom: 20px;
    &:before{
      @mixin setLeftLine var(--grid-border-color);
    }
    &:after{
      @mixin setTopLine var(--grid-border-color);
    }
    @modifier left{
      display: table-cell;
      text-align: center;
      position: relative;
      margin-bottom: 0;
      height: 100%;
      &:after{
        @mixin setBottomLine var(--grid-border-color);
      }
    }
    @modifier right{
      display: table-cell;
      vertical-align: middle;
      width: 100%;
    }
  }
  @component company{
    @modifier title{
      font-size: 17px;
      line-height: 30px;
      margin-top:16px;
      @utils-ellipsis 2;
    }
    @modifier cover{
      margin-top: 38px;
    }
    @modifier button{
      position: absolute * * 25px 50%;
      transform: translate(-50%);
      width: 80%;
    }
  }
  @component product{
    @modifier number{
      font-size: 16px;
      line-height: 40px;
      @utils-ellipsis;
    }
  }
  @component list{
    @descendent block{
      background-color: #F8F8F8;
      line-height: 48px;
      white-space: nowrap;
      display: flex;
      justify-content: space-between;
      padding:0 20px;
      color: #333;
      p:last-child{
        color:#999;
      }
      span{
        color: #FF8400;
      }
    }
  }
}
</style>
