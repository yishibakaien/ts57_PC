<template lang="html">
  <ts-section pageTitle="企业信息">
    <div slot="menu">
      <ts-button type="primary" @click="editCompany('companyInfoForm')">{{Text.show?'编辑':'保存'}}</ts-button>
    </div>
    <ts-form :model="companyInfoForm" :rules="rules" ref="companyInfoForm" label-width="125px" label-position="left" class="companyInfo-container">
      <div class="companyInfo-container-col">
        <ts-form-item label="公司名称：" prop="companyName">
          <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.companyName}}</p>
          <ts-input v-else :maxlength="15" v-model="companyInfoForm.companyName" style="width:250px"></ts-input>
        </ts-form-item>
        <ts-form-item label="公司简称：" prop="companyAbbreviation">
          <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.companyAbbreviation}}</p>
          <ts-input v-else v-model="companyInfoForm.companyAbbreviation" :maxlength="8" style="width:250px"></ts-input>
        </ts-form-item>

        <ts-form-item label="公司主营：" prop="companyBusiness">
          <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.companyExtendBO.companyBusiness}}</p>
          <ts-input v-else :maxlength="50" v-model="companyInfoForm.companyExtendBO.companyBusiness" style="width:250px"></ts-input>
        </ts-form-item>
        <ts-form-item label="网店头像：" prop="companyHeadIcon">
          <ts-image width="90" height="90" :src="companyInfoForm.companyHeadIcon"></ts-image>
            <label class="companyInfo-upload-button" v-if="!Text.show">
              {{Pic.avatar.text}}
              <ts-aliupload fileType="1" :id="Pic.avatar.id" @doUpload="uploadAvatar"></ts-aliupload>
            </label>
        </ts-form-item>
      </div>
      <div class="companyInfo-container-col">
        <ts-form-item label="账户号码：" prop="phone">
          <p  class="companyInfo-formItem-text">{{companyInfoForm.phone}}</p>
        </ts-form-item>
        <ts-form-item label="座机电话：" prop="contactTel">
          <p class="companyInfo-formItem-text" v-if="Text.show">{{companyInfoForm.contactTel}}</p>
          <ts-input v-else :maxlength="20" v-model="companyInfoForm.contactTel" style="width:250px"></ts-input>
        </ts-form-item>
        <ts-form-item label="传真号码：" prop="fax">
          <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.fax}}</p>
          <ts-input v-else v-model="companyInfoForm.fax" :maxlength="20" style="width:250px"></ts-input>
        </ts-form-item>
        <ts-form-item label="店招：" prop="companyBanner">
          <ts-image width="224" height="112" :src="companyInfoForm.companyBanner"></ts-image>
            <label class="companyInfo-upload-button" v-if="!Text.show">
              {{Pic.banner.text}}
              <ts-aliupload fileType="1" :id="Pic.banner.id" @doUpload="uploadBanner"></ts-aliupload>
            </label>
        </ts-form-item>
      </div>
      <div style="width:90%">
        <ts-form-item label="公司简介：" prop="companyProfile">
          <p v-if="Text.show" class="companyInfo-formItem-text">{{companyInfoForm.companyProfile}}</p>
          <ts-input v-else type="textarea" :rows="2" :maxlength='50' v-model="companyInfoForm.companyProfile" placeholder="请输入公司简介（最多50个字）"></ts-input>
        </ts-form-item>
      </div>
      <ts-form-item label="厂家风采：" prop="productPicUrl" style="width:100%">
        <div class="companyInfo-views-container" v-for="(item,index) in companyInfoForm.presence" :key="item">
          <ts-image width="120" height="120" class="companyInfo-views-img" :src="item.picUrl"></ts-image>
          <i class="companyInfo-views-close" @click.self="handleDelViews(item,index)" v-if="!Text.show">&times</i>
        </div>
        <label class="companyInfo-upload-button companyInfo-plus-img" v-if="!Text.show&&companyInfoForm.presence.length<9">
          <!-- {{Pic.banner.text}} -->
          <ts-aliupload fileType="2" :id="Pic.views.id" @doUpload="uploadViews"></ts-aliupload>
        </label>
      </ts-form-item>
    </ts-form>
  </ts-section>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import {
  ALI_DOMAIN
} from '@/common/dict/const';
import {
  updateCompany
} from '@/common/api/api';
export default {
  data() {
    return {
      showConfirm: false,
      // 表格
      companyInfoForm: {
        companyBanner: '',
        fax: '',
        companyExtendBO: {
          companyBusiness: ''
        },
        companyAbbreviation: '',
        phone: '',
        presence: [],
        companyHeadIcon: '',
        contactTel: '',
        companyName: ''
      },
      // 删除厂家风采
      Close: {
        show: false
      },
      // 是否显示文字
      Text: {
        show: true
      },
      // 上传图片
      Pic: {
        avatar: {
          text: '添加头像',
          id: 'avatar',
          show: false
        },
        banner: {
          text: '添加店招',
          id: 'banner',
          show: false
        },
        views: {
          text: '添加厂家风采',
          id: 'views',
          show: false
        }
      },
      // 验证规则
      rules: {
        companyName: [{
          min: 2,
          max: 15,
          message: '公司名称的长度在 2 到 15 个字符'
        }],
        companyBusiness: [{
          min: 2,
          max: 50,
          message: '公司主营的长度在 2 到 15 个字符'
        }],
        companyProfile: [{
          min: 2,
          max: 50,
          message: '公司简介的长度在 2 到 50 个字符'
        }],
        companyAbbreviation: [{
          min: 2,
          max: 8,
          message: '公司简称的长度在 2 到 15 个字符'
        }],
        contactTel: [{
          message: '请输入正确的座机号码',
          pattern: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/
        }],
        fax: [{
          message: '请输入正确的传真号码',
          pattern: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/
        }]
      }
    };
  },
  computed: {
    ...mapGetters(['companyInfo'])
  },
  methods: {
    async editCompany(formName) {
      if (!this.Text.show) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            let res = await updateCompany(this.companyInfoForm);
            if (!res.data.code) {
              await this.$store.dispatch('getCompanyInfo');
              this.Text.show = !res.data.code;
            }
          }
        });
      } else {
        this.Text.show = !this.Text.show;
      }
    },
    // 上传图片
    uploadAvatar(e) {
      this.companyInfoForm.companyHeadIcon = ALI_DOMAIN + e.ossUrl[e.ossUrl.length - 1];
    },
    // 上传店招
    uploadBanner(e) {
      this.companyInfoForm.companyBanner = ALI_DOMAIN + e.ossUrl[e.ossUrl.length - 1];
    },
    // 上传厂家风采
    uploadViews(e) {
      this.companyInfoForm.presence.push({
        picUrl: ALI_DOMAIN + e.ossUrl[e.ossUrl.length - 1],
        picName: e.ossUrl[e.ossUrl.length - 1]
      });
    },
    // 删除厂家风采图片
    handleDelViews(item, index) {
      this.$messagebox.confirm('确定删除该图片吗？').then(action => {
        this.companyInfoForm.presence.splice(index, 1);
      });
    }
  },
  watch: {
    companyInfo(val) {
      this.companyInfoForm = Object.assign({}, val);
    },
    // 店招变化时候
    'companyInfoForm.companyHeadIcon' (val) {
      this.Pic.avatar.text = val ? '修改头像' : '添加头像';
      this.Pic.avatar.show = !!val;
    },
    // 店招变化时候
    'companyInfoForm.companyBanner' (val) {
      this.Pic.banner.text = val ? '修改店招' : '添加店招';
      this.Pic.banner.show = !!val;
    },
    // 风采时候
    'companyInfoForm.presence' (val) {
      this.Pic.views.text = val ? '修改风采' : '添加风采';
      this.Pic.views.show = !!val;
    }
  }
};
</script>


