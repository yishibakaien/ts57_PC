<template>
	<div class="list-content">
		<div class="fl content-img">
			<img v-lazy="item.buyPicUrl" alt="求购花型图片" />
		</div>
		<div class="fl content-info">
			<p class="content-info-desc">{{item.buyDesc}}</p>
			<p class="content-info-class">
				<span>求购类型：</span>{{item.buyType | type}}
			</p>
			<p class="content-info-class">
				<span>求购数量：</span>{{item.buyNum}}{{item.buyUnit | unit}}
			</p>
			<p class="content-info-class">
				<span>其他要求：</span>{{item.isStartUp | isStartUp}}
			</p>
			<p class="content-info-class"><span>求购时间：</span>{{item.createDate | customTime}}</p>

			<p class="content-info-class content-info-user"><span>采购商：</span>{{item.userName}}</p>
			<p class="content-info-class content-info-status"><span>状态：</span><span class="status">{{item.buyStatus | buyStatus}}</span></p>

			<button class="btn btn-dele" v-if="shanchu1" @click="deleteBuyTaskMethod">删除</button>
			<button class="btn btn-dele" v-if="quxiao" @click="cancelList(item.id)">取消接单</button>
			<button class="btn btn-yes" v-if="jiedan" @click="goPromptDown">我要接单</button>
			<p class="sucessList" v-if="chenggong">
				<i>图标</i> 恭喜您接单成功
			</p>
			<div class="" v-if="qiugou">
				<button class="btn btn-dele btn-small" @click="closeProductBuyMethod">关闭求购</button>
				<button class="btn btn-yes btn-small" @click="doSomethimg($event)">完成求购</button>
			</div>
			<div class="" v-if="wancheng">
				<button class="btn btn-yes" @click="goFabuBuy">重新发布</button>
			</div>
			<div class="" v-if="guanbi">
				<button class="btn btn-dele btn-small" @click="deleteProductBuyMethod">删除</button>
				<button class="btn btn-yes btn-small" @click="goFabuBuy">重新发布</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { cancelBuyTask, finishProductBuy, deleteBuyTask, closeProductBuy, deleteProductBuy } from '@/common/api/api';
	import Toast from '@/components/common/toast/toast';
	import Bus from '@/common/bus/bus.js';
	export default {
		data() {
			return {
				paramFinishBuy: {
					buyTaskId: '',
					id: ''
				},
				deleListParam: {
					ids: ''
				},
				deleBuyParam: {
					ids: ''
				},
				paramCloseBuy: {
					buyCloseDesc: '',
					id: ''
				},
				jiedan: false,
				quxiao: false,
				chenggong: false,
				shanchu1: false,
				qiugou: false,
				wancheng: false,
				guanbi: false
			};
		},
		props: {
			item: {
				type: Object
			}
		},
		watch: {
			item(val) {
				// 1工厂 2档口
				if (this.$store.state.user.userInfo.userType === 1) {
					let yesOrNo = false;
					// 判断当前用户是否接单
					this.item.buyTaskList.forEach(item => {
						if (item.userId === this.$store.state.user.userInfo.id) {
							yesOrNo = true;
						}
					});
					// 显示取消接单按钮
					if (this.item.buyStatus === 1 && yesOrNo) {
						this.quxiao = true;
					}
					// 显示我要接单按钮
					if (this.item.buyStatus === 1 && !yesOrNo) {
						this.jiedan = true;
					}
					// 显示接单成功提示
					for (let i = 0; i < this.item.buyTaskList.length; i++) {
						if (this.item.buyTaskList[i].userId === this.$store.state.user.userInfo.id) {
							if (this.item.buyStatus === 2 && this.item.buyTaskList[i].status === 2) {
								this.chenggong = true;
							}
						}
					}
					// 显示工厂用户删除按钮
					// 我接单但求购人和其他工厂成交
					for (let i = 0; i < this.item.buyTaskList.length; i++) {
						if (this.item.buyTaskList[i].userId === this.$store.state.user.userInfo.id) {
							if (this.item.buyTaskList[i].status === 3) {
								this.shanchu1 = true;
							}
						}
					}
				};

				// 显示档口用户删除按钮
				// 求购单状态为已关闭
				if (this.$store.state.user.userInfo.userType === 2) {
					// 判断是否是当前用户的求购单
					if (val.userId === this.$store.state.user.userInfo.id) {
						if (val.buyStatus === 1) {
							this.qiugou = true;
						}
						if (val.buyStatus === 2) {
							this.wancheng = true;
						}
						if (val.buyStatus === 3) {
							this.guanbi = true;
						}
					}
				}
			}
		},
		methods: {
			goPromptDown() {
				this.$router.push({
					path: '/promptDown'
				});
			},
			// 取消订单
			cancelList() {
				this.$messagebox.confirm('确定取消接单吗？').then(action => {
					// 确定的
					let param;
					for (let i = 0; i < this.item.buyTaskList.length; i++) {
						if (this.item.buyTaskList[i].userId === this.$store.state.user.userInfo.id) {
							param = this.item.buyTaskList[i].id;
						}
					}
					cancelBuyTask(param).then((res) => {
						if (res.data.code === 0) {
							Toast({
								type: 'success',
								message: '成功取消'
							});
							this.quxiao = false;
							this.jiedan = true;
							this.$emit('cancelList');
						}
					}).catch();
				});
			},
			// 完成求购
			finishBuy() {
				this.paramFinishBuy.buyTaskId = '';
				this.paramFinishBuy.id = '';
				finishProductBuy(this.paramFinishBuy).then((res) => {
					if (res.data.code === 0) {
						console.log(res);
					}
				}).catch();
			},
			// 删除接单
			deleteBuyTaskMethod() {
				this.$messagebox.confirm('确认删除该求购单？').then(action => {
					let _ = this;
					_.deleListParam.ids = _.item.id;
					deleteBuyTask(_.deleListParam).then((res) => {
						if (res.data.code === 0) {
							Toast({
								type: 'success',
								message: '已成功删除接单信息'
							});
							_.$router.push({
								path: '/homePage'
							});
						}
					}).catch();
				});
			},
			// 关闭求购
			closeProductBuyMethod() {
				this.$messagebox.confirm('确认关闭该求购单？').then(action => {
					this.paramCloseBuy.id = this.item.id;
					closeProductBuy(this.paramCloseBuy).then((res) => {
						if (res.data.code === 0) {
							Toast({
								type: 'success',
								message: '已成功关闭该求购'
							});
							this.$router.push({
								path: '/homePage'
							});
						}
					}).catch();
				});
			},
			// 重新发布
			goFabuBuy() {
				this.$router.push({
					path: '/releasePurchasePage',
					query: {
						obj: this.item
					}
				});
			},
			// 删除求购
			deleteProductBuyMethod() {
				this.$messagebox.confirm('确认删除该求购单？').then(action => {
					this.deleBuyParam.ids = this.item.id;
					deleteProductBuy(this.deleBuyParam).then((res) => {
						if (res.data.code === 0) {
							Toast({
								type: 'success',
								message: '已成功删除该求购'
							});
							this.$router.push({
								path: '/homePage'
							});
						}
					}).catch();
				});
			},
			// bus 实现与listNum之间的通信
			doSomethimg(event) {
//				console.log(this.item.buyTaskList.length < 1);
				if (this.item.buyTaskList.length < 1) {
					Toast({
						type: 'error',
						message: '暂无人接单'
					});
					return;
				}
				event.target.innerText = '取消选择';
				Bus.$emit('clickDo', event.target);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.list-content {
		width: 760px;
		height: 520px;
		.content-img {
			margin-right: 20px;
			width: 420px;
			img {
				width: 100%;
				height: 423px;
				border: 1px solid #d1d1d1;
			}
		}
		.content-info {
			width: 320px;
			.content-info-desc {
				margin: 10px 0 20px 0;
				font-size: 18px;
				color: #000;
				line-height: 24px;
				letter-spacing: 1px;
			}
			.content-info-class {
				font-size: 14px;
				color: #333;
				span {
					display: inline-block;
					width: 105px;
					color: #666;
					line-height: 24px;
					letter-spacing: 1px;
				}
			}
			.content-info-user {
				margin: 20px 0 0 0;
				line-height: 40px;
				border: 1px solid #e5e5e5;
				border-left: 0;
				border-right: 0;
			}
			.content-info-status {
				line-height: 40px;
				border-bottom: 1px solid #e5e5e5;
				.status {
					color: #ff494f;
				}
			}
			.btn {
				margin-top: 50px;
				width: 320px;
				height: 48px;
				border: 0;
				color: #fff;
				font-size: 20px;
			}
			.btn-small {
				margin-right: 10px;
				width: 140px !important;
			}
			.btn-dele {
				background: #ccc;
			}
			.btn-yes {
				background: #4C93FD;
			}
		}
		.sucessList {
			i {
				display: block;
				margin-bottom: 20px;
				font-size: 35px;
			}
			margin-top: 50px;
			width: 320px;
			font-size: 24px;
			color: #ff8300;
			text-align: center;
		}
	}
</style>
