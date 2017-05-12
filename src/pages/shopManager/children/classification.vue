<template>
<div class="classification">
  <ts-section>
    <div slot="menu">
      <ts-button type="primary" @click="Classification.newDialog=true">新增分类</ts-button>
      <ts-button type="plain" @click="handleEditDialog">编辑分类</ts-button>
    </div>
    <div slot="footer">
      <ts-button type="primary" @click="handleUnbindProduct({ids:chooseItem,unbinding:true,classId:BindingProductList.list[0].category})">从本类移出</ts-button>
    </div>
    <!-- 过滤器 -->
    <div class="classification-filter">
      <ts-filter title="分类">
        <ts-radio-group v-model="Params.classId">
          <ts-radio :label="item.id" v-for="item in ProductCategory">{{item.className}}</ts-radio>
        </ts-radio-group>
      </ts-filter>
      <ts-filter title="面料种类">
        <ts-radio-group v-model="Params.fabricType">
          <ts-radio label="">全部</ts-radio>
          <ts-radio :label="item.id" v-for="item in dicTree.PRODUCT_SHAPE">{{item.name}}</ts-radio>
        </ts-radio-group>
      </ts-filter>
    </div>
    <!-- 显示分类的名字 -->
    <div class="classification-showName">
      <span>分类名称：{{Filter.sort | filterClassName(ProductCategory)}}</span>
      <ts-checkbox v-model="Params.unbinding">本类花型</ts-checkbox>
    </div>
    <!--列表  -->
    <!-- 表格 -->
    <div class="warehouse-table" v-for="(item,index) in BindingProductList.list">
      <ts-checkbox-group v-model="chooseItem">
        <ts-menu-table>
          <div slot="header-left">
            <ts-checkbox :label="item.bandId">#{{item.productNo}}&nbsp{{item.category | filterDict(dicTree.PRODUCT_SHAPE)}}</ts-checkbox>
          </div>
          <div slot="header-right">
            状态：
          </div>
          <ts-menu-table-item width="600" class="supply-table--avatar">
            <ts-image width="80" height="80" v-model="item.picsUrl"></ts-image>
          </ts-menu-table-item>
          <!-- Price -->
          <ts-menu-table-item>
            <span v-if="item.price>0">{{item.price}}元／{{item.priceUnit|filterDict(dicTree.PRODUCT_UNIT)}}</span>
            <span v-else>价格面议</span>
          </ts-menu-table-item>
          <ts-menu-table-item>
            <template v-if="!Params.unbinding">
              <a class="classification-table--link">加</a>
            </template>
            <template v-else>
              <a class="classification-table--link" @click="handleUpMoveProductList(item,index)" v-if="index!==0">上</a>
              <a class="classification-table--link" @click="handleDownMoveProductList(item,index)" v-if="index!==BindingProductList.list.length-1">下</a>
              <a class="classification-table--link" @click="handleUnbindProduct({ids:item.bandId,unbinding:true,classId:item.category})">删</a>
            </template>
          </ts-menu-table-item>
        </ts-menu-table>
      </ts-checkbox-group>
    </div>
  </ts-section>
  <!-- 新增分类 -->
  <ts-dialog v-model="Classification.newDialog" title="新增分类" @confirm="handleNew('newClassification')" @cancel="closeNew" width="30%">
    <ts-form :model="Classification" :rules="rules" ref="newClassification">
      <ts-form-item prop="text">
        <ts-input v-focus autofocus v-model="Classification.text" placeholder="请输入分类名称，限定8个字以内" :maxlength="8"></ts-input>
      </ts-form-item>
    </ts-form>
  </ts-dialog>
  <!-- 编辑分类 -->
  <ts-dialog v-model="Classification.editDialog" class="classification-edit-dialog" title="编辑分类" @cancel="closeEdit" @confirm="handleEdit" :width="getColumnCount*30+'%'">
    <div class="classification-edit-dialog--column" :style="{'column-count':getColumnCount}">
      <div class="classification-edit-dialog--item onepx-b" v-for="(item,index) in Classification.userCategory">
        <ts-input style="width:230px" :value="item.className" @input="handleInput(item,$event)"></ts-input>
        <i @click="handleUpMoveCategory(item,index)" v-if="index!==0">上</i>
        <i @click="handleDownMoveCategory(item,index)" v-if="index!==Classification.userCategory.length-1">下</i>
        <i @click="handleDelCategory(item)">删</i>
      </div>
    </div>
  </ts-dialog>
</div>
</template>

