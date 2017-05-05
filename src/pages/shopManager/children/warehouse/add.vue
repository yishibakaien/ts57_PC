<template lang="html">
  <ts-section>
    <ts-form :model="addPatternForm" :rules="rules"  ref="addPatternForm" label-width="125px" label-position="left">
      <ts-form-item label="花型编号：" prop="productNo">
        <ts-input v-model="addPatternForm.productNo" style="width:320px"></ts-input>
        <!-- TODO：雨嘉说隐藏 -->
        <!-- <ts-button type="text">点击自动生成编号</ts-button> -->
      </ts-form-item>
      <ts-form-item label="花型分类：" prop="category">
        <ts-radio-group bordered v-model="addPatternForm.category">
          <ts-radio :label="item.value" v-for="item in DICT.PatternClassfication" :key="item.value">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-form-item>
      <!-- TODO:花型成分 -->
      <ts-form-item label="大货类型：" prop="supplyShape">
        <ts-radio-group bordered v-model="addPatternForm.supplyShape">
          <ts-radio origin :label="item.value" :key="item.value" v-for="item in DICT.BulkType">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-form-item>
    <ts-form-item label="库存：" prop="isStock">
      <ts-radio-group v-model="addPatternForm.isStock">
        <ts-radio :label="item.value" :key="item.value" v-for="item in DICT.isStock" type="origin">{{item.label}}</ts-radio>
      </ts-radio-group>
    </ts-form-item>
      <ts-form-item label="上架至：" prop="publishStatus">
        <ts-radio-group bordered v-model="addPatternForm.publishStatus">
          <ts-radio :label="item.value" :key="item.value" v-for="item in DICT.PublishStatus">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-form-item>
      <ts-form-item label="花型图片：" prop="picsUrl">
        <ts-button type="text">添加图片</ts-button>
      </ts-form-item>
    <p class="list-title">选填内容</p>
    <ts-form-item label="价格：" prop="price">
      <ts-input v-model="addPatternForm.price" style="width:320px"></ts-input>
      <ts-select style="width:12%" data-key-name="label" data-val-name="value" placeholder="选择单位" :options='DICT.Units' v-model="addPatternForm.stockUnit" ></ts-select>
    </ts-form-item>
    <ts-form-item label="幅宽：" prop="width">
      <ts-input v-model="addPatternForm.width" style="width:320px" placeholder="请输入幅宽"></ts-input>
    </ts-form-item>
    <ts-form-item label="花高：" prop="height">
      <ts-input v-model="addPatternForm.height" style="width:320px" placeholder="请输入花高"></ts-input>
    </ts-form-item>
    <ts-form-item label="出码率：" prop="outRate">
      <ts-input v-model="addPatternForm.outRate" style="width:320px" placeholder="请输入出码率"></ts-input>
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
      // 数据字典
      DICT: {
        BulkType: DICT.BulkType,
        Units: DICT.Units,
        PatternClassfication: DICT.PatternClassfication,
        PublishStatus: DICT.PublishStatus,
        isStock: DICT.isStock
      },
      rules: {
        price: [{
          pattern: /^[-+]?\d*[.]?\d{0,9}$/,
          message: '请输入正确的价格',
          trigger: 'blur'
        }],
        productNo: [{
          pattern: /^[0-9a-zA-Z]*$/,
          required: true,
          message: '请输入正确的花型编号',
          trigger: 'blur'
        }],
        category: [{
          required: true,
          message: '请至少选择一个花型分类',
          trigger: 'change'
        }],
        publishStatus: [{
          required: true,
          message: '请至少选择一个上架情况',
          trigger: 'change'
        }],
        isStock: [{
          required: true,
          message: '请选择库存情况',
          trigger: 'change'
        }],
        supplyShape: [{
          required: true,
          message: '请至少选择一个大货类型',
          trigger: 'change'
        }],
        width: [{
          pattern: /^[-+]?\d*[.]?\d{0,9}$/,
          message: '请输入正确的幅宽',
          trigger: 'blur'
        }],
        height: [{
          pattern: /^[-+]?\d*[.]?\d{0,9}$/,
          message: '请输入正确的花高',
          trigger: 'blur'
        }],
        picsUrl: [{
          required: true,
          message: '请上传一张花型图片',
          trigger: 'change'
        }],
        outRate: [{
          pattern: /^[-+]?\d*[.]?\d{0,9}$/,
          message: '请输入正确的出码率',
          trigger: 'blur'
        }]
      },
      addPatternForm: {
        category: '',
        height: '',
        ingredient: '',
        isStock: '',
        outRate: '',
        picsUrl: '',
        price: '',
        priceUnit: '',
        productNo: '',
        publishStatus: '',
        stock: '',
        stockUnit: '',
        width: '',
        supplyShape: ''
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
/*选填内容的标题样式*/
.list-title {
    height: 56px;
    line-height: 56px;
    background: #F8F8F8;
    color: #666666;
    margin: 40px 0;
    padding-left: 10px;
}
/*底部按钮*/
.bottom-button-margin {
    margin-right: 24px;
}
/*库存的单选按钮*/
.add-radio {
    margin-top: 10px;
    display: inline-block;
    & + label {
        margin-left: 20px;
    }
}
</style>
