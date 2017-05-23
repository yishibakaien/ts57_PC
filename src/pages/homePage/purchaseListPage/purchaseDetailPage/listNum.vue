<template>
	<div class="list-num">
		<div class="title">
			共有<em>{{len}}</em>人接单
		</div>
		<div class="content1" v-if="len === 0">
			暂无人接单
		</div>
		<div class="content" v-else>
			<img v-for="img in imgs" :src="img.userHeadIcon" alt="用户头像"/>
		</div>
	</div>
</template>

<script>
//	import {listBuyTaskUserByBuyId} from '@/common/api/api';
	export default {
		data() {
			return {
//				param: {
//					buyId: ''
//				},
//				imgs: []
				len: ''
			};
		},
		watch: {
			imgs(val) {
				this.len = val.length;
			}
		},
		props: {
			imgs: {
				type: Array
			}
		}
//		created() {
//			this.listBuyTaskUserByBuyIdMethod();
//		},
//		methods: {
//			listBuyTaskUserByBuyIdMethod() {
//				this.param.buyId = this.itemId;
//				listBuyTaskUserByBuyId(this.param).then((res) => {
//					if (res.data.code === 0) {
//						this.imgs = res.data.data;
//						console.log(res);
//					}
//				}).catch();
//			}
//		}
	};
</script>

<style lang="scss" scoped>
	.title {
		box-sizing: border-box;
		padding-left: 26px;
		width: 824px;
		height: 48px;
		color: #666;
		font-size: 16px;
		line-height: 48px;
		background: #f8f8f8;
		border: 1px solid #e5e5e5;
		border-bottom: 0;
		em {
			color: #4C93FD;
		}
	}
	.content {
		box-sizing: border-box;
		width: 824px;
		height: 192px;
		border: 1px solid #e5e5e5;
		overflow: hidden;
		img {
			margin-top: 17px;
			margin-left: 17px;
			width: 72px;
			height: 72px;
		}
	}
	.content1 {
		box-sizing: border-box;
		width: 824px;
		height: 192px;
		border: 1px solid #e5e5e5;
		overflow: hidden;
		font-size: 18px;
		text-align: center;
		line-height: 192px;
	}
</style>
