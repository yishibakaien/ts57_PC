<template>
	<div class="personal-flower">
		<div>
			<ts-filter title="分类">
				<ts-radio-group v-model="Filter.sort" @change="hanleFilterSort">
					<ts-radio label="-1">全部({{classes.totalNum}})</ts-radio>
					<ts-radio label="100010">面料({{classes.mianliao}})</ts-radio>
					<ts-radio label="100011">大边({{classes.large}})</ts-radio>
					<ts-radio label="100012">小边({{classes.small}})</ts-radio>
					<ts-radio label="100013">睫毛({{classes.eyelash}})</ts-radio>
				</ts-radio-group>
			</ts-filter>
			<ts-filter title="库存">
				<ts-radio-group v-model="Filter.fabricType" @change="hanleFilterFabric">
					<ts-radio label="-1">全部({{classes.totalNum}})</ts-radio>
					<ts-radio label="1">有库存({{classes.statusYes}})</ts-radio>
					<ts-radio label="0">需要开机({{classes.statusNo}})</ts-radio>
				</ts-radio-group>
			</ts-filter>
		</div>
		<div class="personal-flower-wrap clearfix">
			<div class="personal-goods-item" v-for="item in items">
				<div class="personal-goods-item-img">
					<img src="item.defaultPicUrl" alt="求购" />
					<span class="states green" v-if="item.isStock === 1">有库存</span>
					<span class="states gray" v-else>需要开机</span>
					<p class="p3"><span class="borderS">找相似</span><span>试衣</span></p>
				</div>
				<p class="info">{{item.companyName}}</p>
				<p><span>#{{item.productNo}}</span><span class="time">1小时前</span></p>
			</div>
		</div>
		<pageBar v-if="classes.totalNum > 1" :pageNum="pageNum" :pageMax="pageMax" :number="pageSize" v-on:upPage="upPage" v-on:downPage="downPage" v-on:selectFirstPage="selectFirstPage" v-on:selectLastPage="selectLastPage" v-on:selectNumber="selectNumber"></pageBar>
	</div>
</template>

<script>
	import { pageBar } from '@/components';
	import { listProduct, countProduct } from '@/common/api/api';
	export default {
		data() {
			return {
				Filter: {
					sort: -1,
					fabricType: -1
				},
				pageNum: '',
				pageMax: '',
				pageSize: '',
				param: {
					category: -1,
					isStock: -1,
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
					statusYes: 0,
					statusNo: 0
				},
				a: 1
			};
		},
		components: {
			pageBar
		},
		created() {
			let _ = this;
			listProduct(_.param).then((res) => {
				_.items = res.data.list;
				_.pageNum = res.data.pageNO;
				_.pageSize = res.data.pageSize;
				_.pageMax = res.data.totalPage;
			}).catch((res) => {});
			countProduct().then((res) => {
				console.log(res.data.data);
				_.classes.totalNum = res.data.data.countProduct;
				_.classes.mianliao = res.data.data.countML;
				_.classes.large = res.data.data.countDB;
				_.classes.small = res.data.data.countXB;
				_.classes.eyelash = res.data.data.countJM;
				_.classes.statusYes = res.data.data.countYKC;
				_.classes.statusNo = res.data.data.countXYKJ;
			}).catch();
		},
		methods: {
			listProductMethod() {
				let _ = this;
				listProduct(_.param).then((res) => {
					_.items = res.data.list;
					_.pageNum = res.data.pageNO;
					_.pageSize = res.data.pageSize;
					_.pageMax = res.data.totalPage;
				}).catch((res) => {
					console.log(res.data);
				});
			},
			hanleFilterFabric(e) {
				console.log(e);
				let _ = this;
				_.param.isStock = parseInt(e);
				_.pageMax = '';
				_.param.pageNo = 1;
				_.listProductMethod();
			},
			hanleFilterSort(e) {
				console.log(e);
				let _ = this;
				_.param.category = parseInt(e);
				_.pageMax = '';
				_.param.pageNo = 1;
				_.listProductMethod();
			},
			selectFirstPage() {
				let _ = this;
				_.param.pageNo = 1;
				this.listProductMethod();
			},
			selectLastPage() {
				let _ = this;
				_.param.pageNo = _.pageMax;
				this.listProductMethod();
			},
			upPage() {
				let _ = this;
				if (_.pageNum <= 1) {
					return;
				};
				--_.pageNum;
				_.param.pageNo = _.pageNum;
				this.listProductMethod();
			},
			downPage() {
				let _ = this;
				if (_.pageNum >= _.pageMax) {
					return;
				};
				++_.pageNum;
				_.param.pageNo = _.pageNum;
				this.listProductMethod();
			},
			selectNumber(num) {
				let _ = this;
				_.param.pageNo = 1;
				_.param.pageSize = num;
				this.listProductMethod();
			}
		}
	};
</script>

<style lang="scss" scoped>
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
