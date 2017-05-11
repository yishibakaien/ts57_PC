<template>
<ts-section pageTitle="企业详细信息">
  <div slot="menu">
    <ts-button type="primary" @click="editCompany">编辑</ts-button>
  </div>
  <ts-form :model="companyInfoForm" :rules="rules" ref="companyInfoForm" label-width="125px" label-position="left" class="companyInfo-container">
    <div class="companyInfo-container-col">
      <ts-form-item label="注册资本：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.registeredMoney}}</p>
        <ts-select v-else style="width:250px" data-key-name="label" data-val-name="value" placeholder="选择单位" :options='DICT.RegisteredMoney' v-model="companyInfoForm.registeredMoney"></ts-select>
      </ts-form-item>
      <ts-form-item label="企业类型：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.companyType}}</p>
        <ts-select style="width:250px" data-key-name="label" data-val-name="value" placeholder="选择单位" :options='DICT.CompanyType' v-model="companyInfoForm.companyType" v-else></ts-select>
      </ts-form-item>
      <ts-form-item label="员工数量：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.nop}}</p>
        <ts-select v-else style="width:250px" data-key-name="label" data-val-name="value" placeholder="选择单位" :options='DICT.Nop' v-model="companyInfoForm.nop"></ts-select>
      </ts-form-item>
      <ts-form-item label="年营业额：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.turnover}}</p>
        <ts-select style="width:250px" data-key-name="label" data-val-name="value" placeholder="选择单位" :options='DICT.Turnover' v-model="companyInfoForm.turnover" v-else></ts-select>
      </ts-form-item>
      <ts-form-item label="主要市场：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.mainMarket}}</p>
        <ts-input v-else v-model="companyInfoForm.mainMarket" style="width:250px"></ts-input>
      </ts-form-item>
      <ts-form-item label="设备类型：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.machineType}}</p>
        <ts-input v-else v-model="companyInfoForm.machineType" style="width:250px"></ts-input>
      </ts-form-item>
    </div>
    <div class="companyInfo-container-col">
      <ts-form-item label="成立时间：" prop="createDate">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.createDate}}</p>
        <ts-input v-else inputType="date" v-model="createDate" style="width:250px"></ts-input>
      </ts-form-item>
      <ts-form-item label="经营模式：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.businessModel}}</p>
        <ts-input v-else v-model="companyInfoForm.businessModel" style="width:250px"></ts-input>
      </ts-form-item>
      <ts-form-item label="主要客户：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.mainClient}}</p>
        <ts-input v-else v-model="companyInfoForm.mainClient" style="width:250px"></ts-input>
      </ts-form-item>
      <ts-form-item label="厂房面积：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.plant}}</p>
        <ts-input v-else v-model="companyInfoForm.plant" style="width:250px"></ts-input>
      </ts-form-item>
      <ts-form-item label="设备数量：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{CompanyExtendBO.machineNum}}</p>
        <ts-select style="width:250px" data-key-name="label" data-val-name="value" placeholder="选择单位" :options='DICT.MachineNum' v-model="companyInfoForm.machineNum" v-else></ts-select>
      </ts-form-item>
    </div>
  </ts-form>
</ts-section>
</template>

<script>
import DICT from '@/common/dict';
import {
  mapGetters,
  mapActions
} from 'vuex';
export default {
  data() {
    return {
      DICT: {
        Nop: DICT.Nop,
        MachineNum: DICT.MachineNum,
        RegisteredMoney: DICT.RegisteredMoney,
        Turnover: DICT.Turnover,
        CompanyType: DICT.CompanyType
      },
      // 是否显示文字
      Text: {
        show: true
      },
      // 时间
      createDate: '',
      // 深拷贝之后的企业详细信息数据
      CompanyExtendBO: {},
      // 表单
      companyInfoForm: {
        registeredMoney: '',
        companyType: '',
        nop: '',
        turnover: '',
        mainMarket: '',
        machineType: '',
        createDate: '',
        businessModel: '',
        mainClient: '',
        machineNum: '',
        plant: ''
      },
      rules: {}
    };
  },
  methods: {
    ...mapActions(['getCompanyInfo']),
    editCompany() {
      this.Text.show = !this.Text.show;
    }
  },
  async created() {
    await this.getCompanyInfo();
    this.companyInfoForm = Object.assign({}, this.CompanyExtendBO);
  },
  watch: {
    // companyExtendBO的数据要深拷贝获取
    companyInfo: {
      handler(val) {
        this.CompanyExtendBO = JSON.parse(JSON.stringify(val.companyExtendBO));
      },
      deep: true
    },
    CompanyExtendBO: {
      handler(val) {
        for (let i in val) {
          if (val[i] === '') {
            val[i] = '无';
          }
        }
      },
      deep: true
    },
    createDate(value) {
      // 转成时间戳
      this.companyInfoForm.createDate = new Date(value).getTime();
    }
  },
  computed: {
    ...mapGetters(['companyInfo'])
  }
};
</script>

<style lang="css" scoped>
@component-namespace companyInfo{
  @component formItem{
    @descendent text{
      padding-top: 10px;
    }
  }
  @component container{
    display: flex;
    flex-wrap: wrap;
    @descendent col{
      flex:1;
    }
  }
}

</style>
