<template lang="html">
  <ts-section>
    <div slot="menu">
      <ts-input style="width:30%" placeholder="输入花型编号搜索">
        <span slot="append">O</span>
      </ts-input>
      <ts-button type="warning" class="warehouse-photo--search">
        O
      </ts-button>
      <router-link to="addwarehouse" exact>
        <ts-button type="primary">新增花型</ts-button>
      </router-link>
    </div>
    <div slot="footer" class="warehouse-footer--button" v-if="chooseItem.length>0">
      <ts-button type="primary">上架平台</ts-button>
      <ts-button type="primary">上架店铺</ts-button>
      <ts-button type="cancel">删除</ts-button>
    </div>
    <!-- 品种过滤器 -->
    <div class="warehouse-filter">
      <ts-filter title="分类">
        <ts-radio-group v-model="Filter.sort" @change="hanleFilterSort">
          <ts-radio label="0">全部（1000）</ts-radio>
          <ts-radio label="1">本地仓库（200）</ts-radio>
          <ts-radio label="2">上架店铺（200）</ts-radio>
          <ts-radio label="3">上架平台（60）</ts-radio>
        </ts-radio-group>
      </ts-filter>
      <ts-filter title="面料种类">
        <ts-radio-group v-model="Filter.fabricType" @change="hanleFilterFabric">
          <ts-radio label="0">全部（4000）</ts-radio>
          <ts-radio label="1">面料（200）</ts-radio>
          <ts-radio label="2">大边（200）</ts-radio>
        </ts-radio-group>
      </ts-filter>
    </div>
    <!-- 表格 -->
    <div class="warehouse-table" v-for="item in productList.list">
      <ts-checkbox-group v-model="chooseItem">
      <ts-menu-table>
        <div slot="header-left">
          <ts-checkbox :label="item.id">#{{item.productNo}}&nbsp{{item.category}}</ts-checkbox>
        </div>
        <div slot="header-right">
          状态：<b>{{item.publishStatus | filterDict(DICT.PublishStatus)}}</b>
        </div>
        <ts-menu-table-item width="310" class="supply-table--avatar">
          <ts-image width="80" height="80" :src="item.picsUrl"></ts-image>
        </ts-menu-table-item>
        <ts-menu-table-item>
          <p>{{item.isStock}}</p>
          <p>{{item.isStock}}</p>
        </ts-menu-table-item>
        <ts-menu-table-item>
          <span v-if="item.price.length>0">{{item.price}}元／{{item.stockUnit}}</span>
          <span v-else></span>
        </ts-menu-table-item>
        <ts-menu-table-item>
          询价次数：<span class="supply-table--collect" @click.self="handleCollectDialog(item.id)">{{item.enquiryNum}}</span>
        </ts-menu-table-item>
        <ts-menu-table-item>
          <a class="warehouse-table--link">上架平台</a>
          <a class="warehouse-table--link">上架店铺</a>
          <a class="warehouse-table--link">下架</a>
          <a class="warehouse-table--link">编辑</a>
          <a class="warehouse-table--link" v-if="item.publishStatus===0">删除</a>
        </ts-menu-table-item>
      </ts-menu-table>
      </ts-checkbox-group>
    </div>
  </ts-section>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import DICT from '@/common/dict';
export default {
  data() {
    return {
      // 数据字典
      DICT: {
        BulkType: DICT.BulkType,
        Units: DICT.Units,
        PatternClassfication: DICT.PatternClassfication,
        PublishStatus: DICT.PublishStatus,
        isStock: DICT.isStock
      },
      // 选择的项目
      chooseItem: [],
      checked: ['复选框 A'],
      list: [{
        id: 1,
        label: '11'
      }, {
        id: 2,
        label: '121'
      }, {
        id: 21,
        label: '33'
      }],
      selectedVal: '33',
      Filter: {
        fabricType: '1',
        sort: '1'
      }
    };
  },
  watch: {
    chooseItem(val) {

    }
  },
  created() {
    // 获取花型列表
    this.getProductList({
      orderBy: 'desc',
      pageNo: 1,
      pageSize: 10
    });
  },
  computed: {
    ...mapGetters(['productList'])
  },
  methods: {
    ...mapActions(['getProductList']),
    hanleFilterSort() {},
    hanleFilterFabric() {}
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
