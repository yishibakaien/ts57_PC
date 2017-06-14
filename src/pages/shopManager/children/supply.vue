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
          <ts-radio :label='null'>全部({{getToTal}})</ts-radio>
          <ts-radio :label="item.dicValue" :key="item.dicValue" v-for="item in DICT.SupplyStatus">
            <span v-if="item.dicValue===1">{{item.label}}({{count.countSale}})</span>
            <span v-if="item.dicValue===2">{{item.label}}({{count.countSaleOff}})</span>
          </ts-radio>
        </ts-radio-group>
      </ts-filter>
      <ts-filter title="面料种类">
        <ts-radio-group v-model="Filter.supplyTypes" @change="handleFilterSupplyTypes">
          <ts-radio :label='null'>全部</ts-radio>
          <ts-radio :label="item.dicValue" :key="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE">{{item.name}}</ts-radio>
        </ts-radio-group>
      </ts-filter>
      <ts-filter title="供货方式">
        <ts-radio-group v-model="Filter.supplyShapes" @change="handleFilterSupplyShapes">
          <ts-radio :label="null">全部</ts-radio>
          <ts-radio :label="item.dicValue" :key="item.dicValue" v-for="item in dicTree.PRODUCT_SHAPE">{{item.name}}</ts-radio>
        </ts-radio-group>
      </ts-filter>
    </div>
    <!-- 表格 -->
    <div class="supply-table">
      <ts-menu :prop="companySupplyList.list">
        <ts-checkbox-group v-model="chooseItem">
          <ts-menu-table v-for="item in companySupplyList.list" :key="item.id">
            <template slot="header-left">
              <ts-checkbox v-if="Filter.supplyStatus===1" :label="item.id">
                面料-{{item.supplyShape | filterDict(dicTree.PRODUCT_SHAPE,'name')}}
              </ts-checkbox>
              <span v-else>
                面料-{{item.supplyShape | filterDict(dicTree.PRODUCT_SHAPE,'name')}}
              </span>
            </template>
            <template slot="header-right">
              状态：<b>{{item.supplyStatus | filterDict(DICT.SupplyStatus)}}</b>
            </template>
            <!-- 图片 -->
            <ts-menu-table-item width="310" class="supply-table--avatar">
              <ts-image width="80" height="80" :src="item.productPicUrl"></ts-image>
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
              收藏次数：<span class="supply-table--collect" @click.self="handleCollect(item)">{{item.favoriteCount}}</span>
            </ts-menu-table-item>
            <ts-menu-table-item>
              <a class="supply-table--link" v-if="item.supplyStatus===1" @click="handleShowDialog(item.id)">关闭</a>
            </ts-menu-table-item>
          </ts-menu-table>
        </ts-checkbox-group>
      </ts-menu>
    </div>
    <div slot="footer" class="supply-footer">
      <ts-button type="primary" @click="handleShowDialog(chooseItem)" v-if="Filter.supplyStatus===1" :disabled="chooseItem.length<=0">关闭</ts-button>
      <ts-pagination class="supply-footer--pagation" @change="handleChangeCurrent" @page-size-change="handleChangePageSize" :current="companySupplyList.pageNO" :total="companySupplyList.totalPage">
      </ts-pagination>
    </div>
  </ts-section>
  <!--  供应收藏记录对话框 -->
  <ts-dialog v-model="Collect.show" width="80%" class="supply-dialog" @confirm="Collect.show=false">
    <div slot="title" class="supply-collect-dialog--title">
      <div class="left">
        <strong>供应收藏记录</strong>
        <ts-image width='72' :canView="false" height="72" :src="Collect.productItem.productPicUrl" style="vertical-align:bottom"></ts-image>
        {{Collect.productItem.productNo}} {{Collect.productItem.category | filterDict(dicTree.PRODUCT_TYPE,'name')}}
      </div>
      <ts-button type="cancel" @click="Collect.show=!Collect.show" >关闭</ts-button>
    </div>
    <ts-table :data="Collect.data.list">
      <ts-column slot data-key="userMobile" align="center" name="收藏人账号"></ts-column>
      <ts-column slot data-key="userName" align="center" name="姓名"></ts-column>
      <ts-column slot data-key="PURCHASETYPE" align="center" name="身份"></ts-column>
      <ts-column slot data-key="DATE" align="center" name="收藏时间"></ts-column>
    </ts-table>
    <div class="supply-collect-dialog-footer supply-footer">
      <span>共{{Collect.data.totalNum}}条收藏</span>
      <ts-pagination class="supply-footer--pagation" @change="handleChangeFavListCurrent" @page-size-change="handleChangeFavListPageSize" :current="Collect.data.pageNO" :total="Collect.data.totalPage">
      </ts-pagination>
    </div>
    <div slot="footer"></div>
  </ts-dialog>
  <!--  删除提示的对话框 -->
  <ts-dialog v-model="ConfirmDialog.show" width="30%" title="提示" @confirm="handleCloseSupply" @cancel="handleCancelDelSupply" class="supply-dialog">
    <p class="supply-dialog--title">确认关闭选中供应信息？</p>
    <p>
      <ts-radio @change.native="handleNoShowDialog" type="origin" v-model="ConfirmDialog.noShowDialog" label="0"><span class="supply-dialog--tip">不再提示<i>(关闭后相关供应信息将不再显示)</i></span></ts-radio>
    </p>
  </ts-dialog>
