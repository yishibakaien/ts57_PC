<template>
<div style="position:relative">
  <div class="search-wrapper all">
    <slot></slot>
    <ts-tag shape="square" type="transparent" closable v-if="Pic.show" @close="handleDelPic">
      <div class="search-mask" @click="Pic.isEdit=!Pic.isEdit">
        <img :src="Pic.url">
        <p><i class="icon-bianji"></i></p>
      </div>
    </ts-tag>
    <input type="text" class="search-input" :placeholder="Pic.inputPlaceHolder" v-model="Search.val" @keyup.enter.native="handleSearch" @focus="handleDelPic">
    <i class="icon-xiangji add-upload-button" v-show="!Pic.isUploaded" @click="Pic.isUploaded=true,Search.val=''"></i>
    <span class="search-close" v-show="Pic.isUploaded" @click="Pic.isUploaded=false">&times;</span>
    <ts-button type="primary" class="search-button" @click="handleSearch" v-show="!Pic.isUploaded">搜 索</ts-button>
  </div>
  <div class="search-editPic onepx" v-show="Pic.isEdit">
    <p>请框选图中要识别的区域</p>
    <ts-radio-group v-model="Filter.categorys">
      <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">搜{{item.name}}</ts-radio>
    </ts-radio-group>
  </div>
  <div class="search-editPic onepx" v-show="Pic.isUploaded">
    <p class="search-editPic-title">
      <span>搜索历史</span>
      <label style="position:relative">
        <a class="search-editPic-upload--button">
          <i class="icon-shangchuan"></i>
          本地上传
        </a>
        <ts-aliupload id="addPic" @doUpload="uploadImg"></ts-aliupload>
      </label>
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
</div>
</template>
<script>
import {
  ALI_DOMAIN
} from '@/common/dict/const';
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      Search: {
        picList: [],
        val: ''
      },
      Filter: {
        categorys: ''
      },
      Pic: {
        isUploaded: false,
        show: false,
        isEdit: false,
        url: '',
        inputPlaceHolder: '可输入厂名或编号查找'
      }
    };
  },
  created() {
    this.Search.val = this.$route.query.search;
    if (localStorage.getItem('historyItems')) {
      this.Search.picList = localStorage.getItem('historyItems').split(',');
    }
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
        val.inputPlaceHolder = val.url ? '' : '可输入厂名或编号查找';
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['dicTree']),
    showPics() {
      return this.Search.picList.length >= 5 ? this.Search.picList.splice(0, 5) : this.Search.picList;
    }
  },
  methods: {
    handleChoosePic(imgUrl) {
      this.Search.picList.unshift(imgUrl);
      this.historyItems.set(imgUrl);
      this.Pic.url = `${imgUrl}?x-oss-process=image/resize,h_20`;
      this.Pic.isUploaded = false;
    },
    uploadImg(e) {
      this.Pic.isUploaded = false;
      let imgUrl = `${ALI_DOMAIN}${e.ossUrl[e.ossUrl.length - 1]}`;
      this.handleChoosePic(imgUrl);
      this.Pic.url = `${imgUrl}?x-oss-process=image/resize,h_20`;
    },
    handleDelPic(e) {
      this.Pic.url = '';
      this.Pic.isUploaded = false;
      this.Pic.isEdit = false;
    },
    handleClearHistory() {
      this.Search.picList = [];
      this.historyItems.clear();
    },
    // 搜索
    handleSearch() {
      let value = this.Search.val.trim();
      if (value) {
        this.$emit('search', value);
        this.$router.push({
          path: '/textSearch',
          query: {
            search: value
          }
        });
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
    width: 580px;
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
    text-align: center;
    position: absolute * 0 * 0;
    background: #fff;
    z-index: 2;
    @descendent menu {
      text-align: right;
      margin-top: 10px;
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
      background: rgba(0, 0, 0, 0.2);
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
</style>
<style lang="scss">
.search-wrapper.all {
    .ts-input--inner {
        border: none;
        font-size: 14px;
    }
}
</style>
