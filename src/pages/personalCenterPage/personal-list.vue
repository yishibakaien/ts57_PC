<template>
	<div class="personal-list">
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
				<span>接单中 {{'(' +a+ ')' }}</span>
				<span>已成交 {{'(' +a+ ')' }}</span>
				<span>已关闭 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-list-wrap clearfix">
			<div class="personal-goods-item">
				<div class="personal-goods-item-img">
					<img src="../../../static/timg.jpg" alt="求购" />
					<span class="states green">接单中</span>
					<!--<span class="states yellow">进行中</span>
					<span class="states gray">已关闭</span>-->
					<p v-if="b==1">取消接单</p>
					<p v-else-if="b==2" class="blue">更多求购</p>
					<p v-else-if="b==3">删除</p>
				</div>
				<p class="info">大量求购，有多少要多少大量求购，有多少要多少大量求购，有多少要多少</p>
				<p><span>求购 <i>200</i> 码</span><span class="time">1小时前</span></p>
			</div>
			<div class="personal-goods-item">
				<div class="personal-goods-item-img">
					<img src="../../../static/timg.jpg" alt="求购" />
					<span class="states green">接单中</span>
					<!--<span class="states">进行中</span>-->
					<!--<span class="states">已关闭</span>-->
					<p v-if="b==1">取消接单</p>
					<p v-else-if="b==2" class="blue">更多求购</p>
					<p v-else-if="b==3">删除</p>
				</div>
				<p class="info">大量求购，有多少要多少大量求购，有多少要多少大量求购，有多少要多少</p>
				<p><span>求购 <i>200</i> 码</span><span class="time">1小时前</span></p>
			</div>
			<div class="personal-goods-item">
				<div class="personal-goods-item-img">
					<img src="../../../static/timg.jpg" alt="求购" />
					<!--<span class="states">接单中</span>-->
					<span class="states yellow">进行中</span>
					<!--<span class="states">已关闭</span>-->
					<p v-if="b==1">取消接单</p>
					<p v-else-if="b==2" class="blue">更多求购</p>
					<p v-else-if="b==3">删除</p>
				</div>
				<p class="info">大量求购，有多少要多少大量求购，有多少要多少大量求购，有多少要多少</p>
				<p><span>求购 <i>200</i> 码</span><span class="time">1小时前</span></p>
			</div>
			<div class="personal-goods-item">
				<div class="personal-goods-item-img">
					<img src="../../../static/timg.jpg" alt="求购" />
					<!--<span class="states">接单中</span>-->
					<!--<span class="states">进行中</span>-->
					<span class="states gray">已关闭</span>
					<p v-if="b==1">取消接单</p>
					<p v-else-if="b==2" class="blue">更多求购</p>
					<p v-else-if="b==3">删除</p>
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
	.personal-list {
		margin-top: 25px;
		padding: 0 15px;
	}
	
	div.personal-goods-item:nth-child(4n) {
		margin-right: 0 !important;
	}
	
	.personal-list-wrap {
		margin-top: 20px;
	}
</style>
