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
					<router-link to="purchaseListPage">贸易商求购</router-link> >
					<span>求购详情</span>
				</div>
				<div class="purchase-detail-left fl">
					<listContent :item="itemObj" @cancelList="getProductBuyMethod"></listContent>
					<listNum :item="itemObj" style="margin-bottom: 35px"></listNum>
					<listInfo :item="itemObj"></listInfo>
				</div>
				<div class="purchase-detail-right fr">
					<listUser :item="itemObj"></listUser>
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
	import {getProductBuy, listBuyTaskUserByBuyId} from '@/common/api/api';
	export default {
		data() {
			return {
				buyDetailparam: {
					id: ''
				},
				itemObj: {},
				paramId: '',
				imgs1: []
			};
		},
		components: {
			'vHeader': header,
			'vNav': nav,
			search,
			listContent,
			listInfo,
			listNum,
			listUser
		},
		created() {
			this.buyDetailparam.id = this.$route.query.purchaseId;
			getProductBuy(this.buyDetailparam.id).then((res) => {
				if (res.data.code === 0) {
					this.itemObj = res.data.data;
//					this.paramId = this.itemObj.id;
//					this.listBuyTaskUserByBuyIdMethod();
				}
			}).catch();
		},
		methods: {
			listBuyTaskUserByBuyIdMethod() {
				listBuyTaskUserByBuyId(this.paramId).then((res) => {
					if (res.data.code === 0) {
						this.imgs1 = res.data.data;
					}
				}).catch();
			},
			getProductBuyMethod() {
				this.buyDetailparam.id = this.$route.query.purchaseId;
				getProductBuy(this.buyDetailparam.id).then((res) => {
					if (res.data.code === 0) {
						this.itemObj = res.data.data;
//						this.paramId = this.itemObj.id;
//						this.listBuyTaskUserByBuyIdMethod();
					}
				}).catch();
			}
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
