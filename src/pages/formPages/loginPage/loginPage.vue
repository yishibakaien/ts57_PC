<template>
	<div class="login-page">
		<v-header>
			<div class="login-title">
				<p>欢迎登录</p>
				<router-link to="homePage">返回首页</router-link>
			</div>
		</v-header>
		<div class="loginPage-box">
			<div class="login-wrapper">
				<login></login>
			</div>
		</div>
	</div>
</template>

<script>
	import { header, login } from '@/components';
	export default {
		components: {
			'vHeader': header,
			login
		}
	};
</script>

<style lang="stylus" scoped>
	.login-title {
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
	
	.login-page {
		.loginPage-box {
			position: relative;
			width: 100%;
			height: 731px;
			background: url(../../../../static/images/beijing.jpg);
			.login-wrapper {
				position: absolute;
				right: 357px;
				top: 113px;
			}
		}
	}
</style>
