<template>
	<div class="personal-buy">
		<div class="personal-class clearfix">
			<span class="title">分类</span>
			<p>
				<span class="selected">全部 {{'(' + classes.totalNum + ')' }}</span>
				<span @click="classMianliao">面料 {{'(' + classes.mianliao + ')' }}</span>
				<span @click="classDabian">大边 {{'(' + classes.large + ')' }}</span>
				<span @click="classXiaobian">小边 {{'(' + classes.small + ')' }}</span>
				<span @click="classJiemao">睫毛 {{'(' + classes.eyelash + ')' }}</span>
			</p>
		</div>
		<div class="personal-class clearfix">
			<span class="title">筛选条件</span>
			<p>
				<span class="selected">全部 {{'(' +classes.totalNum+ ')' }}</span>
				<span @click="classBuy">求购中 {{'(' + classes.statusBuy + ')' }}</span>
				<span @click="classSuccess">已成交 {{'(' + classes.statusSuccess + ')' }}</span>
				<span @click="classClosed">已关闭 {{'(' + classes.statusClosed + ')' }}</span>
			</p>
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
		<pageBar v-if="classes.totalNum > 8" :pageNum="pageNum" :pageMax="pageMax" :number="pageSize" v-on:upPage="upPage" v-on:downPage="downPage" v-on:selectFirstPage="selectFirstPage" v-on:selectLastPage="selectLastPage" v-on:selectNumber="selectNumber"></pageBar>
	</div>
</template>

<script>
	import { pageBar } from '@/components';
	import { listProductBuys } from '@/common/api/api';
	export default {
		data() {
			return {
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
			},
			classMianliao() {
				let _ = this;
				_.param.buyTypes = 100010;
				this.listProductBuysMethod();
			},
			classDabian() {
				let _ = this;
				_.param.buyTypes = 100011;
				this.listProductBuysMethod();
			},
			classXiaobian() {
				let _ = this;
				_.param.buyTypes = 100012;
				this.listProductBuysMethod();
			},
			classJiemao() {
				let _ = this;
				_.param.buyTypes = 100013;
				this.listProductBuysMethod();
			},
			classSuccess() {
				let _ = this;
				_.param.buyStatus = 2;
				this.listProductBuysMethod();
			},
			classBuy() {
				let _ = this;
				_.param.buyStatus = 1;
				this.listProductBuysMethod();
			},
			classClosed() {
				let _ = this;
				_.param.buyStatus = 3;
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
