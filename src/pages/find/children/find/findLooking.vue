<template lang="html">
  <ts-section pageTitle="大家在找" class="everyLooking-wrapper" id="anchor-looking">
    <div slot="menu">
      <router-link tag="a" to="everyLooking" class="everyLooking-menu-more">
        更多商机
        <i class="icon-gengduo"></i>
      </router-link>
    </div>
    <div class="everyLooking-container">
      <ts-grid>
         <ts-grid-item v-for="(product,index) in History.list" :key="product" @click="handleViewResult(product.id)">
           <ts-image
            width="170"
            height="170"
            :canView="false"
            disabledHover
            :src="product.searchSource">
            </ts-image>
            <template slot="footer" class="everyLooking-footer">
              <p>{{product.category | filterDict(dicTree.PRODUCT_TYPE,'name')}}</p>
              <a>查找结果</a>
            </template>
          </ts-grid-item>
      </ts-grid>
    </div>
  </ts-section>
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
        pageSize: 20
      },
      BurstHotSearch: {}
    };
  },
  methods: {
    handleViewResult(id) {
      this.goto(`/catagory/${id}`);
    }
  },
  computed: {
    ...mapGetters(['dicTree'])
  },
  async created() {
    this.History = (await searchHistory(this.Params)).data.data;
  }
};
</script>

<style lang="css" scoped>
:root{
  --grid-border-color:#eaeaea;
}
@import '../../../../common/css/_var.css';
@import '../../../../common/css/mixin/setOnepx.css';
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
    @modifier title{
      font-size: 16px;
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
      font-size: 16px;
      margin-top: 10px;
      text-align: left;
      max-width: 200px;
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
