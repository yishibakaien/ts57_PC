<template>
	<div class="personal-password">
		<div class="personal-password-wrap">
			<label for="password">原密码</label>
			<input type="password" name="password" id="password" placeholder="请输入账户原密码" />
		</div>
		<div class="personal-password-wrap">
			<label for="passwordNew">新密码</label>
			<input type="password" name="passwordNew" id="passwordNew" placeholder="请输入新密码" />
		</div>
		<div class="personal-password-wrap">
			<label for="passwordNew1">确认密码</label>
			<input type="password" name="passwordNew1" id="passwordNew1" placeholder="请确认新密码" />
		</div>
		<button>保存</button>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped="scoped">
	.personal-password {
		margin-top: 50px;
		.personal-password-wrap {
			margin-top: 20px;
			label {
				display: inline-block;
				padding-left: 120px;
				width: 106px;
				font-size: 16px;
				line-height: 19px;
				color: #333;
			}
			input {
				padding: 0 10px;
				width: 320px;
				height: 30px;
				border: 0;
				border: 1px solid #d1d1d1;
				border-radius: 3px;
			}
		}
		button {
			margin-top: 20px;
			margin-left: 230px;
			width: 88px;
			height: 32px;
			background: #4C93FD;
			color: #fff;
			border: 0;
			border: 1px solid #4C93FD;
			border-radius: 3px;
			cursor: pointer;
		}
	}
</style>
