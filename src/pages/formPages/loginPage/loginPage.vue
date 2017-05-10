<template>
	<div class="login-page">
		<v-header></v-header>
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
