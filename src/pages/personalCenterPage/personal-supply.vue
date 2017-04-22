<template>
	<div class="personal-flower">
		<div class="personal-class clearfix">
			<span class="title">分类</span>
			<p>
				<span class="selected">全部 {{'(' +a+ ')' }}</span>
				<span>大边 {{'(' +a+ ')' }}</span>
				<span>小边 {{'(' +a+ ')' }}</span>
				<span>睫毛 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-class clearfix">
			<span class="title">筛选条件</span>
			<p>
				<span class="selected">全部 {{'(' +a+ ')' }}</span>
				<span>胚布 {{'(' +a+ ')' }}</span>
				<span>成品 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-flower-wrap clearfix">
			<div class="personal-goods-item">
				<div class="personal-goods-item-img">
					<img src="../../../static/timg.jpg" alt="求购" />
					<span class="states green">成品</span>
					<!--<span class="states gray">胚布</span>-->
					<p class="p3"><span class="span1"> &nbsp;&nbsp;2000码</span><span class="span2">昨天&nbsp;&nbsp; </span></p>
				</div>
				<p class="info">大量求购，有多少要多少大量求购，有多少要多少大量求购，有多少要多少</p>
				<p class="company">
					<img src="../../../static/timg.jpg" alt="company"/>
					<span title="福建坐视布管蕾丝花边福建坐视布管蕾丝花边">福建坐视布管蕾丝花边福建坐视布管蕾丝花边</span>
				</p>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				a: 1,
				b: 2
			};
		}
	};
</script>

<style lang="scss" scoped="scoped">
	.personal-flower {
		margin-top: 25px;
		padding: 0 15px;
		.personal-flower-wrap {
			margin-top: 20px;
		}
	}
	
	.p3 {
		padding: 0 15px;
		opacity: .4;
		span {
			color: #fff;
		}
		.span1 {
			text-align: left;
		}
		.span2 {
			text-align: right;
		}
	}
	.company {
		border-top: 1px solid #d1d1d1;
		img {
			width: 30px;
			height: 30px;
			border-radius: 50%;
		}
		span {
			display: inline-block;
			padding-left: 10px;
			width: 150px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 10px;
		}
	}
</style>
