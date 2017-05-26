<template>
	<div class="text-search-result-page">
		<v-header>
			<search></search>
		</v-header>
		<v-nav></v-nav>
		<div class="text-search-result-page-box">
			<p class="search-value">全部结果 > {{result.searchText}}</p>
			<v-filter></v-filter>
			<div class="result-container clearfix">
				<div class="result-item-wrapper" v-for="item in result.data.list">
					<base-item :item="item" :type="'searchText'"></base-item>
				</div>
			</div>
			<div class="ifNone" v-if="result.data.list.length === 0">
				暂无更多搜索结果
			</div>
			<!--<paginator :page-message="pageMessage" @goPage="goPage"></paginator>-->
			<pagination :page="pageMessage" @selectedPageNum="goPage"></pagination>
		</div>
	</div>
</template>

<script>
	import {
		header,
		nav,
		search,
		baseItem,
		filter,
		pagination
	} from '@/components';
	// // api 请求
	import { searchMtd } from '@/common/api/api';
	import * as types from '@/store/types';

	export default {
		data() {
			return {
				param: {
					categorys: '', // 面料 100010 大边100011 小边100012 睫毛100013
					companyId: '', // searchType=1时，必传
					dateSort: '', // 时间排序 1升 2降 不传则按匹配自然排序
					ingredient: '', // 成分
					isStock: '', // 0没有库存 1有库存
					keywords: '', // 关键词
					pageNo: 1,
					pageSize: 25,
					priceSort: '', // 价格排序 1升 2降  不传则按匹配自然排序
					searchType: 2 // 搜索类型 1店铺搜索 2全局搜索
				}
			};
		},
		created() {
			// 处理搜索结果页刷新页面
			if (!this.$store.state.searchResult.searchText) {
				search({
					keywords: localStorage.searchText,
					category: localStorage.category || '',
					stockType: localStorage.stockType || 0,
					pageSize: 15, // 每页数量 默认10
					searchType: 2 // 搜索类型 1:店铺搜索 2:全局搜索
				}).then(res => {
					// this.$router.push({
					//   path: 'textSearchResultPage'
					// });
					// 储存搜索字段
					let _data = res.data;
					console.log('搜索结果页字段', _data);
					_data.searchText = localStorage.searchText;
					_data.category = localStorage.category || '';
					_data.stockType = localStorage.stockType || 0;
					this.$store.commit(types.SEARCH_RESULT, _data);
				});
			}
		},
		components: {
			vHeader: header,
			vNav: nav,
			search,
			baseItem,
			vFilter: filter,
			pagination
		},
		computed: {
			result() {
				return this.$store.state.searchResult;
			},
			pageMessage() {
				let _data = this.$store.state.searchResult.data;
				let data = {};
				data.totalNum = _data.totalNum;
				data.totalPage = _data.totalPage;
				data.pageNO = _data.pageNO;
				return data;
			}
		},
		methods: {
			search() {
				searchMtd(this.param).then((res) => {
					if (res.data.code === 0) {
						console.log(res);
					}
				}).catch();
			},
			// 字组件 分页器 注册的事件
			goPage(n) {
				searchMtd({
					keywords: localStorage.searchText,
					category: localStorage.category || '',
					stockType: localStorage.stockType || 0,
					pageSize: 15, // 每页数量 默认10
					searchType: 2, // 搜索类型 1:店铺搜索 2:全局搜索
					pageNo: n // 页码 默认 1
				}).then(res => {
					// 储存搜索字段
					let _data = res.data;
					_data.searchText = localStorage.searchText;
					_data.category = localStorage.category || '';
					_data.stockType = localStorage.stockType || 0;
					this.$store.commit(types.SEARCH_RESULT, _data);
				});
			}
		}
	};
</script>
<style lang="stylus" scoped>
.text-search-result-page
  background #f2f2f2
  .text-search-result-page-box
    width 1200px
    margin 0 auto
    padding 16px 0
    background #f2f2f2
    .search-value
      height 60px
      line-height 60px
      color #666
    .result-container
      width 100%
      margin 16px auto
      .result-item-wrapper
        float left
        margin-left 7px
        margin-top 8px
        &:nth-of-type(5n + 1)
          margin-left 0
    .ifNone
      text-align center
      height 100px
      line-height 100px
</style>
