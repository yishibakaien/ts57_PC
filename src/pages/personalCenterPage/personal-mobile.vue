<template>
	<div class="personal-mobile">
		<div class="personal-mobile-info personal-info">
			<p>1、更换手机号码需要先做登录密码校验，请输入当前帐号登录密码；</p>
			<p>2、更换号码后，下次登录使用新号码登录，当前手机号 <span>{{ phoneNum }}</span>。</p>
		</div>
		<div class="personal-mobile-wrap personal-form" v-if="isShow">
			<label for="password">登录密码</label>
			<input type="password" name="password" id="password" placeholder="请输入登录密码" v-model="param.userPasswd" />
			<button class="checkoutBtn personal-btn" @click="checkPasswdMethod()">校验</button>
		</div>
		<div class="personal-mobile-wrap" v-if="!isShow">
			<div class="personal-mobile-item personal-form">
				<label for="newMobile">新手机号</label>
				<input type="text" name="newMobile" id="newMobile" placeholder="请输入您的新手机号" v-model="mobile.mobile" v-on:blur="checkPhone" />
				<button @click="changeSMSCodeMethod">获取验证码</button>
				<p v-show="!check.p1">您的手机号输入有误</p>
			</div>
			<div class="personal-mobile-item personal-form">
				<label for="sbCode">验证码</label>
				<input type="text" name="sbCode" id="sbCode" placeholder="请输入4位验证码" v-model="mobile.smsCode" />
				<p v-show="!check.p2">您的验证码输入有误</p>
			</div>
			<button class="submitBtn personal-btn" @click="changeMobileMethod">保存</button>
		</div>
		<div class="personal-mobile-alert" v-if="alertShow">
			<i>—</i>登录密码检验失败
		</div>
	</div>
</template>

<script>
	import * as reg from '@/common/js/regExp';
	import { checkPasswd, changeSMSCode, changeMobile } from '@/common/api/api';
	export default {
		data() {
			return {
				phoneNum: '',
				param: {
					'x-token': '',
					userPasswd: ''
				},
				mobile: {
					mobile: '',
					smsCode: ''
				},
				check: {
					p1: true,
					p2: true
				},
				alertShow: false,
				isShow: true
			};
		},
		created() {
			let _ = this;
			_.phoneNum = localStorage.getItem('userMobile');
		},
		methods: {
			checkPasswdMethod() {
				checkPasswd(this.param).then((res) => {
					if (res.data.code === 0) {
						if (res.data.data) {
							this.alertShow = false;
							this.isShow = false;
						} else {
							this.alertShow = true;
						}
					};
				}).catch((res) => {
					console.log('检验失败');
				});
			},
			changeSMSCodeMethod() {
				this.checkPhone();
				if (!this.check.p1) {
					return;
				};
				changeSMSCode(this.mobile).then((res) => {
					if (res.data.code === 0) {
					} else {
						console.log('error');
					}
				}).catch((res) => {
					console.log('异常');
				});
			},
			changeMobileMethod() {
				this.checkSMS();
				if (!this.check.p2) {
					return;
				};
				changeMobile(this.mobile).then((res) => {
					if (res.data.code === 0) {
						alert('修改成功');
					}
				}).catch((res) => {
					console.log('异常');
				});
			},
			checkPhone() {
				if (!reg.testMobile(this.mobile.mobile)) {
					this.check.p1 = false;
				} else {
					this.check.p1 = true;
				}
			},
			checkSMS() {
				if (this.mobile.smsCode.length !== 4) {
					this.check.p2 = false;
				} else {
					this.check.p2 = true;
				}
			}
		}
	};
</script>

<style lang="scss" scoped="scoped">
	.checkoutBtn {
		margin-left: 30px !important;
	}
	
	.personal-mobile-wrap {
		margin-top: 35px;
		label {
			padding-left: 120px;
		}
		.personal-mobile-item {
			position: relative;
			margin-bottom: 32px;
			button {
				position: relative;
				top: 3px;
				left: 10px;
				width: 120px;
				height: 32px;
				color: #4C93FD;
				font-size: 16px;
				line-height: 32px;
				background: #fff;
				border: 0;
				border: 1px solid #4C93FD;
			}
			p {
				position: absolute;
				bottom: -18px;
				left: 228px;
				color: #FF0000;
				font-size: 14px;
			}
		}
		.submitBtn {
			margin-left: 226px;
		}
	}
	
	.personal-mobile-alert {
		margin-left: 225px;
		margin-top: 8px;
		color: #ff8400;
		font-size: 14px;
		line-height: 16px;
		i {
			display: inline-block;
			margin-right: 10px;
			width: 14px;
			height: 14px;
			background: #FF8400;
			border-radius: 50%;
			color: #FFF;
			font-size: 12px;
			text-align: center;
			line-height: 14px;
		}
	}
</style>
