<template>
	<div class="personal-business">
		<div class="personal-business-wrap">
			<div class="personal-business-Info">
				<div class="logo">
					<img src="../../../static/timg.jpg" alt="logo"/>
					<p class="cancel">取消收藏</p>
				</div>
				<p class="companyName">
					<i class="facory">厂</i>
					<!--<i class="trade">贸</i>-->
					恒鑫实业
				</p>
				<p><span style="vertical-align: top;">地址：</span><span style="display: inline-block;width: 110px;">福建省长乐市文武砂镇数字创意园</span></p>
				<p>电话：18333333333</p>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
	};
</script>

<style lang="scss" scoped="scoped">
	.personal-business-wrap {
		padding: 30px 15px;
	}
	.personal-business-Info {
		width: 160px;
		.logo {
			position: relative;
			width: 160px;
			height: 160px;
			border: 1px solid #d1d1d1;
			text-align: center;
			line-height: 160px;
			overflow: hidden;
			cursor: pointer;
			img {
				width: 120px;
				height: 120px;
				border-radius: 50%;
			}
			.cancel {
				position: absolute;
				bottom: -28px;
				margin: 0;
				width: 100%;
				height: 28px;
				line-height: 28px;
				background: #000;
				font-size: 14px;
				color: #fff !important;
				opacity: .4;
				transition: .3s;
			}
			&:hover .cancel {
				bottom: 0;
			}
		}
		i {
			display: inline-block;
			width: 20px;
			height: 20px;
			font-size: 12px;
			color: #fff;
			font-style: normal;
			line-height: 20px;
			text-align: center;
		}
		.facory {
			background: #4BD663;
		}
		.trade {
			background: #4C93FD;
		}
		.companyName {
			margin: 15px 0;
			font-size: 14px;
			color: #666;
			text-align: center;
		}
		p {
			margin-bottom: 5px;
			font-size: 14px;
			color: #333;
		}
	}
</style>
