<template lang="html">
  <div class="mirco-wrapper">
    <div class="mirco-img" v-for="item in albumPicsList.list">
      <!-- 图片 -->
      <ts-image :src="item.photoUrl" width="160" height="160" :key="item.id"></ts-image>
      <!-- 选用模板 -->
      <span class="mirco-img-tip" v-show="!Edit.status">
          选用模板
      </span>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="css" scoped>
:root{
  --material-img-tip-height: 28px;
  --material-img-tip-height: 28px;
  --material-img-tip-bg: rgba(0,0,0,0.4);
  --material-img-tip-text-color: #fff;
  --material-add-icon-hover-color: #4c93fd;
}
@component-namespace mirco{
  @component img{
    margin: 0 18px 18px 0;
    display: inline-block;
    position: relative;
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
