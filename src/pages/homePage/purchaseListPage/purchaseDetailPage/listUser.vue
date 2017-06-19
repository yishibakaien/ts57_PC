<template>
	<div class="list-user">
		<div class="title title2" v-if="userType">
			<p class="buyNum">我的所有求购：<em>{{obj.totalNum || 0}}个</em></p>
		</div>
		<div class="title title1" v-else>
			<img :src="item.userHeadIcon" v-errorImg class="fl" alt="用户头像" />
			<p class="name">{{item.userName}}</p>
			<p class="mobile" v-if="mobileShow">联系电话：{{obj.userMobile}}</p>
			<p class="buyNum">Ta的总采购数：<em>{{obj.totalNum || 0}}个</em></p>
		</div>
		<div class="content">
			<div class="listImg" :class="{'forbideen': e.buyStatus !== 1}" v-for="(e, index) in obj.list" @click="goDetail(index)">
				<img v-lazy="e.buyPicUrl" alt="花型展示图片" />
				<div class="listImgBg" v-if="e.buyStatus !== 1">
					{{e.buyStatus | buyStatus}}
				</div>
			</div>
			<pageBar :showOpt="true" :pageNum="pageNum" :pageMax="pageMax" @upPage="upPage" @downPage="downPage" @selectFirstPage="selectFirstPage" @selectLastPage="selectLastPage" style="margin-right: 20px;"></pageBar>
		</div>
	</div>
</template>

<script>
	import { pageBar } from '@/components';
	import {listUserProductBuys} from '@/common/api/api';
	export default {
		data() {
			return {
				mobileShow: false,
				userType: false,
				pageNum: '',
				pageMax: '',
				paramListBuy: {
					pageNo: 1,
					pageSize: 8,
					userId: ''
				},
				obj: {}
			};
		},
		props: {
			item: {
				type: Object
			}
		},
		watch: {
			item (val) {
				// 1工厂 2贸易商
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
				// 获取用户求购列表
				this.paramListBuy.userId = this.item.userId;
				listUserProductBuys(this.paramListBuy).then((res) => {
					if (res.data.code === 0) {
						this.obj = res.data.data;
						this.pageNum = res.data.data.pageNO;
						this.pageMax = res.data.data.totalPage;
					}
				}).catch();
			}
		},
		components: {
			pageBar
		},
		created() {
		},
		methods: {
			listUserProductBuysMethod() {
				this.paramListBuy.userId = this.item.userId;
				listUserProductBuys(this.paramListBuy).then((res) => {
					if (res.data.code === 0) {
						this.obj = res.data.data;
						this.pageNum = res.data.data.pageNO;
						this.pageMax = res.data.data.totalPage;
					}
				}).catch();
			},
			// 首页
			selectFirstPage() {
				let _ = this;
				_.paramListBuy.pageNo = 1;
				this.listUserProductBuysMethod();
			},
			// 尾页
			selectLastPage() {
				let _ = this;
				_.paramListBuy.pageNo = _.pageMax;
				this.listUserProductBuysMethod();
			},
			// 上一页
			upPage() {
				let _ = this;
				if (_.pageNum <= 1) {
					return;
				};
				--_.pageNum;
				_.paramListBuy.pageNo = _.pageNum;
				this.listUserProductBuysMethod();
			},
			// 下一页
			downPage() {
				let _ = this;
				if (_.pageNum >= _.pageMax) {
					return;
				};
				++_.pageNum;
				_.paramListBuy.pageNo = _.pageNum;
				this.listUserProductBuysMethod();
			},
			// 跳转详情页
			goDetail(e) {
				window.open('#/purchaseDetailPage?purchaseId=' + this.obj.list[e].id);
			}
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
			padding-bottom: 80px;
			.listImg {
				position: relative;
				margin: 15px 0 0 15px;
				width: 156px;
				height: 156px;
				display: inline-block;
				cursor: pointer;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.forbideen {
				cursor: not-allowed;
			}
			.listImgBg {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
				color: #FFF;
				font-size: 16px;
				line-height: 150px;
				text-align: center;
				background: rgba(0,0,0,.4);
			}
		}
	}
</style>
