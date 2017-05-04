<template>
	<div class="personal-flower">
		<div class="personal-class clearfix">
			<span class="title">分类</span>
			<p>
				<span class="selected">全部 {{'(' + classes.totalNum + ')' }}</span>
				<span>大边 {{'(' +a+ ')' }}</span>
				<span>小边 {{'(' +a+ ')' }}</span>
				<span>睫毛 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-class clearfix">
			<span class="title">筛选条件</span>
			<p>
				<span class="selected">全部 {{'(' + classes.totalNum + ')' }}</span>
				<span>有库存 {{'(' +a+ ')' }}</span>
				<span>需要开机 {{'(' +a+ ')' }}</span>
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
	</div>
</template>

<script>
	import { listProduct } from '@/common/api/api';
	export default {
		data() {
			return {
				param: {
					pageNo: 1,
					pageSize: 8
				},
				items: [],
				classes: {
					totalNum: 0
				},
				a: 1
			};
		},
		created() {
			let _ = this;
			listProduct(_.param).then((res) => {
				_.items = res.data.list;
				_.classes.totalNum = res.data.totalNum;
			}).catch((res) => {
			});
		},
		methods: {
			listProductMethod() {
				let _ = this;
				listProduct(_.param).then((res) => {
					_.items = res.data.list;
					console.log('花型收藏', res.data);
				}).catch((res) => {
					console.log(res.data);
				});
			}
		}
	};
</script>

<style lang="scss" scoped="scoped">
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
