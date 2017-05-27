<template lang="html">
  <div class="onepx dress-wrapper">
    <div class="dress-wrapper-left">
      <ts-section pageTitle="3D试衣" class="onepx">
        <div slot="menu">
          <ts-button type="primary">保存图片</ts-button>
        </div>
          <img :src="Pic.origin" id="picOrigin" class="transition" :style="{'background-image':`url(${Pic.uploadPic})`,'background-size':`${ratio}%`}">
      </ts-section>
    </div>
    <div class="dress-wrapper-right">
      <ts-section pageTitle="花型预览" class="onepx">
        <div slot="menu">
          <label v-if="!$slots.uploadBtn">
            <i class="icon-shangchuan"></i>
            <input type="file" accept="image/jpeg,image/jpg,image/png"  name="file" value="" @change="handleUpload" v-show="false">
          </label>
          <slot name="uploadBtn"></slot>
        </div>
        <div class="dress-upload">
          <div class="dress-upload-zoom">
            <p @click="handleZoom('+')">+</p>
            <p @click="handleZoom('-')">—</p>
          </div>
          <div class="dress-upload-img" :style="{'background-image':`url(${Pic.uploadPic})`,'background-size':`${ratio}%`}">
          </div>
          <p class="dress-upload--text" v-if="hasUploadPic">请先上传花型图片</p>
        </div>
        <slot name="productMenu"></slot>
      </ts-section>
      <ts-section pageTitle="选择模特" class="onepx">
        <ts-grid>
          <ts-grid-item v-for="(item,index) in MODELS" :class="{'dress-active':index===Pic.activeIndex}" :key="item" @click="handleViewModels(item,index)">
            <ts-image
             width="87"
             height="100"
             :canView="false"
             disabledHover
             :src="`${MODEL_THUMBNAIL_DOMAIN}/${item}`">
             </ts-image>
           </ts-grid-item>
        </ts-grid>
      </ts-section>
    </div>
  </div>
</template>

<script>
import {
  MODELS
} from '@/common/dict/const';
const MODEL_THUMBNAIL_DOMAIN = '/static/images/modles_prototype/';
const MODEL_ORIGIN_DOMAIN = '/static/images/modles/';

// let ZOOM = 1;
export default {
  data() {
    return {
      MODELS: MODELS,
      MODEL_THUMBNAIL_DOMAIN: MODEL_THUMBNAIL_DOMAIN,
      MODEL_ORIGIN_DOMAIN: MODEL_ORIGIN_DOMAIN,
      ratio: 100,
      Pic: {
        // 缩略图
        thumbnail: '',
        // 模特的序号
        activeIndex: '',
        // 原图
        origin: '',
        // 上传的图片
        uploadPic: ''
      }
    };
  },
  props: ['chooseItem'],
  created() {
    this.Pic.activeIndex = 0;
    if (sessionStorage['flowerUrl']) {
      this.Pic.uploadPic = sessionStorage['flowerUrl'];
    }
  },
  destoryed() {
    sessionStorage.removeItem('flowerUrl');
  },
  watch: {
    Pic: {
      handler(val) {
        val.origin = MODEL_ORIGIN_DOMAIN + MODELS[val.activeIndex];
        val.thumbnail = MODEL_THUMBNAIL_DOMAIN + MODELS[val.activeIndex];
      },
      deep: true
    },
    chooseItem(val) {
      this.Pic.uploadPic = val;
    }
  },
  computed: {
    hasUploadPic() {
      return !this.Pic.uploadPic;
    }
  },
  methods: {
    handleChooseProduct() {},
    handleUpload(event) {
      let self = this;
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        self.Pic.uploadPic = this.result;
      };
    },
    handleZoom(type) {
      this.ratio = type === '+' ? this.ratio + (++this.ratio) / 10 : this.ratio - (this.ratio--) / 10;
    },
    handleViewModels(item, index) {
      this.Pic.origin = MODEL_ORIGIN_DOMAIN + item;
      this.Pic.activeIndex = index;
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace dress{
  @component upload{
    min-height: 300px;
    box-sizing: border-box;
    padding-left: 50px;
    position: relative;
    @descendent img{
      width: 280px;
      height: 280px;
      overflow: hidden;
      transition: all 0.8s;
    }
    @modifier text{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      color: grey;
    }
    @descendent zoom{
      position: absolute 4px 10px;
      p{
        border: 1px solid #eaeaea;
        width: 30px;
        height: 30px;
        cursor: pointer;
        line-height: 27px;
        font-size: 22px;
        text-align: center;
        margin-bottom: 10px;
        transition: .8s;
        &:hover{
          border-color:#4c93fd;
          color:#4c93fd;
        }
      }
    }
  }
  @component active{
    box-shadow: 0 2px 4px 0 rgba(76,147,253,0.30), 0 0 6px 0 rgba(76,147,253,0.30);
  }
  @component wrapper{
    display: flex;
    @descendent left{
      flex-basis: 70%;
    }
    @descendent right{
      flex-basis: 30%;
      margin-left: 10px;
      padding-right: 10px;
      margin-top: 10px;
    }
  }
}
.transition{
  transition: all 0.8s;
}
</style>
