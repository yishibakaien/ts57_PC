<template>
	<div>
		<v-header>
			<search></search>
		</v-header>
		<v-nav></v-nav>

		<div class="entry-container">
			<div class="entry-wrap">
				<div class="entry-nav">
					<router-link to="homePage">首页</router-link>&nbsp;>
					<span>更多商家</span>
				</div>
				<div class="entry-box">
					<entryListItem v-for="item in items" :key="item" :obj="item"></entryListItem>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import {
		header,
		nav,
		search
	} from '@/components';
	import entryListItem from './entryListItem';
	import { findNewCompanys } from '@/common/api/api';
	export default {
		data() {
			return {
				param: {
					companyType: 1
				},
				items: []
			};
		},
		components: {
			'vHeader': header,
			'vNav': nav,
			search,
			entryListItem
		},
		created() {
			this.findNewCompanysMethod();
		},
		methods: {
			findNewCompanysMethod() {
				findNewCompanys(this.param).then((res) => {
					this.items = res.data.data;
				}).catch();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.entry-container {
		width: 100%;
		min-height: 700px;
		background: #fff;
		.entry-wrap {
			width: 1200px;
			margin: 0 auto;
			.entry-nav {
				padding: 28px 0;
				font-size: 16px;
				color: #999;
				a {
					color: #4c93fd;
				}
			}
		}
	}
</style>
