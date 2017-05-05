<template>
	<div class="personal-flower">
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
				<span class="selected">全部 {{'(' + classes.totalNum + ')' }}</span>
				<span>有库存 {{'(' + classes.statusYes + ')' }}</span>
				<span>需要开机 {{'(' + classes.statusNo + ')' }}</span>
			</p>
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
	import { listProduct } from '@/common/api/api';
	export default {
		data() {
			return {
				pageNum: '',
				pageMax: '',
				pageSize: '',
				param: {
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
				_.classes.totalNum = res.data.totalNum;
				console.log(_.pageMax);
			}).catch((res) => {});
		},
		methods: {
			listProductMethod() {
				let _ = this;
				listProduct(_.param).then((res) => {
					_.items = res.data.list;
					_.pageNum = res.data.pageNO;
					_.pageSize = res.data.pageSize;
					_.pageMax = res.data.totalPage;
					console.log('花型收藏', res.data);
				}).catch((res) => {
					console.log(res.data);
				});
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
			classMianliao() {
				let _ = this;
				_.param.buyTypes = 100010;
				this.listProductMethod();
			},
			classDabian() {
				let _ = this;
				_.param.buyTypes = 100011;
				this.listProductMethod();
			},
			classXiaobian() {
				let _ = this;
				_.param.buyTypes = 100012;
				this.listProductMethod();
			},
			classJiemao() {
				let _ = this;
				_.param.buyTypes = 100013;
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
