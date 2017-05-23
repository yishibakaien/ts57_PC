<template>
	<div class="list-user">
		<div class="title title2" v-if="userType">
			<p class="buyNum">我的所有求购：<em>40个</em></p>
		</div>
		<div class="title title1" v-else>
			<img :src="item.userHeadIcon" v-errorImg class="fl" alt="用户头像" />
			<p class="name">{{item.userName}}</p>
			<p class="mobile" v-if="mobileShow">联系电话：18888888888</p>
			<p class="buyNum">Ta的总采购数：<em>40个</em></p>
		</div>
		<div class="content">
			<img v-for="item in [1,1,1,1,1,1,1,1]" src="../../../../components/common/toast/icon/success.svg" alt="花型展示图片" />
			<pageBar :showOpt="true" :pageNum="pageNum" :pageMax="pageMax" style="margin-right: 20px;"></pageBar>
		</div>
	</div>
</template>

<script>
	import { pageBar } from '@/components';
	export default {
		data() {
			return {
				mobileShow: false,
				userType: false,
				pageNum: 1,
				pageMax: 10
			};
		},
		props: {
			item: {
				type: Object
			}
		},
		watch: {
			item (val) {
				// 1工厂 2档口
				if (this.$store.state.user.userInfo.userType === 1) {
					this.mobileShow = false;
					// 判断当前用户是否已经接单
					val.buyTaskList.forEach(item => {
						if (item.userId === this.$store.state.user.userInfo.id) {
							this.mobileShow = true;
						}
					});
				}
				if (this.$store.state.user.userInfo.userType === 2) {
					// 判断是否是当前用户的求购单
					if (val.userId === this.$store.state.user.userInfo.id) {
						this.userType = true;
					}
				}
			}
		},
		components: {
			pageBar
		},
		created() {
		},
		methods: {
//			selectFirstPage() {
//				let _ = this;
//				_.param.pageNo = 1;
//				this.myProductBuysMethod();
//			},
//			selectLastPage() {
//				let _ = this;
//				_.param.pageNo = _.pageMax;
//				this.myProductBuysMethod();
//			},
//			upPage() {
//				let _ = this;
//				if (_.pageNum <= 1) {
//					return;
//				};
//				--_.pageNum;
//				_.param.pageNo = _.pageNum;
//				this.myProductBuysMethod();
//			},
//			downPage() {
//				let _ = this;
//				if (_.pageNum >= _.pageMax) {
//					return;
//				};
//				++_.pageNum;
//				_.param.pageNo = _.pageNum;
//				this.myProductBuysMethod();
//			}
		}
	};
</script>

<style lang="scss" scoped>
	.list-user {
		box-sizing: border-box;
		width: 360px;
		/*height: 870px;*/
		border: 1px solid #e5e5e5;
		.title {
			background: #F8F8F8;
			border-bottom: 1px solid #e5e5e5;
			.buyNum {
				color: #999;
				font-size: 14px;
				em {
					color: #4c93fd;
				}
			}
		}
		.title1 {
			height: 110px;
			img {
				margin: 15px;
				width: 80px;
				height: 80px;
				border-radius: 50%;
			}
			.name {
				padding-top: 25px;
				color: #333;
				line-height: 24px;
				font-size: 16px;
			}
			.mobile {
				color: #333;
				font-size: 14px;
				line-height: 22px;
			}
			.buyNum {
				line-height: 22px;
			}
		}
		.title2 {
			height: 50px;
			padding-left: 25px;
			line-height: 50px;
		}
		.content {
			overflow: hidden;
			img {
				margin: 15px 0 0 15px;
				width: 156px;
				height: 156px;
			}
		}
	}
</style>
