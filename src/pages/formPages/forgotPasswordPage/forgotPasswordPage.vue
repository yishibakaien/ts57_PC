<template>
	<div class="forgotPassword">
		<v-header></v-header>
		<div class="fgPwd-box">
			<div class="fgPwd-form">
				<div class="fgPwd-form-item">
					<label for="mobile">手机号：</label>
					<input type="text" name="mobile" id="mobile" placeholder="请输入您的电话号码" />
				</div>
				<div class="fgPwd-form-item">
					<label for="newPwd">新密码：</label>
					<input type="password" name="mobile" id="newPwd" placeholder="请输入您的新密码" />
				</div>
				<div class="fgPwd-form-item">
					<label for="newPwd1">确认新密码：</label>
					<input type="password" name="mobile" id="newPwd1" placeholder="请再次输入您的新密码" />
				</div>
				<div class="fgPwd-form-item sbCodeFortm">
					<label for="mobile">短信验证码：</label>
					<input type="text" name="mobile" id="mobile" placeholder="请输入短信验证码" />
					<button class="sbCode btn">获取验证码</button>
				</div>
				<button class="btn subBtn">确认</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { header } from '@/components';
	export default {
		data() {
			return {

			};
		},
		components: {
			'vHeader': header
		}
	};
</script>

<style lang="stylus" scoped>
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
			margin-bottom: 20px;
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
			
		}
		.sbCodeFortm {
			position: relative;
			.sbCode {
				position: absolute;
				right: 5px;
				top: 0;
				width: 140px;
				height: 43px;
			}
		}
		.subBtn {
			margin-left: 105px;
			width: 370px;
			height: 40px;
		}
	}
</style>
