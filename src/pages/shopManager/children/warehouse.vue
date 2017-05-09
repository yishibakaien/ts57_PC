<template lang="html">
  <ts-section>
    <div slot="menu">
      <ts-input style="width:30%" placeholder="输入花型编号搜索" v-model="searchVal">
        <!-- <span slot="append" @click.capture="handleSearch">O</span> -->
        <ts-button slot="append" size="small" @click.capture="handleSearch">O</ts-button>
      </ts-input>
      <ts-button type="warning" class="warehouse-photo--search">
        O
      </ts-button>
      <router-link to="addwarehouse" exact>
        <ts-button type="primary">新增花型</ts-button>
      </router-link>
    </div>
    <!-- 品种过滤器 -->
    <div class="warehouse-filter">
      <ts-filter title="分类">
        <ts-radio-group v-model="Filter.publishStatuss" @change="handleFilterPublishStatus">
          <ts-radio label="">全部</ts-radio>
          <ts-radio :label="item.value" :key="item.value" v-for="item in DICT.PublishStatus">{{item.label2}}</ts-radio>
        </ts-radio-group>
      </ts-filter>
      <ts-filter title="面料种类">
        <ts-radio-group v-model="Filter.categorys" @change="handleFilterCategorys">
          <ts-radio label="">全部</ts-radio>
          <ts-radio :label="item.value" :key="item.value" v-for="item in DICT.SupplyType">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-filter>
    </div>
    <!-- 表格 -->
    <div class="warehouse-table" v-for="item in productList.list">
      <ts-checkbox-group v-model="chooseItem">
      <ts-menu-table>
        <div slot="header-left">
          <ts-checkbox :label="item.id">#{{item.productNo}}&nbsp{{item.category | filterDict(DICT.SupplyType)}}</ts-checkbox>
        </div>
        <div slot="header-right">
          状态：<b>{{item.publishStatus | filterDict(DICT.PublishStatus,'label2')}}</b>
        </div>
        <ts-menu-table-item width="310" class="supply-table--avatar">
          <ts-image width="80" height="80" v-model="item.picsUrl"></ts-image>
        </ts-menu-table-item>
        <!-- PublishStatus -->
        <ts-menu-table-item>
          <p>{{item.isStock| filterDict(DICT.isStock,'label2')}}</p>
          <p v-if="item.isStock===1">{{item.stock}}{{item.stockUnit|filterDict(DICT.StockUnits)}}</p>
        </ts-menu-table-item>
        <!-- Price -->
        <ts-menu-table-item>
          <span v-if="item.price>0">{{item.price}}元／{{item.priceUnit|filterDict(DICT.PriceUnits)}}</span>
          <span v-else>价格面议</span>
        </ts-menu-table-item>
        <ts-menu-table-item>
          询价次数：<span class="supply-table--collect" @click.self="handleCollectDialog(item.id)">{{item.enquiryNum}}</span>
        </ts-menu-table-item>
        <ts-menu-table-item>
          <a class="warehouse-table--link" v-if="item.publishStatus!==2" @click="handleProduct({goal:2,ids:item.id,isUp:true})">上架平台</a>
          <a class="warehouse-table--link" v-if="item.publishStatus!==1" @click="handleProduct({goal:1,ids:item.id,isUp:true})">上架店铺</a>
          <a class="warehouse-table--link" v-if="item.publishStatus!==0" @click="handleProduct({goal:0,ids:item.id})">下架</a>
          <router-link tag="a" class="warehouse-table--link" :to="{path:'addwarehouse',query:{id:item.id}}">
            编辑
          </router-link>
          <a class="warehouse-table--link" v-if="item.publishStatus===0" @click="handleProduct({ids:item.id},'delete')">删除</a>
        </ts-menu-table-item>
      </ts-menu-table>
      </ts-checkbox-group>
    </div>
    <div slot="footer" class="warehouse-footer--button" v-if="chooseItem.length>0">
      <ts-button type="primary" @click="handleProduct({goal:2,ids:chooseItem,isUp:true})">上架平台</ts-button>
      <ts-button type="primary" @click="handleProduct({goal:1,ids:chooseItem,isUp:true})">上架店铺</ts-button>
      <ts-button type="cancel"  @click="handleProduct({ids:chooseItem},type='delete')">删除</ts-button>
    </div>
  </ts-section>
</template>

<script>
import DICT from '@/common/dict';
import {
  shelveProduct,
  deleteProduct,
  getProductList
} from '@/common/api/api';
export default {
  data() {
    return {
      productList: {},
      // 数据字典
      DICT: {
        PriceUnits: DICT.PriceUnits,
        StockUnits: DICT.StockUnits,
        SupplyType: DICT.SupplyType,
        PublishStatus: DICT.PublishStatus,
        isStock: DICT.isStock
      },
      // 搜索值
      searchVal: '',
      // 选择的项目
      chooseItem: [],
      Params: {
        publishStatuss: null,
        pageSize: 10,
        productNo: null,
        pageNo: 1,
        categorys: null
      },
      // 过滤器
      Filter: {
        categorys: '',
        publishStatuss: ''
      }
    };
  },
  async created() {
    // 获取花型列表
    this.productList = (await getProductList(this.Params)).data;
  },
  methods: {
    async handleSearch() {
      this.Params = Object.assign({}, this.Params, {
        productNo: this.searchVal,
        categorys: null,
        publishStatuss: null
      });
      this.productList = (await getProductList(this.Params)).data;
    },
    // 添加“分类”条件搜索
    async handleFilterPublishStatus(e) {
      this.Params.publishStatuss = e;
      this.productList = (await getProductList(this.Params)).data;
    },
    // 添加“面料”条件搜索
    async handleFilterCategorys(e) {
      this.Params.categorys = !e ? null : [this.Filter.categorys].map(item => parseInt(item));
      this.productList = (await getProductList(this.Params)).data;
    },
    // 处理接口处理
    // type=shelve : 花型上下架
    // goal	上下架到哪	number	上架：1--店铺 2--平台 下架：0--仓库 1--店铺
    // ids	id串	string	逗号隔开
    // isUp	上架类型	boolean	true--上架 false--下架（默认）
    // type="delete":删除花型
    // ids	id串	string	逗号隔开
    async handleProduct(params, type = 'shelve') {
      // 删除
      if (type === 'delete') {
        await deleteProduct({
          ids: [params.ids].join(',')
        });
      }
      // 上下架
      if (type === 'shelve') {
        await shelveProduct({
          goal: params.goal,
          ids: [params.ids].join(','),
          isUp: params.isUp
        });
      }
      // 重新花型列表接口
      this.productList = (await getProductList(this.Params)).data;
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace warehouse{
  @component filter{
    margin-bottom: 24px;
  }
  @component footer{
    @modifier button{
      button{
        margin-right:32px;
      }
    }
  }
  @component table{
    @modifier link{
      display: block;
      text-align: center;
    }
  }
  @component photo{
    @modifier search{
      margin:0 20px;
      min-width: 40px;
    }
  }
}
</style>
