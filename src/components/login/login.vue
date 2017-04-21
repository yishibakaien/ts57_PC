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
              <span class="text">手机号码</span>
              <input type="text" placeholder="请输入手机号码">
            </div>
            <div class="input-password">
              <span class="text">密码</span>
              <input type="password" placeholder="请输入密码">
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
            <button class="btn btn-blue">登录</button>
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
export default {

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
