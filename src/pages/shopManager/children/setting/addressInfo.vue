<template lang="html">
  <ts-section pageTitle="地址信息">
    <div slot="menu">
      <ts-button type="primary" @click="editAddress">编辑</ts-button>
    </div>
    <ts-form>
      <ts-form-item label="城市：" prop="companyAbbreviation">
        <!-- :options='' -->
        <ts-select style="width:20%" data-key-name="label" data-val-name="value" placeholder="选择省份"  v-model="addPatternForm.stockUnit"></ts-select>
        <ts-select style="width:20%" data-key-name="label" data-val-name="value" placeholder="选择城市"  v-model="addPatternForm.stockUnit"></ts-select>
      </ts-form-item>
      <ts-form-item label="详细地址：" prop="companyAbbreviation">
        <ts-input v-model="companyInfoForm.companyAbbreviation" style="width:250px"></ts-input>
      </ts-form-item>
      <ts-form-item label="地图坐标：" prop="companyAbbreviation">
        <ts-input v-model="companyInfoForm.companyAbbreviation" style="width:250px"></ts-input>
      </ts-form-item>
    </ts-form>
  </ts-section>
</template>

<script>
import {
  mapGetters
} from 'vuex';
export default {
  computed: {
    ...mapGetters(['companyInfo'])
  },
  data() {
    return {
      addPatternForm: {}
    };
  },
  methods: {
    editAddress() {}
  }
};
</script>

<style lang="css" scoped>
@import '../../../../common/css/common/flex.css';
</style>
