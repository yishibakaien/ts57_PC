<template>
<ts-section pageTitle="企业详细信息">
  <div slot="menu">
    <ts-button type="primary">编辑</ts-button>
  </div>
  <section>
    <div class="firmInfo-container">
      <div class="firmInfo-container-left">
        注册资本：
      </div>
      <div class="firmInfo-container-right">
        <ts-select style="width:50%" data-key-name="label" data-val-name="value" placeholder="选择单位" :options='DICT.InititalMoney' v-model="Firm.inititalMoney"></ts-select>
      </div>
      <div class="firmInfo-container-left">
        成立时间：
      </div>
      <div class="firmInfo-container-right">
        2016/10/28
      </div>
      <div class="firmInfo-container-left">
        企业类型：
      </div>
      <div class="firmInfo-container-right">
        <ts-select style="width:50%" data-key-name="label" data-val-name="value" placeholder="选择单位" :options='DICT.FirmType' v-model="Firm.firmType"></ts-select>
      </div>
      <div class="firmInfo-container-left">
        经营模式：
      </div>
      <div class="firmInfo-container-right">
        自主研发及生产
      </div>
      <div class="firmInfo-container-left">
        员工数量：
      </div>
      <div class="firmInfo-container-right">
        <ts-select style="width:50%" data-key-name="label" data-val-name="value" placeholder="选择单位" :options='DICT.FirmPersonArr' v-model="Firm.firmPersonArr"></ts-select>
      </div>
      <div class="firmInfo-container-left">
        主要客户：
      </div>
      <div class="firmInfo-container-right">
        服装渠道批发商
      </div>
      <div class="firmInfo-container-left">
        年营业额：
      </div>
      <div class="firmInfo-container-right">
        服装渠道批发商
      </div>
      <div class="firmInfo-container-left">
        厂房面积：
      </div>
      <div class="firmInfo-container-right">
        1000平方
      </div>
      <div class="firmInfo-container-left">
        主要市场：
      </div>
      <div class="firmInfo-container-right">
        珠三角
      </div>
      <div class="firmInfo-container-left">
        设备数量：
      </div>
      <div class="firmInfo-container-right">
        <ts-select style="width:50%" data-key-name="label" data-val-name="value" placeholder="选择单位" :options='DICT.MachineNum' v-model="Firm.machineNum"></ts-select>
      </div>
      <div class="firmInfo-container-left">
        设备类型：
      </div>
      <div class="firmInfo-container-right">
        压纱板、电脑机
      </div>
    </div>
  </section>
</ts-section>
</template>

<script>
import DICT from '../../dict.js';
export default {
  data() {
    return {
      Firm: {
        inititalMoney: '',
        firmType: '',
        firmPersonArr: '',
        machineNum: ''
      },
      // 数据字典
      DICT: {
        InititalMoney: DICT.InititalMoney,
        FirmType: DICT.FirmType,
        FirmPersonArr: DICT.FirmPersonArr,
        MachineNum: DICT.MachineNum,
        TotalMoney: DICT.TotalMoney
      }
    };
  }
};
</script>

<style lang="css" scoped>
@component-namespace firmInfo{
  @component container{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      @descendent left{
        flex-basis:10%;
        margin-bottom: 20px;
      }
      @descendent right{
        flex-basis:40%;
        margin-bottom: 20px;
      }
  }
}
</style>
