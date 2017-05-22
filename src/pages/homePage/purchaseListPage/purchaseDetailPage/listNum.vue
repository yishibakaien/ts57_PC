<template>
	<div class="list-num">
		<div class="title">
			共有<em>18</em>人接单
		</div>
		<div class="content">
			<img v-for="item in [1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1]" src="../../../../components/common/toast/icon/info.svg" alt="用户头像"/>
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped>
	.title {
		box-sizing: border-box;
		padding-left: 26px;
		width: 824px;
		height: 48px;
		color: #666;
		font-size: 16px;
		line-height: 48px;
		background: #f8f8f8;
		border: 1px solid #e5e5e5;
		border-bottom: 0;
		em {
			color: #4C93FD;
		}
	}
	.content {
		box-sizing: border-box;
		width: 824px;
		height: 192px;
		border: 1px solid #e5e5e5;
		overflow: hidden;
		img {
			margin-top: 17px;
			margin-left: 17px;
			width: 72px;
			height: 72px;
		}
	}
</style>
