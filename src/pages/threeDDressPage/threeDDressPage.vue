<template>
  <div class="threeDDress">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="dress-box">

      <div class="left-side">
        <div class="title">
          <span class="text">3D试衣</span>
          <div class="file">
            <i class="iconfont">字</i>
            <span>保存图片</span>
          </div>
        </div>
          <!-- {background: 'url(' + patterns + ')'} -->
        <div class="modle-wrapper" :style="{background:'url('+ patterns + ')', backgroundSize: bgSize + '%'}">
          <img :src="modle" class="modle" width="100%">
        </div>
      </div>

      <div class="right-side">

        <div class="patterns-preview">
          <div class="title">
            <span class="text">花型预览</span>
            <div class="file">
              <i class="iconfont">字</i>
              <span>上传花型</span>
              <input class="upload-btn" type="file" @change="uploadPic($event)">
            </div>
          </div>

          <div class="patterns-wrapper">
            <div class="btn">
              <i class="iconfont" @click.stop.prevent="add">+</i>
              <i class="iconfont" @click.stop.prevent="decrease">-</i>
            </div>
            <div class="patterns">
                <img class="patterns-img" :src="patterns">
            </div>
          </div>

          <div class="bottom" v-if="true">
            <div class="bottom-btn">
              <i class="iconfont">字</i>
              <span>收藏花型</span>
            </div>
            <div class="bottom-btn">
              <i class="iconfont">字</i>
              <span>花型详情</span>
            </div>
          </div>
        </div>

        <div class="choose-modles">
          <div class="title">
            <span class="text">选择模特</span>
          </div>
          <div class="modles">
            <div class="modle" :class="{ 'active': item.isActive }" v-for="(item, index) in modlesPrototype" @click="chooseModle(item, index)">
              <img :src="item.url" width="100%">
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { header, nav } from '../../components';
import uploadPicture from '../../common/js/uploadPicture';
// import blackTip from '../../common/js/blackTip';

let modlesPrototype = [
  { url: '/static/images/modles_prototype/modle1_all.jpg', isActive: true },
  { url: '/static/images/modles_prototype/modle1_back.jpg', isActive: false },
  { url: '/static/images/modles_prototype/modle1_front.jpg', isActive: false },
  { url: '/static/images/modles_prototype/modle1_side.jpg', isActive: false },
  { url: '/static/images/modles_prototype/modle2_all.jpg', isActive: false },
  { url: '/static/images/modles_prototype/modle2_back.jpg', isActive: false },
  { url: '/static/images/modles_prototype/modle2_front.jpg', isActive: false },
  { url: '/static/images/modles_prototype/modle2_side.jpg', isActive: false },
  { url: '/static/images/modles_prototype/modle3_all.jpg', isActive: false },
  { url: '/static/images/modles_prototype/modle3_back.jpg', isActive: false },
  { url: '/static/images/modles_prototype/modle3_front.jpg', isActive: false },
  { url: '/static/images/modles_prototype/modle3_side.jpg', isActive: false }
];

// 花纹放大或缩小的比例梯度 (%)
const STEP = 10;

// 花纹最大比例
const MAX_SIZE = 180;

// 花纹最小缩放比例
const MIN_SIZE = 20;

// 根据模特小图URL，生成模特大图URL
function _createModleURL(url) {
  return url.split('modles_prototype').join('modles').split('jpg').join('png');
}

export default {
  data() {
    return {
      modlesPrototype: modlesPrototype,
      modle: (function() {
        for (let i = 0; i < modlesPrototype.length; i++) {
          if (modlesPrototype[i].isActive) {
            return _createModleURL(modlesPrototype[i].url);
          }
        }
      })(),
      // isActive: false,
      patterns: '',
      bgSize: 100
    };
  },
  methods: {
    chooseModle(item, index) {
      this.modle = _createModleURL(item.url);
      this.modlesPrototype.forEach((item) => {
        item.isActive = false;
      });
      this.modlesPrototype[index].isActive = true;
    },
    uploadPic(e) {
      const _this = this;
      let file = e.target.files[0];
      uploadPicture(file).then((result) => {
        _this.patterns = result;
      });
    },
    add() {
      console.log(this.bgSize);
      if (this.bgSize < MAX_SIZE) {
        this.bgSize += STEP;
      }
    },
    decrease() {
      if (this.bgSize >= MIN_SIZE) {
        console.log(this.bgSize);
        this.bgSize -= STEP;
      }
    }
  },
  components: {
    'vHeader': header,
    'vNav': nav
  }
};
</script>

<style lang="stylus" scoped>
.threeDDress
  background #f2f2f2
  .dress-box
    display flex
    width 1200px
    margin 0 auto
    padding 16px 0
    & .title
      height 48px
      line-height 48px
      margin-top -8px
      border-bottom 1px solid #d8d8d8
      .file
        float right
        height 32px
        line-height 32px
        margin-top 8px
        padding 0 4px
        background rgba(7, 17, 27, .1)
        color #3385ff
    .left-side
      flex 1
      padding 8px
      border 1px solid #d8d8d8
      background #fff
      .modle-wrapper
        text-align center
        background #f1f1f1

    .right-side
      flex 0 0 360px
      width 360px
      margin-left 16px
      .patterns-preview, .choose-modles
        padding 8px
        border 1px solid #d8d8d8
        background #fff
      .patterns-preview .patterns-wrapper
        display flex
        .btn
          flex 0 0 48px
          margin-left -8px
          // border-right 1px solid red
          .iconfont
            display block
            margin 8px
            text-align center
            color #000
            border 1px solid #000
        .patterns
          flex 1
          height 300px
          margin-top 8px
          background #f1f1f1
          text-align center
          overflow hidden
          position relative
          .patterns-img
            height 100%;
            position absolute
            top 50%
            left 50%
            transform translateX(-50%) translateY(-50%)
      .patterns-preview .bottom
        display flex
        height 48px
        margin 8px 0 -8px 0
        text-align center
        color #3385ff
        border-top 1px solid #d8d8d8
      .patterns-preview .file
        position relative
        .upload-btn
          position absolute
          display block
          top 0
          width 90px
          height 32px
          // background red
          opacity 0
          cursor pointer
      .bottom-btn
        flex 1
        height 24px
        line-height 24px
        margin-top 12px
        &:first-child
          border-right 1px solid #d8d8d8
      .choose-modles
        margin-top 8px
        .modles
          // height 400px
          padding-bottom 8px
          text-align center
          overflow-y scroll
          .modle
            float left
            width 30%
            margin-left 3%
            margin-top 16px
            box-shadow 0 0 10px rgba(0, 0, 0, .2)
          .modle.active
            box-shadow 0 0 10px #3385ff
            // border 1px solid red

</style>
