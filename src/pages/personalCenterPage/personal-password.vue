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
	</div>
</template>

<script>
	import { restPasswd } from '@/common/api/api';
	import * as reg from '@/common/js/regExp';
	//	import store from '@/store/store';
	//	import * as types from '@/store/types';
	import Toast from '@/components/common/toast/toast';
	export default {
		data() {
			return {
				param: {
					newPasswd: '',
					newPasswd1: '',
					userPasswd: ''
				}
			};
		},
		methods: {
			restPasswdMethod() {
				if (!reg.testPWD(this.param.newPasswd)) {
					//					store.commit(types.MODEL_SHOW, true);
					//					store.commit(types.MODEL_OPTION, {type: 2, title: '提示', content: '您输入的新密码格式错误，请检查'});
					Toast({
						type: 'error',
						message: '您输入的新密码格式错误，请检查'
					});
					return;
				}
				if (this.param.newPasswd !== this.param.newPasswd1) {
					//					store.commit(types.MODEL_SHOW, true);
					//					store.commit(types.MODEL_OPTION, {type: 2, title: '提示', content: '您两次输入的新密码不一致，请确认'});
					Toast({
						type: 'error',
						message: '您两次输入的新密码不一致，请确认'
					});
					return;
				}
				restPasswd(this.param).then((res) => {
					if (res.data.code === 0) {
						this.param.newPasswd = '';
						this.param.newPasswd1 = '';
						this.param.userPasswd = '';
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
