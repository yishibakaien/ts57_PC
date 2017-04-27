<template>
  <div class="login">
    <div class="login-content">

      <div class="header">
        <div class="header-item" :class="{active: showLogin}" @click="showLoginfunc">
          <span class="text">密码登录</span>
        </div>
        <div class="header-item" :class="{active: !showLogin}" @click="hideLoginFunc">
          <span class="text">下载APP</span>
        </div>
      </div>

      <div class="login-body">
        <div class="login-main" v-if="showLogin">

          <div class="input-wrapper">

            <div class="input-phone">
              <span class="text">手机号码</span>
              <input class="input" type="tel" placeholder="请输入手机号码" maxlength="11" v-model="userData.userMobile" @input="userMobileIpt">
            </div>

            <div class="input-password">
              <span class="text">密码</span>
              <input class="input" type="password" placeholder="请输入密码" v-model="userData.userPWD" @input="userPWDIpt">
            </div>

          </div>

          <div class="tools-wrapper">
            <div class="remember">
              <i class="iconfont">字</i>
              <span class="text">记住密码</span>
            </div>
            <div class="forget">
              <router-link to="/forgotPasswordPage">忘记密码?</router-link>
            </div>
          </div>

          <div class="btn-wrapper">
            <button class="button button-blue button-block" @click="loginMethod">登录</button>
          </div>

          <div class="register-wrapper">
            没有账号? <router-link class="text" to="/registerPage">立即注册</router-link>
          </div>

        </div>

        <div class="download-main" v-if="!showLogin">
          我是二维码
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as reg from '../../common/js/regExp';
import * as types from '../../store/types';

import {login} from '../../common/api/api';
export default {
  data() {
    return {
      userData: {
        userMobile: '',
        userPWD: '',
        picCode: ''
      },
      showLogin: true
    };
  },
  computed: {

  },
  methods: {
    userMobileIpt() {
      if (reg.testMobile(this.userData.userMobile)) {
        console.log(1);
      }
    },
    userPWDIpt() {
      if (reg.testPWD(this.userData.userPWD)) {
        console.log(2);
      }
    },
    loginMethod() {
      if (!reg.testMobile(this.userData.userMobile) || !reg.testPWD(this.userData.userPWD)) {
        alert('账号或密码格式错误，请重试！');
        return;
      }
      login(this.userData).then((res) => {
          console.log('返回的用户信息', res);
          console.info('返回的用户信息的x-token', res.headers['x-token']);
          if (res.data.code === 0) {
            this.$store.commit(types.USER_NAME, res.data.data.userName);
            this.$store.commit(types.LOGIN, res.headers['x-token']);
            this.$store.commit(types.LOGIN_MASK, false);
            // 路由重定向
            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            this.$router.push({
              path: redirect
            });
          } else {
            alert('请求错误');
          }
        }, (res) => {
          console.log('出现错误', res);
        });
    },
    showLoginfunc() {
      this.showLogin = true;
    },
    hideLoginFunc() {
      this.showLogin = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
  .login
    width 360px
    background #fff
    .login-content
      .header
        display flex
        height 48px
        line-height 48px
        font-size 18px
        font-weight 700
        border-bottom 1px solid #f1f1f1
        .header-item
          flex 1
          text-align center
          &.active .text
            color #3385ff
            border-bottom 2px solid #3385ff
          .text
            display inline-block
            height 48px
      .login-body
        padding 32px
        .login-main
          .input-wrapper
            .input-phone,.input-password
              padding 16px 0 8px 0
              .text,.input
                display inline-block
                vertical-align bottom
                width 80px
                height 30px
                line-height 30px
              .input
                width 200px
                padding-left 8px
                vertical-align bottom
                font-size 16px
                border 0
                border-bottom 1px solid #d8d8d8
          .tools-wrapper
            height 32px
            line-height 32px
            padding-top 8px
            font-size 14px
            .remember
              float left
            .forget
              float right
          .btn-wrapper
            padding 8px 0 16px 0
          .register-wrapper
            font-size 14px
            .text
              color #3385ff
</style>
