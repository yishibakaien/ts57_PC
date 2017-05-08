<template>
	<div class="personal">
		<v-header/>
		<v-nav/>
		<!--personal-conent-->
		<div class="personal-container  clearfix">
			<div class="personal-nav">
				<h1>个人中心</h1>
				<ul>
					<li v-for="(navItem,index) in navItems" @click="personalTab(index)" :class="{ 'personal-nav-b':navItem.isBorder }" v-if="!navItem.isShow"> 
						<span :class="{ 'active': navItem.isActive }">
							{{ navItem.context }}
						</span>
					</li>
				</ul>
			</div>
			<div class="personal-item">
				<h2>{{ title }}</h2>
				<div class="personal-item-box">
					<component :is="currentView"></component>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import '@/common/css/personal.css';
	
	import { header, nav } from '@/components';
	import { getUserInfo } from '@/common/api/api';
	
	import {
		personalAccount,
		personalMobile,
		personalPassword,
		personalMessage,
		personalBuy,
		personalList,
		personalFlower,
		personalBusiness,
		personalSupply
	} from './';

	export default {
		data() {
			return {
				title: '账户信息',
				navItems: [{
						context: '账户信息',
						itemName: 'personalAccount',
						isActive: true
					},
					{
						context: '变更手机号',
						itemName: 'personalMobile',
						isActive: false
					},
					{
						context: '修改密码',
						itemName: 'personalPassword',
						isActive: false
					},
					{
						context: '短信设置',
						itemName: 'personalMessage',
						isActive: false,
						isBorder: 'ok'
					},
					{
						context: '我的求购',
						itemName: 'personalBuy',
						isActive: false,
						isShow: false,
						isBorder: 'ok'
					},
					{
						context: '我的接单',
						itemName: 'personalList',
						isActive: false,
						isShow: false,
						isBorder: 'ok'
					},
					{
						context: '花型收藏',
						itemName: 'personalFlower',
						isActive: false
					},
					{
						context: '商家收藏',
						itemName: 'personalBusiness',
						isActive: false
					},
					{
						context: '供应收藏',
						itemName: 'personalSupply',
						isActive: false
					}
				],
				currentView: 'personalAccount'
			};
		},
		components: {
			'vHeader': header,
			'vNav': nav,
			personalAccount,
			personalMobile,
			personalPassword,
			personalMessage,
			personalBuy,
			personalList,
			personalFlower,
			personalBusiness,
			personalSupply
		},
		created() {
			getUserInfo().then((res) => {
//				console.log('个人中心-userinfo', res.data.data);
				if (res.data.data.userHeadIcon) {
					localStorage.setItem('userHeadIcon', 'http://zsbgdev.oss-cn-shenzhen.aliyuncs.com/' + res.data.data.userHeadIcon);
				}
				localStorage.setItem('userMobile', res.data.data.userMobile);
				localStorage.setItem('userName', res.data.data.userName);
				localStorage.setItem('qq', res.data.data.qq);
				localStorage.setItem('email', res.data.data.email);
				if (res.data.data.userType === 1) {
					this.navItems[4].isShow = true;
				} else {
					this.navItems[5].isShow = true;
				}
			}).catch((res) => {
//				console.log(res.data.data);
			});
		},
		methods: {
			personalTab(index) {
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

	.personal-container {
		margin-top: 50px;
	}
	
	.personal-nav {
		float: left;
		width: 256px;
		min-height: 728px;
		background: #f8f8f8;
		text-align: center;
		h1 {
			margin: 50px 0;
			font-size: 24px;
			font-weight: 400;
			color: #333;
			&::after {
				content: '';
				display: block;
				margin: 15px auto 30px;
				width: 85%;
				height: 1px;
				background: #d1d1d1;
			}
		}
		li {
			margin-bottom: 20px;
			font-size: 16px;
			color: #333;
			cursor: pointer;
			text-align: left;
			span {
				margin-left: 86px;
				&.active {
					position: relative;
					color: #5296fd;
					&::after {
						content: '';
						display: block;
						position: absolute;
						left: -16px;
						top: -2px;
						width: 4px;
						height: 20px;
						background: #5296fd;
					}
				}
				&:hover {
					color: #5296fd;
				}
			}
		}
		.personal-nav-b {
			&::after {
				content: '';
				display: block;
				margin: 28px auto;
				height: 2px;
				width: 112px;
				background: #d1d1d1;
			}
		}
	}
	
	.personal-item {
		float: left;
		width: 944px;
		min-height: 728px;
		background: #fff;
		h2 {
			padding: 0 15px;
			margin-top: 35px;
			font-size: 24px;
			font-weight: 400;
			color: #333;
			&::after {
				content: '';
				display: block;
				margin: 30px auto 0;
				width: 100%;
				height: 1px;
				background: #d1d1d1;
			}
		}
	}
	
</style>
