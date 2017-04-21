<template>
	<div class="personal-buy">
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
				<span>求购中 {{'(' +a+ ')' }}</span>
				<span>已成交 {{'(' +a+ ')' }}</span>
				<span>已关闭 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-buy-wrap clearfix">
			<div class="personal-goods-item">
				<div class="personal-goods-item-img">
					<img src="../../../static/timg.jpg" alt="求购" />
					<!--<span class="states green">求购中</span>-->
					<!--<span class="states yellow">进行中</span>-->
					<span class="states gray">已关闭</span>
					<p>关闭求购</p>
					<!--<p class="blue">重新发布</p>-->
					<!--<p class="p3"><span class="spanL">重新发布</span><span class="spanR">删除</span></p>-->
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
				b: 3
			};
		}
	};
</script>

<style lang="scss" scoped="scoped">
	.personal-buy {
		margin-top: 25px;
		padding: 0 15px;
		.personal-buy-wrap {
			margin-top: 20px;
		}
	}
	.p3 {
		opacity: .7;
	}
	.p3 span {
		display: inline-block;
		width: 50%;
		height: 100%;
	}
</style>
