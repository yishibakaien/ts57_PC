<template>
<div class="cooperation">
  <ts-section>
    <div slot="menu">
      <ts-input style="width:30%" placeholder="输入厂家名称">
        <span slot="append">
          O
        </span>
      </ts-input>
      <ts-button type="primary">新增</ts-button>
    </div>
    <div slot="footer">
      <!-- FIXME:暂时TABLE无法完成全选 -->
      <!-- <ts-button type="cancel">删除</ts-button> -->
    </div>
    <ts-table :data="data" @th-col-click="thColClick" @body-tr-click="trClick">
      <ts-column slot data-key="person" align="center" name="厂家名称"></ts-column>
      <ts-column slot data-key="type" align="center" name="联系电话"></ts-column>
      <ts-column slot data-key="num" align="center" name="仓库中该厂家花型数量"></ts-column>
      <ts-column slot align="center" name="操作" action="[{'text':'修改','func':'editCompany'},{'text':'删除','func':'delCompany'}]"></ts-column>
    </ts-table>
  </ts-section>
  <!-- 对话框 -->
  <ts-dialog v-model="showEditDialog" title="修改厂家信息">
    <ts-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" label-position="left">
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
    <span>确认删除该合作厂家信息？</span>
  </ts-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      showEditDialog: false
    };
  }
};
</script>

<style lang="css">
</style>
