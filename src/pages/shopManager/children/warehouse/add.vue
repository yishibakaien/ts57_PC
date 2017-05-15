<template lang="html">
  <ts-section :pageTitle="title">
    <pre>{{addPatternForm}}</pre>
    <ts-form :model="addPatternForm" :rules="rules"  ref="addPatternForm" label-width="125px" label-position="left" >
      <ts-form-item label="花型编号：" prop="productNo">
        <ts-input v-model="addPatternForm.productNo" style="width:320px" placeholder="请输入花型编号"></ts-input>
        <!-- TODO：雨嘉说隐藏 -->
        <!-- <ts-button type="text">点击自动生成编号</ts-button> -->
      </ts-form-item>
      <ts-form-item label="花型分类：" prop="category">
        <ts-radio-group bordered v-model="addPatternForm.category">
          <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.label">{{item.name}}</ts-radio>
        </ts-radio-group>
      </ts-form-item>
      <ts-form-item label="花型成分：" prop="ingredient">
        <ts-radio-group bordered v-model="addPatternForm.ingredient">
          <!-- 原有的成分 -->
          <!-- 成分类型ingredientType为1才可以修改／删除 -->
          <div class="add-radio" :key="item.id" v-for="item in ingredientList">
            <ts-radio :label="item.ingredientName" :key="item.id">
              <span
                :contenteditable="item.ingredientType=== 1"
                @keydown="handleInputIngredient(item,$event)">
              {{item.ingredientName}}
              </span>
            </ts-radio>
            <i class="add-radio-close" @click.self="handleDelIngredient(item)" v-if="item.ingredientType=== 1">&times</i>
          </div>
          <!-- 新增的成分 -->
          <!-- v-clickoutside="handleEditIngredient" -->
          <div class="add-radio">
          <ts-radio :label="item.ingredientName" :key="item.ingredientName" v-for="(item,index) in newIngredients">
            <span
              contenteditable="plaintext-only"
              @keydown="handleInputIngredient(item,$event)">
            {{item.ingredientName}}
            </span>
            <i class="add-radio-close" @click.self="handleDelIngredient(item)">&times</i>
          </ts-radio>
          </div>
          <ts-input :validateEvent="false" placeholder="自定义成分" @keyup.enter.native="handleAddIngredient" class="add-input"></ts-input>
        </ts-radio-group>
      </ts-form-item>
      <ts-form-item label="大货类型：" prop="productShape">
        <ts-radio-group bordered v-model="addPatternForm.productShape">
          <ts-radio origin :label="item.dicValue" :key="item.value" v-for="item in dicTree.PRODUCT_SHAPE">{{item.name}}</ts-radio>
        </ts-radio-group>
      </ts-form-item>
    <ts-form-item label="库存：" prop="isStock" class="add-dynamic">
      <ts-radio-group v-model="addPatternForm.isStock" class="add-dynamic--radioGroup">
        <ts-radio :label="item.dicValue" :key="item.dicValue" v-for="item in dicTree.PRODUCT_UNIT" type="origin">{{item.name}}</ts-radio>
      </ts-radio-group>
      <ts-form-item prop="stock" labelWidth="0" v-if="addPatternForm.isStock===1" class="add-dynamic--input">
          <ts-input v-model="addPatternForm.stock" style="width:150px" placeholder="请输入库存数量"></ts-input>
          <ts-select style="width:20%" data-key-name="name" data-val-name="dicValue" placeholder="选择单位" :options='dicTree.PRODUCT_UNIT' v-model="addPatternForm.stockUnit"></ts-select>
      </ts-form-item>
    </ts-form-item>
      <ts-form-item label="上架至：" prop="publishStatus">
        <ts-radio-group bordered v-model="addPatternForm.publishStatus">
          <ts-radio :label="item.dicValue" :key="item.dicValue" v-for="item in DICT.PublishStatus">{{item.label}}</ts-radio>
        </ts-radio-group>
      </ts-form-item>
      <ts-form-item label="花型图片：" prop="picsUrl">
        <ts-image width="200" height="200" :src="addPatternForm.picsUrl" type="local" v-show="Pic.show"></ts-image>
          <label class="add-upload-button">
            {{Pic.text}}
            <ts-aliupload id="addPic" @doUpload="uploadImg"></ts-aliupload>
          </label>
      </ts-form-item>
    <p class="add-list-title">选填内容</p>
    <ts-form-item label="价格：" prop="price">
      <ts-input v-model="addPatternForm.price" style="width:320px" placeholder="请输入单价"></ts-input>
      <ts-select style="width:12%" data-key-name="name" data-val-name="dicValue" placeholder="选择单位" :options='dicTree.dicValue' v-model="addPatternForm.priceUnit" ></ts-select>
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
    </ts-form>
    <ts-button type="primary" class="add-bottom-button" @click="submitForm('addPatternForm')">{{title}}</ts-button>
    <ts-button type="cancel" @click="$router.go(-1)">取消</ts-button>
  </ts-section>
</template>

