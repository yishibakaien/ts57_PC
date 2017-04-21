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
				<span>有库存 {{'(' +a+ ')' }}</span>
				<span>需要开机 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-flower-wrap clearfix">
			<div class="personal-goods-item">
				<div class="personal-goods-item-img">
					<img src="../../../static/timg.jpg" alt="求购" />
					<!--<span class="states green">有库存</span>-->
					<span class="states gray">没库存</span>
					<p class="p3"><span class="borderS">找相似</span><span>试衣</span></p>
				</div>
				<p class="info">大量求购，有多少要多少大量求购，有多少要多少大量求购，有多少要多少</p>
				<p><span>求购 <i>200</i> 码</span><span class="time">1小时前</span></p>
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
		opacity: .4;
		span {
			color: #fff;
		}
		.borderS {
			position: rrelative;
			&::after {
				content: '';
				position: absolute;
				left: 50%;
				top: 3px;
				width: 2px;
				height: 22px;
				background: #fff;
				opacity: .7;
			}
		}
	}
</style>
