<template>
	<div class="text-search-result-page">
		<v-header>
			<search @searchText="search" :text="param.keywords"></search>
		</v-header>
		<v-nav></v-nav>
		<div class="text-search-result-page-box">
			<p class="search-value">全部结果 > {{param.keywords}}</p>
			<!--<v-filter></v-filter>-->
			<!-- 筛选器 -->
			<div style="background: #fff;">
				<ts-filter title="求购分类">
					<ts-radio-group v-model="Filter.categorys" @change="hanleFilterSort">
						<ts-radio label="null">全部</ts-radio>
						<ts-radio label="100010">面料</ts-radio>
						<ts-radio label="100011">大边</ts-radio>
						<ts-radio label="100012">小边</ts-radio>
						<ts-radio label="100013">睫毛</ts-radio>
					</ts-radio-group>
				</ts-filter>
				<ts-filter title="采购布样">
					<ts-radio-group v-model="Filter.ingredient" @change="hanleFilterFabric">
						<ts-radio label="null">全部</ts-radio>
						<ts-radio label="锦纶">锦纶</ts-radio>
						<ts-radio label="锦氨">锦氨</ts-radio>
					</ts-radio-group>
				</ts-filter>
				<ts-filter title="接受开机">
					<ts-radio-group v-model="Filter.isStock" @change="handleFilterSupplyShapes">
						<ts-radio label="null">全部</ts-radio>
						<ts-radio label="1">有库存</ts-radio>
						<ts-radio label="0">需要开机</ts-radio>
					</ts-radio-group>
				</ts-filter>
			</div>
			<div class="result-container clearfix">
				<div class="result-item-wrapper" v-for="item in items">
					<base-item :item="item" :type="'searchText'"></base-item>
				</div>
			</div>
			<div class="ifNone" v-if="items.length === 0">
				暂无更多搜索结果
			</div>
			<pagination v-if="pageData.maxNum >= 1" :page="pageData" @selectedPageNum="goPage"></pagination>
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
//	import * as types from '@/store/types';

	export default {
		data() {
			return {
				Filter: {
					categorys: '',
					ingredient: '',
					isStock: ''
				},
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
				},
				items: [],
				pageData: {
					pageNO: 1,
					maxNum: 1,
					pageNumArr: []
				}
			};
		},
		created() {
			// 处理搜索结果页刷新页面
/*			if (!this.$store.state.searchResult.searchText) {
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
			} */
			if (this.$route.query.obj.keyWord) {
				this.param.keywords = this.$route.query.obj.keyWord;
			} else {
				this.param.keywords = localStorage.searchText;
			}
			this.param.category = localStorage.category || '';
			this.param.isStock = localStorage.isStock || '';
			this.param.ingredient = localStorage.ingredient || '';
			searchMtd(this.param).then((res) => {
				if (res.data.code === 0) {
					console.log(res);
					this.items = res.data.data.list;
					this.pageData.pageNO = res.data.data.pageNO;
					this.pageData.maxNum = res.data.data.totalPage;
					localStorage.setItem('searchText', this.param.keywords);
					localStorage.setItem('category', this.param.category);
					localStorage.setItem('isStock', this.param.isStock);
					localStorage.setItem('ingredient', this.param.ingredient);
				}
			}).catch();
		},
		components: {
			vHeader: header,
			vNav: nav,
			search,
			baseItem,
			vFilter: filter,
			pagination
		},
//		computed: {
//			result() {
//				return this.$store.state.searchResult;
//			},
//			pageMessage() {
//				let _data = this.$store.state.searchResult.data;
//				let data = {};
//				data.totalNum = _data.totalNum;
//				data.totalPage = _data.totalPage;
//				data.pageNO = _data.pageNO;
//				return data;
//			}
//		},
		methods: {
			hanleFilterSort(e) {
				console.log(e);
				if (e === 'null') {
					this.param.categorys = null;
				} else {
					this.param.categorys = parseInt(e);
				}
				this.param.pageNo = 1;
				this.search();
			},
			handleFilterSupplyShapes(e) {
				console.log(e);
				if (e === 'null') {
					this.param.isStock = null;
				} else {
					this.param.isStock = parseInt(e);
				}
				this.param.pageNo = 1;
				this.search();
			},
			hanleFilterFabric(e) {
				console.log(e);
				if (e === 'null') {
					this.param.ingredient = null;
				} else {
					this.param.ingredient = e;
				}
				this.param.pageNo = 1;
				this.search();
			},
			search(e) {
				if (e) {
					this.param.keywords = e;
				}
				searchMtd(this.param).then((res) => {
					if (res.data.code === 0) {
						console.log(res);
						this.items = res.data.data.list;
						this.pageData.pageNO = res.data.data.pageNO;
						this.pageData.maxNum = res.data.data.totalPage;
					}
				}).catch();
			},
			// 字组件 分页器 注册的事件
			goPage(e) {
				this.param.pageNo = e;
				this.search();
//				searchMtd({
//					keywords: localStorage.searchText,
//					category: localStorage.category || '',
//					stockType: localStorage.stockType || 0,
//					pageSize: 15, // 每页数量 默认10
//					searchType: 2, // 搜索类型 1:店铺搜索 2:全局搜索
//					pageNo: n // 页码 默认 1
//				}).then(res => {
//					// 储存搜索字段
//					let _data = res.data;
//					_data.searchText = localStorage.searchText;
//					_data.category = localStorage.category || '';
//					_data.stockType = localStorage.stockType || 0;
//					this.$store.commit(types.SEARCH_RESULT, _data);
//				});
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
