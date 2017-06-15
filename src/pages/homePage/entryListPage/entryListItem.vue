<template>
	<div class="entryList-item">
		<div class="entryList-item-title">
			<span>{{obj.companyName}}</span>
			<router-link to="{path:'/shop/${obj.id}/allProducts'}">查看更多 ></router-link>
			<a href="javascript:;" @click="goStoreChild">查看更多 ></a>
		</div>
		<div class="entryList-item-box clearfix">
			<div class="dianpu-content fl">
				<img :src="obj.companyHeadIcon" v-errorLogo alt="网店LOGO"/>
				<span @click="goStore">访问网店</span>
			</div>
			<div v-for="item in obj.products" class="dianpuList-item fl">
				<img v-lazy="item.defaultPicUrl" alt="花型展示图片"/>
				<span class="version">{{item.productNo}}</span>
				<p>
					<span class="classes fl">{{item.category | type}}</span>
					<span class="yesOrNo fr">{{item.isStock | isStock}}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			obj: {
				type: Object
			}
		},
		methods: {
			goStore() {
				this.$router.push({
					name: 'shop',
					params: {
						id: this.obj.id
					}
				});
			},
			goStoreChild() {
				this.$router.push({
					path: `/shop/${this.obj.id}/allProducts`
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
.entryList-item {
	margin-bottom: 36px;
}
.entryList-item-title {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 48px;
	line-height: 48px;
	background: #f8f8f8;
	border: 1px solid #e5e5e5;
	a {
		position: absolute;
		right: 18px;
		font-size: 16px;
	}
	span {
		padding-left: 25px;
		color: #333;
		font-size: 18px;
	}
}
.entryList-item-box {
	.dianpu-content  {
		box-sizing: border-box;
		width: 200px;
		height: 276px;
		border: 1px solid #e5e5e5;
		border-top: 0;
		text-align: center;
		img {
			padding: 44px 0 60px;
			width: 100px;
			height: 100px;
		}
		span {
			display: block;
			margin: 0 auto;
			width: 130px;
			height: 30px;
			color: #333333;
			font-size: 16px;
			text-align: center;
			line-height: 30px;
			border: 1px solid #e5e5e5;
			cursor: pointer;
		}
	}
	.dianpuList-item {
		box-sizing: border-box;
		width: 200px;
		height: 276px;
		border: 1px solid #e5e5e5;
		border-left: 0;
		border-top: 0;
		img {
			display: inline-block;
			margin: 13px;
			width: 172px;
			height: 172px;
			border: 1px solid #e5e5e5;
		}
		.version {
			padding-left: 14px;
			display: inline-block;
			height: 40px;
			line-height: 40px;
			font-size: 17px;
		}
		p {
			padding: 5px 13px 0;
			.classes {
				color: #999999;
				font-size: 14px;
			}
			.yesOrNo {
				padding: 2px 8px;
				font-size: 12px;
				color: #FFF;
				background: rgba(76,147,253,0.50);
				border-radius: 8px;
			}
		}
	}
}
</style>
