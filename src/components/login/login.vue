<template>
  <div class="login">
    <div class="login-content">

      <div class="header">
        <div class="header-item active">
          <span class="text">密码登录</span>
        </div>
        <div class="header-item">
          <span class="text">下载APP</span>
        </div>
      </div>

      <div class="login-body">
        <div class="login-main">

          <div class="input-wrapper">
            <div class="input-phone">
              <span class="text">手机号码{{ userData.userMobile }}</span>
              <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="userData.userMobile" @input="userMobileIpt">
            </div>
            <div class="input-password">
              <span class="text">密码 {{ userData.userPWD }}</span>
              <input type="password" placeholder="请输入密码" v-model="userData.userPWD" @input="userPWDIpt">
            </div>
          </div>

          <div class="tools-wrapper">
            <div class="remember">
              <i class="iconfont">字</i>
              <span class="text">记住密码2</span>
            </div>
            <div class="forget">
              <router-link to="/forgotPasswordPage">忘记密码?</router-link>
            </div>
          </div>

          <div class="btn-wrapper">
            <button class="btn btn-blue" @click="login">登录</button>
          </div>

          <div class="register-wrapper">
            没有账号? <router-link to="/registerPage">立即注册</router-link>
          </div>

        </div>
        <div class="download-main">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as reg from '../../common/js/regExp';
// import axios from 'axios';
import {login} from '../../common/api/api';
export default {
  data() {
    return {
      userData: {
        userMobile: '',
        userPWD: '',
        picCode: ''
      }
    };
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
    login() {
      if (!reg.testMobile(this.userData.userMobile) || !reg.testPWD(this.userData.userPWD)) {
        console.log(this.userData);
        alert('账号或密码格式错误，请重试！');
        return;
      }
      // let data = JSON.stringify(this.userData);
      // console.log('userData', this.userData);
      login(this.userData).then((res) => {
          console.log('success', res);
        }).catch((res) => {
          console.info('error', res);
        });
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

</style>
