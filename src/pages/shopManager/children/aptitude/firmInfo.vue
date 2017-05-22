<template>
<ts-section pageTitle="企业详细信息">
  <div slot="menu">
    <ts-button type="primary" @click="editCompany('companyInfoForm')">{{Text.show?'编辑':'保存'}}</ts-button>
  </div>
  <ts-form :model="companyInfoForm" :rules="rules" ref="companyInfoForm" label-width="125px" label-position="left" class="companyInfo-container">
    <div class="companyInfo-container-col">
      <ts-form-item label="注册资本：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.registeredMoney | filterDict(DICT.RegisteredMoney)}}</p>
        <ts-select v-else style="width:250px" data-key-name="label" data-val-name="dicValue" placeholder="选择单位" :options='DICT.RegisteredMoney' v-model="companyInfoForm.registeredMoney"></ts-select>
      </ts-form-item>
      <ts-form-item label="企业类型：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.canpanyType | filterDict(DICT.CompanyType)}}</p>
        <ts-select style="width:250px" data-key-name="label" data-val-name="dicValue" placeholder="选择单位" :options='DICT.CompanyType' v-model="companyInfoForm.canpanyType" v-else></ts-select>
      </ts-form-item>
      <ts-form-item label="员工数量：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.nop | filterDict(DICT.Nop)}}</p>
        <ts-select v-else style="width:250px" data-key-name="label" data-val-name="dicValue" placeholder="选择单位" :options='DICT.Nop' v-model="companyInfoForm.nop"></ts-select>
      </ts-form-item>
      <ts-form-item label="年营业额：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.turnover | filterDict(DICT.Turnover)}}</p>
        <ts-select style="width:250px" data-key-name="label" data-val-name="dicValue" placeholder="选择单位" :options='DICT.Turnover' v-model="companyInfoForm.turnover" v-else></ts-select>
      </ts-form-item>
      <ts-form-item label="主要市场：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.mainMarket}}</p>
        <ts-input v-else v-model="companyInfoForm.mainMarket" :maxlength="20" style="width:250px"></ts-input>
      </ts-form-item>
      <ts-form-item label="设备类型：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.machineType}}</p>
        <ts-input v-else v-model="companyInfoForm.machineType" :maxlength="20" style="width:250px"></ts-input>
      </ts-form-item>
    </div>
    <div class="companyInfo-container-col">
      <ts-form-item label="成立时间：">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.createDate | filterDate('date')}}</p>
        <ts-input v-else inputType="date" v-model="createDate" style="width:250px"></ts-input>
      </ts-form-item>
      <ts-form-item label="经营模式：" prop="businessModel">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.businessModel}}</p>
        <ts-input v-else v-model="companyInfoForm.businessModel" :maxlength="20" style="width:250px"></ts-input>
      </ts-form-item>
      <ts-form-item label="主要客户：" prop="mainClient">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.mainClient}}</p>
        <ts-input v-else v-model="companyInfoForm.mainClient" :maxlength='20' style="width:250px"></ts-input>
      </ts-form-item>
      <ts-form-item label="厂房面积：" prop="plant">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.plant?companyInfoForm.plant+'㎡':''}}</p>
        <ts-input v-else v-model="companyInfoForm.plant" style="width:250px">
          <span slot="append" style="padding:0 10px">㎡</span>
        </ts-input>
      </ts-form-item>
      <ts-form-item label="设备数量：" prop="machineNum">
        <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.machineNum | filterDict(DICT.MachineNum)}}</p>
        <ts-select style="width:250px" data-key-name="label" data-val-name="dicValue" placeholder="选择单位" :options='DICT.MachineNum' v-model="companyInfoForm.machineNum" v-else></ts-select>
      </ts-form-item>
    </div>
  </ts-form>
</ts-section>
</template>

<script>
import DICT from '@/common/dict';
import 'date-input-polyfill';
import {
  mapGetters,
  mapActions
} from 'vuex';
import {
  updateCompanyExtend
} from '@/common/api/api';
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
        canpanyType: '',
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
      rules: {
        plant: {
          message: '厂房面积只能是数字',
          pattern: /^[+]?\d*[.]?\d{0,2}$/
        },
        createDate: {
          message: '请输入正确的成立时间',
          type: 'date'
        }
      }
    };
  },
  methods: {
    ...mapActions(['getCompanyInfo']),
    editCompany(formName) {
      if (!this.Text.show) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            let res = await updateCompanyExtend(this.companyInfoForm);
            this.Text.show = !res.data.code;
          }
        });
      } else {
        this.Text.show = !this.Text.show;
      }
    }
  },
  async created() {
    await this.getCompanyInfo();
    this.companyInfoForm = this.companyInfo.companyExtendBO;
  },
  watch: {
    // createDate(value) {
    //   console.log(value);
    //   // 转成时间戳
    //   // this.companyInfoForm.createDate = new Date(value).getTime();
    // }
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
