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

			<button class="btn btn-dele" v-if="item.buyStatus === 3">删除</button>
			<button class="btn btn-dele" v-if="quxiao">取消接单</button>
			<button class="btn btn-yes" v-if="jiedan" @click="goPromptDown">我要接单</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				jiedan: false,
				quxiao: false
			};
		},
		props: {
			item: {
				type: Object
			}
		},
		watch: {
			'item.buyStatus' (val) {
				let yesOrNo;
				this.item.buyTaskList.every(item => {
					if (item.userId === this.$store.state.user.userInfo.id) {
						yesOrNo = true;
//						alert('我有接单');
					} else {
						yesOrNo = false;
//						alert('我未接单');
					}
				});
				if (this.item.buyStatus === 1 && yesOrNo) {
					this.quxiao = true;
				}
				if (this.item.buyStatus === 1 && !yesOrNo) {
					this.jiedan = true;
				}
				console.log(this.quxiao, this.jiedan);
			}
		},
		methods: {
			goPromptDown() {
				this.$router.push({
					path: '/promptDown'
				});
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
			.btn-dele {
				background: #ff494f;
			}
			.btn-yes {
				background: #4C93FD;
			}
		}
	}
</style>
