<template>
<ts-form :model="addSupplyForm" :rules="rules" ref="addSupplyForm" label-width="125px" label-position="left">
  <ts-form-item label="花型分类：" prop="category">
    <ts-radio-group bordered v-model="addSupplyForm.category">
      <ts-radio :label="item.value" v-for="item in DICT.PatternClassfication" :key="item.value">{{item.label}}</ts-radio>
    </ts-radio-group>
  </ts-form-item>
  <ts-form-item label="大货类型：" prop="supplyShapes">
    <ts-radio-group bordered v-model="addSupplyForm.supplyShapes">
      <ts-radio origin :label="item.value" :key="item.value" v-for="item in DICT.BulkType">{{item.label}}</ts-radio>
    </ts-radio-group>
  </ts-form-item>
  <ts-form-item label="供应数量：" prop="supplyNum">
    <ts-input v-model="addSupplyForm.supplyNum" style="width:320px"></ts-input>
    <ts-select style="width:12%" data-key-name="label" data-val-name="value"  :options='DICT.Units' v-model="addSupplyForm.stockUnit"></ts-select>
  </ts-form-item>
  <ts-form-item label="花型图片：" prop="picsUrl">
    <ts-image width="200" height="200" :src="Pic.src" v-show='Pic.show'></ts-image>
    <label class="add-upload-button">
          {{Pic.text}}
          <aliUpload id="addPic" @doUpload="uploadImg"></aliUpload>
        </label>
    <span class="add-upload-button" @click="Pic.src=''" v-show='Pic.show'>删除图片</span>
  </ts-form-item>
  <ts-form-item label="供应数量：" prop="productNo">
    <ts-input type="textarea" v-model="addSupplyForm.supplyDesc" placeholder="请输入供应说明"></ts-input>
  </ts-form-item>
</ts-form>
</template>

<script>
import DICT from '../../dict.js';
export default {
  data() {
    return {
      // 数据字典
      DICT: {
        BulkType: DICT.BulkType,
        Units: DICT.Units,
        PatternClassfication: DICT.PatternClassfication,
        PublishStatus: DICT.PublishStatus,
        isStock: DICT.isStock
      },
      addPatternForm: {

      }
    };
  }
};
</script>

<style lang="css" scoped>
/*添加图片按钮*/
@component-namespace add {
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
}
</style>
