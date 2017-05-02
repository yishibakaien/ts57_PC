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
            <div class="tip" v-if="tip.userMobileTip">{{tip.userMobileTip}}</div>
            <input @blur="blurUserMobile" v-model="registerData.userMobile" :class="{warn: tip.userMobileTip}" class="input" type="tel" maxlength="11" placeholder="请输入注册手机号">
          </div>
        </div>

        <div class="tel list">
          <span class="left">密码：</span>
          <div class="right">
            <div class="tip" v-if="tip.userPWDTip">{{tip.userPWDTip}}</div>
            <input @blur="blurUserPWD" v-model="registerData.userPWD" :class="{warn: tip.userPWDTip}" class="input" type="password" maxlength="16" placeholder="请输入密码">
          </div>
        </div>

        <div class="tel list">
          <span class="left">确认密码：</span>
          <div class="right">
            <div class="tip" v-if="tip.confirmPWDTip">{{tip.confirmPWDTip}}</div>
            <input @blur="blurConfirmPWD" v-model="confirmPWD" :class="{warn: tip.confirmPWDTip}" class="input" type="password" maxlength="16" placeholder="请再次输入密码">
          </div>
        </div>

        <div class="tel list">
          <span class="left">姓名：</span>
          <div class="right">
            <div class="tip" v-if="tip.userNameTip">{{tip.userNameTip}}</div>
            <input @blur="blurUserName" v-model="registerData.userName" :class="{warn: tip.userNameTip}" class="input" type="text" maxlength="8" placeholder="请输入你的名字">
          </div>
        </div>

        <div class="tel list">
          <span class="left">公司：</span>
          <div class="right">
            <div class="tip" v-if="tip.companyNameTip">{{tip.companyNameTip}}</div>
            <input @blur="blurCompanyName" v-model="registerData.companyName" :class="{warn: tip.companyNameTip}" class="input" type="text"  placeholder="情输入你的公司名">
          </div>
        </div>

        <div class="code list">
          <span class="left">验证码：</span>
          <div class="right">
            <div class="tip" v-if="tip.smsCodeTip">{{tip.smsCodeTip}}</div>
            <input @blur="blurSmsCode" v-model="registerData.smsCode" :class="{warn: tip.smsCodeTip}" class="input" type="tel" maxlength="4" placeholder="请输入短信验证码">
            <button @click="getSMSCode" ref="getCodeBtn" :disabled="getSMSCodeParams.disabled" class="SMSCode button button-blue" title="点击获取短信验证码">{{codeBtnText}}</button>
          </div>
        </div>

        <div class="btn-wrapper">
          <button class="button button-block button-blue" @click="register">注册</button>
        </div>

        <div class="agreenment-wrapper">
          <i class="iconfont">字</i>
          <span class="text">点击注册即代表同意</span>
          <span class="agreenment">《坐视布管用户协议》</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {header, nav} from '../../../components';
