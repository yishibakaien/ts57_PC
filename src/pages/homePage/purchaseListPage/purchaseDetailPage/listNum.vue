<template>
	<div class="list-num">
		<div class="title">
			共有<em>{{len}}</em>人接单
		</div>
		<div class="content1" v-if="len === 0">
			暂无人接单
		</div>
		<div class="content" v-else>
			<div class="content-item fl" v-for="(img, index) in item.buyTaskList">
				<img :src="img.userHeadIcon" v-errorImg alt="用户头像"/>
				<div class="bg" v-if="img.showBg">成交</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				len: ''
			};
		},
		watch: {
			item(val) {
				this.len = val.buyTaskList.length;
				val.buyTaskList.forEach(e => {
					e.showBg = false;
				});
				for (let i = 0; i < val.buyTaskList.length; i++) {
					if (val.buyTaskList[i].status === 2) {
						val.buyTaskList[i].showBg = true;
					}
				}
			}
		},
		props: {
			item: {
				type: Object
			}
		}
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
		.content-item {
			position: relative;
			margin-top: 17px;
			margin-left: 17px;
			width: 72px;
			height: 72px;
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
				background: rgba(0,0,0,.5);
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
</style>
