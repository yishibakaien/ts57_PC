<template lang="html">
  <ts-section>
    <div slot="menu">
      <label>
          <i class="icon-fangda material-add--icon"></i>
          <ts-aliupload id="addMaterial" @doUpload="uploadImg"></ts-aliupload>
      </label>
      <ts-button :type="Edit.status?'cancel':'primary'" :class="Edit.status?'':'button-blue'" @click="Edit.status=!Edit.status">{{Edit.text}}</ts-button>
    </div>
    <!-- checkbox-group控制 -->
    <ts-checkbox-group v-model="chooseImg.list">
      <div class="material-img" v-for="item in albumPicsList.list">
        <!-- 多选  -->
        <ts-checkbox v-show="Edit.status" :label="item.id" class="material-img-checkbox">{{item.text}}</ts-checkbox>
        <!-- 图片 -->
        <ts-image type="local" :src="item.photoUrl" width="160" height="160" :key="item.id"></ts-image>
        <!-- “入仓”提示 -->
        <router-link :to="{path:'addwarehouse',query:{url:item.photoUrl}}" tag="span" class="material-img-tip" v-show="!Edit.status">
          <i class="logo icon-dangkou"></i>
            入仓
        </router-link>
      </div>
    </ts-checkbox-group>
    <div slot="footer" class="material-footer">
      <ts-button type="primary" :disabled="chooseImg.status" v-if="Edit.status" @click="handleShowDialog">删除</ts-button>
      <ts-pagination
      class="material-footer--pagation"
      @change="handleChangeCurrent"
      @page-size-change="handleChangePageSize"
      :current="albumPicsList.pageNO"
      :totalPages="albumPicsList.totalPage">
      </ts-pagination>
    </div>
    <!--  对话框 -->
    <ts-dialog v-model="ConfirmDialog.show" width="30%" title="提示" @confirm="handleDelAlbumPic" @cancel="handleCancelDelMaterial" class="material-dialog">
      <p class="material-dialog--title">确认将选中花型素材删除？</p>
      <p><ts-radio @change.native="handleNoShowDialog"  type="origin" v-model="ConfirmDialog.noShowDialog" label="0"><span class="material-dialog--tip">不再提示<i>(素材相关数据删除后无法恢复)</i></span></ts-radio></p>
    </ts-dialog>
  </ts-section>
</template>

<script>
import {
  getAlbumPicsList,
  deleteAlbumPic,
  getAlbum,
  addAlbumPic
} from '@/common/api/api';
import {
  ALI_DOMAIN
} from '@/common/dict/const';
export default {
  data() {
    return {
      albumPicsList: {},
      // 传的参数
      Params: {
        pageNo: '1',
        pageSize: '10',
        albumId: ''
      },
      // 图片的操作
      chooseImg: {
        list: [], // 选中的图片
        status: true // 能否删除的状态
      },
      // 对话框
      ConfirmDialog: {
        noShowDialog: false,
        show: false,
        id: []
      },
      // cookie
      Cookie: {
        key: 'showDelMaterialDialog',
        value: 1,
        day: 7
      },
      // 编辑状态
      Edit: {
        text: '编辑',
        status: false
      }
    };
  },
  watch: {
    Edit: {
      handler(val) {
        val.text = val.status ? '取消' : '编辑';
      },
      deep: true
    },
    chooseImg: {
      handler(val) {
        val.status = val.list.length <= 0;
      },
      deep: true
    }
  },
  async created() {
    this.Params.albumId = (await getAlbum()).data.data.id;
    this.albumPicsList = (await getAlbumPicsList(this.Params)).data.data;
    // 默认创建一个cookie
    !this.getCookie(this.Cookie.key) ? this.setCookie(this.Cookie.key, this.Cookie.value, this.Cookie.day) : '';
  },
  methods: {
    // 分页处理
    // =========
    async handleChangeCurrent(current) {
      this.Params.pageNo = current;
      this.albumPicsList = (await getAlbumPicsList(this.Params)).data.data;
    },
    async handleChangePageSize(size) {
      this.Params.pageSize = size;
      this.albumPicsList = (await getAlbumPicsList(this.Params)).data.data;
    },
    // ========
    // 删除所选素材
    async handleDelAlbumPic() {
      await deleteAlbumPic({
        ids: this.chooseImg.list.join(',')
      });
      this.chooseImg.list = [];
      this.ConfirmDialog.show = false;
      this.albumPicsList = (await getAlbumPicsList(this.Params)).data.data;
    },
    // 点击“删除”=>判断cookie是否显示
    async handleShowDialog() {
      if (this.getCookie(this.Cookie.key) === '1') {
        this.ConfirmDialog.show = true;
      } else {
        this.handleDelAlbumPic();
      }
    },
    // 取消删除
    handleCancelDelMaterial() {
      this.ConfirmDialog.show = false;
      this.setCookie(this.Cookie.key, this.Cookie.value, this.Cookie.day);
    },
    // 设置cookie
    handleNoShowDialog(e) {
      this.setCookie(this.Cookie.key, e.target.value, this.Cookie.day);
    },
    async uploadImg(e) {
      await addAlbumPic({
        albumId: this.Params.albumId,
        picUrls: [ALI_DOMAIN + e.ossUrl[e.ossUrl.length - 1]]
      });
      this.albumPicsList = (await getAlbumPicsList(this.Params)).data.data;
    }
  }
};
</script>

<style lang="css" scoped>
:root{
  --material-img-tip-height: 28px;
  --material-img-tip-height: 28px;
  --material-img-tip-bg: rgba(0,0,0,0.4);
  --material-img-tip-text-color: #fff;
  --material-add-icon-hover-color: #4c93fd;
  --material-img-checkbox-position: 10px;
}
@component-namespace material{
  @component footer{
    display: flex;
    align-items: center;
    @modifier pagation{
      flex:1;
      text-align: right;
    }
  }
  @component add{
    @modifier icon{
      font-size: 30px;
    vertical-align: middle;
    margin-right: 10px;
    cursor: pointer;
    &:hover:before{
      color:var(--material-add-icon-hover-color);
    }
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
  @component img{
    margin: 0 18px 18px 0;
    display: inline-block;
    position: relative;
    @descendent checkbox{
      position: absolute var(--material-img-checkbox-position) * * var(--material-img-checkbox-position);
    }
    @descendent tip{
      position: absolute * 0 0 0;
      display: inline-block;
      height: var(--material-img-tip-height);
      line-height: var(--material-img-tip-height);
      background: var(--material-img-tip-bg);
      color: var(--material-img-tip-text-color);
      display: none;
      cursor: pointer;
      text-align: center;
    }
    &:hover{
      .material-img-tip{
        display:block;
      }
    }
  }
}
</style>
