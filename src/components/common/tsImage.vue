<template lang="html">
  <div @mouseover="isSHow=true" @mouseout="isSHow=false" class="ts-image" :style="{width:width+'px',height:height+'px'}" @click="handleImg">
    <img :src="type==='local'?src:domain+src"  class="ts-image-img">
  </div>
</template>

<script>
import {ALI_DOMAIN} from '@/common/dict/const';
export default {
  data() {
    return {
      domain: ALI_DOMAIN
    };
  },
  // src--图片SRC
  // width/height--图片宽高
  // type-类型：主要是判断是否要加ALi前缀，本地不加（默认显示base）,网络加（默认加阿里前缀）
  props: {
    type: {
      type: String,
      default: 'alioss',
      validator(value) {
        return [
          'local',
          'alioss'
        ].indexOf(value) > -1;
      }
    },
    src: {
      type: String
    },
    height: {
      type: String
    },
    width: {
      type: String
    }
  },
  methods: {
    handleImg() {
      this.$emit('handleImg');
    }
  }
};
</script>

<style lang="css" scoped>
@import '../../common/css/var.css';
@component-namespace ts{
  @component image{
    --color:#fff;
    overflow: hidden;
    display: inline-block;
    position: relative;
    border:1px solid rgba(155,155,155,0.1);
    box-sizing: border-box;
    @descendent img{
      max-width: 100%;
      min-height: 100%;
      vertical-align: middle;
    }
    @descendent check{
      position: absolute 0 0 0 0;
      width: 100%;height: 100%;
      color: red;
      @modifier side{
        position: absolute 4px * * 4px;
      }
    }
    @descendent bottom{
      position: absolute * 0 0 0;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
      transition: 0.3s;
      color: var(--imageColor) var(--imageBtBg);
    }
  }
}
</style>