import {
  testMobile,
  testPWD,
  testName,
  testCompanyName,
  testSMSCode
} from '../../../common/js/regExp';
// import axios from 'axios';
import {getRegSMSCode, reg, checkPhone} from '../../../common/api/api';
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
      },
      confirmPWD: '',
      isRegisted: true,
      samePWD: true,
      tip: {
        userMobileTip: '',
        userPWDTip: '',
        confirmPWDTip: '',
        userNameTip: '',
        companyNameTip: '',
        smsCodeTip: ''
      },
      getSMSCodeParams: {
        getCode: '获取验证码',
        seconds: 60,
        wait: '秒后获取',
        disabled: false
      }
    };
  },
  components: {
    'vHeader': header,
    'vNav': nav
  },
  computed: {
    codeBtnText() {
      if (this.getSMSCodeParams.disabled === false) {
        return this.getSMSCodeParams.getCode;
      } else {
        return this.getSMSCodeParams.seconds + this.getSMSCodeParams.wait;
      }
    }
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
    },
    blurUserMobile() {
      if (!testMobile(this.registerData.userMobile)) {
        this.tip.userMobileTip = '请输入正确的手机号码';
        return;
      } else {
        this.tip.userMobileTip = '';
      }
      console.log(this.registerData.userMobile);
      checkPhone({
        mobile: this.registerData.userMobile
      }).then(res => {
        if (res.data.code !== 0) {
          console.log('检查手机号码失败', res);
        } else {
          if (res.data.data === true) {
            this.tip.userMobileTip = '此手机号码已被注册';
          } else {
            this.isRegisted = false;
          }
        }
      }).catch(res => {
        console.log('检查手机号码请求失败', res);
      });
    },
    blurUserPWD() {
      if (!testPWD(this.registerData.userPWD)) {
        this.tip.userPWDTip = '密码长度为6-16位';
      } else {
        this.tip.userPWDTip = '';
      }
    },
    blurConfirmPWD() {
      if (!testPWD(this.confirmPWD)) {
        this.tip.confirmPWDTip = '两次密码输入不一致';
      }
      if (this.confirmPWD !== this.registerData.userPWD) {
        this.tip.confirmPWDTip = '两次密码输入不一致';
      } else {
        this.tip.confirmPWDTip = '';
        this.samePWD = false;
      }
    },
    blurUserName() {
      if (!testName(this.registerData.userName)) {
        this.tip.userNameTip = '姓名长度为2-8位汉字';
      } else {
        this.tip.userNameTip = '';
      }
    },
    blurCompanyName() {
      if (!testCompanyName(this.registerData.companyName)) {
        this.tip.companyNameTip = '公司名称长度为4-16位';
      } else {
        this.tip.companyNameTip = '';
      }
    },
    blurSmsCode() {
      if (!testSMSCode(this.registerData.smsCode)) {
        this.tip.smsCodeTip = '请输入4位短信验证码';
      } else {
        this.tip.smsCodeTip = '';
      }
    },
    getSMSCode() {
      if (!testMobile(this.registerData.userMobile)) {
        this.tip.userMobileTip = '请输入正确的手机号码';
        return;
      } else {
        this.tip.userMobileTip = '';
      }
      let data = {
        mobile: this.registerData.userMobile
      };
      getRegSMSCode(data)
        .then(res => {
          if (res.data.code !== 0) {
            // 手机号码已注册的情况
            if (res.data.code === 1004019) {
              this.tip.userMobileTip = res.data.message;
            }
          } else {
            console.log('短信获取成功', res);
            this.getSMSCodeParams.disabled = true;
            let timer = setInterval(() => {
              if (this.getSMSCodeParams.seconds < 1) {
                this.getSMSCodeParams.seconds = 60;
                this.getSMSCodeParams.disabled = false;
                clearInterval(timer);
              }
              this.getSMSCodeParams.seconds -= 1;
            }, 1000);
          }
        })
        .catch(res => {
          console.error('获取短信请求错误', res);
        });
    },
    register() {
      let _this = this;
      let data = this.registerData;
      for (let key in data) {
        if (!data.hasOwnProperty(key)) {
          continue;
        }
        // 点击注册时表单漏填的情况
        if (!data[key]) {
          console.log(data[key]);
          console.log(key + 'Tip');
          switch (key) {
            case 'userType':
              alert('请至少选择一个注册身份');
              return;
            case 'userPWD':
              alert('请输入正确的密码');
              return;
            case 'userName':
              alert('请输入您的姓名');
              return;
            case 'companyName':
              alert('请输入公司名称');
              return;
            case 'smsCode':
              alert('请输入短信验证码');
              return;
            default:
              alert('请填写正确的注册信息');
              return;
          }
        }
      }
      let _data = this.registerData;
      let checkPassword = _data.userPWD === this.confirmPWD;
      if (!(testMobile(_data.userMobile) && testPWD(_data.userPWD) && testName(_data.userName) && testCompanyName(_data.companyName) && testSMSCode(_data.smsCode) && checkPassword && !this.isRegisted && !this.samePWD)) {
        alert('请填写正确的注册信息');
        return;
      }
      reg(this.registerData)
        .then(res => {
          if (res.data.code !== 0) {
            alert(res.data.message);
          } else {
            alert('注册成功！');
            _this.$router.push({
              path: '/loginPage'
            });
          }
        })
        .catch(res => {
          console.error('注册失败', res);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
  .input
    display inline-block
    position relative
    height 40px
    line-height 40px
    padding-left 16px
    width 326px
    font-size 16px
    border-radius 3px
    border 1px solid rgba(7, 17, 27, 0.2)
    &::-webkit-input-placeholder
      font-size 16px
    &.warn
      border 1px solid rgba(245, 53, 3, 0.6)
      box-shadow 0 0 5px rgba(245, 53, 3, 0.3)
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
          margin 22px 0
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
            position relative
            vertical-align top
            .tip
              position absolute
              z-index 1
              top -16px
              font-size 14px
              color #f53535
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
