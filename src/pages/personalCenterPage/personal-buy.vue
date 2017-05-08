<template>
	<div class="personal-buy">
		<div>
			<ts-filter title="分类">
				<ts-radio-group v-model="Filter.sort" @change="hanleFilterSort">
					<ts-radio label="null">全部({{classes.totalNum}})</ts-radio>
					<ts-radio label="100010">面料({{classes.mianliao}})</ts-radio>
					<ts-radio label="100011">大边({{classes.large}})</ts-radio>
					<ts-radio label="100012">小边({{classes.small}})</ts-radio>
					<ts-radio label="100013">睫毛({{classes.eyelash}})</ts-radio>
				</ts-radio-group>
			</ts-filter>
			<ts-filter title="面料种类">
				<ts-radio-group v-model="Filter.fabricType" @change="hanleFilterFabric">
					<ts-radio label="null">全部({{classes.totalNum}})</ts-radio>
					<ts-radio label="1">求购中({{classes.statusBuy}})</ts-radio>
					<ts-radio label="2">已成交({{classes.statusSuccess}})</ts-radio>
					<ts-radio label="3">已关闭({{classes.statusClosed}})</ts-radio>
				</ts-radio-group>
			</ts-filter>
		</div>
		<div class="personal-buy-wrap clearfix">
			<div class="personal-goods-item" v-for="item in items">
				<div class="personal-goods-item-img">
					<img :src="item.buyPicUrl" alt="求购" />
					<span class="states green" v-if="item.buyStatus == 1">求购中</span>
					<span class="states yellow" v-if="item.buyStatus == 2">已成交</span>
					<span class="states gray" v-if="item.buyStatus == 3">已关闭</span>
					<p class="gray" v-if="item.buyStatus == 1">取消求购</p>
					<p class="blue" v-if="item.buyStatus == 2">重新发布</p>
					<p class="p3" v-if="item.buyStatus == 3"><span class="spanL">重新发布</span><span class="spanR">删除</span></p>

				</div>
				<p class="info">{{ item.buyDesc }}</p>
				<p><span>求购 <i>{{ item.buyNum }}</i> 码</span><span class="time">1小时前</span></p>
				<div class="tipsModel" v-show="tipShow">

				</div>
			</div>
		</div>
		<pageBar v-if="pageMax >= 1" :pageNum="pageNum" :pageMax="pageMax" :number="pageSize" v-on:upPage="upPage" v-on:downPage="downPage" v-on:selectFirstPage="selectFirstPage" v-on:selectLastPage="selectLastPage" v-on:selectNumber="selectNumber"></pageBar>
	</div>
</template>

<script>
	import { pageBar } from '@/components';
	import { listProductBuys } from '@/common/api/api';
	export default {
		data() {
			return {
				Filter: {
					sort: 'null',
					fabricType: 'null'
				},
				pageNum: '',
				pageMax: '',
				pageSize: '',
				param: {
					buyShapes: null,
					buyStatus: null,
					buyTypes: null,
					isMy: 'true',
					pageNo: 1,
					pageSize: 8
				},
				items: [],
				classes: {
					totalNum: 0,
					mianliao: 0,
					large: 0,
					small: 0,
					eyelash: 0,
					statusBuy: 0,
					statusSuccess: 0,
					statusClosed: 0
				},
				tipShow: false,
				a: 1,
				b: 3
			};
		},
		components: {
			pageBar
		},
		created() {
			let _ = this;
			listProductBuys(_.param).then((res) => {
				_.items = res.data.list;
				_.pageNum = res.data.pageNO;
				_.pageSize = res.data.pageSize;
				_.pageMax = res.data.totalPage;
				_.classes.totalNum = res.data.totalNum;
			}).catch();
		},
		methods: {
			listProductBuysMethod() {
				let _ = this;
				listProductBuys(_.param).then((res) => {
					_.items = res.data.list;
					_.pageNum = res.data.pageNO;
					_.pageSize = res.data.pageSize;
					_.pageMax = res.data.totalPage;
				}).catch();
			},
			hanleFilterFabric(e) {
				let _ = this;
				if (e === 'null') {
					_.param.buyStatus = null;
				} else {
					_.param.buyStatus = parseInt(e);
				}
				_.pageMax = '';
				_.param.pageNo = 1;
				_.listProductBuysMethod();
			},
			hanleFilterSort(e) {
				let _ = this;
				if (e === 'null') {
					_.param.buyTypes = null;
				} else {
					_.param.buyTypes = parseInt(e);
				}
				_.pageMax = '';
				_.param.pageNo = 1;
				_.listProductBuysMethod();
			},
			closeProductBuyMethod() {
				let _ = this;
				_.tipShow = true;
			},
			selectFirstPage() {
				let _ = this;
				_.param.pageNo = 1;
				this.listProductBuysMethod();
			},
			selectLastPage() {
				let _ = this;
				_.param.pageNo = _.pageMax;
				this.listProductBuysMethod();
			},
			upPage() {
				let _ = this;
				if (_.pageNum <= 1) {
					return;
				};
				--_.pageNum;
				_.param.pageNo = _.pageNum;
				this.listProductBuysMethod();
			},
			downPage() {
				let _ = this;
				if (_.pageNum >= _.pageMax) {
					return;
				};
				++_.pageNum;
				_.param.pageNo = _.pageNum;
				this.listProductBuysMethod();
			},
			selectNumber(num) {
				let _ = this;
				_.param.pageNo = 1;
				_.param.pageSize = num;
				this.listProductBuysMethod();
			}
		}
	};
</script>

<style lang="scss">
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
	
	.personal-goods-item {
		position: relative;
	}
	
	.tipsModel {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
	}
</style>
