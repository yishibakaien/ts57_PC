<template>
	<div class="list-info" v-if="showOrhide">
		<div class="title">
			我的接单信息
		</div>
		<div class="content">
			<img v-if="url" :src="url" alt="花型图片" class="fl" />
			<p class="content-info">
				<span class="status">{{productStatus | productStatus}}</span>
				<span class="shuliang" v-if="buyPrice !== 0"><i>¥</i> {{buyPrice/100}}/{{buyUnit | unit}}</span>
				<span class="shuliang" v-else>价格面议</span>
			</p>
			<p class="content-desc">{{leaveWord || '没有留言信息'}}</p>
		</div>
	</div>
</template>

<script>
	import {} from '@/common/api/api';
	export default {
		data() {
			return {
				showOrhide: false,
				url: '',
				productStatus: '',
				buyPrice: '',
				buyUnit: '',
				leaveWord: ''
			};
		},
		props: {
			item: {
				type: Object
			}
		},
		watch: {
			item(val) {
				if (val.buyTaskList.length < 1) {
					this.showOrhide = false;
					return;
				}
				for (let i = 0; i < val.buyTaskList.length; i++) {
					if (val.buyTaskList[i].userId === this.$store.state.user.userInfo.id) {
						this.showOrhide = true;
						this.url = val.buyTaskList[i].picUrl;
						this.productStatus = val.buyTaskList[i].productStatus;
						this.buyPrice = val.buyTaskList[i].buyPrice;
						this.buyUnit = val.buyUnit;
						this.leaveWord = val.buyTaskList[i].leaveWord;
					} else {
						this.showOrhide = false;
					}
				}
			}
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
			padding-left: 30px;
			box-sizing: border-box;
			width: 824px;
			height: 192px;
			border: 1px solid #e5e5e5;
			img {
				padding: 26px 26px 0 0;
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
