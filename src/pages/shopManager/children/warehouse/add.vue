<template lang="html">
  <ts-section>
    <ts-form :model="addPatternForm" :rules="rules" ref="addPatternForm" label-width="125px" label-position="left">
      <ts-form-item label="花型编号：" prop="number">
        <ts-input v-model="addPatternForm.number" style="width:320px"></ts-input>
        <ts-button type="text">点击自动生成编号</ts-button>
      </ts-form-item>
      <ts-form-item label="花型分类：" prop="sort">
        <ts-radio-group bordered v-model="addPatternForm.sort">
          <ts-radio :label="item.value" v-for="item in DICT.PatternClassfication">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-form-item>
      <ts-form-item label="大货类型：">
        <ts-radio-group bordered v-model="addPatternForm.ingredient">
          <ts-radio origin :label="item.value" v-for="item in DICT.BulkType">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-form-item>
      <ts-form-item label="库存：">
      </ts-form-item>
      <ts-form-item label="上架至：">
        <ts-radio-group bordered v-model="addPatternForm.ingredient">
          <ts-radio :label="item.value" v-for="item in DICT.PatternTo">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-form-item>
      <ts-form-item label="花型图片：">
        <ts-button type="text">添加图片</ts-button>
      </ts-form-item>
    <p class="list-title">选填内容</p>
    <ts-form-item label="价格：" prop="price">
      <ts-input v-model="addPatternForm.price" style="width:320px"></ts-input>
      <ts-select style="width:12%" label="label" placeholder="选择单位" :options='DICT.units' @change="chooseUnit" v-model="unit"></ts-select>
    </ts-form-item>
    <ts-form-item label="幅宽：" prop="price">
      <ts-input v-model="addPatternForm.price" style="width:320px" placeholder="请输入幅宽"></ts-input>
    </ts-form-item>
    <ts-form-item label="花高：" prop="price">
      <ts-input v-model="addPatternForm.price" style="width:320px" placeholder="请输入花高"></ts-input>
    </ts-form-item>
    <ts-form-item label="出码率：" prop="price">
      <ts-input v-model="addPatternForm.price" style="width:320px" placeholder="请输入出码率"></ts-input>
    </ts-form-item>
    <ts-button type="primary" class="bottom-button-margin" @click="submitForm('addPatternForm')">新增</ts-button>
      <ts-button type="cancel" @click="submitForm('addPatternForm')">取消</ts-button>
    </ts-form>
  </ts-section>
</template>

<script>
import DICT from '../../dict.js';
export default {
  data() {
    return {
      unit: '2',
      // 数据字典
      DICT: {
        BulkType: DICT.BulkType,
        units: DICT.Units,
        PatternClassfication: DICT.PatternClassfication,
        PatternTo: DICT.PatternTo
      },
      addPatternForm: {
        number: '',
        sort: ''
      },
      rules: {
        number: [{
          type: 'string',
          message: '请选择正确的花型编号',
          trigger: 'blur'
        }],
        sort: [{
          type: 'array',
          message: '请选择花型分类',
          trigger: 'change'
        }]
      }
    };
  },
  methods: {
    chooseUnit() {}
  }
};
</script>

<style lang="css" scoped>
.list-title{
  height: 56px;
  line-height: 56px;
  background: #F8F8F8;
  color:#666666;
  margin: 40px 0;
  padding-left: 10px;
}
.bottom-button-margin{
  margin-right: 24px;
}
</style>
