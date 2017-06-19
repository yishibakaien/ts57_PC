<template>
	<div>
		<v-header>
			<search></search>
		</v-header>
		<v-nav></v-nav>
		<div class="entry-wrapper">
			<ts-title-block>新增热搜</ts-title-block>
			<div class="tab-bar clearfix">
				<span :class="{active: isActive}" @click="tabMethod">厂家上新</span>
				<span :class="{active: !isActive}" @click="tabMethod">爆款热搜</span>
			</div>
			<factory-update v-show="isActive"></factory-update>
			<top-search v-show="!isActive"></top-search>
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
	import factoryUpdate from './children/factoryUpdate.vue';
	import topSearch from './children/topSearch.vue';
	export default {
		data() {
			return {
				isActive: true
			};
		},
		components: {
			'vHeader': header,
			'vNav': nav,
			search,
			factoryUpdate,
			topSearch
		},
		methods: {
			tabMethod() {
				this.isActive = !this.isActive;
			}
		}
	};
</script>

<style scoped>
	@component-namespace entry {
		@component wrapper {
			max-width: 1200px;
			margin: 10px auto;
		}
	}
</style>
<style lang="scss" scoped>
	.tab-bar {
		background: #fff;
		height: 56px;
		span {
			float: left;
			width: 150px;
			height: 56px;
			text-align: center;
			line-height: 56px;
			color: #666;
			font-size: 16px;
			cursor: pointer;
		}
		.active {
			color: #4C93FD;
			border-bottom: 2px solid #4C93FD;
		}
	}
</style>
