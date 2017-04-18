<template>
	<div class="personal">
		<v-header/>
		<v-nav/>
		<!--personal-conent-->
		<div class="personal-container">
			<h1>个人中心</h1>
			<h2>{{ title }}</h2>
			<div class="personal-nav">
				<ul class="clearFix">
					<li v-for="(navItem,index) in navItems" @click="personalTab(index)">{{ navItem.context }}</li>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
	import { header, nav } from '../../components';

	export default {
		data() {
			return {
				title: '账户信息',
				navItems: [
					{ context: '账户信息' },
					{ context: '变更手机号' },
					{ context: '修改密码' },
					{ context: '短信设置' },
					{ context: '我的求购' },
					{ context: '我的接单' },
					{ context: '花型收藏' },
					{ context: '商家收藏' },
					{ context: '供应收藏' }
				]
			};
		},
		components: {
      'vHeader': header,
      'vNav': nav
		},
		methods: {
			personalTab(index) {
				let _ = this;
				_.title = _.navItems[index].context;
			}
		}
	};
</script>

<style lang="scss" scoped="scoped">
.personal-container {
	margin-top: 50px;
	h2 {
		color: #42B983;
	}
	.personal-nav {
		padding: 15px;
		border: 1px solid #000000;
		li {
			float: left;
			margin-left: 15px;
			cursor: pointer;
		}
	}
}
</style>
