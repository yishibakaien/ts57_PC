<template lang="html">
<div class="warehouse">
  <ts-section>
    <div slot="menu">
      <ts-input style="width:30%" placeholder="输入花型编号搜索" v-model="Params.productNo">
        <ts-button slot="append" size="small" @click="handleSearch"><i class="icon-sousuo"></i></ts-button>
      </ts-input>
      <label style="position:relative">
        <ts-button size="small" type="warning" @click="handleUpload">
          <i class="icon-xiangji"></i>
        </ts-button>
      </label>
      <input ref="input" type="file" accept="image/png,image/jpeg" @change="uploadImg" v-show="false">
      <router-link to="addwarehouse" exact>
        <ts-button type="primary">新增花型</ts-button>
      </router-link>
    </div>
    <!-- 品种过滤器 -->
    <div class="warehouse-filter">
      <ts-filter title="分类">
        <ts-radio-group v-model="Filter.publishStatuss" @change="handleFilterPublishStatus">
          <ts-radio :label="null">全部({{getToTal}})</ts-radio>
          <ts-radio :label="item.dicValue" :key="item.value" v-for="item in DICT.PublishStatus" v-if="item.dicValue!==2||getIsStore">
            <span v-if="item.dicValue===2">{{item.label}}({{productList.platform}})</span>
            <span v-if="item.dicValue===1">{{item.label}}({{productList.shop}})</span>
            <span v-if="item.dicValue===0">{{item.label}}({{productList.repository}})</span>
          </ts-radio>
        </ts-radio-group>
      </ts-filter>
      <ts-filter title="面料种类">
        <ts-radio-group v-model="Filter.categorys" @change="handleFilterCategorys">
          <ts-radio :label="null">全部</ts-radio>
          <ts-radio :label="item.dicValue" :key="item.value" v-for="item in dicTree.PRODUCT_TYPE">{{item.name}}</ts-radio>
        </ts-radio-group>
      </ts-filter>
    </div>
    <!-- 表格 -->
    <div class="warehouse-table">
      <ts-menu :prop="productList.list">
      <ts-checkbox-group v-model="chooseItem">
      <ts-menu-table v-for="item in productList.list" :key="item.id">
        <div slot="header-left">
          <ts-checkbox :label="item.id" v-if="Filter.publishStatuss!==''">{{item.productNo}}-{{item.category | filterDict(dicTree.PRODUCT_TYPE,'name')}}</ts-checkbox>
          <span v-else>{{item.productNo}}-{{item.category | filterDict(dicTree.PRODUCT_TYPE,'name')}}</span>
        </div>
        <div slot="header-right">
          状态：<b>{{item.publishStatus | filterDict(DICT.PublishStatus,'label2')}}</b>
        </div>
        <ts-menu-table-item width="310" class="supply-table--avatar">
          <ts-image width="80" height="80"  :src="item.defaultPicUrl"></ts-image>
        </ts-menu-table-item>
        <!-- PublishStatus -->
        <ts-menu-table-item>
          <p v-if="item.isStock===0">{{item.isStock| filterDict(DICT.isStock,'label2')}}</p>
          <p v-if="item.isStock===1">{{item.stock}}{{item.stockUnit|filterDict(DICT.StockUnits)}}</p>
        </ts-menu-table-item>
        <!-- Price -->
        <ts-menu-table-item>
          <span v-if="item.price>0">{{item.price/100}}元／{{item.priceUnit|filterDict(DICT.PriceUnits)}}</span>
          <span v-else>价格面议</span>
        </ts-menu-table-item>
        <ts-menu-table-item>
          询价次数：<a class="warehouse-table--collect" @click.self="handleCollect(item)">{{item.askCount}}</a>
        </ts-menu-table-item>
        <ts-menu-table-item>
          <a class="warehouse-table--link" v-if="item.publishStatus!==2&&getIsStore" @click="handleShelveProduct({goal:2,ids:item.id,isUp:true})">上架平台</a>
          <a class="warehouse-table--link" v-if="item.publishStatus!==1" @click="handleShelveProduct({goal:1,ids:item.id,isUp:true})">上架店铺</a>
          <a class="warehouse-table--link" v-if="item.publishStatus!==0" @click="handleShelveProduct({goal:0,ids:item.id})">下架</a>
          <router-link tag="a" class="warehouse-table--link" :to="{path:'addwarehouse',query:{id:item.id}}">
            编辑
          </router-link>
          <a class="warehouse-table--link" v-if="item.publishStatus===0" @click="handleShowDialog([item.id])">删除</a>
        </ts-menu-table-item>
      </ts-menu-table>
      </ts-checkbox-group>
      </ts-menu>
    </div>
    <div slot="footer" class="warehouse-footer">
      <div v-if="Filter.publishStatuss!==''">
        <ts-checkbox v-if="Filter.publishStatuss!==null" @change='handleChooseAll' v-model="checkAll">全选</ts-checkbox>
        &nbsp;
        <ts-button type="primary" :disabled="chooseItem.length<=0" v-if="Filter.publishStatuss!==2&&getIsStore" @click="handleShelveProduct({goal:2,ids:chooseItem,isUp:true})">上架平台</ts-button>
        <ts-button type="primary" :disabled="chooseItem.length<=0" v-if="Filter.publishStatuss!==1" @click="handleShelveProduct({goal:1,ids:chooseItem,isUp:true})">上架店铺</ts-button>
        <ts-button type="cancel" :disabled="chooseItem.length<=0" v-if="Filter.publishStatuss!==0" @click="handleShelveProduct({goal:0,ids:chooseItem})">下架</ts-button>
        <ts-button type="cancel" :disabled="chooseItem.length<=0" v-if="Filter.publishStatuss===0" @click="handleShowDialog(chooseItem)">删除</ts-button>
      </div>
      <ts-pagination
      :detail="false"
      class="warehouse-footer--pagation"
      @change="handleChangeCurrent"
      @page-size-change="handleChangePageSize"
      :current="productList.pageNO"
      :total="productList.totalPage">
      </ts-pagination>
    </div>
  </ts-section>
  <!--  对话框 -->
  <ts-dialog v-model="Collect.show" width="80%" class="warehouse-dialog" @confirm="Collect.show=false">
    <div slot="title" class="warehouse-collect-dialog--title">
      <div class="left">
        花型询价记录
        <ts-image width='72' :canView="false" height="72" :src="Collect.productItem.defaultPicUrl" style="vertical-align:bottom"></ts-image>
        {{Collect.productItem.productNo}}-{{Collect.productItem.category | filterDict(dicTree.PRODUCT_TYPE,'name')}}
      </div>
      <ts-button type="cancel" @click="Collect.show=!Collect.show">关闭</ts-button>
    </div>
    <ts-table :data="Collect.data.list">
      <ts-column slot data-key="userName" align="center" name="询价人"></ts-column>
      <ts-column slot data-key="USERATYPE" align="center" name="身份"></ts-column>
      <ts-column slot data-key="PURCHASETYPE" align="center" name="采购类型"></ts-column>
      <ts-column slot data-key="PURCHASENUM" align="center" name="采购数量"></ts-column>
      <ts-column slot data-key="phone" align="center" name="联系电话"></ts-column>
      <ts-column slot data-key="DATE" align="center" name="询价时间">
      </ts-column>
    </ts-table>
    <div class="warehouse-collect-dialog-footer warehouse-footer">
      <span>共{{Collect.data.totalNum}}条询价</span>
      <ts-pagination
      class="warehouse-footer--pagation"
      @change="handleChangeAskListCurrent"
      @page-size-change="handleChangeAskListPageSize"
      :current="Collect.data.pageNO"
      :total="Collect.data.totalPage">
      </ts-pagination>
    </div>
    <div slot="footer"></div>
  </ts-dialog>
  <!--  对话框 -->
  <ts-dialog v-model="ConfirmDialog.show" width="30%" title="提示" @confirm="handleDelProduct" @cancel="handleCancelDelProduct" class="warehouse-dialog">
    <p class="warehouse-dialog--title">确认将选中花型删除？</p>
    <p><ts-radio @change.native="handleNoShowDialog"  type="origin" v-model="ConfirmDialog.noShowDialog" label="0"><span class="warehouse-dialog--tip">不再提示<i>(花型相关数据删除后无法恢复)</i></span></ts-radio></p>
  </ts-dialog>
  <cropper-dialog :dialog="Cropper" :imageUrl="Pic.url" @check="handleLookProduct" @change="handleGetResult">
  </cropper-dialog>
  </div>
