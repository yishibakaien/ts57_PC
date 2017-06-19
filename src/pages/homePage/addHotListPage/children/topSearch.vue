<template lang="html">
	<div class="hotSearch-content" ref="hotSearch">
		<ts-grid :data="BurstHotSearch" class="hotSearch-content">
			<ts-grid-item width="200px" v-for="(product,index) in BurstHotSearch" :key="product" @click="handleViewProduct(product,index)">
				<span class="ranking hotSearch-rank" :class="`ranking_${index+1}`" v-if="index<3"></span>
				<ts-image width="170" height="170" :canView="false" disabledHover :src="product.pics[0]">
				</ts-image>
				<template slot="footer" class="hotSearch-footer">
					<p>搜索量&nbsp;<span class="hotSearch-footer--searchNum">{{product.searchs}}</span></p>
					<p class="hotSearch-footer--total">共{{product.sameCount}}款</p>
				</template>
			</ts-grid-item>
		</ts-grid>
		<br/>
		<ts-button type="plain" @click="handleLoadMore">加载更多爆款</ts-button>
	</div>
</template>

<script>
	import {
		burstHotSearch
	} from '@/common/api/api';
	export default {
		data() {
			return {
				Params: {
					pageNo: 1,
					pageSize: 12
				},
				pageData: {},
				BurstHotSearch: {}
			};
		},
		methods: {
			async handleLoadMore(number) {
				this.Params.pageNo++;
				let data = (await burstHotSearch(this.Params)).data.data.list;
				this.BurstHotSearch = this.BurstHotSearch.concat(data);
			},
			// 进去某个商品
			handleViewProduct(item, id) {
				this.$router.push({
					name: 'updateResult',
					params: {
						id: id + 1
					},
					query: {
						sameCount: item.sameCount,
						searchs: item.searchs
					}
				});
			}
		},
		async created() {
			this.BurstHotSearch = (await burstHotSearch(this.Params)).data.data.list;
		}
	};
</script>

<style lang="css" scoped>
	@component-namespace hotSearch {
		@component rank {
			position: absolute;
			z-index: 1;
		}
		@component content {
			text-align: center;
			background: #fff;
		}
		@component footer {
			@modifier searchNum {
				color: #FF8400;
			}
			@modifier total {
				color: #999999;
			}
		}
	}
</style>
