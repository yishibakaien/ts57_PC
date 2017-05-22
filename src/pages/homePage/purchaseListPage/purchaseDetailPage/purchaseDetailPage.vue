<template>
	<div class="purchase-detail">
		<v-header>
			<search></search>
		</v-header>
		<v-nav></v-nav>
		<div class="purchase-detail-box">
			<div class="purchase-detail-wrap clearfix">
				<div class="purchase-detail-nav">
					<router-link to="homePage">首页</router-link> >
					<router-link to="purchaseListPage">档口求购</router-link> >
					<span>求购详情</span>
				</div>
				<div class="purchase-detail-left fl">
					<listContent></listContent>
					<listInfo style="margin-bottom: 35px"></listInfo>
					<listNum></listNum>
				</div>
				<div class="purchase-detail-right fr">
					<listUser></listUser>
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
	import listContent from './listContent';
	import listInfo from './listInfo';
	import listNum from './listNum';
	import listUser from './listUser';
	export default {
		components: {
			'vHeader': header,
			'vNav': nav,
			search,
			listContent,
			listInfo,
			listNum,
			listUser
		}
	};
</script>

<style lang="scss" scoped>
	.purchase-detail-box {
		width: 100%;
		min-height: 700px;
		background: #fff;
		.purchase-detail-wrap {
			margin: 0 auto;
			width: 1200px;
		}
	}
	.purchase-detail-wrap {
		padding-bottom: 60px;
	}
	.purchase-detail-nav {
		padding: 30px 0;
		a,
		span {
			font-size: 16px;
			color: #999;
		}
		a:hover {
			color: #4C93FD;
		}
	}
</style>
