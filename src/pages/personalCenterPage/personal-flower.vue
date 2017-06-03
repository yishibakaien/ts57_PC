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
		<div class="default-page" v-if='defaultShow'>
			暂无数据
		</div>
		<div class="personal-flower-wrap clearfix" v-else>
			<div class="personal-goods-item" v-for="(item, index) in items">
				<div class="personal-goods-item-img">
					<img v-lazy="item.defaultPicUrl" alt="求购" />
					<span class="states green" v-if="item.isStock === 1">有库存</span>
					<span class="states gray" v-else>需要开机</span>
					<p class="p3"><span class="borderS">找相似</span><span>试衣</span></p>
					<i class="dele icon-shanchu_hui" @click="openModel(index)"></i>
				</div>
				<p class="info">{{item.companyName}}</p>
				<p><span>#{{item.productNo}}</span><span class="time">{{item.createDate | customTime}}</span></p>
				<div class="tipsModel" v-show="item.tipShow">
					<div>
						<p>从花型收藏中删除？</p>
						<button class="button-yes" @click="deleFlower(index)">确认</button>
						<button class="button-no" @click="closeModel">取消</button>
					</div>
				</div>
			</div>
		</div>
		<pageBar v-if="!defaultShow" :pageNum="pageNum" :pageMax="pageMax" :number="pageSize" v-on:upPage="upPage" v-on:downPage="downPage" v-on:selectFirstPage="selectFirstPage" v-on:selectLastPage="selectLastPage" v-on:selectNumber="selectNumber"></pageBar>
	</div>
</template>

<script>
	import { pageBar } from '@/components';
	import { listProduct, countProduct, favoriteBus } from '@/common/api/api';
	export default {
		data() {
			return {
				Filter: {
					sort: '-1',
					fabricType: '-1'
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
				defaultShow: false
			};
		},
		components: {
			pageBar
		},
		created() {
			let _ = this;
//			console.log(listProduct);
			listProduct(_.param).then((res) => {
				console.log(res.data.data.list);
				if (res.data.code === 0) {
					if (res.data.data.list.length === 0) {
						this.defaultShow = true;
						return;
					} else {
						this.defaultShow = false;
					}
					res.data.data.list.forEach((item) => {
						item.tipShow = false;
					});
					_.items = res.data.data.list;
					_.pageNum = res.data.data.pageNO || 1;
					_.pageSize = res.data.data.pageSize || 8;
					_.pageMax = res.data.data.totalPage > 0 ? res.data.data.totalPage : 1;
				}
			}).catch((res) => {});
			countProduct().then((res) => {
				if (res.data.code === 0) {
					_.classes.totalNum = res.data.data.countProduct;
					_.classes.mianliao = res.data.data.countML;
					_.classes.large = res.data.data.countDB;
					_.classes.small = res.data.data.countXB;
					_.classes.eyelash = res.data.data.countJM;
					_.classes.statusYes = res.data.data.countYKC;
					_.classes.statusNo = res.data.data.countXYKJ;
				}
			}).catch();
		},
		methods: {
			listProductMethod() {
				let _ = this;
				listProduct(_.param).then((res) => {
					if (res.data.code === 0) {
						if (res.data.data.list.length === 0) {
							this.defaultShow = true;
							return;
						} else {
							this.defaultShow = false;
						}
						res.data.data.list.forEach((item) => {
							item.tipShow = false;
						});
						_.items = res.data.data.list;
						_.pageNum = res.data.data.pageNO || 1;
						_.pageSize = res.data.data.pageSize || 8;
						_.pageMax = res.data.data.totalPage > 0 ? res.data.data.totalPage : 1;
					}
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
			},
			openModel(index) {
				let _ = this;
				_.closeModel();
				_.items[index].tipShow = true;
			},
			closeModel() {
				let _ = this;
				_.items.forEach((item) => {
					item.tipShow = false;
				});
			},
			deleFlower(index) {
				let _ = this;
				console.log(_.items[index].id);
				let param = {};
				param.businessId = _.items[index].id;
				param.businessType = 1;
				favoriteBus(param).then((res) => {
					console.log(res);
					if (res.data.code === 0) {
						_.closeModel();
						_.listProductMethod();
					}
				}).catch();
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
	.dele {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		color: #fff;
		background: #000;
		opacity: .4;
		display: none;
	}
	.personal-goods-item-img:hover .dele {
		display: block;
	}
	.icon-shanchu_hui::before {
		color: #fff;
	}
	.tipsModel {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .5);
		p {
			margin-top: 90px;
			color: #fff;
			font-size: 16px;
			text-align: center;
		}
		.button-yes,
		.button-no {
			margin-top: 70px;
			display: inline-block;
			width: 80px;
			height: 32px;
			line-height: 32px;
			border: 0;
			font-size: 14px;
			color: #FFF;
			text-align: center;
		}
		.button-yes {
			margin: 0 14px;
			background: #4c93fd;
		}
		.button-no {
			background: #d1d1d1;
		}
	}
</style>
