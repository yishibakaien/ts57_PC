<template>
<div class="cooperation">
  <ts-section>
    <div slot="menu">
      <ts-input style="width:30%" placeholder="输入厂家名称">
        <span slot="append">
          O
        </span>
      </ts-input>
      <ts-button type="primary" @click="">新增</ts-button>
    </div>
    <div slot="footer">
      <!-- FIXME:暂时TABLE无法完成全选 -->
      <!-- <ts-button type="cancel">删除</ts-button> -->
    </div>
    <ts-table :data="Cooperation.list">
      <ts-column slot data-key="person" align="center" name="厂家名称"></ts-column>
      <ts-column slot data-key="type" align="center" name="联系电话"></ts-column>
      <ts-column slot data-key="num" align="center" name="仓库中该厂家花型数量"></ts-column>
      <ts-column slot align="center" name="操作" action="[{'text':'修改','func':'handleEditCompany'},{'text':'删除','func':'handleDelCompany'}]"></ts-column>
    </ts-table>
  </ts-section>
  <!-- 对话框 -->
  <ts-dialog v-model="showEditDialog" :title="修改厂家信息">
    <ts-form :model="companyInfoForm" :rules="rules" ref="ruleForm" label-width="125px" label-position="left">
      <ts-form-item label="厂家名称" prop="name">
        <ts-input v-model="ruleForm.name"></ts-input>
      </ts-form-item>
      <ts-form-item label="联系电话" prop="name">
        <ts-input v-model="ruleForm.name"></ts-input>
      </ts-form-item>
      <ts-form-item label="花型数量">
        <ts-input v-model="ruleForm.age"></ts-input>
      </ts-form-item>
      <ts-button @click="submitForm('ruleForm')">你好</ts-button>
    </ts-form>
  </ts-dialog>
  <ts-dialog v-model="showDelDialog" title="提示" :confirmText="删除" @confirm="handleDel">
    <span></span>
  </ts-dialog>
  <ts-dialog v-model="ConfirmDialog.show" width="30%" title="提示" @confirm="handleDelCoor" @cancel="handleCancelDelCoor" class="warehouse-dialog">
    <p class="warehouse-dialog--title">确认删除该合作厂家信息？</p>
    <p>
      <ts-radio @change.native="handleNoShowDialog" type="origin" v-model="ConfirmDialog.noShowDialog" label="0"><span class="warehouse-dialog--tip">不再提示<i>(删除后厂家信息将无法恢)</i></span></ts-radio>
    </p>
  </ts-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      showEditDialog: false,
      showDelDialog: false,
      // 规则
      rules: {},
      // 新增厂家的对话框
      AddDialog: {
        show: false
      },
      // 表格
      companyInfoForm: {},
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
    !this.getCookie(this.Cookie.key) ? this.setCookie(this.Cookie.key, this.Cookie.value, this.Cookie.day) : '';
  },
  methods: {
    handleThCoorClick() {},
    handleTrCoorClick() {},
    handleEditCompany() {},
    handleDelCompany() {},
    handleDelCoor() {},
    handleCancelDelCoor() {},
    handleNoShowDialog() {}
  }
};
</script>

<style lang="css">
</style>
