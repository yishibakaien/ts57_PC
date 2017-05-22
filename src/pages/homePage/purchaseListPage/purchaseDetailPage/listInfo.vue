<template>
	<div class="list-info">
		<div class="title">
			我的接单信息
		</div>
		<div class="content">
			<img src="../../../../components/common/toast/icon/success.svg" alt="花型图片" class="fl"/>
			<p class="content-info"><span class="status">现货</span><span class="shuliang"><i>¥</i>10.00/码</span></p>
			<p class="content-desc">老板我手里有大量现货，需要的话随时找我，谢谢。</p>
		</div>
	</div>
</template>

<script>
	export default {
	};
</script>

<style lang="scss" scoped>
.list-info {
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
	}
	.content {
		box-sizing: border-box;
		width: 824px;
		height: 192px;
		border: 1px solid #e5e5e5;
		img {
			padding: 26px;
			width: 140px;
			height: 140px;
		}
		.content-info {
			margin-top: 42px;
			.status {
				margin-right: 10px;
				padding: 4px 8px;
				font-size: 16px;
				color: #fff;
				background: #ff8400;
			}
			.shuliang {
				color: #ff494f;
				font-size: 15px;
				i {
					font-size: 12px;
				}
			}
		}
		.content-desc {
			margin-top: 30px;
			font-size: 16px;
		}
	}
}
</style>
