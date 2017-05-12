<template>
<ts-section pageTitle="公司资质" class="aptitude">
  <div slot="menu">
    <ts-button type="primary" @click="handleEditAptitude">{{Close.buttonText}}</ts-button>
  </div>
  <div class="aptitude-row">
    <div class="aptitude-col-4 aptitude-container" v-for="(item,index) in srcImg">
      <i class="aptitude-container-close" @click.self="handleDelAptitude(item)" v-if="Close.isShow">&times</i>
      <ts-image height="200" class="aptitude-img" v-model="srcImg[index]" />
    </div>
    <div class="aptitude-plus-img">
    </div>
  </div>
</ts-section>
</template>

<script>
import {
  // saveCompanyAptitude,
} from '@/common/api/api';
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      Close: {
        buttonText: '编辑',
        isShow: false
      },
      // 显示关闭的按钮
      showClose: false,
      srcImg: ['http://n.sinaimg.cn/transform/20150106/n1I3-cesifvy2915370.jpg', 'http://n.sinaimg.cn/transform/20150106/n1I3-cesifvy2915370.jpg',
      'http://n.sinaimg.cn/transform/20150106/n1I3-cesifvy2915370.jpg', 'http://n.sinaimg.cn/transform/20150106/n1I3-cesifvy2915370.jpg']
    };
  },
  methods: {
    handleDelAptitude(i) {
      this.$messagebox.confirm('确定删除吗？').then(action => {
        this.srcImg.splice(i, 1);
      });
    },
    handleEditAptitude() {
      // this.aptitude.aptitudeUrl
    }
  },
  computed: {
    ...mapGetters(['aptitude'])
  },
  watch: {
    Close: {
      handler(val) {
        val.buttonText = val.isShow ? '保存' : '编辑';
      },
      deep: true
    }
  }
};
</script>

<style lang="css" scoped>
:root{
  --aptitude-absolute:-4px;
  --aptitude-close-color: white;
  --aptitude-close-bg: red;
  --aptitude-close-hover-bg: #bc0303;
  --aptitude-close-size: 20px;
}
@component-namespace aptitude {
  @component row{
    @neat-outer-container;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  @component col-4{
    @neat-span-columns 4;
    margin-right: 1%;
    margin-top: 1%;
    min-height: 200px;
  }
  @component plus-img{
    display: inline-block;
    size:120px 120px;
    border: 1px solid rgba(155,155,155,0.2);
    text-align: center;
    position: relative;
    font-size: 100px;
    font-weight: 100;
    cursor: pointer;
    color: rgba(155,155,155,0.8);
    &:hover{
      color:rgba(155,155,155,1);
    }
    &:after{
      position:absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-60%);
      content:"+";
    }
  }
  @component container{
    position: relative;
    @descendent close{
      position: absolute var(--aptitude-absolute) var(--aptitude-absolute) * *;
      border-radius: 50%;
      text-align: center;
      font-size: 17px;
      cursor: pointer;
      background: var(--aptitude-close-bg);
      color: var(--aptitude-close-color);
      size: var(--aptitude-close-size) var(--aptitude-close-size);
      transition: .3s;
      z-index: 1;
      &:hover {
        background: var(--aptitude-close-hover-bg);
      }
    }
  }
  @component img {
    max-width: 100%;
    min-height: 100%;
  }
}
</style>
