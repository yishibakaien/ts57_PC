<template>
<div class="topbar">
  <div class="content">
    <div class="left">
      <span class="welcome">坐视布管欢迎你!</span>
      <router-link v-if="!isLogin" to="/loginPage" class="link">登录</router-link>
      <router-link v-if="!isLogin" to="/registerPage" class="link">免费注册</router-link>
      <span v-if="isLogin" class="username">{{userInfo.userName}}</span>
      <span v-if="isLogin" class="logout" @click="logoutMethod">[退出]</span>
    </div>

    <div class="right">
      <a @click="gowhere" class="link">个人中心</a>
      <div class="app-qrcode">
        <i class="iconfont icon-shouji"></i>
        <span>坐视布管</span>
        <div class="qrcode-content">
          <div class="qrcode clearfix">
            <div class="img-wrapper">
              <img src="" width="100" height="100">
            </div>

            <div class="desc">
              <p class="title">坐视布管</p>
              <p class="red">扫码即可下载</p>
              <div class="app-type clearfix">
                <div class="andriod">
                  <i class="iconfont icon-anzhuo"></i>
                </div>
                <div class="ios">
                  <i class="iconfont icon-iOS"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="qrcode clearfix">
            <div class="img-wrapper">
              <img src="" width="100" height="100">
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
import * as types from '../../store/types';
import {
  getUserInfo
} from '@/common/api/api';
import {
  mapGetters
} from 'vuex';
export default {
  async created() {
    if (this.$store.state.accessToken) {
      let data = (await getUserInfo()).data.data;
      this.$store.commit('GET_USERINFO', data);
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    isLogin() {
      return this.$store.state.accessToken;
    }
  },
  methods: {
    gowhere() {
      this.$router.push({
        path: this.isLogin ? '/personalCenterPage' : '/loginPage'
      });
    },
    logoutMethod() {
      this.$store.commit(types.LOGOUT);
      this.$router.push({
        path: '/homePage'
      });
    }
  }
};
</script>
<style lang="scss" scoped>
	.icon-shouji::before {
		color: #4c93fd;
	}
</style>
<style lang="stylus" scoped>
  .topbar
    height 33px
    line-height 33px
    box-sizing border-box
    border-bottom 1px solid #d8d8d8
    font-size 12px
    color #999
    background #f2f2f2
    .content
      width 1200px
      margin 0 auto
      .left
        height 33px
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
        .logout
          cursor pointer
          &:hover
            color #3385ff
      .right
        float right
        height 33px
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
            z-index 2
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
                  .icon-anzhuo::before
                  	color #38b338
                  	font-size 22px
                  	vertical-align middle
                  .icon-iOS::before
                  	position relative
                  	top 4px
                  	color #666
										font-size 24px
                  	vertical-align middle
                  .andriod
                  	margin-right 10px
</style>
