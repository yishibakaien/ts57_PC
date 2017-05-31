<template>
	<div class="flower-detail">
		<v-header>
			<search></search>
		</v-header>
		<v-nav></v-nav>
		<div class="flower-detail-wrap">
			<div class="flower-detail-box">
				<div class="flower-detail-nav">
					<router-link to="homePage">首页</router-link> >
					<router-link to="purchaseListPage">档口求购</router-link> >
					<span>求购详情</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		header,
		nav,
		search
	} from '@/components';
	export default {
		components: {
			vHeader: header,
			vNav: nav,
			search
		}
	};
</script>

<style lang="scss" scoped>
.flower-detail-wrap {
	width: 100%;
	min-height: 700px;
	background: #fff;
	.flower-detail-box {
		margin: 0 auto;
		width: 1200px;
	}
}
</style>
