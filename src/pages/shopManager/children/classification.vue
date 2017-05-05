<template>
<div class="classification">
  <ts-section>
    <div slot="menu">
      <ts-button type="primary" @click="Classification.newDialog=true">新增分类</ts-button>
      <ts-button type="plain" @click="Classification.editDialog=true">编辑分类</ts-button>
    </div>
    <div slot="footer">
      <ts-button type="primary">从本类移出</ts-button>
    </div>
    <!-- 过滤器 -->
    <div class="classification-filter">
      <ts-filter title="分类">
        <ts-radio-group v-model="Filter.sort" @change="hanleFilterSort">
          <!-- <ts-radio label="上海">上海</ts-radio> -->
        </ts-radio-group>
      </ts-filter>
      <ts-filter title="面料种类">
        <ts-radio-group v-model="Filter.fabricType" @change="hanleFilterFabricType">
          <ts-radio label="0">全部</ts-radio>
        </ts-radio-group>
      </ts-filter>
    </div>
    <div class="classification-showName">
      <span>分类名称：</span>
    </div>
  </ts-section>
  <!-- 新增分类 -->
  <ts-dialog v-model="Classification.newDialog" title="新增分类" @confirm="handleNew" @close="closeNew" width="30%">
    <ts-input v-model="Classification.newOne" placeholder="请输入分类名称，限定8个字以内" :maxlength="8"></ts-input>
  </ts-dialog>
  <!-- 编辑分类 -->
  <ts-dialog v-model="Classification.editDialog" class="classification-edit-dialog" title="编辑分类" @close="closeEdit" @confirm="handleEdit" width="30%">
    <div class="classification-edit-dialog--item onepx-b">
      <ts-input style="width:230px"></ts-input>
      <i>上</i>
      <i>下</i>
      <i>删</i>
    </div>
    <div class="classification-edit-dialog--item onepx-b">
      <ts-input style="width:230px"></ts-input>
      <i>上</i>
      <i>下</i>
      <i>删</i>
    </div>
  </ts-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      Classification: {
        // 分类名称
        newOne: '',
        // 编辑分类对话框的值
        editDialog: false,
        // 编辑分类对话框的值
        newDialog: false
      },
      Filter: {
        fabricType: '',
        sort: ''
      }
    };
  },
  methods: {
    // 关闭对话框
    closeDialog(model) {
      this.Classification[model] = false;
      if (model === 'newDialog') {
        this.Classification.newOne = '';
      }
    },
    closeEdit() {
      this.closeDialog('editDialog');
    },
    closeNew() {
      this.closeDialog('newDialog');
    },
    handleNew() {
      this.closeDialog('newDialog');
    },
    handleEdit() {
      this.closeDialog('editDialog');
    },
    hanleFilterSort() {},
    hanleFilterFabricType() {}
  }
};
</script>

<style lang="css" scoped>
@component-namespace classification{
  @component showName{
    margin: 15px 0 20px 0;
    color:#666666;
  }
  @component edit-dialog{
    @modifier item{
      padding:16px 0;
      i{
        margin-left:14px;
        cursor: pointer;
        transition: .5s;
        &:hover{
          color:#4C93FD;
        }
      }
    }
  }
}
</style>
