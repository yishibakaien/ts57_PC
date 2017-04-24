<template>
  <div class="topbar">
    <div class="content">
      <div class="left">
        <span class="welcome">欢迎来到统搜57！</span>
        <router-link v-if="!isLogin" to="/loginPage" class="link">登录</router-link>
        <router-link v-if="!isLogin" to="/registerPage" class="link">免费注册</router-link>
      </div>

      <div class="right">
        <a @click="gowhere" class="link">个人中心</a>
        <div class="app-qrcode">
          <i class="iconfont">字</i>
          <span>手机坐视布管</span>
          <div class="qrcode-content">
            <div class="qrcode clearfix">
              <div class="img-wrapper">
                <img src="" width="100" height="100">
              </div>

              <div class="desc">
                <p class="title">手机坐视布管</p>
                <p class="red">扫码即可下载</p>
                <div class="app-type clearfix">
                  <div class="andriod">
                    <i class="iconfont">字</i>
                    <span>安卓</span>
                  </div>
                  <div class="ios">
                    <i class="iconfont">字</i>
                    <span>IOS</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="qrcode clearfix">
              <div class="img-wrapper">
                <img src=""  width="100" height="100">
              </div>
              <div class="desc">
                <p class="title">关注微信公众号</p>
                <p class="red">扫码即可关注</p>
                <div class="text"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.token;
    }
  },
  methods: {
    gowhere() {
      this.$router.push({
        path: this.isLogin ? '/personalCenterPage' : '/loginPage'
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
  .topbar
    height 40px
    line-height 40px
    font-size 13px
    color #353535
    background #f1f1f1
    .link:hover
      color #3385ff
    .content
      width 1200px
      margin 0 auto
      .left
        height 40px
        float left
        .welcome
          display inline-block
          margin-right 12px
        .link
          display inline-block
          height 13px
          line-height 13px
          padding 0 8px
          &:last-child
            border-left 1px solid #ddd
      .right
        float right
        height 40px
        .app-qrcode
          display inline-block
          position relative
          margin-left 20px
          cursor pointer
          &:hover .qrcode-content
            display block
          .qrcode-content
            display none
            position absolute
            z-index 1
            line-height 1
            padding 0 12px
            right 0
            border 1px solid #d8d8d8
            background #fff
            .qrcode
              width 100px
              height 100px
              margin 12px 0
              width 220px
              &:first-child
                padding-bottom 12px
                border-bottom 1px solid #d8d8d8
              .img-wrapper
                float left
                width 100px
              .desc
                float left
                margin-left 12px
                height 100px
                .title
                  font-size 15px
                  line-height 30px
                .red
                  font-size 13px
                  color #f53535
                  line-height 30px
                .app-type
                  height 40px

                  .andriod,.ios
                    float left
                    line-height 40px

</style>
