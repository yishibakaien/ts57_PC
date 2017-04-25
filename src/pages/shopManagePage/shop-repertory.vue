<template>
	<div class="shop-repertory">
		<div class="shop-classify clearfix">
			<span class="title">分类</span>
			<p>
				<span class="selected">全部 {{'(' +a+ ')' }}</span>
				<span>大边 {{'(' +a+ ')' }}</span>
				<span>小边 {{'(' +a+ ')' }}</span>
				<span>睫毛 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="shop-classify clearfix">
			<span class="title">筛选条件</span>
			<p>
				<span class="selected">全部 {{'(' +a+ ')' }}</span>
				<span>求购中 {{'(' +a+ ')' }}</span>
				<span>已成交 {{'(' +a+ ')' }}</span>
				<span>已关闭 {{'(' +a+ ')' }}</span>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				a: 1
			};
		}
	};
</script>

<style lang="scss" scoped="scoped">

.shop-repertory {
	margin-top: 50px;
	padding: 0 15px;
}

</style>
