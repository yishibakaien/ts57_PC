<template lang="html">
  <ts-section pageTitle="大家在找" class="everyLooking-wrapper">
    <div slot="menu">
      <a class="everyLooking-menu-more">更多商机<i class="icon-gengduo"></i></a>
    </div>
    <div class="everyLooking-container">
      <ts-grid :rows='3'>
        <ts-grid-item v-for="product in 16" :key="product" @click="handleViewProduct(product)">
          <ts-image
           width="170"
           height="170"
           :canView="false"
           disabledHover
           src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/6e5157df050b7a94d30b7418bd54f92a_121_121.jpg">
           </ts-image>
           <p class="everyLooking-product--number">#20001</p>
           <template slot="footer">
             <span>面料</span>
             <ts-tag>有库存</ts-tag>
           </template>
         </ts-grid-item>
      </ts-grid>
    </div>
  </ts-section>
</template>

<script>
export default {
  methods: {
    // 进去某个商品
    handleViewProduct(item) {},
    // 进去店铺
    handleViewStore(item) {}
  }
};
</script>

<style lang="css" scoped>
:root{
  --grid-border-color:#eaeaea;
}
@import '../../../common/css/_var.css';
@import '../../../common/css/mixin/setOnepx.css';
@component-namespace everyLooking{
  @component container{
    margin:0 20px;
    padding-bottom: 1px;
    min-width: 800px;
  }
  @component row{
    display: flex;
    position: relative;
    margin-bottom: 20px;
    &:before{
      @mixin setLeftLine var(--grid-border-color);
    }
    &:after{
      @mixin setTopLine var(--grid-border-color);
    }
    @modifier left{
      flex-basis: calc(inherit / 4);
      text-align: center;
      position: relative;
      margin-bottom: 0;
      &:after{
        @mixin setBottomLine var(--grid-border-color);
      }
    }
    @modifier right{
      flex:1;
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
  @component menu{
    @descendent more{
      padding-right: 20px;
      i{
        padding-left: 10px;
      }
    }
  }
}
</style>
