<template>
	<div class="personal-mobile">
		<div class="personal-mobile-info">
			<p>1、更换手机号码需要先做登录密码校验，请输入当前帐号登录密码；</p>
			<p>2、更换号码后，下次登录使用新号码登录，当前手机号 <span>{{ mobile }}</span>。</p>
		</div>
		<div class="personal-mobile-wrap personal-form" v-if="isShow">
			<label for="password">登录密码</label>
			<input type="password" name="password" id="password" placeholder="请输入登录密码" />
			<button class="checkoutBtn personal-btn">校验</button>
		</div>
		<div class="personal-mobile-wrap" v-if="!isShow">
			<div class="personal-mobile-item personal-form">
				<label for="newMobile">新手机号</label>
				<input type="text" name="newMobile" id="newMobile" placeholder="请输入您的新手机号" />
				<button>获取验证码</button>
			</div>
			<div class="personal-mobile-item personal-form">
				<label for="sbCode">验证码</label>
				<input type="text" name="sbCode" id="sbCode" placeholder="请输入4位验证码" />
			</div>
			<button class="submitBtn personal-btn">保存</button>
		</div>
		<div class="personal-mobile-alert" v-if="alertShow">
			<i>—</i>登录密码检验失败
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mobile: 18333604006,
				alertShow: false,
				isShow: true
			};
		}
	};
</script>

<style lang="scss" scoped="scoped">
	.personal-mobile-info {
		margin: 0 auto;
		padding-top: 20px;
		width: 884px;
		background: #FFF7E3;
		border: 1px solid #d1d1d1;
		border-top: 0;
		p {
			padding-left: 120px;
			font-size: 14px;
			color: #666;
			line-height: 28px;
			span {
				color: #ff8400;
			}
			&:last-of-type {
				padding-bottom: 20px;
			}
		}
	}
	
	.checkoutBtn {
		margin-left: 30px !important;
	}
	
	.personal-mobile-wrap {
		margin-top: 35px;
		label {
			/*display: inline-block;*/
			padding-left: 120px;
			/*width: 106px;
			font-size: 16px;
			line-height: 19px;
			color: #333;*/
		}
		/*input {
			padding: 4px 10px 0;
			width: 320px;
			height: 30px;
			border: 0;
			border: 1px solid #d1d1d1;
			border-radius: 3px;
		}*/
		.personal-mobile-item {
			margin-bottom: 20px;
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
		}
		.submitBtn {
			margin-left: 226px;
		}
	}
	
	.personal-mobile-alert {
		margin-left: 230px;
		margin-top: 15px;
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