<script>
import {
  deleteProductCategory,
  listSystemProductCategory,
  listUserProductCategory,
  getBindingProductlist,
  addProductCategory,
  updateProductCategory,
  bindingProduct,
  sortProductCategory,
  sortBindingProduct
} from '@/common/api/api';
import debounce from 'lodash.debounce';
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      // 传的参数
      Params: {
        classId: null,
        pageNo: 1,
        pageSize: 10,
        unbinding: true
      },
      // 列表数据
      BindingProductList: {},
      chooseItem: [],
      Classification: {
        // 分类名称
        text: '',
        // 系统分类
        systemCategory: [],
        // 用户自定义分类
        userCategory: [],
        // 上下移的IDS
        MovedIds: '',
        // 编辑分类对话框的值
        editDialog: false,
        // 编辑分类对话框的值
        newDialog: false
      },
      Filter: {
        fabricType: '',
        sort: ''
      },
      rules: {
        text: [{
          required: true,
          message: '请输入分类名称',
          trigger: 'blur'
        }, {
          min: 1,
          max: 8,
          message: '长度在 1 到 8 个字符'
        }]
      }
    };
  },
  watch: {
    // 每当Params发生变化都会请求数据
    Params: {
      async handler(val, oldval) {
        this.BindingProductList = (await getBindingProductlist(val)).data.data;
      },
      deep: true
    }
  },
  filters: {
    filterClassName(val, $arr) {
      try {
        if (!val && val.length === 0) {
          return val;
        }
        let filter = $arr.filter(item => item.id.toString() === val.toString());
        return filter[0].className;
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    this.index();
  },
  computed: {
    ...mapGetters(['dicTree']),
    getColumnCount() {
      return this.Classification.userCategory.length > 10 ? 2 : 1;
    },
    // 产品所有分类
    ProductCategory() {
      return [...this.Classification.systemCategory, ...this.Classification.userCategory];
    }
  },
  methods: {
    async index() {
      // 获取分类的列表
      this.BindingProductList = (await getBindingProductlist(this.Params)).data.data;
      // 系统分类
      this.Classification.systemCategory = (await listSystemProductCategory()).data.data;
      this.Params.classId = this.Classification.systemCategory[0].id;
      // 用户分类
      // XXX:PC端做不了分页 只能传一个很高的数字去获取
      this.Classification.userCategory = (await listUserProductCategory({
        pageNo: 1,
        pageSize: 1000
      })).data.data.list;
    },
    // 花型：上移
    handleUpMoveProductList(item, index) {
      let upMovedArr = this.upMove(this.BindingProductList.list, index).map(item => item.id);
      sortBindingProduct({
        ids: upMovedArr.toString()
      });
    },
    // 花型：下移
    handleDownMoveProductList(item, index) {
      let downMovedArr = this.downMove(this.BindingProductList.list, index).map(item => item.id);
      sortBindingProduct({
        ids: downMovedArr.toString()
      });
    },
    // 分类：上移
    handleUpMoveCategory(item, index) {
      let upMovedArr = this.upMove(this.Classification.userCategory, index).map(item => item.id);
      this.Classification.MovedIds = upMovedArr.toString();
    },
    // 分类：下移
    handleDownMoveCategory(item, index) {
      let downMovedArr = this.downMove(this.Classification.userCategory, index).map(item => item.id);
      this.Classification.MovedIds = downMovedArr.toString();
    },
    async handleDelCategory(item) {
      await deleteProductCategory({
        ids: item.id
      });
      this.Classification.userCategory = (await listUserProductCategory({
        pageNo: 1,
        pageSize: 1000
      })).data.data.list;
    },
    async handleEditDialog() {
      this.Classification.editDialog = true;
    },
    // 关闭对话框
    closeDialog(model) {
      this.Classification[model] = false;
    },
    async closeEdit() {
      this.closeDialog('editDialog');
      this.Classification.userCategory = (await listUserProductCategory({
        pageNo: 1,
        pageSize: 1000
      })).data.data.list;
    },
    // 取消分类
    closeNew() {
      this.closeDialog('newDialog');
      this.Classification.text = '';
    },
    /**
    classId	分类id	number
    id	取bandId的值	number	解绑时需要带上，绑定时不需要
    isHot	是否爆款	boolean	如果是爆款则须设为true，默认为false
    productId	取id的值	number	绑定时需要带上，解绑时不需要
    unbinding	是否绑定	boolean	true--解绑 false--绑定（默认）
     */
    async handleUnbindProduct(params) {
      await bindingProduct({
        classId: params.category,
        ids: params.ids,
        unbinding: params.unbinding
      });
    },
    // XXX:函数去抖=> 因为PC端修改分类不能批量修改 所以修改一个等800毫秒后执行
    handleInput: debounce(function(item, event) {
      updateProductCategory({
        className: event,
        id: item.id
      });
    }, 1 * 1000),
    // 新增分类
    handleNew(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          await addProductCategory({
            className: this.Classification.text
          });
          await this.index();
          await this.closeDialog('newDialog');
          this.Classification.text = '';
        }
      });
    },
    async handleEdit(formName) {
      await sortProductCategory({
        ids: this.Classification.MovedIds
      });
      this.Classification.userCategory = (await listUserProductCategory({
        pageNo: 1,
        pageSize: 1000
      })).data.data.list;
      await this.index();
      this.closeDialog('editDialog');
    }
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
    @modifier column{
      column-gap: 10px;
    }
    @modifier item{
      padding:14px 0;
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
