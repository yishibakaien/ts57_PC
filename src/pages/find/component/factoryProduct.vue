<template lang="html">
  <div class="factory">
    <div class="factory-row" v-for="store in 2">
      <div class="factory-row--left" :style="{'width':width}">
        <div class="factory-company">
          <ts-image
           width="100"
           height="100"
           :canView="false"
           disabledHover
           class="factory-company--cover"
           src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/6e5157df050b7a94d30b7418bd54f92a_121_121.jpg"></ts-image>
           <p class="factory-company--title">杭州杨汛桥经编工业园区</p>
           <ts-button type="plain" size="large" class="factory-company--button" @click="handleViewStore(store)">访问店铺</ts-button>
        </div>
      </div>
      <div class="factory-row--right">
        <div class="factory-list-block onepx-l onepx-r">
          <p>新增<span>12</span>款／共<span>100</span>款</p>
          <p>24分钟前</p>
        </div>
        <ts-grid>
          <ts-grid-item v-for="product in 3" :key="product" @click="handleViewProduct(product)" :style="{'width':width}">
            <ts-image
             width="170"
             height="170"
             :canView="false"
             disabledHover
             src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/6e5157df050b7a94d30b7418bd54f92a_121_121.jpg">
             </ts-image>
             <p class="factory-product--number">#20001</p>
             <template slot="footer">
               <span>面料</span>
               <ts-tag>有库存</ts-tag>
             </template>
           </ts-grid-item>
        </ts-grid>
      </div>
  </div>

  </div>
</template>

<script>
export default {
  props: {
    data: [Array, Object],
    width: {
      type: String,
      default: '200px'
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
      /*width: 100%;*/
    }
  }
  @component company{
    margin:0 16px;
    height: 100%;
    position: relative;
    @modifier title{
      font-size: 22px;
      line-height: 30px;
      margin-top:16px;
    }
    @modifier cover{
      margin-top: 38px;
    }
    @modifier button{
      position: absolute * * 25px 50%;
      transform: translate(-50%);
    }
  }
  @component product{
    @modifier number{
      font-size: 24px;
      line-height: 40px;
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
