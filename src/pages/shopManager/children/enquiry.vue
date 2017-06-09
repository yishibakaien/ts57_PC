<template lang="html">
  <div class="enquiry">
    <ts-section>
      <div slot="menu">
        <ts-input style="width:40%" placeholder="输入手机号码/姓名/花型编号查询" v-model="Params.keywords">
          <ts-button slot="append" size="small" @click="handleSearch"><i class="icon-sousuo"></i></ts-button>
        </ts-input>
      </div>
        <ts-table :data="EnquiryList.list">
        <ts-column slot data-key="picUrl"  align="center" image name="花型图片">
        </ts-column>
        <ts-column slot data-key="userName" width="120px"  align="center" name="询价人"></ts-column>
        <ts-column slot data-key="USERATYPE" width="100px" align="center" name="身份"></ts-column>
        <ts-column slot data-key="PURCHASETYPE" align="center" name="采购类型"></ts-column>
        <ts-column slot data-key="PURCHASENUM"  align="center" name="采购数量"></ts-column>
        <ts-column slot data-key="phone"  align="center" name="联系电话" width="130px"></ts-column>
        <ts-column slot data-key="DATE"  align="center" name="询价时间"></ts-column>
        <ts-column slot  align="center"  name="操作" action="[{'text':'查看花型','func':'hanleVisitProduct'},{'text':'询价人信息','func':'showenquiryInfo'}]"></ts-column>
      </ts-table>
      <div slot="footer" class="enquiry-footer">
        一共{{EnquiryList.totalNum}}条询价
        <ts-pagination
        class="enquiry-footer--pagation"
        @change="handleChangeCurrent"
        @page-size-change="handleChangePageSize"
        :current="EnquiryList.pageNO"
        :total="EnquiryList.totalPage">
        </ts-pagination>
      </div>
    </ts-section>
    <!-- 对话框 -->
    <ts-dialog v-model="showPersonInfo" :titleNeedCenter="false" title="询价人信息" confirmText="访问店铺" @confirm="hanleVisitStore">
        <div class="enquiry-dialog-row">
          <div class="left">账户号码：</div>
          <div class="right">{{enquiryEskUser.phone}}</div>
          <div class="left">姓名：</div>
          <div class="right">{{enquiryEskUser.userName}}</div>
          <div class="left">公司名称：</div>
          <div class="right">{{enquiryEskUser.companyName}}</div>
          <div class="left">企业类型：</div>
          <div class="right">{{enquiryEskUser.companyType|filterDict(DICT.userType)}}</div>
          <div class="left">详细地址：</div>
          <div class="right">{{enquiryEskUser.address}}</div>
          <div class="left"></div>
          <div class="right"></div>
        </div>
        <div slot="footer">
          <div class="enquiry-dialog-footer">
            <ts-button type="primary" @click="handleGotoStore(enquiryEskUser)">访问店铺</ts-button>
          </div>
        </div>
    </ts-dialog>
  </div>
</template>

<script>
import {
  getEnquiryList,
  enquiryEskUser
} from '@/common/api/api';
import {
  mapGetters
} from 'vuex';
import DICT from '@/common/dict/';
export default {
  data() {
    return {
      DICT: {
        userType: DICT.userType
      },
      // 请求参数
      Params: {
        keywords: '',
        pageNo: 1,
        pageSize: 10
      },
      // 询价人信息
      enquiryEskUser: {},
      // list
      EnquiryList: {},
      showPersonInfo: false
    };
  },
  async created() {
    this.EnquiryList = (await (getEnquiryList(this.Params))).data.data;
  },
  watch: {
    // 加工数据
    // TODO：table支持slot的时候就不这样写
    EnquiryList: {
      handler(val) {
        if (val.list) {
          val.list.forEach(item => {
            item.DATE = this.filterDate(item.createDate, 'date');
            item.UNITS = this.filterDict(item.unit, this.dicTree.PRODUCT_UNIT, 'name');
            item.PURCHASENUM = `${item.purchaseNum} ${item.UNITS}`;
            item.PURCHASETYPE = this.filterDict(item.purchaseType, DICT.purchaseType);
            item.USERATYPE = this.filterDict(item.userType, DICT.userType);
          });
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['dicTree'])
  },
  methods: {
    handleGotoStore(item) {
      this.goto(`/shop/${item.companyId}`);
    },
    // 搜索
    async handleSearch() {
      this.Params = Object.assign({}, this.Params, {
        pageNo: 1
      });
      this.EnquiryList = (await (getEnquiryList(this.Params))).data.data;
    },
    // 显示询价人信息
    async showenquiryInfo(item) {
      this.showPersonInfo = true;
      this.enquiryEskUser = (await enquiryEskUser({
        id: item.id
      })).data.data;
    },
    // 查看花型
    hanleVisitProduct(item) {
      this.goto(`/product/${item.productId}`);
    },
    // ======
    // 分页处理
    async handleChangeCurrent(current) {
      this.Params.pageNo = current;
      this.EnquiryList = (await getEnquiryList(this.Params)).data.data;
    },
    async handleChangePageSize(size) {
      this.Params.pageSize = size;
      this.EnquiryList = (await getEnquiryList(this.Params)).data.data;
    }
    // =========
  }
};
</script>

<style lang="css" scoped>
@component-namespace enquiry{
  @component footer{
    display: flex;
    align-items: center;
    @modifier pagation{
      flex:1;
      text-align: right;
    }
  }
  @component dialog{
    @descendent row{
      display: flex;
      flex-wrap: wrap;
      .left{
        flex:15%;
        margin-bottom: 20px;
      }
      .right{
        flex:35%;
      }
    }
    @descendent footer{
      margin: 4px 0;
    }
  }
}

</style>
