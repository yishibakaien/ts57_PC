<template>
	<div class="searchBar fr">
		<p class="clearfix fl">
			<input type="text" placeholder="输入花型编号搜索" class="fl" />
			<span class="fr">tu</span>
		</p>
		<button class="pic fl">图标</button>
		<button class="shop-btn addNew fl">新增花型</button>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped="scoped">
	.searchBar {
		p {
			width: 280px;
			height: 32px;
			line-height: 32px;
			border: 1px solid #d1d1d1;
			input {
				padding: 8px 6px;
				width: 234px;
				border: 0;
			}
			span {
				width: 32px;
				height: 32px;
				line-height: 32px;
				text-align: center;
				border-left: 1px solid #d1d1d1;
			}
		}
		.addNew {
			margin-left: 16px;
		}
		.pic {
			margin-left: 18px;
			width: 40px;
			height: 32px;
			color: #fff;
			border: 0;
			border-radius: 2px;
			background: #FF8400;
			cursor: pointer;
		}
	}
</style>
