<template lang="html">
  <div class="enquiry">
    <ts-section>
      <div slot="menu">
      </div>
        <ts-table :data="data" @th-col-click="thColClick" @body-tr-click="trClick">
          <ts-column slot data-key="img"  align="center" image name="花型图片">
          </ts-column>
        <ts-column slot data-key="person"  align="center" name="询价人"></ts-column>
        <ts-column slot data-key="iden" width="90px" align="center" name="身份"></ts-column>
        <ts-column slot data-key="type"  align="center" name="采购类型"></ts-column>
        <ts-column slot data-key="num"  align="center" name="采购数量"></ts-column>
        <ts-column slot data-key="tel"  align="center" name="联系电话" width="130px"></ts-column>
        <ts-column slot data-key="time"  align="center" name="询价时间"></ts-column>
        <ts-column slot  align="center"  name="操作" action="[{'text':'查看花型','func':'view'},{'text':'询价人信息','func':'showenquiryInfo'}]"></ts-column>
      </ts-table>
      <div slot="footer">
        一共
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
export default {
  data() {
    return {
      showPersonInfo: false,
      data: [{
        id: 1,
        img: 'http://avatar.csdn.net/E/4/6/1_wangxiaohu__.jpg',
        person: '张三',
        iden: '厂家',
        type: '建扬',
        num: '1000码',
        tel: '1988900',
        time: '2017-03-32'
      }, {
        id: 1,
        img: 'http://avatar.csdn.net/E/4/6/1_wangxiaohu__.jpg',
        person: '张四',
        iden: '厂家',
        type: '建扬',
        num: '1000码',
        tel: '1988900',
        time: '2017-03-32'
      }]
    };
  },
  methods: {
    showenquiryInfo(data) {
      this.showPersonInfo = true;
    },
    hanleVisitStore() {},
    choose(item) {
      console.log(item);
    },
    view(data) {
      console.log(data);
    },
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
