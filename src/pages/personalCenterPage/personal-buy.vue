<template>
	<div class="personal-buy">
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
					<ts-radio label="1">求购中({{classes.statusBuy}})</ts-radio>
					<ts-radio label="2">已成交({{classes.statusSuccess}})</ts-radio>
					<ts-radio label="3">已关闭({{classes.statusClosed}})</ts-radio>
				</ts-radio-group>
			</ts-filter>
		</div>
		<div class="personal-buy-wrap clearfix"  v-show='!defaultShow'>
			<div class="personal-goods-item" v-for="(item, index) in items">
				<div class="personal-goods-item-img">
					<img v-lazy="item.buyPicUrl" alt="求购"  @click="goDetail(index)"/>
					<span class="states green" v-if="item.buyStatus == 1">求购中</span>
					<span class="states yellow" v-if="item.buyStatus == 2">已成交</span>
					<span class="states gray" v-if="item.buyStatus == 3">已关闭</span>
					<p class="gray" v-if="item.buyStatus == 1" @click.stop="openModel(index)">关闭求购</p>
					<p class="blue" v-if="item.buyStatus == 2" @click.stop="releaseBuyAgain(index)">重新发布</p>
					<p class="p3" v-if="item.buyStatus == 3"><span class="spanL" @click.stop="releaseBuyAgain(index)">重新发布</span><span class="spanR" @click.stop="openModel(index)">删除</span></p>
				</div>
				<p class="info">{{ item.buyDesc }}</p>
				<p><span>求购 <i>{{ item.buyNum }}</i> 码</span><span class="time">{{item.createDate | customTime}}</span></p>
				<div class="tipsModel" v-show="item.tipShow">
					<div v-if="item.buyStatus == 1">
						<p>确认关闭该求购？</p>
						<button class="button-yes" @click="closeProductBuyMethod(index)">确认</button>
						<button class="button-no" @click="closeModel">取消</button>
					</div>
					<div v-if="item.buyStatus == 3">
						<p>确认删除该求购单？</p>
						<button class="button-yes" @click="deleteProductBuyMethod(index)">确认</button>
						<button class="button-no" @click="closeModel">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="default-page" v-show='defaultShow'>
			暂无数据
		</div>
		<pageBar v-if="pageMax >= 1" :pageNum="pageNum" :pageMax="pageMax" :number="pageSize" v-on:upPage="upPage" v-on:downPage="downPage" v-on:selectFirstPage="selectFirstPage" v-on:selectLastPage="selectLastPage" v-on:selectNumber="selectNumber"></pageBar>
	</div>
</template>

<script>
	import { pageBar } from '@/components';
	import { myProductBuys, deleteProductBuy, closeProductBuy } from '@/common/api/api';
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
				deleBuyParam: {
					ids: ''
				},
				closeBuyParam: {
					buyCloseDesc: '',
					id: ''
				},
				items: [],
				showItems: [],
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
				defaultShow: false
			};
		},
		components: {
			pageBar
		},
		created() {
			let _ = this;
			myProductBuys(_.param).then((res) => {
				if (res.data.data.list.length === 0) {
					this.defaultShow = true;
					return;
				}
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
			}).catch();
		},
		methods: {
			myProductBuysMethod() {
				let _ = this;
				myProductBuys(_.param).then((res) => {
					res.data.data.list.forEach((item) => {
						item.tipShow = false;
					});
					_.items = res.data.data.list;
					_.pageNum = res.data.data.pageNO;
					_.pageSize = res.data.data.pageSize;
					_.pageMax = res.data.data.totalPage;
				}).catch();
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
				_.myProductBuysMethod();
			},
			hanleFilterSort(e) {
				let _ = this;
				if (!e) {
					_.param.buyType = '';
				} else {
					_.param.buyType = parseInt(e);
				}
				_.pageMax = '';
				_.param.pageNo = 1;
				_.myProductBuysMethod();
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
			selectFirstPage() {
				let _ = this;
				_.param.pageNo = 1;
				this.myProductBuysMethod();
			},
			selectLastPage() {
				let _ = this;
				_.param.pageNo = _.pageMax;
				this.myProductBuysMethod();
			},
			upPage() {
				let _ = this;
				if (_.pageNum <= 1) {
					return;
				};
				--_.pageNum;
				_.param.pageNo = _.pageNum;
				this.myProductBuysMethod();
			},
			downPage() {
				let _ = this;
				if (_.pageNum >= _.pageMax) {
					return;
				};
				++_.pageNum;
				_.param.pageNo = _.pageNum;
				this.myProductBuysMethod();
			},
			selectNumber(num) {
				let _ = this;
				_.param.pageNo = 1;
				_.param.pageSize = num;
				this.myProductBuysMethod();
			},
			// 删除求购
			deleteProductBuyMethod(index) {
				this.deleBuyParam.ids = this.items[index].id;
				deleteProductBuy(this.deleBuyParam).then((res) => {
					if (res.data.code === 0) {
						this.closeModel();
						Toast({
							type: 'success',
							message: '该求购单已删除'
						});
						this.myProductBuysMethod();
					}
				}).catch();
			},
			// 关闭求购
			closeProductBuyMethod(index) {
				this.closeBuyParam.id = this.items[index].id;
				closeProductBuy(this.closeBuyParam).then((res) => {
					if (res.data.code === 0) {
						this.closeModel();
						Toast({
							type: 'success',
							message: '成功关闭该求购'
						});
						this.myProductBuysMethod();
					}
				}).catch();
			},
			// 重新发布
			releaseBuyAgain(index) {
				this.$router.push({
					path: '/releasePurchasePage',
					query: {
						obj: this.items[index]
					}
				});
			},
			// 跳转详情页
			goDetail(e) {
				this.$router.push({
					path: '/purchaseDetailPage',
					query: {
						purchaseId: this.items[e].id
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.default-page {
		width: 100%;
		height: 300px;
		font-size: 20px;
		line-height: 200px;
		text-align: center;
	}
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
