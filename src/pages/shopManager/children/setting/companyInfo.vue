<template lang="html">
  <ts-section pageTitle="企业信息">
    <div slot="menu">
      <ts-button type="primary" @click="editCompany">{{Text.show?'':''}}</ts-button>
    </div>
    <ts-form :model="companyInfoForm" :rules="rules" ref="companyInfoForm" label-width="125px" label-position="left" class="companyInfo-container">
      <div class="companyInfo-container-col">
        <ts-form-item label="商家id:">
          <p class="companyInfo-formItem-text">{{companyInfoForm.companyExtendBO.companyId}}</p>
        </ts-form-item>
        <ts-form-item label="公司名称：" prop="companyName">
          <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.companyName}}</p>
          <ts-input v-else v-model="companyInfoForm.companyName" style="width:250px"></ts-input>
        </ts-form-item>
        <ts-form-item label="座机电话：" prop="contactTel">
          <p class="companyInfo-formItem-text" v-if="Text.show">{{companyInfoForm.contactTel}}</p>
          <ts-input v-else v-model="companyInfoForm.contactTel" style="width:250px"></ts-input>
        </ts-form-item>
        <ts-form-item label="店铺头像：" prop="companyHeadIcon">
          <ts-image width="200" height="200" v-model="companyInfoForm.companyHeadIcon" type="local"></ts-image>
          <label class="companyInfo-upload--button" v-if="!Text.show">
            <ts-button type="primary">修改店铺头像</ts-button>
            <!-- <aliUpload id="uploadCompanyHeadIcon" @doUpload="uploadImg"></aliUpload> -->
          </label>
        </ts-form-item>
      </div>
      <div class="companyInfo-container-col">
        <ts-form-item label="账户号码：" prop="phone">
          <p  class="companyInfo-formItem-text">{{companyInfoForm.phone}}</p>
        </ts-form-item>
        <ts-form-item label="公司简称：" prop="companyAbbreviation">
          <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.companyAbbreviation}}</p>
          <ts-input v-else v-model="companyInfoForm.companyAbbreviation" style="width:250px"></ts-input>
        </ts-form-item>
        <ts-form-item label="传真号码：" prop="fax">
          <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.fax}}</p>
          <ts-input v-else v-model="companyInfoForm.fax" style="width:250px"></ts-input>
        </ts-form-item>
        <ts-form-item label="店招：" prop="companyBanner">
          <ts-image v-model="companyInfoForm.companyBanner" width="224" height="112"></ts-image>
          <label class="companyInfo-upload--button" v-if="!Text.show">
            <ts-button type="primary">修改店招</ts-button>
            <!-- <aliUpload id="upload" @doUpload="uploadImg"></aliUpload> -->
          </label>
        </ts-form-item>
      </div>
      <ts-form-item label="厂家风采：" prop="productPicUrl">
        <ts-image width="120" height="120" class="companyInfo-img" :value="i" v-for="i in companyInfoForm.companyPic"></ts-image>
        <label class="companyInfo-upload--button is-block" v-if="!Text.show">
          <ts-button type="primary">修改厂家风采</ts-button>
          <!-- <aliUpload id="upload" @doUpload="uploadImg"></aliUpload> -->
        </label>
      </ts-form-item>
    </ts-form>
  </ts-section>
</template>

<script>
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      showConfirm: false,
      // 表格
      companyInfoForm: {
        companyBanner: '',
        fax: '',
        companyAbbreviation: '',
        phone: '',
        contactTel: '',
        companyName: ''
      },
      // 是否显示文字
      Text: {
        show: true
      },
      // 验证规则
      rules: {}
    };
  },
  computed: {
    ...mapGetters(['companyInfo'])
  },
  methods: {
    editCompany() {
      this.Text.show = !this.Text.show;
    }
  },
  created() {
    this.companyInfoForm = this.companyInfo;
  }
};
</script>


<style lang="css" scoped>
@component-namespace companyInfo{
  @component img{
    margin-right: 16px;
    margin-bottom: 16px;
  }
  @component upload{
    @modifier button{
      vertical-align: 12px;
      @when block{
        display: block;
      }
    }
  }
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
