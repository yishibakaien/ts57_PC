<template lang="html">
  <div @mouseover="isSHow=true" @mouseout="isSHow=false" class="ts-image" :style="{width:width+'px',height:height+'px'}" @click="handleImg">
    <img :src="src"  class="ts-image-img">
    <!-- <ts-check class="ts-image-check--side" v-if="needChoose"></ts-check> -->
    <!-- <p class="ts-image-bottom" v-show="isSHow" v-if="!needChoose">
      <span class="iconfont" :class="'icon-'+bottomIcon"></span>
      {{bottomText}}
    </p> -->
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     isSHow: false
  //   };
  // },
  // components: {
  //   tsCheck
  // },
  // src--图片SRC
  // width/height--图片宽高
  // bottomText--底部菜单的文字
  // icon-底部菜单的图标
  // needMenu-是否需要底部菜单
  // needMenu-是否需要多选
  props: {
    // needMenu: {
    //   type: Boolean,
    //   default: false
    // },
    // needChoose: {
    //   type: Boolean,
    //   default: false
    // },
    src: {
      type: String
    },
    // bottomIcon: {
    //   type: String
    // },
    // bottomText: {
    //   type: String
    // },
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
