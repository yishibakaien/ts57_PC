<template>
	<div class="personal-list">
		<div>
			<ts-filter title="分类">
				<ts-radio-group v-model="Filter.sort" @change="hanleFilterSort">
					<ts-radio label="">全部({{classes.totalNum}})</ts-radio>
					<ts-radio label="100010">面料({{classes.mianliao}})</ts-radio>
					<ts-radio label="100011">大边({{classes.large}})</ts-radio>
					<ts-radio label="100012">小边({{classes.small}})</ts-radio>
					<ts-radio label="100013">睫毛({{classes.eyelash}})</ts-radio>
				</ts-radio-group>
			</ts-filter>
			<ts-filter title="筛选条件">
				<ts-radio-group v-model="Filter.fabricType" @change="hanleFilterFabric">
					<ts-radio label="">全部({{classes.totalNum}})</ts-radio>
					<ts-radio label="1">接单中({{classes.statusBuy}})</ts-radio>
					<ts-radio label="2">已成交({{classes.statusSuccess}})</ts-radio>
					<ts-radio label="3">已关闭({{classes.statusClosed}})</ts-radio>
				</ts-radio-group>
			</ts-filter>
		</div>
		<div class="personal-list-wrap clearfix">
			<div class="personal-goods-item" v-for="(item, index) in items">
				<div class="personal-goods-item-img">
					<img v-lazy="item.productBuyBO.buyPicUrl" alt="求购" @click.stop="goDetail(index)" />
					<span class="states green" v-if="item.status == 1">接单中</span>
					<span class="states yellow" v-if="item.status == 2">已成交</span>
					<span class="states gray" v-if="item.status == 3">已关闭</span>
					<p class="statusSty" v-if="item.status == 1" @click="openModel(index)">取消接单</p>
					<p class="statusSty blue" v-if="item.status == 2" @click="goMoreBuy">更多求购</p>
					<p class="statusSty" v-if="item.status == 3" @click="openModel(index)">删除</p>
				</div>
				<p class="info">{{item.leaveWord}}</p>
				<p><span>求购 <i>{{item.productBuyBO.buyNum}}</i> {{item.productBuyBO.buyUnit | unit}}</span><span class="time">{{item.productBuyBO.createDate | customTime}}</span></p>
				<div class="tipsModel" v-show="item.tipShow">
					<div v-if="item.status == 1">
						<p>确认取消接单？</p>
						<button class="button-yes" @click="cancelBuyTaskMethod(index)">确认</button>
						<button class="button-no" @click="closeModel">取消</button>
					</div>
					<div v-if="item.status == 3">
						<p>确认删除该接单信息？</p>
						<button class="button-yes" @click="deleteBuyTaskMethod(index)">确认</button>
						<button class="button-no" @click="closeModel">取消</button>
					</div>
				</div>
			</div>
		</div>
		<pageBar v-if="pageMax >= 1" :pageNum="pageNum" :pageMax="pageMax" :number="pageSize" v-on:upPage="upPage" v-on:downPage="downPage" v-on:selectFirstPage="selectFirstPage" v-on:selectLastPage="selectLastPage" v-on:selectNumber="selectNumber"></pageBar>
	</div>
</template>

