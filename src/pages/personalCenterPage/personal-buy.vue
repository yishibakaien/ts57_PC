<template>
	<div class="personal-buy">
		<div class="personal-class clearfix">
			<span class="title">分类</span>
			<p>
				<span class="selected">全部 {{'(' +classes.totalNum+ ')' }}</span>
				<span>大边 {{'(' +a+ ')' }}</span>
				<span>小边 {{'(' +a+ ')' }}</span>
				<span>睫毛 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-class clearfix">
			<span class="title">筛选条件</span>
			<p>
				<span class="selected">全部 {{'(' +classes.totalNum+ ')' }}</span>
				<span>求购中 {{'(' +a+ ')' }}</span>
				<span>已成交 {{'(' +a+ ')' }}</span>
				<span>已关闭 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-buy-wrap clearfix">
			<div class="personal-goods-item" v-for="item in items">
				<div class="personal-goods-item-img">
					<img :src="item.buyPicUrl" alt="求购" />
					<span class="states green" v-if="item.buyStatus == 0">求购中</span>
					<span class="states yellow" v-if="item.buyStatus == 1">已成交</span>
					<span class="states gray" v-if="item.buyStatus == 2">已关闭</span>
					<p v-if="item.buyStatus == 1">取消求购</p>
					<p class="blue" v-if="item.buyStatus == 2">重新发布</p>
					<p class="p3" v-if="item.buyStatus == 3"><span class="spanL">重新发布</span><span class="spanR">删除</span></p>
					
				</div>
				<p class="info">{{ item.buyDesc }}</p>
				<p><span>求购 <i>{{ item.buyNum }}</i> 码</span><span class="time">1小时前</span></p>
				<div class="tipsModel" v-show="tipShow">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { listProductBuys } from '../../common/api/api';
	export default {
		data() {
			return {
				param: {
					buyStatus: '',
					buyType: '',
					isMy: 'true',
					pageNo: '',
					pageSize: 8
				},
				items: [],
				classes: {
					totalNum: '',
					large: '',
					small: '',
					eyelash: ''
				},
				tipShow: false,
				a: 1,
				b: 3
			};
		},
		created() {
			this.listProductBuysMethod();
		},
		methods: {
			listProductBuysMethod() {
				let _ = this;
				console.log('我的求购', _.param);
				listProductBuys(_.param).then((res) => {
					_.items = res.data.list;
					_.classes.totalNum = res.data.totalNum;
					/* _.items.forEach((item) => {
						if (item.buyType === 100011) { _.classes.large ++; }
						console.log(_.classes.large);
					}); */
					console.log(res.data.list);
				}).catch((res) => {
				});
			},
			closeProductBuyMethod() {
				let _ = this;
				_.tipShow = true;
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
		background: rgba(0,0,0,.5);
	}
</style>
