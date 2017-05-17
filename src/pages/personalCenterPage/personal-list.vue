<template>
	<div class="personal-list">
		<!--<div class="personal-class clearfix">
			<span class="title">分类</span>
			<p>
				<span class="selected">全部 {{'(' +classNum.all+ ')' }}</span>
				<span>大边 {{'(' +a+ ')' }}</span>
				<span>小边 {{'(' +a+ ')' }}</span>
				<span>睫毛 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-class clearfix">
			<span class="title">筛选条件</span>
			<p>
				<span class="selected">全部 {{'(' +classNum.all+ ')' }}</span>
				<span>接单中 {{'(' +a+ ')' }}</span>
				<span>已成交 {{'(' +a+ ')' }}</span>
				<span>已关闭 {{'(' +a+ ')' }}</span>
			</p>
		</div>-->
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
			<div class="personal-goods-item" v-for="item in items">
				<div class="personal-goods-item-img">
					<img :src="item.picUrl" alt="求购" />
					<span class="states green" v-if="item.status == 1">接单中</span>
					<span class="states yellow" v-if="item.status == 2">进行中</span>
					<span class="states gray" v-if="item.status == 3">已关闭</span>
					<p class="statusSty" v-if="item.status == 1">取消接单</p>
					<p class="statusSty blue" v-if="item.status == 2">更多求购</p>
					<p class="statusSty" v-if="item.status == 3">删除</p>
				</div>
				<p class="info">{{item.leaveWord}}</p>
				<p><span>求购 <i>200</i> 码</span><span class="time">{{item.createDate | customTime}}</span></p>
			</div>
		</div>
		<pageBar v-if="pageMax >= 1" :pageNum="pageNum" :pageMax="pageMax" :number="pageSize" v-on:upPage="upPage" v-on:downPage="downPage" v-on:selectFirstPage="selectFirstPage" v-on:selectLastPage="selectLastPage" v-on:selectNumber="selectNumber"></pageBar>
	</div>
</template>

<script>
	import { pageBar } from '@/components';
	import { listBuyTask } from '@/common/api/api';
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
				console.log(res.data);
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
					_.items = res.data.data.list;
					_.pageNum = res.data.data.pageNO;
					_.pageSize = res.data.data.pageSize;
					_.pageMax = res.data.data.totalPage;
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
</style>