<script>
	import { pageBar } from '@/components';
	import { listBuyTask, cancelBuyTask, deleteBuyTask } from '@/common/api/api';
	import Toast from '@/components/common/toast/toast';
	export default {
		data() {
			return {
				Filter: {
					sort: '',
					fabricType: ''
				},
				pageNum: '',
				pageMax: '',
				pageSize: '',
				param: {
					buyStatus: '',
					buyType: '',
					pageNo: 1,
					pageSize: 8
				},
				cacelListParam: {
					id: ''
				},
				deleListParam: {
					ids: ''
				},
				id: '',
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
				}
			};
		},
		components: {
			pageBar
		},
		created() {
			let _ = this;
			listBuyTask(_.param).then((res) => {
				if (res.data.code === 0) {
					res.data.data.list.forEach((item) => {
						item.tipShow = false;
					});
					_.items = res.data.data.list;
					_.pageNum = res.data.data.pageNO;
					_.pageSize = res.data.data.pageSize;
					_.pageMax = res.data.data.totalPage;
					_.classes.totalNum = res.data.data.totalNum;
					_.classes.mianliao = res.data.data.ml;
					_.classes.large = res.data.data.db;
					_.classes.small = res.data.data.xb;
					_.classes.eyelash = res.data.data.jm;
					_.classes.statusBuy = res.data.data.buying;
					_.classes.statusSuccess = res.data.data.finish;
					_.classes.statusClosed = res.data.data.close;
				}
			}).catch();
		},
		methods: {
			hanleFilterSort(e) {
				let _ = this;
				if (!e) {
					_.param.buyType = '';
				} else {
					_.param.buyType = parseInt(e);
				}
				_.pageMax = '';
				_.param.pageNo = 1;
				_.listBuyTaskMethod();
			},
			hanleFilterFabric(e) {
				let _ = this;
				if (!e) {
					_.param.buyStatus = '';
				} else {
					_.param.buyStatus = parseInt(e);
				}
				_.pageMax = '';
				_.param.pageNo = 1;
				_.listBuyTaskMethod();
			},
			listBuyTaskMethod() {
				let _ = this;
				listBuyTask(_.param).then((res) => {
					if (res.data.code === 0) {
						res.data.data.list.forEach((item) => {
							item.tipShow = false;
						});
						_.items = res.data.data.list;
					}
				}).catch();
			},
			selectFirstPage() {
				let _ = this;
				_.param.pageNo = 1;
				this.listBuyTaskMethod();
			},
			selectLastPage() {
				let _ = this;
				_.param.pageNo = _.pageMax;
				this.listBuyTaskMethod();
			},
			upPage() {
				let _ = this;
				if (_.pageNum <= 1) {
					return;
				};
				--_.pageNum;
				_.param.pageNo = _.pageNum;
				this.listBuyTaskMethod();
			},
			downPage() {
				let _ = this;
				if (_.pageNum >= _.pageMax) {
					return;
				};
				++_.pageNum;
				_.param.pageNo = _.pageNum;
				this.listBuyTaskMethod();
			},
			selectNumber(num) {
				let _ = this;
				_.param.pageNo = 1;
				_.param.pageSize = num;
				this.listBuyTaskMethod();
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
			// 取消接单
			cancelBuyTaskMethod(index) {
				let _ = this;
				_.openModel(index);
				_.cacelListParam.id = _.items[index].id;
				cancelBuyTask(_.cacelListParam.id).then((res) => {
					if (res.data.code === 0) {
						Toast({
							type: 'success',
							message: '已成功取消接单'
						});
						_.param.buyStatus = '';
						_.param.buyType = '';
						_.Filter.sort = '';
						_.Filter.fabricType = '';
						listBuyTask(_.param).then((res) => {
							if (res.data.code === 0) {
								res.data.data.list.forEach((item) => {
									item.tipShow = false;
								});
								_.items = res.data.data.list;
								_.pageNum = res.data.data.pageNO;
								_.pageSize = res.data.data.pageSize;
								_.pageMax = res.data.data.totalPage;
								_.classes.totalNum = res.data.data.totalNum;
								_.classes.mianliao = res.data.data.ml;
								_.classes.large = res.data.data.db;
								_.classes.small = res.data.data.xb;
								_.classes.eyelash = res.data.data.jm;
								_.classes.statusBuy = res.data.data.buying;
								_.classes.statusSuccess = res.data.data.finish;
								_.classes.statusClosed = res.data.data.close;
							}
						}).catch();
					}
				}).catch();
			},
			// 删除接单
			deleteBuyTaskMethod(index) {
				let _ = this;
				_.openModel(index);
				_.deleListParam.ids = _.items[index].id;
				deleteBuyTask(_.deleListParam).then((res) => {
					if (res.data.code === 0) {
						Toast({
							type: 'success',
							message: '已成功删除接单信息'
						});
						listBuyTask(_.param).then((res) => {
							if (res.data.code === 0) {
								res.data.data.list.forEach((item) => {
									item.tipShow = false;
								});
								_.items = res.data.data.list;
								_.pageNum = res.data.data.pageNO;
								_.pageSize = res.data.data.pageSize;
								_.pageMax = res.data.data.totalPage;
								_.classes.totalNum = res.data.data.totalNum;
								_.classes.mianliao = res.data.data.ml;
								_.classes.large = res.data.data.db;
								_.classes.small = res.data.data.xb;
								_.classes.eyelash = res.data.data.jm;
								_.classes.statusBuy = res.data.data.buying;
								_.classes.statusSuccess = res.data.data.finish;
								_.classes.statusClosed = res.data.data.close;
							}
						}).catch();
					}
				}).catch();
			},
			// 求购列表页
			goMoreBuy() {
				this.$router.push({
					path: '/purchaseListPage'
				});
			},
			// 跳转详情页
			goDetail(e) {
				this.$router.push({
					path: '/purchaseDetailPage',
					query: {
						purchaseId: this.items[e].buyId
					}
				});
			}
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
	
	.statusSty {
		opacity: .6;
	}
	
	.blue {
		opacity: .8;
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
