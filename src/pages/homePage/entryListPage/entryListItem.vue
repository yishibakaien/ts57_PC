<template>
	<div class="entryList-item">
		<div class="entryList-item-title">
			<span>你好我好大家好</span>
			<router-link to="homePage">查看更多 ></router-link>
		</div>
		<div class="entryList-item-box clearfix">
			<div class="dianpu-content fl">
				<img src="../../../components/common/toast/icon/success.svg" alt="店铺LOGO"/>
				<span>访问店铺</span>
			</div>
			<div v-for="item in [1,2,3,4,5]" class="dianpuList-item fl">
				<img src="../../../../static/images/assets/clock.svg" alt="花型展示图片"/>
				<span class="version">#20001</span>
				<p>
					<span class="classes fl">面料</span>
					<span class="yesOrNo fr">有库存</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		porps: {
			item: {
				type: Object
			}
		}
	};
</script>

<style lang="scss" scoped>
.entryList-item {
	margin-bottom: 36px;
}
.entryList-item-title {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 48px;
	line-height: 48px;
	background: #f8f8f8;
	border: 1px solid #e5e5e5;
	border-bottom: 0;
	a {
		position: absolute;
		right: 18px;
		font-size: 16px;
	}
	span {
		padding-left: 25px;
		color: #333;
		font-size: 18px;
	}
}
.entryList-item-box {
	.dianpu-content  {
		box-sizing: border-box;
		width: 200px;
		height: 276px;
		border: 1px solid #e5e5e5;
		text-align: center;
		img {
			padding: 44px 0 60px;
			width: 100px;
			height: 100px;
		}
		span {
			display: block;
			margin: 0 auto;
			width: 130px;
			height: 30px;
			color: #333333;
			font-size: 16px;
			text-align: center;
			line-height: 30px;
			border: 1px solid #e5e5e5;
			cursor: pointer;
		}
	}
	.dianpuList-item {
		box-sizing: border-box;
		width: 200px;
		height: 276px;
		border: 1px solid #e5e5e5;
		border-left: 0;
		img {
			display: inline-block;
			margin: 13px;
			width: 172px;
			height: 172px;
			border: 1px solid #e5e5e5;
		}
		.version {
			padding-left: 14px;
			display: inline-block;
			height: 40px;
			line-height: 40px;
			font-size: 17px;
		}
		p {
			padding: 5px 13px 0;
			.classes {
				color: #999999;
				font-size: 14px;
			}
			.yesOrNo {
				padding: 2px 8px;
				font-size: 12px;
				color: #FFF;
				background: rgba(76,147,253,0.50);
				border-radius: 8px;
			}
		}
	}
}
</style>