<style lang="css" scoped>
:root {
  --add-radio-close-color: white;
  --add-radio-close-bg: red;
  --add-radio-close-hover-bg: #bc0303;
  --add-radio-close-size: 16px;
}
@component-namespace companyInfo{
  @component views{
    @descendent container{
      display: inline-block;
      margin: 0 16px 16px 0;
      position: relative;
    }
    @descendent close{
      position: absolute -6px * * -6px;
      border-radius: 50%;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      line-height: 1;
      background: var(--add-radio-close-bg);
      color: var(--add-radio-close-color);
      size: var(--add-radio-close-size) var(--add-radio-close-size);
      transition: .3s;
      z-index: 1;
      &:hover {
        background: var(--add-radio-close-hover-bg);
      }
    }
  }
  @component upload{
    @modifier button{
      vertical-align: 12px;
      position: relative;
      @when block{
        display: block;
      }
    }
  }
  @component formItem{
    @descendent text{
      padding-top: 6px;
    }
  }
  @component container{
    display: flex;
    flex-wrap: wrap;
    @descendent col{
      flex:1;
    }
  }
  @component upload {
    @descendent button {
      color: #4C93FD;
      height: 38px;
      line-height: 38px;
      cursor: pointer;
      transition: .5s;
      position: relative;
      &:hover {
        color: #105bca;
      }
    }
  }
  @component plus-img{
    display: inline-block;
    size:120px 120px;
    margin-left: -3px;
    border: 1px solid rgba(155,155,155,0.2);
    position: relative;
    font-size: 100px;
    font-weight: 100;
    box-sizing: border-box;
    cursor: pointer;
    transition: .5s;
    vertical-align: middle;
    color: rgba(155,155,155,0.8);
    &:hover{
      color:rgba(155,155,155,1);
    }
    &:after{
      position:absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-60%);
      content:"+";
    }
  }
}
</style>
