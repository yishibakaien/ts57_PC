<template>
<div>
  <div class="search-wrapper all">
    <slot name="select"></slot>
    <!-- 标签 -->
    <ts-tag shape="square" type="transparent" closable v-if="Pic.show" @close="handleDelPic">
      <div class="search-mask">
        <img :src="Pic.url" width="20" height="20">
        <p @click="handleSearchFromEdit(Pic.url)"><i class="icon-bianji"></i></p>
      </div>
    </ts-tag>
    <input type="text" class="search-input" :placeholder="inputPlaceHolder" v-model="Search.val" @focus="handleDelPic" :disabled="search.handleStatus" @keyup.enter="handleSearchText">
    <i class="icon-sousuo search-upload--icon" v-show="!Pic.isUploaded" @click="handleSearchText" v-if="!search.handleStatus"></i>
    <span class="search-close" v-show="Pic.isUploaded" @click="Pic.isUploaded=false">&times;</span>
    <ts-button type="primary" @click="Pic.isUploaded=true,Search.val=''" class="search-button" v-show="!Pic.isUploaded" :disabled="search.handleStatus">
      <i class="icon-xiangji"></i>传图搜花
    </ts-button>
  </div>
  <!-- 上传花型  -->
  <div class="search-editPic onepx" v-show="Pic.isUploaded">
    <p class="search-editPic-title">
      <span>搜索历史</span>
      <label style="position:relative">
        <a class="search-editPic-upload--button" @click="handleUpload">
          <i class="icon-shangchuan"></i>
          本地上传
        </a>
      </label>
      <input ref="input" type="file" accept="image/png,image/jpeg" @change="uploadImg" v-show="false">
    </p>
    <ts-grid :data="showPics" emptyText="暂无搜索记录">
      <ts-grid-item style="width:115px" v-for="product in showPics" :key="product" @click="handleChoosePic(product)">
        <ts-image width="60" height="60" :canView="false" disabledHover :src="product">
        </ts-image>
      </ts-grid-item>
    </ts-grid>
    <div class="search-editPic-menu">
      <ts-button type="primary" @click="handleClearHistory">清空记录</ts-button>
      <ts-button type="cancel" @click="Pic.isUploaded=!Pic.isUploaded">关闭</ts-button>
    </div>
  </div>
  <!-- 正在处理 -->
  <div class="search-editPic onepx" v-show="search.handleStatus&&!Pic.isUploaded">
    <ts-button type="cancel" size="small" class="upload-tip--button button" @click="handleCanceSearch">取消搜索</ts-button>
    <p class="upload-tip">正在处理中，请稍候...</p>
    <ts-progress :percentage="search.progress"></ts-progress>
  </div>
  <!-- 裁剪图片 -->
  <cropper-dialog :dialog="Cropper" :imageUrl="Pic.url" @check="handleLookProduct" @change="handleGetResult">
  </cropper-dialog>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex';
