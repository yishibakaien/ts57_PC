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
					<p v-if="item.status == 1" >取消接单</p>
					<p v-if="item.status == 2" class="blue">更多求购</p>
					<p v-if="item.status == 3">删除</p>
				</div>
				<p class="info">{{item.leaveWord}}</p>
				<p><span>求购 <i>200</i> 码</span><span class="time">1小时前</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	import { listBuyTask } from '@/common/api/api';
	export default {
		data() {
			return {
				Filter: {
					sort: 'null',
					fabricType: 'null'
				},
				param: {
					buyStatus: null,
					buyType: null
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
		created() {
			this.listBuyTaskMethod();
		},
		methods: {
			hanleFilterSort(e) {
				console.log(e);
			},
			hanleFilterFabric(e) {
				console.log(e);
			},
			listBuyTaskMethod() {
				let _ = this;
				listBuyTask(_.param).then((res) => {
					_.items = res.data.list;
					_.classNum.all = _.items.length;
					console.log(res.data);
				}).catch(
				);
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
</style>