</div>
</template>
<script>
import {
  closeCompanySupply,
  getSupplyByFavList,
  getCompanySupplylist,
  companySupplyCountByStatus
} from '@/common/api/api';
import {
  mapGetters
} from 'vuex';
import DICT from '@/common/dict';
export default {
  data() {
    return {
      DICT: {
        SupplyType: DICT.SupplyType,
        StockUnits: DICT.StockUnits,
        SupplyStatus: DICT.SupplyStatus,
        SupplyShapes: DICT.SupplyShapes,
        userType: DICT.userType
      },
      // =========
      // 传参
      Params: {
        supplyTypes: null,
        supplyStatus: null,
        supplyShapes: null,
        pageSize: 10,
        pageNo: 1
      },
      ParamsFavList: {
        pageNo: '1',
        pageSize: '10',
        productId: ''
      },
      // =========
      // 对话框
      ConfirmDialog: {
        noShowDialog: false,
        show: false,
        id: []
      },
      // 收藏次数
      Collect: {
        show: false,
        productItem: {},
        data: {}
      },
      // cookie
      Cookie: {
        key: 'showDelSupplyDialog',
        value: 1,
        day: 7
      },
      companySupplyList: {},
      count: {},
      // 选择
      chooseItem: [],
      Filter: {
        supplyStatus: null,
        supplyShapes: null,
        supplyTypes: null
      }
    };
  },
  async created() {
    if (sessionStorage.getItem('supply-filter')) {
      this.Filter = JSON.parse(sessionStorage.getItem('supply-filter'));
      this.Params = Object.assign({}, this.Params, this.Filter);
    }
    this.count = (await companySupplyCountByStatus()).data.data;
    this.companySupplyList = (await getCompanySupplylist(this.Params)).data.data;
    // 默认创建一个cookie
    !this.cookie.get(this.Cookie.key) ? this.cookie.set(this.Cookie.key, this.Cookie.value, {
      end: this.Cookie.day
    }) : '';
  },
  computed: {
    ...mapGetters(['dicTree']),
    getToTal() {
      return this.count.countSale + this.count.countSaleOff;
    }
  },
  beforeDestroy() {
    sessionStorage.setItem('supply-filter', JSON.stringify(this.Filter));
  },
  watch: {
    // 加工数据
    // TODO：table支持slot的时候就不这样写
    'Collect.data.list': {
      handler(val) {
        if (val) {
          val.forEach(item => {
            item.DATE = this.filterDate(item.favDate, 'date');
            item.PURCHASETYPE = this.filterDict(item.userType, DICT.userType);
          });
        }
      },
      deep: true
    }
  },
  methods: {
    // 打开花型收藏记录
    async handleCollect(id) {
      this.Collect.show = !this.Collect.show;
      if (this.Collect.show) {
        this.Collect.productItem = id;
        this.Collect.data = (await getSupplyByFavList({
          id: id.id,
          pageSize: this.ParamsFavList.pageSize,
          pageNo: this.ParamsFavList.pageNo
        })).data.data;
      }
    },
    // 分页处理
    // =========
    async handleChangeCurrent(current) {
      this.Params.pageNo = current;
      this.companySupplyList = (await getCompanySupplylist(this.Params)).data.data;
    },
    async handleChangePageSize(size) {
      this.Params.pageSize = size;
      this.companySupplyList = (await getCompanySupplylist(this.Params)).data.data;
    },
    async handleChangeFavListCurrent(current) {
      this.ParamsFavList.current = current;
      this.Collect.data = (await getSupplyByFavList(this.ParamsFavList)).data.data;
    },
    async handleChangeFavListPageSize(size) {
      this.ParamsFavList.pageSize = size;
      this.Collect.data = (await getSupplyByFavList(this.ParamsFavList)).data.data;
    },
    // ========
    // 添加“分类”条件搜索
    async handleFilterSupplyStatus(e) {
      this.Params = Object.assign({}, this.Params, {
        supplyStatus: e,
        pageNo: 1
      });
      this.companySupplyList = (await getCompanySupplylist(this.Params)).data.data;
    },
    // 添加“面料种类”条件搜索
    async handleFilterSupplyTypes(e) {
      this.Params = Object.assign({}, this.Params, {
        supplyTypes: e,
        pageNo: 1
      });
      this.companySupplyList = (await getCompanySupplylist(this.Params)).data.data;
    },
    // 添加“供货方式”条件搜索
    async handleFilterSupplyShapes(e) {
      this.Params = Object.assign({}, this.Params, {
        supplyShapes: e,
        pageNo: 1
      });
      this.companySupplyList = (await getCompanySupplylist(this.Params)).data.data;
    },
    // 点击“删除”=>判断cookie是否显示
    async handleShowDialog(item) {
      this.ConfirmDialog.id = item;
      if (this.cookie.get(this.Cookie.key) === '1') {
        this.ConfirmDialog.show = true;
      } else {
        this.handleCloseSupply();
      }
    },
    // 取消删除
    handleCancelDelSupply() {
      this.ConfirmDialog.show = false;
      this.cookie.set(this.Cookie.key, this.Cookie.value, {
        end: this.Cookie.day
      });
    },
    // 关闭供应
    async handleCloseSupply() {
      await closeCompanySupply({
        ids: this.ConfirmDialog.id.toString()
      });
      this.companySupplyList = (await getCompanySupplylist(this.Params)).data.data;
      this.ConfirmDialog.show = false;
      this.chooseItem = [];
    },
    // 设置cookie
    handleNoShowDialog(e) {
      this.cookie.set(this.Cookie.key, e.target.value, {
        end: this.Cookie.day
      });
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace supply{
  @component filter{
    margin-bottom: 23px;
  }
  @component dialog{
    p{
      text-align: center;
    }
    @modifier title{
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    @modifier tip{
      font-size: 14px;
      i{
        font-size: smaller;
        color: #3F3F3F;
      }
    }
  }
  @component collect-dialog{
    @descendent footer{
      margin-top: 10px;
    }
    @modifier title{
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding-bottom: 10px;
      strong{
        margin-right: 10px;
      }
      .ts-image{
        margin:0 10px 0 20px;
        position: relative;
      }
    }
  }
  @component footer{
    display: flex;
    @modifier pagation{
      flex:1;
      text-align: right;
    }
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
