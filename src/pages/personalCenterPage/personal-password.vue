<template>
	<div class="personal-password">
		<div class="personal-password-wrap personal-form">
			<label for="password">原密码</label>
			<input type="password" name="password" id="password" placeholder="请输入账户原密码" />
		</div>
		<div class="personal-password-wrap personal-form">
			<label for="passwordNew">新密码</label>
			<input type="password" name="passwordNew" id="passwordNew" placeholder="请输入新密码" />
		</div>
		<div class="personal-password-wrap personal-form">
			<label for="passwordNew1">确认密码</label>
			<input type="password" name="passwordNew1" id="passwordNew1" placeholder="请确认新密码" />
		</div>
		<button class="submitBtn personal-btn">保存</button>
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
				padding-left: 120px;
			}
		}
		.submitBtn {
			margin-top: 20px;
			margin-left: 230px;
		}
	}
</style>
