<template lang="html">
  <div class="mirco-wrapper">
    <div class="mirco-img" v-for="(item,index) in siteList">
      <span class="mirco-chosed" v-if="index===siteIdx">已选</span>
      <!-- 图片 -->
      <ts-image :src="item.templatePath" width="200" height="300" :key="item.templateName"></ts-image>
      <!-- 选用模板 -->
      <span class="mirco-img-tip" @click="handleChooseTemplate(item,index)" v-if="index!==siteIdx">
          选用模板
      </span>
    </div>
  </div>
</template>

<script>
import {
  MIRCO_SITE
} from '@/common/dict/const';
import {
  updateWebsiteTemplate,
  getWebsiteTemplate
} from '@/common/api/api';
export default {
  data() {
    return {
      siteList: MIRCO_SITE,
      siteIdx: ''
    };
  },
  async created() {
    let data = (await getWebsiteTemplate()).data.data;
    this.siteIdx = this.siteList.findIndex(item => item.templateName === data.templateName);
  },
  methods: {
    handleChooseTemplate(item, index) {
      this.$messagebox.confirm('确定选用此模版？').then(async() => {
        await updateWebsiteTemplate(item);
        this.siteIdx = index;
      });
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
      .mirco-img-tip{
        display:block;
      }
    }
  }
  @component chosed{
    position: absolute 0 0 * *;
    background: #FF8400;
    padding: 4px 6px;
    z-index: 1;
    color: #fff;
  }
}
</style>
