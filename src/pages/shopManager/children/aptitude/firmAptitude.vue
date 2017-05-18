<template>
<ts-section pageTitle="公司资质" class="aptitude">
  <div slot="menu">
    <ts-button type="primary" @click="handleEditAptitude">{{Close.buttonText}}</ts-button>
  </div>
  <div class="aptitude-row">
    <div class="aptitude-col-4 aptitude-container" v-for="(item,index) in aptitudeFirm.aptitudeUrl">
      <i class="aptitude-container-close" @click.self="handleDelAptitude(item, index)" v-if="Close.isShow">&times</i>
      <ts-image height="200" class="aptitude-img" :src="item" />
    </div>
    <div class="aptitude-container" v-if="!aptitudeFirm.aptitudeUrl.length&&!Close.isShow">
      暂无资质图片
    </div>
    <label class="aptitude-plus-img" v-if="Close.isShow">
        <ts-aliupload :id="Pic.id" @doUpload="upload"></ts-aliupload>
    </label>
  </div>
</ts-section>
</template>

<script>
import {
  saveCompanyAptitude
} from '@/common/api/api';
import {
  ALI_DOMAIN
} from '@/common/dict/const';
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
      aptitudeFirm: {
        aptitudeUrl: []
      },
      Pic: {
        id: 'firmapitude'
      },
      // 显示关闭的按钮
      showClose: false
    };
  },
  methods: {
    // 上传图片
    upload(e) {
      // 放到表单
      this.aptitudeFirm.aptitudeUrl.push(ALI_DOMAIN + e.ossUrl[e.ossUrl.length - 1]);
    },
    // 删除
    handleDelAptitude(item, index) {
      this.$messagebox.confirm('确定删除该图片吗？').then(action => {
        this.aptitudeFirm.aptitudeUrl.splice(index, 1);
      });
    },
    // 编辑资质图片
    async handleEditAptitude() {
      this.Close.isShow = !this.Close.isShow;
      if (!this.Close.isShow && this.aptitudeFirm.aptitudeUrl) {
        await saveCompanyAptitude({
          aptitudeUrl: this.aptitudeFirm.aptitudeUrl.toString()
        });
      }
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
    },
    aptitude: {
      handler(val) {
        this.aptitudeFirm.aptitudeUrl = !val.aptitudeUrl ? [] : val.aptitudeUrl.split(',');
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
    transition: .5s;
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
      z-index: 2;
      cursor: pointer;
      background: var(--aptitude-close-bg);
      color: var(--aptitude-close-color);
      size: var(--aptitude-close-size) var(--aptitude-close-size);
      transition: .3s;
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
