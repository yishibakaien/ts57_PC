<template>
	<div class="personal-password">
		<div class="personal-password-wrap personal-form">
			<label for="password">原密码</label>
			<input type="password" name="password" id="password" placeholder="请输入账户原密码" v-model="param.userPasswd" />
		</div>
		<div class="personal-password-wrap personal-form">
			<label for="passwordNew">新密码</label>
			<input type="password" name="passwordNew" id="passwordNew" placeholder="请输入新密码" v-model="param.newPasswd" />
		</div>
		<div class="personal-password-wrap personal-form">
			<label for="passwordNew1">确认密码</label>
			<input type="password" name="passwordNew1" id="passwordNew1" placeholder="请确认新密码" v-model="param.newPasswd1" />
		</div>
		<button class="submitBtn personal-btn" @click="restPasswdMethod">保存</button>
		<tipsModel :obj="tips" @close="closeModel"></tipsModel>
	</div>
</template>

<script>
	import { restPasswd } from '@/common/api/api';
	import * as reg from '@/common/js/regExp';
	import Toast from '@/components/common/toast/toast';
	import * as types from '@/store/types';
	import {tipsModel} from '@/components';
	export default {
		data() {
			return {
				param: {
					newPasswd: '',
					newPasswd1: '',
					userPasswd: ''
				},
				tips: {
					isShow: false,
					content: '成功修改密码'
				}
			};
		},
		components: {
			tipsModel
		},
		methods: {
			showModel() {
				this.tips.isShow = true;
				setTimeout(() => {
					this.closeModel();
					this.$store.commit(types.LOGOUT);
					this.$router.push({
						path: '/loginPage'
					});
				}, 3000);
			},
			closeModel() {
				this.$store.commit(types.LOGOUT);
				this.$router.push({
					path: '/loginPage'
				});
			},
			restPasswdMethod() {
				if (!reg.testPWD(this.param.userPasswd)) {
					Toast({
						type: 'error',
						message: '您输入的原密码格式错误，请检查'
					});
					return;
				}
				if (!reg.testPWD(this.param.newPasswd)) {
					Toast({
						type: 'error',
						message: '您输入的新密码格式错误，请检查'
					});
					return;
				}
				if (this.param.newPasswd !== this.param.newPasswd1) {
					Toast({
						type: 'error',
						message: '您两次输入的新密码不一致，请确认'
					});
					return;
				}
				restPasswd(this.param).then((res) => {
					console.log(res.data.code);
					if (res.data.code === 0) {
						this.showModel();
					};
				}).catch();
			}
		}

	};
</script>

<style lang="scss" scoped="scoped">
	.personal-password {
		margin-top: 50px;
		.personal-password-wrap {
			margin-top: 20px;
			label {
				padding-left: 120px;
			}
		}
		.submitBtn {
			margin-top: 20px;
			margin-left: 230px;
		}
	}
</style>
