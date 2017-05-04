<template>
	<div class="shop">
		<v-header/>
		<v-nav/>
		<!--shop-conent-->
		<div class="shop-container  clearfix">
			<div class="shop-nav">
				<h1>店铺管理</h1>
				<ul>
					<li v-for="(navItem,index) in navItems" @click="shopTab(index)" :class="{ 'active': navItem.isActive }">
						<span>
							{{ navItem.context }}
						</span>
					</li>
				</ul>
			</div>
			<div class="shop-item">
				<div class="titleBar clearfix">
					<h2 class="fl">{{ title }}</h2>
					<search-bar></search-bar>
				</div>
				<div class="shop-item-box">
					<component :is="currentView"></component>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
    import '../../common/css/shop.css';
	import { header, nav } from '../../components';
	import {
		shopRepertory,
		shopMaterial,
		shopSupply,
		shopClass,
		shopPrice,
		shopCooperate,
		shopSetting,
		shopCredentials,
		searchBar
	} from './';

	export default {
		data() {
			return {
				title: '仓库管理',
				navItems: [{
						context: '仓库管理',
						itemName: 'shopRepertory',
						isActive: true
					},
					{
						context: '素材库',
						itemName: 'shopMaterial',
						isActive: false
					},
					{
						context: '厂家供应',
						itemName: 'shopSupply',
						isActive: false
					},
					{
						context: '分类管理',
						itemName: 'shopClass',
						isActive: false
					},
					{
						context: '询价列表',
						itemName: 'shopPrice',
						isActive: false
					},
					{
						context: '合作厂家',
						itemName: 'shopCooperate',
						isActive: false
					},
					{
						context: '店铺设置',
						itemName: 'shopSetting',
						isActive: false
					},
					{
						context: '企业资质',
						itemName: 'shopCredentials',
						isActive: false
					}
				],
				currentView: 'shopRepertory'
			};
		},
		components: {
			'vHeader': header,
			'vNav': nav,
			shopRepertory,
			shopMaterial,
			shopSupply,
			shopClass,
			shopPrice,
			shopCooperate,
			shopSetting,
			shopCredentials,
			searchBar
		},
		created() {
			console.log(localStorage.getItem('x-token'));
		},
		methods: {
			shopTab(index) {
				let _ = this;
				_.title = _.navItems[index].context;
				_.currentView = _.navItems[index].itemName;
				_.navItems.forEach((item) => {
					item.isActive = false;
				});
				_.navItems[index].isActive = true;
			}
		}
	};
</script>

<style lang="scss" scoped="scoped">

	.shop-container {
		margin-top: 50px;
	}
	
	.shop-nav {
		float: left;
		width: 256px;
		min-height: 728px;
		background: #f8f8f8;
		text-align: center;
		h1 {
			margin: 50px 0 30px;
			font-size: 24px;
			font-weight: 400;
			color: #333;
		}
		li {
			height: 36px;
			line-height: 36px;
			font-size: 16px;
			color: #333;
			cursor: pointer;
			text-align: left;
			&.active {
				background: #fff;
				color: #5296fd;
			}
			&:hover {
				color: #5296fd;
				text-decoration: underline;
			}
			span {
				margin-left: 86px;
			}
		}
	}
	
	.shop-item {
		float: left;
		width: 944px;
		min-height: 728px;
		background: #fff;
	}
	
	.titleBar {
		position: relative;
		padding: 50px 15px 0;
		h2 {
			font-size: 24px;
			font-weight: 400;
			color: #333;
		}
		&::before {
			content: '';
			display: block;
			position: absolute;
			top: 95px;
			width: 914px;
			height: 1px;
			background: #d1d1d1;
		}
	}
	
</style>
