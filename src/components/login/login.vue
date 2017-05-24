<template>
<div class="login">
  <div class="login-content">

    <div class="header">
      <div class="header-item" :class="{active: showLogin}" @click="showLoginfunc">
        <span class="text">用户登录</span>
      </div>
      <div class="header-item" :class="{active: !showLogin}" @click="hideLoginFunc">
        <span class="text">APP下载</span>
      </div>
    </div>

    <div class="login-body">
      <div class="login-main" v-if="showLogin">

        <div class="input-wrapper">
          <div class="input-phone" :class="{warn: telTip}">
            <div class="tip" v-if="telTip">{{telTip}}</div>
            <i class="text iconfont">字</i>
            <input class="input" type="text" placeholder="请输入手机号码" maxlength="11" v-model="userData.userMobile" @input="userMobileIpt" @blur="checkTel">
          </div>

          <div class="input-password" :class="{warn: passwordTip}">
            <div class="tip" v-if="passwordTip">{{passwordTip}}</div>
            <i class="text iconfont">字</i>
            <input class="input" type="password" maxlength="16" placeholder="请输入密码" v-model="userData.userPWD" @input="userPWDIpt" @blur="checkPWD">
          </div>

          <div class="input-imgCode" v-if="showPicCode">
            <i class="text iconfont">字</i>
            <input class="input" type="text" placeholder="请输入图形验证码" v-model="userData.picCode">
            <img :src="imgCode" alt="picCode" @click="getVerifyCodeMethod" />
          </div>

        </div>

        <div class="tools-wrapper">
          <div class="remember">
            <!-- <i class="iconfont">字</i>
              <span class="text">记住密码</span> -->
          </div>
          <div class="forget">
            <router-link to="/forgotPasswordPage">忘记密码?</router-link>
          </div>
        </div>

        <div class="btn-wrapper">
          <button class="button button-blue button-block" @click="loginMethod">登录</button>
        </div>

        <div class="register-wrapper">
          没有账号?
          <router-link class="text" to="/registerPage">立即注册>></router-link>
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
import * as reg from '@/common/js/regExp';
import * as types from '@/store/types';

import {
  login,
  getVerifyCode
} from '@/common/api/api';
export default {
  data() {
    return {
      showPicCode: false,
      imgCode: '',
      telTip: '',
      passwordTip: '',
      userData: {
        userMobile: '',
        userPWD: '',
        picCode: ''
      },
      showLogin: true
    };
  },
  computed: {},
  methods: {
    checkTel() {
      if (!reg.testMobile(this.userData.userMobile)) {
        this.telTip = '请输入正确的手机号码';
      }
    },
    checkPWD() {
      if (!reg.testPWD(this.userData.userPWD)) {
        this.passwordTip = '密码长度为6-16位';
      }
    },
    userMobileIpt() {
      if (reg.testMobile(this.userData.userMobile)) {
        this.telTip = '';
      }
    },
    userPWDIpt() {
      if (reg.testPWD(this.userData.userPWD)) {
        this.passwordTip = '';
      }
    },
    getVerifyCodeMethod() {
      getVerifyCode().then((res) => {
        this.imgCode = 'data:image/jpeg;base64,' + res.data.data;
      }).catch();
    },
    loginMethod() {
      if (!reg.testMobile(this.userData.userMobile) || !reg.testPWD(this.userData.userPWD)) {
        return;
      }
      login(this.userData).then((res) => {
        if (res.data.code === 0) {
          this.$store.commit(types.USER_NAME, res.data.data.userName);
          this.$store.commit('GET_USERINFO', res.data.data);
          this.$store.commit(types.LOGIN, res.headers['x-token']);
          this.$store.commit(types.AJAX, res.headers['x-token']);
          this.$store.commit(types.LOGIN_MASK, false);
          this.$store.dispatch('getDicTree');
          // 路由重定向
          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
          this.$router.push({
            path: redirect
          });
        } else if (res.data.code === 2000004) {
          this.showPicCode = true;
          this.getVerifyCodeMethod();
        } else {
          this.getVerifyCodeMethod();
        }
      }, (res) => {
        this.getVerifyCodeMethod();
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

<style lang="scss" scoped>
.login {
    width: 360px;
    background: #fff;
    .login-content {
        .header {
            display: flex;
            height: 60px;
            line-height: 60px;
            font-size: 18px;
            font-weight: 700;
            border-bottom: 1px solid #f1f1f1;
            .header-item {
                flex: 1;
                text-align: center;
                &.active .text {
                    color: #3385ff;
                    border-bottom: 2px solid #3385ff;
                }
                .text {
                    display: inline-block;
                    height: 60px;
                    cursor: pointer;
                }
            }
        }
        .login-body {
            padding: 32px;
            .login-main {
                .input-imgCode,
                .input-password,
                .input-wrapper .input-phone {
                    position: relative;
                    padding: 6px 0;
                    margin-top: 28px;
                    border: 1px solid rgba(7, 17, 27, 0.2);
                    box-shadow: 0 0 2px rgba(7, 17, 27, 0.1);
                    &.warn {
                        border: 1px solid rgba(245, 53, 3, 0.6);
                        box-shadow: 0 0 5px rgba(245, 53, 3, 0.3);
                    }
                    .tip {
                        position: absolute;
                        top: -20px;
                        right: 0;
                        font-size: 14px;
                        color: #f35353;
                    }
                    .input,
                    .text {
                        display: inline-block;
                        vertical-align: bottom;
                        height: 30px;
                        line-height: 30px;
                    }
                    .text {
                        width: 50px;
                        text-align: center;
                        border-right: 1px solid #d8d8d8;
                    }
                    .input {
                        width: 200px;
                        padding-left: 8px;
                        vertical-align: bottom;
                        font-size: 16px;
                        border: 0;
                    }
                }
                .input-imgCode {
                    position: relative;
                    img {
                        position: absolute;
                        width: 76px;
                        height: 35px;
                        top: 3px;
                        right: 0;
                    }
                }
            }
            .tools-wrapper {
                height: 40px;
                line-height: 32px;
                padding-top: 8px;
                font-size: 14px;
                color: #999;
                .remember {
                    float: left;
                }
                .forget {
                    float: right;
                }
            }
            .btn-wrapper {
                padding: 8px 0 16px;
            }
            .register-wrapper {
                font-size: 14px;
                line-height: 40px;
                text-align: center;
                color: #999;
                .text {
                    color: #3385ff;
                }
            }
        }
    }
}
</style>
