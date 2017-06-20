<template>
<ts-section>
  <div slot="title">
    中转仓管理<span class="pot-warning" @click="Material.tip=!Material.tip">!</span>
  </div>
  <div>
    <!-- 顶部tip -->
    <div class="material-tip">
      <p class="material-tip-title">中转仓功能简介：</p>
      <p class="material-tip-content">素材库是平台推出的线上花型素材管理工具，支持本地花型图片批量上传至对应新建或现有花型素材文件夹，文件夹可自定义名称及花型公共属性的添加，它是您的线上花型管理贴心小管家！</p>
    </div>
    <!-- 空 -->
    <p class="material-empty">
      您的素材库无文件夹，赶紧新建花型文件夹吧
      <ts-button type="plain" size="large">+ 新建花型文件夹</ts-button>
    </p>
  </div>
  <!-- 对话框----功能说明  -->
  <ts-dialog v-model="Material.tip" title="中转仓功能说明" type="alert" alertText="我知道了" @confirm="Material.tip=false">
    <article class="message-phone-dialog">
      中转仓是平台推出的线上花型素材管理工具，支持本地花型图片批量上传至对应新建或现有花型素材文件夹，文件夹可自定义名称及花型公共属性的添加，它是您的线上花型管理贴心小管家！
    </article>
  </ts-dialog>
</ts-section>
</template>

<script>
export default {
  data() {
    return {
      Material: {
        tip: false
      }
    };
  }
};
</script>

<style lang="css">
@component-namespace material{
  @component empty{
    display: table;
    margin: 20px auto;
    color: #666;
  }
  @component tip{
    background: #FFF7E3;
    padding: 10px;
    border: 1px solid #f2d794;
    border-radius: 4px;
  }
}
</style>
