<template lang="html">
	<div class="factory">
		<div class="factory-row">
			<div class="factory-row--left" :style="{'width':width}">
				<ts-image width="100" height="100" :canView="false" disabledHover class="factory-company--cover" :src="data.companyHeadIcon"></ts-image>
				<p class="factory-company--title">{{data.companyName}}</p>
<<<<<<< HEAD
				<p class="factory-company--title1"><i class="icon-dianhua"></i>：{{data.phone}}</p>
				<div class="factory-company--title1" :title="data.address.split('/.')[0]"><i class="icon-dangkou"></i>：{{data.address.split('/.')[0]}}</div>
=======
				<p class="factory-company--title1"><i class="icon-dianhua"></i>&nbsp;{{data.phone}}</p>
				<p class="factory-company--title1"><i class="icon-dangkou"></i>&nbsp;{{data.address.split('/.')[0]}}</p>
>>>>>>> 843cdb12184a53e09b8c187203cfa01b4c18f692
				<ts-button type="plain" size="large" class="factory-company--button button" @click="handleViewStore(data)">
					访问店铺
				</ts-button>
			</div>
			<div class="factory-row--right">
				<div class="factory-list-block onepx">
					<slot name="header"></slot>
				</div>
				<ts-grid :data="products">
					<ts-grid-item v-for="product in products" :key="product" @click="handleViewProduct(product)" :style="{'width':width}">
						<ts-image width="170" height="170" :canView="false" disabledHover :src="product.defaultPicUrl">
						</ts-image>
						<p class="factory-product--number">{{product.productNo}}</p>
						<template slot="footer">
							{{product.category | filterDict(dicTree.PRODUCT_TYPE,'name')}}
							<ts-tag>{{product.isStock | filterDict(DICT.isStock,'label')}}</ts-tag>
						</template>
					</ts-grid-item>
				</ts-grid>
			</div>
		</div>

	</div>
</template>

<script>
	import DICT from '@/common/dict';
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				// 数据字典
				DICT: {
					isStock: DICT.isStock
				}
			};
		},
		props: {
			data: [Array, Object],
			products: [Array],
			width: {
				type: String,
				default: '200px'
			}
		},
		computed: {
			...mapGetters(['dicTree']),
			getPublishDate() {
				let firstPublish = this.data[0].productList[0];
				if (firstPublish) {
					return firstPublish.publishDate;
				}
			}
		},
		methods: {
			// 进去某个商品
			handleViewProduct(item) {
				this.$emit('viewProduct', item);
			},
			// 进去店铺
			handleViewStore(item) {
				this.$emit('viewStore', item);
			}
		}
	};
</script>

<style lang="css" scoped>
	:root {
		--grid-border-color: #eaeaea;
	}

	@import '../../../../common/css/_var.css';
	@import '../../../../common/css/mixin/setOnepx.css';
	@component-namespace factory {
		@component row {
			display: table;
			width: 100%;
			table-layout: fixed;
			position: relative;
			margin-bottom: 20px;
			&:before {
				@mixin setLeftLine var(--grid-border-color);
			}
			&:after {
				@mixin setTopLine var(--grid-border-color);
			}
			@modifier left {
				display: table-cell;
				text-align: center;
				position: relative;
				margin-bottom: 0;
				height: 100%;
				background: #f8f8f8;
				&:after {
					@mixin setBottomLine var(--grid-border-color);
				}
			}
			@modifier right {
				display: table-cell;
				vertical-align: middle;
				width: 100%;
				background: #fff;
			}
		}
		@component company {
			@modifier title {
				font-size: 17px;
				line-height: 20px;
				margin-top: 10px;
				margin-bottom: 10px;
				@utils-ellipsis 2;
			}
			@modifier title1 {
				margin: 0 auto;
				width: 80%;
				font-size: 14px;
				color: #666;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				@utils-ellipsis 1;
			}
			@modifier cover {
				margin-top: 38px;
			}
			@modifier button {
				&.button {
					position: absolute * * 25px 50%;
					transform: translate(-50%);
					width: 80%;
				}
			}
		}
		@component product {
			@modifier number {
				font-size: 16px;
				margin-top: 10px;
				text-align: left;
				max-width: 200px;
				@utils-ellipsis;
			}
		}
		@component list {
			@descendent block {
				line-height: 48px;
				white-space: nowrap;
				display: flex;
				justify-content: space-between;
				padding: 0 20px;
				color: #333;
				p:last-child {
					color: #999;
				}
				span {
					color: #FF8400;
				}
			}
		}
	}
</style>