</template>

<script>
import DICT from '@/common/dict';
import {
  mapGetters
} from 'vuex';
import CropperDialog from '@/components/search/searchImgDialog.vue';
import {
  shelveProduct,
  deleteProduct,
  getProductList,
  getAskListByProductId
} from '@/common/api/api';
export default {
  data() {
    return {
      productList: {},
      // 双向绑定 => 与searchImgDialog中 dialog.show对应
      Cropper: {
        show: false
      },
      Pic: {
        url: ''
      },
      // 数据字典
      DICT: {
        PriceUnits: DICT.PriceUnits,
        StockUnits: DICT.StockUnits,
        SupplyType: DICT.SupplyType,
        userType: DICT.userType,
        PublishStatus: DICT.PublishStatus,
        isStock: DICT.isStock
      },
      // 搜索值
      searchVal: '',
      // 选择的项目
      chooseItem: [],
      // 全选
      checkAll: '',
      // 参数
      // =======
      Params: {
        publishStatuss: null,
        pageSize: 10,
        productNo: null,
        pageNo: 1,
        categorys: null
      },
      ParamsSearchImg: {
        pageNo: 1,
        pageSize: 10,
        id: ''
      },
      ParamsAskList: {
        pageNo: 1,
        pageSize: 10,
        productId: ''
      },
      // =========
      // 过滤器
      Filter: {
        categorys: null,
        publishStatuss: null
      },
      // 统计数量
      Count: {},
      // 询价次数
      Collect: {
        show: false,
        productItem: {},
        data: {}
      },
      // 对话框
      ConfirmDialog: {
        noShowDialog: false,
        show: false,
        id: []
      },
      // cookie
      Cookie: {
        key: 'showDelProductDialog',
        value: 1,
        day: 7
      }
    };
  },
  computed: {
    ...mapGetters(['dicTree', 'userInfo', 'search']),
    // 判断是否档口
    getIsStore() {
      return this.userInfo.userType !== 2;
    },
    getToTal() {
      return this.productList.platform + this.productList.shop + this.productList.repository;
    }
  },
  watch: {
    // 加工数据
    // TODO：table支持slot的时候就不这样写
    'Collect.data.list': {
      handler(val) {
        if (val) {
          val.forEach(item => {
            item.DATE = this.filterDate(item.createDate);
            item.UNITS = this.filterDict(item.unit, this.dicTree.PRODUCT_UNIT, 'name');
            item.PURCHASENUM = `${item.purchaseNum} ${item.UNITS}`;
            item.PURCHASETYPE = this.filterDict(item.purchaseType, DICT.purchaseType);
            item.USERATYPE = this.filterDict(item.userType, DICT.userType);
          });
        }
      },
      deep: true
    },
    Params: {
      handler(val) {
        this.checkAll = false;
        this.chooseItem = [];
      },
      deep: true
    }
  },
  components: {
    CropperDialog
  },
  async created() {
    if (sessionStorage.getItem('warehouse-filter')) {
      this.Filter = JSON.parse(sessionStorage.getItem('warehouse-filter'));
      this.Params = Object.assign({}, this.Params, this.Filter);
    }
    // 获取花型列表
    this.productList = (await getProductList(this.Params)).data.data;
    // 默认创建一个cookie
    !this.cookie.get(this.Cookie.key) ? this.cookie.set(this.Cookie.key, this.Cookie.value, {
      end: this.Cookie.day
    }) : '';
  },
  beforeDestroy() {
    sessionStorage.setItem('warehouse-filter', JSON.stringify(this.Filter));
  },
  methods: {
    // =======
    // 分页处理
    // =========
    async handleChangeCurrent(current) {
      this.Params.pageNo = current;
      this.productList = (await getProductList(this.Params)).data.data;
    },
    async handleChangePageSize(size) {
      this.Params.pageSize = size;
      this.productList = (await getProductList(this.Params)).data.data;
    },
    async handleChangeAskListCurrent(current) {
      this.ParamsAskList.current = current;
      this.Collect.data = (await getProductList(this.ParamsAskList)).data.data;
    },
    async handleChangeAskListPageSize(size) {
      this.ParamsAskList.pageSize = size;
      this.Collect.data = (await getProductList(this.ParamsAskList)).data.data;
    },
    // ========
    // 文本搜索
    // =======
    async handleSearch() {
      this.Params = Object.assign({}, this.Params, {
        categorys: null,
        publishStatuss: null,
        pageNo: 1,
        productNo: this.Params.productNo.trim()
      });
      this.Filter = {
        categorys: '',
        publishStatuss: ''
      };
      this.productList = (await getProductList(this.Params)).data.data;
    },
    // ===========
    // 裁剪
    // ===========
    // // 隐藏上传file控件
    handleUpload() {
      this.$refs.input.click();
    },
    uploadImg(e) {
      var file = this.$refs.input.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = () => {
          var url = reader.result;
          this.Cropper.show = true;
          this.Pic.url = url;
        };
        reader.readAsDataURL(file);
      } else {
        this.$toast('出错');
      }
    },
    // 裁剪---选择分类的时候
    async handleLookProduct(item) {
      await this.$store.dispatch('getSearchEncoded', {
        companyId: this.userInfo.companyId,
        category: item.category,
        encoded: item.encoded,
        searchType: Number(`${this.userInfo.userType}10`)
      });
    },
    // 裁剪---开始搜索结果
    handleGetResult(val) {
      this.ParamsSearchImg.id = val;
      this.$router.push({
        path: '/search/image',
        query: {
          imgId: val,
          type: 'edit'
        }
      });
    },
    // 全选
    handleChooseAll(event) {
      this.chooseItem = event.target.checked ? this.productList.list.map(item => item.id) : [];
    },
    // =============
    // 打开花型询价记录
    // ==============
    async handleCollect(item) {
      this.Collect.show = !this.Collect.show;
      if (this.Collect.show) {
        this.Collect.productItem = item;
        this.Collect.data = (await getAskListByProductId({
          productId: item.id,
          pageSize: this.ParamsAskList.pageSize,
          pageNo: this.ParamsAskList.pageNo
        })).data.data;
      }
    },
    // ================
    // 条件搜索
    // ================
    // 添加“分类”条件搜索
    async handleFilterPublishStatus(e) {
      this.Params = Object.assign({}, this.Params, {
        publishStatuss: e,
        pageNo: 1
      });
      this.productList = (await getProductList(this.Params)).data.data;
    },
    // 添加“面料”条件搜索
    async handleFilterCategorys(e) {
      this.Params = Object.assign({}, this.Params, {
        categorys: !e ? null : [this.Filter.categorys].map(item => parseInt(item)),
        pageNo: 1
      });
      this.productList = (await getProductList(this.Params)).data.data;
    },
    // 处理接口处理
    // type=shelve : 花型上下架
    // goal	上下架到哪	number	上架：1--店铺 2--平台 下架：0--仓库 1--店铺
    // ids	id串	string	逗号隔开
    // isUp	上架类型	boolean	true--上架 false--下架（默认）
    async handleShelveProduct(params) {
      await shelveProduct({
        goal: params.goal,
        ids: [params.ids].join(','),
        isUp: params.isUp
      });
      this.checkAll = false;
      this.chooseItem = [];
      // 重新花型列表接口
      this.productList = (await getProductList(this.Params)).data.data;
    },
    // 点击“删除”=>判断cookie是否显示
    handleShowDialog(item) {
      this.ConfirmDialog.id = item;
      if (this.cookie.get(this.Cookie.key) === '1') {
        this.ConfirmDialog.show = true;
      } else {
        this.handleDelProduct();
      }
    },
    // 取消删除
    handleCancelDelProduct() {
      this.ConfirmDialog.show = false;
      this.cookie.set(this.Cookie.key, this.Cookie.value, {
        end: this.Cookie.day
      });
    },
    // 删除花型
    async handleDelProduct() {
      await deleteProduct({
        ids: this.ConfirmDialog.id.join(',')
      });
      this.ConfirmDialog.show = false;
      this.chooseItem = [];
      this.productList = (await getProductList(this.Params)).data.data;
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
@component-namespace warehouse{
  @component filter{
    margin-bottom: 24px;
  }
  @component footer{
    display: flex;
    align-items: center;
    @modifier button{
      button{
        margin-right:32px;
      }
    }
    @modifier pagation{
      flex:1;
      text-align: right;
    }
  }
  @component table{
    @modifier link{
      display: block;
      text-align: center;
    }
    @modifier collect{
      cursor: pointer;
      color:#4C93FD;
      &:hover{
        color:blue;
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
      padding: 10px 0;
      .ts-image{
        margin:0 10px 0 20px;
        position: relative;
      }
    }
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
  @component photo{
    @modifier search{
      margin:0 20px;
      min-width: 40px;
    }
  }
}
</style>
