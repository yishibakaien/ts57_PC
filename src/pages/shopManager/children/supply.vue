<template>
<div class="">
  <ts-section>
    <div slot="menu">
      <router-link to="supplyAdd" exact>
        <ts-button type="primary">发布供应</ts-button>
      </router-link>
    </div>
    <!-- 过滤器 -->
    <div class="supply-filter">
      <ts-filter title="分类">
        <ts-radio-group v-model="Filter.supplyStatus" @change="handleFilterSupplyStatus">
          <ts-radio label="">全部</ts-radio>
          <ts-radio :label="item.value" v-for="item in DICT.SupplyStatus">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-filter>
      <ts-filter title="面料种类">
        <ts-radio-group v-model="Filter.supplyTypes" @change="handleFilterSupplyTypes">
          <ts-radio label="">全部</ts-radio>
          <ts-radio :label="item.value" v-for="item in DICT.SupplyType">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-filter>
      <ts-filter title="供货方式">
        <ts-radio-group v-model="Filter.supplyShapes" @change="handleFilterSupplyShapes">
          <ts-radio label="">全部</ts-radio>
          <ts-radio :label="item.value" v-for="item in DICT.SupplyShapes">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-filter>
    </div>
    <!-- 表格 -->

    <div class="supply-table" v-for="item in companySupplyList.list">
      <ts-checkbox-group v-model="chooseItem">
        <ts-menu-table>
          <div slot="header-left">
            <ts-checkbox :label="item.id">面料-{{item.supplyType | filterDict(DICT.SupplyType)}}</ts-checkbox>
          </div>
          <div slot="header-right">
            状态：<b>{{item.supplyStatus}}</b>
          </div>
          <!-- 图片 -->
          <ts-menu-table-item width="310" class="supply-table--avatar">
            <ts-image width="80" height="80" v-model="item.productPicUrl"></ts-image>
          </ts-menu-table-item>
          <!-- 供应描述 -->
          <ts-menu-table-item>
            <p>{{item.supplyDesc}}</p>
          </ts-menu-table-item>
          <!-- 供应 -->
          <ts-menu-table-item>
            供应：{{item.supplyNum}}{{item.supplyUnit | filterDict(DICT.StockUnits)}}
          </ts-menu-table-item>
          <!-- 收藏次数 -->
          <ts-menu-table-item>
            收藏次数：<span class="supply-table--collect" @click.self="handleCollectDialog(item.id)">{{item.enquiryNum}}</span>
          </ts-menu-table-item>
          <ts-menu-table-item>
            <a class="supply-table--link" @click="handleCloseSupply({ids:item.id})">关闭</a>
          </ts-menu-table-item>
        </ts-menu-table>
      </ts-checkbox-group>
    </div>
    <div slot="footer" v-if="chooseItem.length>0">
      <ts-button type="primary" @click="handleCloseSupply({ids:chooseItem})">关闭</ts-button>
    </div>
  </ts-section>
  <!--  供应收藏记录对话框 -->
  <ts-dialog v-model="showDialog" title="供应收藏记录">
    <span>这是一段信息</span>
  </ts-dialog>
</div>
</template>
<script>
import {
  closeCompanySupply,
  getCompanySupplylist
} from '@/common/api/api';
import DICT from '@/common/dict';
export default {
  data() {
    return {
      DICT: {
        SupplyType: DICT.SupplyType,
        StockUnits: DICT.StockUnits,
        SupplyStatus: DICT.SupplyStatus,
        SupplyShapes: DICT.SupplyShapes
      },
      Params: {
        supplyTypes: null,
        supplyStatus: null,
        supplyShapes: null,
        pageSize: 10,
        pageNo: 1
      },
      companySupplyList: {},
      // 选择
      chooseItem: [],
      Filter: {
        supplyStatus: '',
        supplyShapes: '',
        supplyTypes: ''
      },
      showDialog: false
    };
  },
  async created() {
    this.companySupplyList = (await getCompanySupplylist()).data;
  },
  methods: {
    handleCollectDialog() {
      this.showDialog = true;
    },
    // 添加“分类”条件搜索
    async handleFilterSupplyStatus(e) {
      this.Params.supplyStatus = e;
      this.productList = (await getCompanySupplylist(this.Params)).data;
    },
    // 添加“面料种类”条件搜索
    async handleFilterSupplyTypes(e) {
      this.Params.supplyTypes = e;
      this.productList = (await getCompanySupplylist(this.Params)).data;
    },
    // 添加“供货方式”条件搜索
    async handleFilterSupplyShapes(e) {
      this.Params.supplyShapes = e;
      this.productList = (await getCompanySupplylist(this.Params)).data;
    },
    // 关闭供应
    async handleCloseSupply(params) {
      await closeCompanySupply({
        // TODO: 云龙之后再加
        //  ids: [params.ids].join(',')
        id: params.ids
      });
      this.companySupplyList = (await getCompanySupplylist()).data;
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace supply{
  @component filter{
    margin-bottom: 23px;
  }
  @component table{
    @modifier link{
      display: block;
    }
    @modifier avatar{
      text-align: left;
    }
    @modifier collect{
      cursor: pointer;
      color:#4C93FD;
      &:hover{
        color:blue;
      }
    }
  }
}
</style>
