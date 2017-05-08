<template>
<ts-section pageTitle="公司资质" class="aptitude">
  <div slot="menu">
    <ts-button type="primary">编辑</ts-button>
  </div>
  <div class="aptitude-row">
    <div class="aptitude-col-4" v-for="n in 4">
      <ts-image height="200" class="aptitude-img" src="http://n.sinaimg.cn/transform/20150106/n1I3-cesifvy2915370.jpg" />
    </div>
  </div>
</ts-section>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
@component-namespace aptitude {
  @component row{
    @neat-outer-container;
  }
  @component col-4{
    @neat-span-columns 4;
    margin-right: 1%;
    margin-top: 1%;
    min-height: 200px;
  }
  @component img {
    max-width: 100%;
    min-height: 100%;
  }
}
</style>
