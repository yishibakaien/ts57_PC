<template>
	<div class="shop-repertory">
		<div>
			<div class="shop-classify clearfix">
				<span class="title">分类</span>
				<p>
					<span class="selected">全部 {{'(' +a+ ')' }}</span>
					<span>大边 {{'(' +a+ ')' }}</span>
					<span>小边 {{'(' +a+ ')' }}</span>
					<span>睫毛 {{'(' +a+ ')' }}</span>
				</p>
			</div>
			<div class="shop-classify clearfix">
				<span class="title">筛选条件</span>
				<p>
					<span class="selected">全部 {{'(' +a+ ')' }}</span>
					<span>求购中 {{'(' +a+ ')' }}</span>
					<span>已成交 {{'(' +a+ ')' }}</span>
					<span>已关闭 {{'(' +a+ ')' }}</span>
				</p>
			</div>
		</div>

		<div class="shop-table-wrap">
			<div class="shop-table">
				<div class="th clearfix">
					<span class="fl">&nbsp;&nbsp;#200001 面料</span>
					<span class="fr">状态：<i>本地仓库</i>&nbsp;&nbsp;</span>
				</div>
				<div class="tr clearfix">
					<div class="td td1 goodsImg fl">
						<img src="./timg.jpg" width="80" height="80" />
					</div>
					<div class="td td2 fl">
						<span class="padd">有库存</span>
						<span>20000码</span>
					</div>
					<div class="td td3 fl">
						8元/码
					</div>
					<div class="td td4 fl">
						询价次数：<span class="color">8</span>
					</div>
					<div class="td td5 fl">
						<a>上架平台</a>
						<a>上架店铺</a>
						<a>编辑</a>
						<a>删除</a>
					</div>
				</div>

			</div>
			<div class="shop-table">
				<div class="th clearfix">
					<span class="fl">&nbsp;&nbsp;#200001 面料</span>
					<span class="fr">状态：<i>本地仓库</i>&nbsp;&nbsp;</span>
				</div>
				<div class="tr clearfix">
					<div class="td td1 goodsImg fl">
						<img src="./timg.jpg" width="80" height="80" />
					</div>
					<div class="td td2 fl">
						<span class="padd">有库存</span>
						<span>20000码</span>
					</div>
					<div class="td td3 fl">
						8元/码
					</div>
					<div class="td td4 fl">
						询价次数：<span class="color">8</span>
					</div>
					<div class="td td5 fl">
						<a>上架平台</a>
						<a>上架店铺</a>
						<a>编辑</a>
						<a>删除</a>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				a: 1
			};
		}
	};
</script>

<style lang="scss" scoped="scoped">
.shop-table-wrap {
	margin-top: 30px;
}

	.shop-table {
		margin-bottom: 20px;
		width: 914px;
		height: 154px;
		.th {
			height: 40px;
			background: #f8f8f8;
			line-height: 40px;
			border: 1px solid #d1d1d1;
			span {
				font-size: 15px;
			}
		}
		.tr {
			height: 112px;
			vertical-align: middle;
			border: 1px solid #D1D1D1;
			border-top: 0;
		}
		.td {
			height: 112px;
			font-size: 13px;
			color: #666;
			text-align: center;
			border-right: 1px solid #d1d1d1;
		}
		.td1 {
			width: 400px;
			img {
				float: left;
				margin-top: 16px;
				margin-left: 10px;
			}
		}
		.td2 {
			width: 106px;
			.padd {
				display: block;
				margin-top: 40px;
				margin-bottom: 5px;
			}
		}
		.td3 {
			width: 110px;
			line-height: 110px;
		}
		.td4 {
			width: 110px;
			line-height: 110px;
		}
		.td5 {
			width: 182px;
			border-right: 0;
			a {
				display: block;
				margin-top: 12px;
				cursor: pointer;
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
	
	.shop-repertory {
		margin-top: 50px;
		padding: 0 15px;
	}
</style>
