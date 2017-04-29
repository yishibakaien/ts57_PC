<template>
  <div class="register-page">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="register-box">
      <div class="register-container">
        <div class="header">
          <h1 class="title">欢迎注册</h1>
          <div class="right">
            <span class="text">已有账号?</span>
            <router-link to="./loginPage" class="link">请登录</router-link>
          </div>
        </div>

        <div class="choose-type list">
          <span class="left">选择身份：</span>
          <div class="right">
            <div class="type-item" ref="factory" @click="chooseFactory">
              <h2 class="name">蕾丝厂商</h2>
              <span class="desc">我是蕾丝生产企业</span>
            </div>
            <div class="type-item" ref="stalls" @click="chooseStalls">
              <h2 class="name">档口贸易商</h2>
              <span class="desc">从事蕾丝贸易活动</span>
            </div>
          </div>
        </div>

        <div class="tel list">
          <span class="left">手机号：</span>
          <div class="right">
            <input class="input" type="tel" maxlength="11" placeholder="请输入注册手机号">
          </div>
        </div>

        <div class="tel list">
          <span class="left">密码：</span>
          <div class="right">
            <input class="input" type="password" maxlength="11" placeholder="请输入密码">
          </div>
        </div>

        <div class="tel list">
          <span class="left">确认密码：</span>
          <div class="right">
            <input class="input" type="password" maxlength="11" placeholder="请再次输入密码">
          </div>
        </div>

        <div class="tel list">
          <span class="left">姓名：</span>
          <div class="right">
            <input class="input" type="text" maxlength="11" placeholder="请输入你的名字">
          </div>
        </div>

        <div class="tel list">
          <span class="left">公司：</span>
          <div class="right">
            <input class="input" type="text" maxlength="11" placeholder="情输入你的公司名">
          </div>
        </div>

        <div class="code list">
          <span class="left">验证码：</span>
          <div class="right">
            <input class="input" type="tel" maxlength="11" placeholder="请输入短信验证码">
            <div class="SMSCode">获取验证码</div>
          </div>
        </div>

        <div class="btn-wrapper">
          <button class="button button-block button-blue">注册</button>
        </div>

        <div class="agreenment-wrapper">
          <i class="iconfont">字</i>
          <span class="text">用户勾选即代表同意</span>
          <span class="agreenment">《坐视布管用户协议》</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {header, nav} from '../../../components';
// import {
//   testMobile,
//   testPWD,
//   testName,
//   testCompanyName,
//   testSMSCode
// } from '../../../common/js/regExp';
export default {
  data() {
    return {
      registerData: {
        userType: '',
        userMobile: '',
        userPWD: '',
        userName: '',
        companyName: '',
        smsCode: ''
      }
    };
  },
  components: {
    'vHeader': header,
    'vNav': nav
  },
  methods: {
    chooseFactory() {
      this.$refs.factory.className += ' active';
      this.$refs.stalls.className = 'type-item';
      this.registerData.userType = 1;
    },
    chooseStalls() {
      this.$refs.factory.className = 'type-item';
      this.$refs.stalls.className += ' active';
      this.registerData.userType = 2;
    }
  }
};
</script>

<style lang="stylus" scoped>
  .input
    display inline-block
    height 40px
    line-height 40px
    padding-left 16px
    width 326px
    font-size 16px
    border-radius 3px
    border 1px solid rgba(7, 17, 27, 0.2)
    &::-webkit-input-placeholder
      font-size 16px
  .register-page
    .register-box
      width 100%
      height 750px
      background #ff7011
      position relative
      .register-container
        position absolute
        padding 20px 48px 32px 42px
        top 40px
        left 50%
        transform translate(-50%, 0)
        background #fff
        .header
          height 40px
          border-bottom 1px solid #d8d8d8
          .title
            display inline-block
            height 24px
            line-height 24px
            font-size 22px
          .right
            float right
            height 16px
            line-height 16px
            margin-top 6px
            font-size 14px
            .text
              color #999
            .link
              color #4c93fd
        .list
          margin 16px 0
          .left
            display inline-block
            vertical-align top
            width 80px
            height 40px
            line-height 40px
            font-size 16px
            color #333
            text-align center
          .right
            display inline-block
            vertical-align top
          &.choose-type
            margin 30px 0
            .left
              line-height 80px
            .right
              .type-item
                display inline-block
                height 64px
                width 160px
                text-align center
                border-radius 3px
                border 1px solid #d8d8d8
                cursor pointer
                &.active
                  border 1px solid #4c93fd
                  color #4c93fd
                  .name
                    color #4c93fd
                  .desc
                    color #4c93fd
                &:last-child
                  margin-left 16px
                .name
                  height 33px
                  line-height 33px
                  margin-top 5px
                  font-size 22px
                  color #333
                .desc
                  display inline-block
                  height 20px
                  line-height 20px
                  font-size 14px
                  color #999
          &.code
            position relative
            .SMSCode
              position absolute
              width 142px
              height 42px
              line-height 42px
              right 0
              top 0
              text-align center
              cursor pointer
              color #fff
              background #4c93fd
        .btn-wrapper
          margin-top 32px
          height 48px
          text-align center
          .button
            width 346px
            float right
        .agreenment-wrapper
          text-align right
          font-size 14px
          height 40px
          line-height 40px
          .text
            color #999
          .agreenment
            color #4c93fd
            cursor pointer
</style>
