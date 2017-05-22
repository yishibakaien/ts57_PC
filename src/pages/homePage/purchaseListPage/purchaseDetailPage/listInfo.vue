<template>
	<div class="list-info" v-if="item.buyTaskList != ''">
		<div class="title">
			我的接单信息
		</div>
		<div class="content">
			<img v-lazy="item.buyTaskList[0].picUrl" alt="花型图片" class="fl" />
			<p class="content-info">
				<span class="status" v-if="item.buyTaskList.productStatus">{{item.buyTaskList.productStatus | productStatus}}</span>
				<span class="shuliang"><i>¥</i> {{item.buyTaskList.buyPrice || 0}}/{{item.buyUnit | unit}}</span>
			</p>
			<p class="content-desc">{{item.buyTaskList.leaveWord || '没有留言信息'}}</p>
		</div>
	</div>
</template>

<script>
	export default {
//		data() {
//			return {
//				itemObj: {
//					type: Object
//				}
//			};
//		},
		props: {
			item: {
				type: Object
			}
		},
		created() {
			console.log('item', this.item.buyTaskList);
		}
	};
</script>

<style lang="scss" scoped>
	.list-info {
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
		}
		.content {
			box-sizing: border-box;
			width: 824px;
			height: 192px;
			border: 1px solid #e5e5e5;
			img {
				padding: 26px;
				width: 140px;
				height: 140px;
			}
			.content-info {
				margin-top: 42px;
				.status {
					margin-right: 10px;
					padding: 4px 8px;
					font-size: 16px;
					color: #fff;
					background: #ff8400;
				}
				.shuliang {
					color: #ff494f;
					font-size: 15px;
					i {
						font-size: 12px;
					}
				}
			}
			.content-desc {
				margin-top: 30px;
				font-size: 16px;
			}
		}
	}
</style>
