<template>
	<div class="list-content">
		<div class="fl content-img">
			<img src="../../../../../static/images/assets/clock.svg" alt="求购花型图片"/>
		</div>
		<div class="fl content-info">
			<p class="content-info-desc">大量求购这款面料，最好是现货，做货也可以，有的请联系我，长期需要的，价格最好能优惠点</p>
			<p class="content-info-class"><span>求购类型：</span>面料</p>
			<p class="content-info-class"><span>求购数量：</span>1000码</p>
			<p class="content-info-class"><span>其他要求：</span>接受开机</p>
			<p class="content-info-class"><span>求购时间：</span>2017-04-25</p>
			
			<p class="content-info-class content-info-user"><span>采购商：</span>张三</p>
			<p class="content-info-class content-info-status"><span>状态：</span><span class="status">已关闭</span></p>
			
			<button class="deleBtn">删除</button>
		</div>
	</div>
</template>

<script>
	export default {
	};
</script>

<style lang="scss" scoped>
	.list-content {
		width: 760px;
		height: 520px;
		.content-img {
			margin-right: 20px;
			width: 420px;
			img {
				width: 100%;
				height: 423px;
				border: 1px solid #d1d1d1;
			}
		}
		.content-info {
			width: 320px;
			.content-info-desc {
				margin: 10px 0 20px 0;
				font-size: 18px;
				color: #333;
				line-height: 24px;
				letter-spacing: 1px;
			}
			.content-info-class {
				font-size: 16px;
				color: #333;
				span {
					display: inline-block;
					width: 105px;
					color: #666;
					line-height: 24px;
					letter-spacing: 1px;
				}
			}
			.content-info-user {
				margin: 20px 0 0 0;
				line-height: 40px;
				border: 1px solid #e5e5e5;
				border-left: 0;
				border-right: 0;
			}
			.content-info-status {
				line-height: 40px;
				border-bottom: 1px solid #e5e5e5;
				.status {
					color: #ff494f;
				}
			}
			.deleBtn {
				margin-top: 50px;
				width: 320px;
				height: 48px;
				border: 0;
				background: #ff494f;
				color: #fff;
				font-size: 20px;
			}
		}
	}
</style>
