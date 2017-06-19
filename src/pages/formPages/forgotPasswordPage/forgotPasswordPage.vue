<template>
<div class="forgotPassword">
  <v-header>
    <div class="fl forget-title">
      <p>找回密码</p>
      <router-link to="homePage">返回首页</router-link>
    </div>
    <div class="fr forget-path">
      <router-link to="registerPage" class="reg">注册</router-link>
      <router-link to="loginPage" class="login">登录</router-link>
    </div>
  </v-header>
  <div class="fgPwd-box">
    <div class="fgPwd-form">
      <div class="fgPwd-form-item">
        <label for="mobile">手机号：</label>
        <input type="text" name="mobile" id="mobile" placeholder="请输入您的电话号码" v-model="param.userMobile" @blur="checkMobile" />
        <p v-show="check.mobile">您输入的手机号码格式不正确</p>
      </div>
      <div class="fgPwd-form-item">
        <label for="newPwd">新密码：</label>
        <input type="password" name="mobile" id="newPwd" placeholder="请输入您的新密码" v-model="param.userPWD" @blur="checkPwd" />
        <p v-show="check.pwd">您输入的密码格式不正确</p>
      </div>
      <div class="fgPwd-form-item">
        <label for="newPwd1">确认新密码：</label>
        <input type="password" name="mobile" id="newPwd1" placeholder="请再次输入您的新密码" v-model="userPWD1" @blur="checkPwd1" />
        <p v-show="check.pwd1">你两次输入的密码不一致</p>
      </div>
      <div class="fgPwd-form-item sbCodeForm">
        <label for="mobile">短信验证码：</label>
        <input type="text" name="mobile" id="mobile" placeholder="请输入短信验证码" v-model="param.smsCode" />
        <button class="sbCode btn" @click="getFindSMSCodeMethod">获取验证码</button>
      </div>
      <div class="fgPwd-form-item picCode" v-if="imgShow">
        <label for="mobile">图形验证码：</label>
        <input type="text" name="mobile" id="mobile" placeholder="请输入图形验证码" v-model="param.picCode" />
        <img :src="imgCode" @click='this.getVerifyCodeMethod' />
      </div>
      <button class="btn subBtn" @click="findPassWdMethod">确认</button>
    </div>
  </div>
</div>
</template>

<script>
import * as reg from '@/common/js/regExp';
import {
  btnStatus
} from '@/common/js/utils.js';
import {
  header
} from '@/components';
import {
  findPassWd,
  getFindSMSCode,
  getVerifyCode
} from '@/common/api/api';
export default {
  data() {
    return {
      param: {
        picCode: '',
        smsCode: '',
        userMobile: '',
        userPWD: ''
      },
      paramSMS: {
        mobile: ''
      },
      userPWD1: '',
      check: {
        mobile: false,
        pwd: false,
        pwd1: false
      },
      imgCode: '',
      imgShow: false
    };
  },
  components: {
    'vHeader': header
  },
  created() {},
  methods: {
    checkMobile() {
      if (!reg.testMobile(this.param.userMobile)) {
        this.check.mobile = true;
        return false;
      } else {
        this.check.mobile = false;
        return true;
      }
    },
    checkPwd() {
      if (!reg.testPWD(this.param.userPWD)) {
        this.check.pwd = true;
        return false;
      } else {
        this.check.pwd = false;
        return true;
      }
    },
    checkPwd1() {
      if (this.param.userPWD !== this.userPWD1) {
        this.check.pwd1 = true;
        return false;
      } else {
        this.check.pwd1 = false;
        return true;
      }
    },
    getFindSMSCodeMethod($event) {
      let _ = this;
      if (!(_.checkMobile() && _.checkPwd() && _.checkPwd1())) {
        return;
      };
      _.paramSMS.mobile = _.param.userMobile;
      btnStatus($event, '已发送');
      getFindSMSCode(_.paramSMS).then((res) => {
      }).catch();
    },
    // 找回密码
    findPassWdMethod() {
      let _ = this;
      this.param.userPWD = this.Encrypt(this.param.userPWD);
      this.userPWD1 = this.Encrypt(this.userPWD1);
      localStorage['user-account'] = JSON.stringify({
        userMobile: _.param.userMobile
      });
      findPassWd(_.param).then((res) => {
        if (res.data.code === 0) {
          _.$router.push({
            path: 'loginPage'
          });
          return;
        }
        this.param.userPWD = this.userPWD1 = '';
        if (res.data.code === 2000004) {
          _.imgShow = true;
          _.getVerifyCodeMethod();
          return;
        }
        _.getVerifyCodeMethod();
      }).catch();
    },
    getVerifyCodeMethod() {
      getVerifyCode().then((res) => {
        this.imgCode = 'data:image/jpeg;base64,' + res.data.data;
      }).catch();
    }
  }
};
</script>

<style lang="stylus" scoped>
	.forget-title {
		margin-left: -110px;
		padding-left: 30px;
		border-left: 1px solid #ccc;
		p {
			color: #333;
			font-size: 20px;
			line-height: 30px;
		}
		a {
			font-size: 16px;
			color: #4c93fd;
			line-height: 24px;
		}
	}
	.forget-path {
		a {
			position: relative;
			top: 10px;
			font-size: 20px;
			color: #4c93fd;
		}
		.reg {
			padding-right: 15px;
			border-right: 1px solid #ccc;
		}
		.login {
			padding-left: 14px;
		}
	}
 	.btn {
		background: #4C93FD;
		border: 0;
		color: #fff;
		text-align: center;
		cursor: pointer;
	}

	.fgPwd-box {
		position: relative;
		width: 100%;
		height: 732px;
		background: url(../../../../static/images/beijing.jpg);
	}

	.fgPwd-form {
		position: absolute;
		top: 16%;
		left: 50%;
		transform: translate(-50%, 0);
		padding: 25px 55px;
		width: 480px;
		height: auto;
		background: #fff;
		border-radius: 5px;
		.fgPwd-form-item {
			position: relative;
			margin-bottom: 25px;
			label {
				display: inline-block;
				width: 100px;
				font-size: 16px;
				color: #333;
				text-align: right;
			}
			input {
				padding: 6px 10px;
				width: 350px;
				height: 30px;
				border: 0;
				border: 1px solid #d1d1d1;
				border-radius: 3px;
			}
			p {
				position: absolute;
				bottom: -18px;
				left: 110px;
				color: #FF0000;
				font-size: 14px;
			}
		}
		.sbCodeForm {
			position: relative;
			.sbCode {
				position: absolute;
				right: 5px;
				top: 0;
				width: 120px;
				height: 43px;
			}
		}
		.subBtn {
			margin-left: 105px;
			width: 370px;
			height: 40px;
		}
		.picCode {
			position: relative;
			img {
				position: absolute;
				right: 5px;
				top: 1px;
				width: 120px;
				height: 42px;
				cursor: pointer;
			}
		}
	}
</style>
