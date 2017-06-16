<template>
<div class="cooperation">
  <ts-section>
    <div slot="menu">
      <ts-input style="width:30%" v-model="Params.collCompanyName" placeholder="输入厂家名称">
        <ts-button slot="append" size="small" @click="handleSearch"><i class="icon-sousuo"></i></ts-button>
      </ts-input>
      <ts-button type="primary" @click="handleShowEditDialog">新增</ts-button>
    </div>
    <!-- FIXME:暂时TABLE无法完成全选 -->
    <!-- <ts-button type="cancel">删除</ts-button> -->
    <div slot="footer" class="cooperation-footer">
      一共{{Cooperation.totalNum}}个厂家
      <ts-pagination class="cooperation-footer--pagation" @change="handleChangeCurrent" @page-size-change="handleChangePageSize" :current="Cooperation.pageNO" :total="Cooperation.totalPage">
      </ts-pagination>
    </div>
    <ts-table :data="Cooperation.list">
      <ts-column slot data-key="collCompanyName" align="center" name="厂家名称"></ts-column>
      <ts-column slot data-key="contactTel" align="center" name="联系电话"></ts-column>
      <ts-column slot data-key="productNum" align="center" name="仓库中该厂家花型数量"></ts-column>
      <ts-column slot align="center" name="操作" action="[{'text':'修改','func':'handleShowEditDialog'},{'text':'删除','func':'handleShowDialog'}]"></ts-column>
    </ts-table>
  </ts-section>
  <!-- 对话框：修改厂家信息 -->
  <ts-dialog v-model="Dialog.edit" title="修改厂家信息" @close="handleCancelCompany" @confirm="handleEditCompanyInfo('companyInfoForm')" @cancel="handleCancelCompany">
    <ts-form :model="companyInfoForm" :rules="rules" ref="companyInfoForm" label-width="125px" label-position="left">
      <ts-form-item label="厂家名称" prop="collCompanyName">
        <ts-input v-model="companyInfoForm.collCompanyName"></ts-input>
      </ts-form-item>
      <ts-form-item label="联系电话" prop="contactTel">
        <ts-input v-model="companyInfoForm.contactTel"></ts-input>
      </ts-form-item>
      <ts-form-item label="花型数量" prop="productNum">
        <ts-input v-model="companyInfoForm.productNum"></ts-input>
      </ts-form-item>
    </ts-form>
  </ts-dialog>
  <!-- 提示 -->
  <ts-dialog v-model="ConfirmDialog.show" width="30%" title="提示" @confirm="handleDelCoor" @cancel="handleCancelDelCoor" class="cooperation-dialog">
    <p class="cooperation-dialog--title">确认删除该合作厂家信息？</p>
    <p>
      <ts-radio @change.native="handleNoShowDialog" type="origin" v-model="ConfirmDialog.noShowDialog" label="0"><span class="cooperation-dialog--tip">不再提示<i>(删除后厂家信息将无法恢复)</i></span></ts-radio>
    </p>
  </ts-dialog>
</div>
</template>

<script>
import {
  deleteCollaborateCompany,
  addCollaborateCompany,
  getCollaborateCompanysList,
  getCollaborateCompany,
  updateCollaborateCompany
} from '@/common/api/api';
export default {
  data() {
    return {
      Params: {
        collCompanyName: '',
        pageNo: 1,
        pageSize: 10
      },
      // 各种对话框
      Dialog: {
        isAddtype: true,
        edit: false,
        delete: false
      },
      // List
      Cooperation: {},
      // 规则
      rules: {
        collCompanyName: [{
          required: true,
          trigger: 'blur',
          message: '请输入合作厂家名称'
        }],
        contactTel: [{
          required: true,
          pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
          trigger: 'blur',
          message: '请输入正确的联系电话'
        }],
        productNum: [{
          pattern: /^[0-9]*[1-9][0-9]*$/,
          trigger: 'blur',
          message: '请输入正确的花型数量'
        }]
      },
      // 表格
      companyInfoForm: {
        collCompanyName: '',
        contactTel: '',
        productNum: ''
      },
      // 对话框
      ConfirmDialog: {
        noShowDialog: false,
        show: false,
        id: []
      },
      // cookie
      Cookie: {
        key: 'showDelCoorDialog',
        value: 1,
        day: 7
      }
    };
  },
  async created() {
    // 设置cookie
    !this.cookie.get(this.Cookie.key) ? this.cookie.set(this.Cookie.key, this.Cookie.value, this.Cookie.day, '/') : '';
    // 获取花型列表
    this.Cooperation = (await getCollaborateCompanysList(this.Params)).data.data;
  },
  methods: {
    // 分页处理
    // =========
    async handleChangeCurrent(current) {
      this.Params.pageNo = current;
      this.Cooperation = (await getCollaborateCompanysList(this.Params)).data.data;
    },
    async handleChangePageSize(size) {
      this.Params.pageSize = size;
      this.Cooperation = (await getCollaborateCompanysList(this.Params)).data.data;
    },
    // ==========
    // 显示新增合作厂家的对话框
    async handleShowEditDialog(item) {
      this.Dialog.isAddtype = !item.id;
      this.Dialog.edit = !this.Dialog.edit;
      if (item.id) {
        this.companyInfoForm = (await getCollaborateCompany(item.id)).data.data;
      }
    },
    //  确认新增合作厂家
    handleEditCompanyInfo(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let res = this.Dialog.isAddtype ? await addCollaborateCompany(this.companyInfoForm) : await updateCollaborateCompany({
            collCompanyName: this.companyInfoForm.collCompanyName,
            contactTel: this.companyInfoForm.contactTel,
            id: this.companyInfoForm.id,
            productNum: this.companyInfoForm.productNum
          });
          if (!res.data.code) {
            this.Dialog.edit = false;
          }
          // 获取花型列表
          this.Cooperation = (await getCollaborateCompanysList(this.Params)).data.data;
        } else {
          return false;
        }
      });
    },
    // 取消编辑
    handleCancelCompany() {
      this.Dialog.edit = false;
      // 清空
      this.companyInfoForm = {
        collCompanyName: '',
        contactTel: '',
        productNum: ''
      };
    },
    // 文本搜索
    async handleSearch() {
      this.Params = Object.assign({}, this.Params, {
        pageNo: 1
      });
      this.Cooperation = (await getCollaborateCompanysList(this.Params)).data.data;
    },
    // 点击“删除”=>判断cookie是否显示
    handleShowDialog(item) {
      this.ConfirmDialog.id = item;
      if (this.cookie.get(this.Cookie.key) === '1') {
        this.ConfirmDialog.show = true;
      } else {
        this.handleDelCoor();
      }
    },
    // 取消删除合作厂家
    handleCancelDelCoor() {
      this.ConfirmDialog.show = false;
      this.cookie.set(this.Cookie.key, this.Cookie.value, this.Cookie.day, '/');
    },
    // 删除合作厂家
    async handleDelCoor() {
      await deleteCollaborateCompany({
        ids: this.ConfirmDialog.id.id
      });
      this.Cooperation = (await getCollaborateCompanysList(this.Params)).data.data;
      this.ConfirmDialog.show = false;
    },
    // 设置cookie
    handleNoShowDialog(e) {
      this.cookie.set(this.Cookie.key, e, this.Cookie.day, '/');
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace cooperation{
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
  @component footer{
    display: flex;
    align-items: center;
    @modifier pagation{
      flex:1;
      text-align: right;
    }
  }
}
</style>
