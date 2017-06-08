<template>
<div>
  <div class="search-wrapper all">
    <ts-select class="search-select" data-key-name="label" data-val-name="dicValue" :options='DICT.SearchType' v-model="searchSelect" v-if="!globalLook" :disabled="search.handleStatus"></ts-select>
    <!-- 标签 -->
    <ts-tag shape="square" type="transparent" closable v-if="Pic.show" @close="handleDelPic">
      <div class="search-mask">
        <img :src="Pic.url" width="20" height="20">
        <p><i class="icon-bianji"></i></p>
      </div>
    </ts-tag>
    <input type="text" class="search-input" :placeholder="inputPlaceHolder" v-model="Search.val" @keyup.enter.native="handleSearch" @focus="handleDelPic" :disabled="search.handleStatus">
    <i class="icon-xiangji add-upload-button" v-show="!Pic.isUploaded" @click="Pic.isUploaded=true,Search.val=''" v-if="!search.handleStatus"></i>
    <span class="search-close" v-show="Pic.isUploaded" @click="Pic.isUploaded=false">&times;</span>
    <ts-button type="primary" class="search-button" @click="handleSearch" v-show="!Pic.isUploaded" :disabled="search.handleStatus">搜 索</ts-button>
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
      <input ref="input" type="file" accept="image/png,image/jpeg,image/gif" @change="uploadImg" v-show="false">
    </p>
    <ts-grid :data="Search.picList" emptyText="暂无搜索记录">
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
  <div class="search-editPic onepx" v-show="search.handleStatus&&!Pic.isUploaded">
    <p class="upload-tip">正在处理中，请稍候...</p>
    <ts-progress :percentage="search.progress"></ts-progress>
  </div>
  <!-- 裁剪图片 -->
  <cropper-dialog :dialog="Cropper" :imageUrl="Pic.url" @change="handleGetDestImg" @close="handleCancelFind">
    <ts-radio-group v-model="Filter.categorys" class="search-editPic--menu" @change="handleLookProduct">
      <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">搜{{item.name}}</ts-radio>
    </ts-radio-group>
  </cropper-dialog>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex';
import DICT from '@/common/dict';
import CropperDialog from './searchImgDialog.vue';
export default {
  data() {
    return {
      searchSelect: '',
      DICT: {
        SearchType: DICT.SearchType
      },
      Search: {
        picList: [],
        val: ''
      },
      // 双向绑定 => 与searchImgDialog中 dialog.show对应
      Cropper: {
        show: false
      },
      Filter: {
        categorys: ''
      },
      Progress: {
        Interval: null
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
    // 默认选择第一个 店内
    this.searchSelect = '1';
    this.Search.val = this.$route.query.search;
    if (localStorage.getItem('historyItems')) {
      this.Search.picList = localStorage.getItem('historyItems').split('|');
    }
    // 监听localStorage.historyItem的变化
    window.addEventListener('storage', () => {
      this.Search.picList = localStorage.getItem('historyItems').split('|');
    }, false);
  },
  props: {
    globalLook: {
      type: Boolean,
      default: true
    },
    inputPlaceHolder: {
      type: String,
      default: '可输入厂名或编号查找'
    }
  },
  destroyed() {
    this.$store.commit('SET_HANDLE_STATUS', false);
    this.$store.commit('CLEAR_INTERVAL');
  },
  watch: {
    $route(to, from) {
      if (to.query.search) {
        this.Search.val = to.query.search;
      }
    },
    'search.id' (val) {
      this.$store.commit('SET_PROGRESS', 100);
      this.$store.commit('SET_HANDLE_STATUS', false);
      if (this.globalLook) {
        this.$router.push({
          path: '/search/image',
          query: {
            imgId: val
          }
        });
      } else {
        this.$router.push({
          path: `/shop/${this.$route.params.id}/s/image`,
          query: {
            imgId: val
          }
        });
      }
    },
    Pic: {
      handler(val) {
        val.show = !!val.url;
        if (this.search.handleStatus) {
          (() => {
            let interval = setInterval(() => {
              if (this.search.progress === 95) {
                this.$store.commit('SET_PROGRESS', 95);
                clearInterval(interval);
              } else {
                this.$store.commit('SET_PROGRESS', ++this.search.progress);
              }
            }, 10000);
          })();
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['dicTree', 'search', 'userInfo']),
    // 显示5张最近记录
    showPics() {
      return this.Search.picList.length >= 5 ? this.Search.picList.splice(0, 5) : this.Search.picList;
    }
  },
  components: {
    CropperDialog
  },
  methods: {
    // 获取裁剪的图片base64
    handleGetDestImg(pic) {
      this.Pic.destImg = pic;
    },
    // 选择分类的时候
    async handleLookProduct(e) {
      let data = {
        encoded: this.Pic.destImg
      };
      sessionStorage.setItem('find-pic', JSON.stringify(data));
      this.Cropper.show = false;
      this.$store.commit('SET_PROGRESS', 1);
      this.$store.commit('SET_HANDLE_STATUS', true);
      if (this.globalLook) {
        await this.$store.dispatch('getSearchEncoded', {
          category: e,
          encoded: this.Pic.destImg,
          searchType: 300
        });
      } else {
        await this.$store.dispatch('getSearchEncoded', {
          category: e,
          companyId: this.$route.params.id,
          encoded: this.Pic.destImg,
          searchType: this.searchSelect === 1 ? Number(`${this.userInfo.userType}00`) : 300
        });
      }
    },
    // 隐藏上传file控件
    handleUpload() {
      this.$refs.input.click();
    },
    handleCancelFind() {
      this.Pic.url = '';
    },
    handleChoosePic(imgUrl) {
      this.Search.picList.unshift(imgUrl);
      this.historyItems.set(imgUrl);
      this.Cropper.show = true;
      this.Pic.url = imgUrl;
      this.Pic.isUploaded = false;
    },
    // 上传图片
    uploadImg(e) {
      var file = this.$refs.input.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = () => {
          var url = reader.result;
          this.handleChoosePic(url);
          this.Pic.url = url;
        };
        reader.readAsDataURL(file);
      } else {
        this.$toast('出错');
      }
    },
    handleDelPic(e) {
      this.Pic.url = '';
      this.Pic.isUploaded = false;
    },
    handleClearHistory() {
      this.Search.picList = [];
      this.historyItems.clear();
    },
    // 搜索
    handleSearch() {
      if (this.Search.val) {
        let value = this.Search.val.trim();
        this.$emit('search', value);
        if (this.globalLook || this.searchSelect === 2) {
          this.$router.push({
            path: '/search/text',
            query: {
              search: value,
              searchType: 2
            }
          });
        } else {
          this.$router.push({
            path: `/shop/${this.$route.params.id}/s/text`,
            query: {
              search: value,
              searchType: 1
            }
          });
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
    font-size: 16px;
    font-weight: 400;
    padding: 4px;
    cursor: pointer;
    color: #4c93fd;
  }
  @component editPic {
    padding: 4px;
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
  @component select {
    width: 88px;
    min-width: 80px;
    max-width: 80px;
    margin-right: 5px;
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
    width: 120px;
    height: 34px;
    font-size: 18px;
    word-spacing: 14px;
    position: absolute;
    bottom: 0;
    height: 36px;
  }
}

.icon-xiangji {
  font-size: 18px;
  line-height: 32px;
  padding: 0 8px;
  cursor: pointer;
  border-left: 1px solid #eaeaea;
  &:before {
    color: #4c93fd;
    transition: .8s;
  }
  &:hover:before {
    color: #2371e5;
  }
}

.upload-tip {
  line-height: 50px;
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
