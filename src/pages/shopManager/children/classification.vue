<template>
<div class="classification">
  <ts-section>
    <div slot="menu">
      <ts-button type="primary" @click="Classification.newDialog=true">新增分类</ts-button>
      <ts-button type="plain" @click="handleEditDialog">编辑分类</ts-button>
    </div>
    <div slot="footer" class="classification-footer">
      <ts-button :disabled="chooseItem.length<=0" type="primary" v-show="!Params.unbinding" @click="handleUnbindProduct({ids:chooseItem,unbinding:true,classId:Params.classId})">从本类移出</ts-button>
      <ts-button :disabled="chooseItem.length<=0" v-show="!Params.unbinding" type="primary" @click="handleShowDialog(chooseItem)" v-if="false">加入本类</ts-button>
      <ts-pagination class="classification-footer--pagation" @change="handleChangeCurrent" @page-size-change="handleChangePageSize" :current="BindingProductList.pageNO" :total="BindingProductList.totalPage">
      </ts-pagination>
    </div>
    <!-- 过滤器 -->
    <div class="classification-filter">
      <ts-filter title="分类">
        <ts-radio-group v-model="Params.classId">
          <ts-radio :label="item.id" v-for="item in ProductCategory" :key="item.id">{{item.className}}({{item.bindingCount}})</ts-radio>
        </ts-radio-group>
      </ts-filter>
    </div>
    <!-- 显示分类的名字 -->
    <div class="classification-showName">
      <span style="margin-right:10px;">分类名称：{{Params.classId | filterClassName(ProductCategory)}}</span>
      <ts-checkbox v-model="Params.unbinding">非本类花型</ts-checkbox>
    </div>
    <!--列表  -->
    <!-- 表格 -->
    <ts-menu :prop="BindingProductList.list">
      <ts-checkbox-group v-model="chooseItem">
        <ts-menu-table v-for="(item,index) in BindingProductList.list" :key="item.bandId">
          <div slot="header-left">
            <ts-checkbox :label="item.bandId" v-if="!Params.unbinding"></ts-checkbox>
            <span v-else>{{item.productNo}}&nbsp{{item.category | filterDict(dicTree.PRODUCT_SHAPE)}}</span>
          </div>
          <div slot="header-right">
            状态：
            <span v-if="!item.classList.length">无</span>
            <span class="classification-table--classList" v-for="i in item.classList">{{i}}</span>
          </div>
          <ts-menu-table-item width="580" class="classification-table--avatar">
            <ts-image width="80" height="80" :src="item.defaultPicUrl"></ts-image>
          </ts-menu-table-item>
          <!-- Price -->
          <ts-menu-table-item>
            <span v-if="item.price>0">{{item.price/100}}元/{{item.priceUnit|filterDict(dicTree.PRODUCT_UNIT,'name')}}</span>
            <span v-else>价格面议</span>
          </ts-menu-table-item>
          <!-- 操作 -->
          <ts-menu-table-item>
            <template v-if="Params.unbinding">
            <a class="classification-table--link" @click="handleShowDialog(item.id)"><i class="icon-fangda"></i></a>
            </template>
            <template v-else>
            <a class="classification-table--link" @click="handleUpMoveProductList(item,index)" v-if="index!==0"><i class="icon-yishang"></i></a>
            <a class="classification-table--link" @click="handleDownMoveProductList(item,index)" v-if="index!==BindingProductList.list.length-1"><i class="icon-xiayi"></i></a>
            <a class="classification-table--link" @click="handleUnbindProduct({ids:item.bandId,unbinding:true,classId:Params.classId})"><i class="icon-shanchu_hui"></i></a>
          </template>
          </ts-menu-table-item>
        </ts-menu-table>
      </ts-checkbox-group>
    </ts-menu>
  </ts-section>
  <!-- 新增分类 -->
  <ts-dialog v-model="Classification.newDialog" title="新增分类" @confirm="handleNew('newClassification')" @cancel="closeNew" width="30%">
    <ts-form :model="Classification" :rules="rules" ref="newClassification">
      <ts-form-item prop="text">
        <ts-input autofocus v-model="Classification.text" placeholder="请输入分类名称，限定8个字以内" :maxlength="8"></ts-input>
      </ts-form-item>
    </ts-form>
  </ts-dialog>
  <!-- 花型加入 -->
  <ts-dialog v-model="ConfirmDialog.show" width="30%" title="提示" @cancel="handleCancelBind" @confirm="handleBind" class="classification-dialog">
    <p class="classification-dialog--title">确认将选中花型加入&nbsp;{{Params.classId | filterClassName(ProductCategory)}}&nbsp;分类</p>
    <p>
      <ts-radio @change.native="handleNoShowDialog" type="origin" v-model="ConfirmDialog.noShowDialog" label="0"><span class="classification-dialog--tip">不再提示<i>(一款花型可以加入自定义分类)</i></span></ts-radio>
    </p>
  </ts-dialog>
  <!-- 编辑分类 -->
  <ts-dialog v-model="Classification.editDialog" class="classification-edit-dialog" title="编辑分类" @cancel="closeEdit" @close="closeEdit" @confirm="handleEdit" :width="getColumnCount*30+'%'">
    <ts-button type="plain" size="large" @click="handleAddNew" v-if="getUserCategoryLength">新增分类</ts-button>
    <div class="classification-edit-dialog--column" :style="{'column-count':getColumnCount}">
      <div class="classification-edit-dialog--item onepx-b" v-for="(item,index) in Classification.userCategory">
        <ts-input style="width:230px" :value="item.className" @input="handleInput(item,$event)"></ts-input>
        <i @click="handleUpMoveCategory(item,index)" v-if="index!==0"><i class="icon-yishang"></i></i>
        <i @click="handleDownMoveCategory(item,index)" v-if="index!==Classification.userCategory.length-1"><i class="icon-xiayi"></i></i>
        <i @click="handleDelCategory(item)"><i class="icon-shanchu_hui"></i></i>
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
        unbinding: false
      },
      // cookie
      Cookie: {
        key: 'showInsertDialog',
        value: 1,
        day: 7
      },
      // 控制对话框cookie => 花型加入到分类
      ConfirmDialog: {
        noShowDialog: false,
        show: false,
        id: []
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
  beforeDestroy() {
    sessionStorage.setItem('classification-filter', JSON.stringify(this.Params.classId));
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
    !this.cookie.get(this.Cookie.key) ? this.cookie.set(this.Cookie.key, this.Cookie.value, {
      end: this.Cookie.day,
      path: '/'
    }) : '';
  },
  computed: {
    ...mapGetters(['dicTree']),
    // 编辑分类的对话框：超过8个显示2列，否则1列
    getColumnCount() {
      return this.Classification.userCategory.length > 8 ? 2 : 1;
    },
    // 用户自定义分类是否为空
    getUserCategoryLength() {
      return this.Classification.userCategory.length <= 0;
    },
    // 产品所有分类
    ProductCategory() {
      return [...this.Classification.systemCategory, ...this.Classification.userCategory];
    }
  },
  methods: {
    async index() {
      // 系统分类
      this.Classification.systemCategory = (await listSystemProductCategory()).data.data;
      this.Params.classId = !sessionStorage.getItem('classification-filter') ? this.Classification.systemCategory[0].id : JSON.parse(sessionStorage.getItem('classification-filter'));
      // 用户分类
      // XXX:PC端做不了分页 只能传一个很高的数字去获取
      this.Classification.userCategory = (await listUserProductCategory({
        pageNo: 1,
        pageSize: 1000
      })).data.data.list;
    },
    // 分页处理
    // =========
    async handleChangeCurrent(current) {
      this.Params.pageNo = current;
    },
    // 如果没有分类可以编辑的时候=>新增分类打开
    handleAddNew() {
      this.closeDialog('editDialog');
      setTimeout(() => {
        this.Classification.newDialog = true;
      }, 400);
    },
    async handleChangePageSize(size) {
      this.Params.pageSize = size;
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
      await this.index();
    },
    // 编辑分类
    async handleEditDialog() {
      this.Classification.editDialog = true;
    },
    // 关闭对话框
    closeDialog(model) {
      this.Classification[model] = false;
    },
    async closeEdit() {
      this.closeDialog('editDialog');
      await this.index();
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
    handleUnbindProduct(params) {
      this.$messagebox.confirm('确认将选中花型从本类移出?').then(async action => {
        await bindingProduct({
          classId: params.classId,
          ids: params.ids.toString(),
          unbinding: params.unbinding
        });
        await this.index();
        this.BindingProductList = (await getBindingProductlist(this.Params)).data.data;
      });
    },
    // XXX:函数去抖=> 因为PC端修改分类不能批量修改 所以修改一个等800毫秒后执行
    handleInput: debounce(async function(item, event) {
      await updateProductCategory({
        className: event,
        id: item.id
      });
    }, 500),
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
      if (this.Classification.MovedIds) {
        await sortProductCategory({
          ids: this.Classification.MovedIds
        });
        await this.index();
      }
      this.closeDialog('editDialog');
    },
    // 点击“加入”=>判断cookie是否显示
    handleShowDialog(item) {
      this.ConfirmDialog.id = item;
      if (this.cookie.get(this.Cookie.key) === '1') {
        this.ConfirmDialog.show = true;
      } else {
        this.handleBind();
      }
    },
    // 取消绑定
    handleCancelBind() {
      this.ConfirmDialog.show = false;
      this.cookie.set(this.Cookie.key, this.Cookie.value, {
        end: this.Cookie.day,
        path: '/'
      });
    },
    // 分类与花型绑定
    async handleBind() {
      await bindingProduct({
        classId: this.Params.classId,
        isHot: this.Params.classId === this.ProductCategory.filter(item => item.className === '爆款')[0].id,
        productId: this.ConfirmDialog.id.toString()
      });
      await this.index();
      this.ConfirmDialog.show = false;
      this.chooseItem = [];
      this.BindingProductList = (await getBindingProductlist(this.Params)).data.data;
    },
    // 设置cookie
    handleNoShowDialog(e) {
      this.cookie.set(this.Cookie.key, e.target.value, {
        end: this.Cookie.day,
        path: '/'
      });
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
  @component table{
    @modifier classList{
      margin-right: 6px;
      position: relative;
      &:last-child{
        position:static;
        margin-right: 0;
        &:after{
          content:'';
        }
      }
      &:after{
        /*position: absolute;*/
        content: "|";
        margin-left: 4px;
        transform: translate(-50%,0);
      }
    }
  }
  @component footer{
    display: flex;
    @modifier pagation{
      flex:1;
      text-align: right;
    }
  }
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
  @component edit-dialog{
    @modifier column{
      column-gap: 10px;
    }
    @modifier item{
      padding:14px 0;
      i{
        margin-left:8px;
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
