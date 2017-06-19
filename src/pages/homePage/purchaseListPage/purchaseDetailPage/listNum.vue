<template>
	<div class="list-num">
		<div class="title" v-if="len !== 0">
			共有<em>{{len}}</em>人接单
		</div>
		<div class="title" v-else>
			求购中
		</div>
		<div class="content1" v-if="len === 0">
			暂无人接单
		</div>
		<div class="content" v-else>
			<div class="content-item fl" :class="{active: img.isActive}" v-for="(img, index) in item.buyTaskList"  @click="showContent(index)">
				<img :src="img.userHeadIcon" v-errorImg alt="用户头像" />
				<div class="bg" v-if="img.showBg">成交</div>
				<div class="bg selected" v-if="showBtn" @click.stop="finishProductBuyMethod(index)"><span>选择</span></div>
			</div>
		</div>
		<div class="list-content-info" v-if="showListInfo">
			<div class="title">
				Ta的接单信息
			</div>
			<div class="content">
				<img v-if="obj.picUrl" v-lazy="obj.picUrl" alt="花型图片" class="fl" />
				<p class="content-info">
					<span class="status">{{obj.productStatus | productStatus}}</span>
					<span class="shuliang" v-if="obj.buyPrice"><i>¥</i> {{obj.buyPrice/100}}/{{item.buyUnit | unit}}</span>
					<span class="shuliang" v-else>价格面议</span>
				</p>
				<p class="content-desc">{{obj.leaveWord || '没有留言信息'}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {finishProductBuy} from '@/common/api/api';
	import Bus from '@/common/bus/bus.js';
	export default {
		data() {
			return {
				len: '',
				showListInfo: false,
				obj: {},
				showBtn: false,
				paramFinishBuy: {
					buyTaskId: '',
					id: ''
				}
			};
		},
		watch: {
			item(val) {
				this.len = val.buyTaskList.length;
				val.buyTaskList.forEach(e => {
					e.showBg = false;
					e.isActive = false;
				});
				for (let i = 0; i < val.buyTaskList.length; i++) {
					if (val.buyTaskList[i].status === 2) {
						val.buyTaskList[i].showBg = true;
					}
				}
				// 判断用户类型
				if (this.$store.state.user.userInfo.userType === 2) {
					// 判断该求购单是不是该用户的
					if (val.userId === this.$store.state.user.userInfo.id) {
						// 判断是否有接单人
						if (val.buyTaskList.length > 0) {
							val.buyTaskList[0].isActive = true;
							this.obj = val.buyTaskList[0];
							this.showListInfo = true;
						}
					}
				}
			}
		},
		created() {
			Bus.$on('clickDo', target => {
				if (target.innerText === '取消选择') {
					this.showBtn = true;
				} else {
					this.showBtn = false;
				}
			});
		},
		props: {
			item: {
				type: Object
			}
		},
		methods: {
			showContent(e) {
				this.item.buyTaskList.forEach(item => {
					item.isActive = false;
				});
				this.item.buyTaskList[e].isActive = true;
				this.obj = this.item.buyTaskList[e];
			},
			// 完成求购
			finishProductBuyMethod(e) {
				this.paramFinishBuy.buyTaskId = this.item.buyTaskList[e].id;
				this.paramFinishBuy.id = this.item.buyTaskList[e].buyId;
				finishProductBuy(this.paramFinishBuy).then((res) => {
					if (res.data.code === 0) {
						this.$toast({
							type: 'success',
							message: '成功完成接单'
						});
						this.$router.push({
							path: '/homePage'
						});
					}
				}).catch();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.selected {
		z-index: 99999;
		span {
			padding: 2px 8px;
			border: 1px solid #fff;
		}
	}

	.active {
	}

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
		.content-item {
			position: relative;
			margin-top: 17px;
			margin-left: 17px;
			width: 72px;
			height: 72px;
			cursor: pointer;
			img {
				width: 100%;
				height: 100%;
			}
			.bg {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, .5);
				text-align: center;
				line-height: 72px;
				color: #FF8300;
			}
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

	.list-content-info {
		margin-top: 10px;
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