<script>
import {
  addProducts,
  getProduct,
  getIngredientsList,
  updateIngredient,
  updateProduct,
  addIngredient,
  deleteIngredient
} from '@/common/api/api';
import DICT from '@/common/dict';
import Emitter from '@/common/js/mixins/emitter';
import Clickoutside from '@/common/js/clickoutside';
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      // 数据字典
      DICT: {
        SupplyShapes: DICT.SupplyShapes,
        PriceUnits: DICT.PriceUnits,
        StockUnits: DICT.StockUnits,
        SupplyType: DICT.SupplyType,
        PublishStatus: DICT.PublishStatus,
        isStock: DICT.isStock
      },
      rules: {
        price: [{
          pattern: /^[-+]?\d*[.]?\d{0,9}$/,
          message: '请输入正确的价格'
        }],
        productNo: [{
          required: true,
          message: '请输入正确的花型编号'
        }],
        category: [{
          required: true,
          message: '请至少选择一个花型分类'
        }],
        ingredient: [{
          required: true,
          message: '请至少选择一个花型成分'
        }],
        publishStatus: [{
          required: true,
          message: '请至少选择一个上架情况'
        }],
        isStock: [{
          required: true,
          message: '请选择库存情况'
        }],
        productShape: [{
          required: true,
          message: '请至少选择一个大货类型'
        }],
        width: [{
          pattern: /^[-+]?\d*[.]?\d{0,9}$/,
          message: '请输入正确的幅宽'
        }],
        stock: [{
          pattern: /^[-+]?\d*[.]?\d{0,9}$/,
          message: '请输入正确的库存数量',
          required: true
        }],
        height: [{
          pattern: /^[-+]?\d*[.]?\d{0,9}$/,
          message: '请输入正确的花高'
        }],
        picsUrl: [{
          required: true,
          message: '请上传一张花型图片',
          trigger: 'change'
        }],
        outRate: [{
          pattern: /^[-+]?\d*[.]?\d{0,9}$/,
          message: '请输入正确的出码率'
        }]
      },
      Pic: {
        show: false,
        text: '添加图片'
      },
      ingredientList: [],
      newIngredients: [],
      // 表单
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
        productShape: ''
      }
    };
  },
  directives: {
    Clickoutside
  },
  watch: {
    'addPatternForm.picsUrl' (val) {
      this.Pic.text = val ? '修改图片' : '添加图片';
      this.Pic.show = !!val;
    }
  },
  computed: {
    ...mapGetters(['dicTree']),
    title() {
      return this.$route.query.id ? '修改花型' : '新增花型';
    }
  },
  mixins: [Emitter],
  methods: {
    async handleInputIngredient(item, event) {
      // enter就提交
      if (event.which === 13) {
        event.preventDefault();
        let res = await updateIngredient({
          id: item.id,
          ingredientName: event.target.innerText
        });
        // 最多8个字 => 如果报错就会恢复之前的名字
        if (res.data.code === 1004001) {
          event.target.innerHTML = item.ingredientName;
        }
        return;
      }
    },
    handleEditIngredient(e) {
      console.log(e);
    },
    async handleDelIngredient(item) {
      let ingredientIndex = this.ingredientList.findIndex(i => i.id === item.id);
      this.ingredientList.splice(ingredientIndex, 1);
      await deleteIngredient({
        ids: item.id.toString()
      });
    },
    // 上传图片
    uploadImg(e) {
      // 放到表单
      this.addPatternForm.picsUrl = e.ossUrl[e.ossUrl.length - 1];
    },
    // Enter健新增自定义成分
    async handleAddIngredient(e) {
      let value = e.target.value;
      let newIngredientsIndex = this.newIngredients.findIndex(item => item.ingredientName === value);
      let oldIngredientsIndex = this.ingredientList.findIndex(item => item.ingredientName === value);
      this.newIngredients.push({
        ingredientName: value
      });
      // 如果重复了不准新增
      if (newIngredientsIndex === -1 && oldIngredientsIndex === -1) {
        this.addPatternForm.ingredient = e.target.value;
      }
      // 提交后台
      await addIngredient({
        ingredientName: value
      });
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.$route.query.id ? await updateProduct(this.addPatternForm) : await addProducts(this.addPatternForm);
          await this.$router.go(-1);
        } else {
          return false;
        }
      });
    }
  },
  async created() {
    this.ingredientList = (await getIngredientsList()).data.data;
    // 默认会选中第一个值
    this.addPatternForm = Object.assign({}, this.addPatternForm, {
      stockUnit: DICT.StockUnits[2].dicValue,
      priceUnit: DICT.PriceUnits[2].dicValue
    });
    // 编辑页面
    if (this.$route.query.id) {
      let data = await getProduct(this.$route.query.id);
      this.addPatternForm = data.data.data;
    }
    // // 从素材库进来
    if (this.$route.query.url) {
      this.addPatternForm.picsUrl = this.$route.query.url;
    }
  }
};
</script>

<style scoped>
:root {
  --add-radio-close-color: white;
  --add-radio-close-bg: red;
  --add-radio-close-hover-bg: #bc0303;
  --add-radio-close-size: 16px;
}

@component-namespace add {
  @component input {
    width: 15%;
    display: inline-block;
  }
  @component dynamic {
    @modifier input {
      display: inline-block;
      width: 50%;
      margin: 0 0 0 10px;
    }
    @modifier radioGroup {
      display: inline-block;
    }
  }
  @component list-title {
    height: 56px;
    line-height: 56px;
    background: #F8F8F8;
    color: #666666;
    margin: 40px 0;
    padding-left: 10px;
  }
  @component radio {
    display: inline-block;
    position: relative;
    margin-top: 10px;
    &+label {
      margin-left: 20px;
    }
    @descendent close {
      position: absolute -8px * * -8px;
      border-radius: 50%;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
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
  @component bottom {
    @descendent button {
      margin-right: 24px;
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
}
</style>