import CropperDialog from './searchImgDialog.vue';
export default {
  data() {
    return {
      Search: {
        picList: [],
        val: ''
      },
      // 双向绑定 => 与searchImgDialog中 dialog.show对应
      Cropper: {
        show: false
      },
      Pic: {
        isUploaded: false,
        show: false,
        destImg: '',
        isEdit: false,
        url: ''
      }
    };
  },
  created() {
    this.Search.val = this.$route.query.search;
    if (localStorage.getItem('historyItems')) {
      this.Search.picList = localStorage.getItem('historyItems').split('|');
      // 监听localStorage.historyItem的变化
      window.addEventListener('storage', () => {
        this.Search.picList = localStorage.getItem('historyItems').split('|');
      }, false);
    }
  },
  props: {
    globalLook: {
      type: Boolean,
      default: true
    },
    globalSearch: {
      type: Boolean,
      default: true
    },
    inputPlaceHolder: {
      type: String,
      default: '可输入厂名或编号查找'
    }
  },
  beforeDestroy() {
    this.$store.commit('SET_PROGRESS', 1);
  },
  watch: {
    $route(to, from) {
      if (to.query.search) {
        this.Search.val = to.query.search;
      }
    },
    Pic: {
      handler(val) {
        val.show = !!val.url;
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['dicTree', 'search']),
    // 显示5张最近记录
    showPics() {
      return this.Search.picList.length >= 5 ? this.Search.picList.splice(0, 5) : this.Search.picList;
    }
  },
  components: {
    CropperDialog
  },
  methods: {
    handleSearchFromEdit(url) {
      this.handleChoosePic(url);
    },
    // 取消搜索
    handleCanceSearch() {
      this.$store.commit('SET_HANDLE_STATUS', false);
      this.$store.commit('SET_PROGRESS', 1);
      this.$store.commit('CLEAR_INTERVAL');
    },
    // 裁剪---选择分类的时候
    async handleLookProduct(item) {
      if (this.globalLook && this.globalSearch) {
        await this.$store.dispatch('getSearchEncoded', {
          category: item.category,
          encoded: item.encoded,
          searchType: 300
        });
      } else {
        this.$emit('check', item);
      }
    },
    // 隐藏上传file控件
    handleUpload() {
      this.$refs.input.click();
    },
    // 上传图片
    uploadImg(e) {
      var file = this.$refs.input.files[0];
      if (file && file.size <= 5242880) {
        var reader = new FileReader();
        reader.onload = () => {
          var url = reader.result;
          this.handleChoosePic(url);
        };
        reader.readAsDataURL(file);
      } else {
        this.$toast('请上传一张小于5MB的图片');
      }
    },
    // 历史记录中选择
    handleChoosePic(imgUrl) {
      this.Search.picList.unshift(imgUrl);
      this.historyItems.set(imgUrl);
      // 裁剪对话框打开
      this.Cropper.show = true;
      this.Pic.url = imgUrl;
      this.Pic.isUploaded = false;
    },
    // 删除图片
    handleDelPic(e) {
      this.Pic.url = '';
      this.Pic.isUploaded = false;
    },
    // 清除历史记录
    handleClearHistory() {
      this.Search.picList = [];
      this.historyItems.clear();
    },
    handleGetResult(val) {
      if (this.globalLook && this.globalSearch) {
        this.$router.push({
          path: '/search/image',
          query: {
            imgId: val
          }
        });
      } else {
        this.$emit('change', val);
      }
    },
    // 搜索
    handleSearchText() {
      if (this.Search.val) {
        let value = this.Search.val.trim();
        this.$emit('search', value);
        if (this.globalLook) {
          this.$router.push({
            path: '/search/text',
            query: {
              search: value,
              searchType: 2
            }
          });
        } else {
          this.$emit('search-text', value);
        }
      }
    }
  }
};
</script>
<style scoped>
@component-namespace search {
  @component wrapper {
    position: relative;
    display: flex;
    padding-left: 2px;
    align-items: center;
    border: 2px solid #4c93fd;
    .search-input {
      margin: 0;
    }
  }
  @component input {
    height: 32px;
    border: none;
    outline: none;
    flex: 1;
    padding: 0 4px;
    box-sizing: border-box;
    font-size: 16px;
  }
  @component close {
    font-weight: 400;
    padding-right: 9px;
    transform: scale(1.5);
    line-height: 1;
    cursor: pointer;
    color: #4c93fd;
    &:hover {
      color: #1c76fa;
    }
  }
  @component editPic {
    padding: 10px;
    position: absolute * 0 * 0;
    background: #fff;
    z-index: 2;
    @descendent menu {
      text-align: right;
      margin-top: 10px;
    }
    @modifier menu {
      text-align: center;
      clear: both;
      padding-top: 16px;
      button {
        margin: 0 4px;
      }
    }
    @descendent upload {
      @modifier button {
        height: 32px;
        line-height: 32px;
        border: none;
        display: inline-block;
        background-color: #fff;
      }
    }
    @descendent title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 6px;
      margin-bottom: 6px;
    }
  }

  @component mask {
    position: relative;
    p {
      position: absolute 0 0 0 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
      cursor: pointer;
      display: none;
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &:hover {
      p {
        display: block;
      }
    }
  }
  @component button {
    height: 34px;
    font-size: 18px;
    word-spacing: 14px;
    position: absolute;
    bottom: 0;
    height: 36px;
  }
}

.icon-xiangji {
  font-size: 15px;
  padding: 0 8px;
  /*border-left: 1px solid #eaeaea;*/
  &:before {
    color: #fff;
    transition: .8s;
  }
}

.icon-sousuo {
  font-size: 18px;
  font-weight: 600;
  padding: 0 8px;
  cursor: pointer;
  &:before {
    color: #4c93fd;
    transition: .8s;
  }
  &:hover:before {
    color: #1c76fa;
  }
}

.upload-tip {
  line-height: 50px;
}

.upload-tip--button.button {
  position: absolute * 10px * *;
}
</style>
<style lang="scss">
.search-wrapper.all {
    .ts-input--inner {
        border: none;
        font-size: 14px;
    }
}
</style>
