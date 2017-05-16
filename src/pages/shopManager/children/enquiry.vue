<template lang="html">
  <div class="enquiry">
    <ts-section>
      <div slot="menu">
        <ts-input style="width:40%" placeholder="输入手机号码/姓名/花型编号查询" v-model="Params.keywords">
          <ts-button slot="append" size="small" @click="handleSearch">O</ts-button>
        </ts-input>
      </div>
        <ts-table :data="EnquiryList.list" @th-col-click="thColClick" @body-tr-click="trClick">
        <ts-column slot data-key="picUrl"  align="center" image name="花型图片">
        </ts-column>
        <ts-column slot data-key="userName"  align="center" name="询价人"></ts-column>
        <ts-column slot data-key="userType" width="90px" align="center" name="身份"></ts-column>
        <ts-column slot data-key="purchaseType"  align="center" name="采购类型"></ts-column>
        <ts-column slot data-key="purchaseNum"  align="center" name="采购数量"></ts-column>
        <ts-column slot data-key="phone"  align="center" name="联系电话" width="130px"></ts-column>
        <ts-column slot data-key="createDate"  align="center" name="询价时间"></ts-column>
        <ts-column slot  align="center"  name="操作" action="[{'text':'查看花型','func':'view'},{'text':'询价人信息','func':'showenquiryInfo'}]"></ts-column>
      </ts-table>
      <div slot="footer">
        一共{{EnquiryList.totalNum}}条询价
      </div>
    </ts-section>
    <!-- 对话框 -->
    <ts-dialog v-model="showPersonInfo" :titleNeedCenter="false" title="询价人信息" confirmText="访问店铺" @confirm="hanleVisitStore">
        <div class="enquiry-dialog-row">
          <div class="left">账户号码：</div>
          <div class="right">13719220901</div>
          <div class="left">姓名：</div>
          <div class="right">谭华美</div>
          <div class="left">公司名称：</div>
          <div class="right">福建坐视布管蕾丝有限公司</div>
          <div class="left">企业类型：</div>
          <div class="right">档口</div>
          <div class="left">负责人：</div>
          <div class="right">档口口</div>
          <div class="left">联系电话：</div>
          <div class="right">13765678768</div>
          <div class="left">详细地址：</div>
          <div class="right">  广东-广州-海珠区 中大纺织城</div>
          <div class="left"></div>
          <div class="right"></div>
        </div>
        <div slot="footer">
          <ts-button type="primary">访问店铺</ts-button>
        </div>
    </ts-dialog>
  </div>
</template>

<script>
import {
  getEnquiryList
} from '@/common/api/api';
export default {
  data() {
    return {
      // 请求参数
      Params: {
        keywords: '',
        pageNo: 1,
        pageSize: 10
      },
      // list
      EnquiryList: [],
      showPersonInfo: false
    };
  },
  async created() {
    this.EnquiryList = (await (getEnquiryList(this.Params))).data.data;
  },
  methods: {
    // 搜索
    async handleSearch() {
      this.EnquiryList = (await (getEnquiryList(this.Params))).data.data;
    },
    // 显示询价人信息
    showenquiryInfo(data) {
      this.showPersonInfo = true;
    },
    // 访问店铺
    hanleVisitStore() {},
    thColClick(row) {
      console.log(row);
    },
    trClick(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="css" scoped>
.enquiry-dialog-row{
  display: flex;
  flex-wrap: wrap;
}
.left{
  flex:15%;
  margin-bottom: 20px;
}
.right{
  flex:35%;
}
</style>
