<template>
	<div class="personal-account">
		<div class="personal-account-item headImg personal-form">
			<label>头像</label>
			<input type="file" name="headImg" id="headImg" />
			<div class="headImgSee">
				<label for="headImg" class="lb">重新上传</label>
				<img src="../../../static/timg.jpg" alt="头像" />
			</div>
		</div>
		<div class="personal-account-item personal-form">
			<label for="fullName">姓名</label>
			<input type="text" name="fullName" id="fullName" placeholder="请填写您的姓名" />
		</div>
		<div class="personal-account-item personal-form">
			<label for="QQ">QQ</label>
			<input type="text" name="QQ" id="QQ" placeholder="请填写您的QQ号码" />
		</div>
		<div class="personal-account-item personal-form">
			<label for="email">邮箱</label>
			<input type="text" name="email" id="email" placeholder="请填写您的邮箱地址" />
		</div>
		<button class="personal-btn">保存</button>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped="scoped">
	.personal-account {
		margin-top: 40px;
		padding-left: 120px;
	}
	
	.personal-account-item {
		margin-bottom: 20px;
	}
	
	.headImg {
		height: 110px;
		label {
			line-height: 110px;
			vertical-align: top;
		}
		input {
			position: absolute;
			opacity: 0;
		}
	}
	
	.headImgSee {
		position: relative;
		display: inline-block;
		width: 106px;
		height: 106px;
		border-radius: 3px;
		overflow: hidden;
		cursor: pointer;
		img {
			width: 100%;
			height: 100%;
		}
		&:hover .lb {
			bottom: 0;
		}
		.lb {
			position: absolute;
			bottom: -33px;
			width: 106px;
			height: 33px;
			line-height: 35px;
			background: #333333;
			opacity: 0.8;
			text-align: center;
			color: #FFFFFF;
			font-size: 16px;
			transition: .2s;
		}
	}
</style>
