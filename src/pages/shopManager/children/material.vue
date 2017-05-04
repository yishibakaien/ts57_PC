<template lang="html">
  <ts-section>
    <div slot="menu">
      <button class="button" :class="Edit.status?'':'button-blue'" @click="Edit.status=!Edit.status">{{Edit.text}}</button>
    </div>
    <div slot="body">
      <ts-image :src="item.url" width="160" height="160" bottomText="入仓" bottomIcon="menu" @handleImg="chooseImg(item.id)" :key="item.id" v-for="item in imgList" :needChoose="Edit.status" needMenu class="material-img"></ts-image>
    </div>
    <div slot="footer">
      <button class="button button-blue" :disabled="true">删除</button>
    </div>
  </ts-section>
</template>

<script>
export default {
  data() {
    return {
      chosedImg: [],
      // 编辑状态
      Edit: {
        text: '编辑',
        status: false
      },
      // 是否编辑状态
      imgList: [{
        id: 12,
        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1749831145,2853971587&fm=23&gp=0.jpg'
      }, {
        id: 1211,
        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1749831145,2853971587&fm=23&gp=0.jpg'
      }]
    };
  },
  watch: {
    Edit: {
      handler(val) {
        val.text = val.status ? '取消' : '编辑';
      },
      deep: true
    }
  },
  methods: {
    chooseImg(id) {}
  }
};
</script>

<style lang="css" scoped>
@component-namespace material{
  @component img{
    margin: 0 18px 18px 0;
  }
}
</style>
