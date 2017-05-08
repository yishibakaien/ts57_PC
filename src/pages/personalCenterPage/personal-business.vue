<template>
	<div class="personal-business">
		<div class="personal-business-wrap clearfix" v-for="(item, index) in items">
			<div class="personal-business-Info">
				<div class="logo">
					<img src="item.companyHeadIcon" alt="logo" />
					<p class="cancel" @click="cancelSC(index)">取消收藏</p>
				</div>
				<p><span class="address">地址：</span><span class="addressInfo">{{item.address}}</span></p>
				<p><span class="address">电话：</span>{{item.contactTel}}</p>
			</div>
			<div class="personal-business-content">
				<div class="top">
					<span class="companyName">
						<i class="facory" v-if="item.companyType === 1">厂</i>
						<i class="trade"  v-if="item.companyType === 2">贸</i>
						{{item.companyName}}
					</span>
					<a>查看全部{{ '(' + item.productCount + ')' }} > </a>
				</div>
				<div class="hotSell clearfix">
					<div class="hotSellItem" v-for="hotSellItem in item.productBOS">
						<img src="hotSellItem.defaultPicUrl" alt="hotSell" />
						<p class="goodsName">#{{hotSellItem.id}}</p>
						<p>
							<span class="red">¥{{hotSellItem.priceUnit?hotSellItem.priceUnit:0}}/码</span>
							<span class="gray" v-if="hotSellItem.isStock === 0">需要开机</span>
							<span class="green" v-if="hotSellItem.isStock === 1">有库存</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { listCompany, favoriteBus } from '@/common/api/api';
	export default {
		data() {
			return {
				param: {
					pageNo: 1,
					pageSize: 50
				},
				favorite: {
					businessId: '',
					businessType: 2
				},
				items: []
			};
		},
		created() {
			this.listCompanyMethod();
		},
		methods: {
			listCompanyMethod() {
				let _ = this;
				listCompany(_.param).then((res) => {
					_.items = res.data.list;
				}).catch();
			},
			cancelSC(index) {
				let _ = this;
				_.favorite.businessId = _.items[index].id;
				favoriteBus(_.favorite).then((res) => {
					_.listCompanyMethod();
				}).catch();
			}
		}
	};
</script>

<style lang="scss" scoped="scoped">
	.personal-business-wrap {
		position: relative;
		padding: 20px 15px 0;
		&::before {
			position: absolute;
			bottom: 0px;
			content: '';
			display: block;
			width: 914px;
			height: 1px;
			background: #d1d1d1;
		}
	}
	.personal-business-wrap:last-of-type::before {
		display: none;
	}
	
	.companyName {
		font-size: 20px;
		color: #000;
		i {
			position: relative;
			top: -2px;
			display: inline-block;
			width: 20px;
			height: 20px;
			font-size: 12px;
			color: #fff;
			font-style: normal;
			line-height: 20px;
			text-align: center;
		}
		.facory {
			background: #4BD663;
		}
		.trade {
			background: #4C93FD;
		}
	}
	
	.personal-business-Info {
		float: left;
		margin-right: 30px;
		width: 160px;
		.logo {
			position: relative;
			width: 160px;
			height: 160px;
			border: 1px solid #d1d1d1;
			text-align: center;
			line-height: 160px;
			overflow: hidden;
			cursor: pointer;
			img {
				width: 120px;
				height: 120px;
				border-radius: 50%;
			}
			.cancel {
				position: absolute;
				bottom: -28px;
				margin: 0;
				width: 100%;
				height: 28px;
				line-height: 28px;
				background: #000;
				font-size: 14px;
				color: #fff !important;
				opacity: .4;
				transition: .3s;
			}
			&:hover .cancel {
				bottom: 0;
			}
		}
		p {
			margin: 15px 0;
			font-size: 14px;
			color: #666;
			.address {
				display: inline-block;
				width: 45px;
				vertical-align: top;
			}
			.addressInfo {
				width: 115px;
				display: inline-block;
			}
		}
	}
	
	.personal-business-content {
		float: left;
		margin-bottom: 50px;
		width: 724px;
		min-height: 300px;
		/*border-bottom: 1px solid #d1d1d1;*/
		.top {
			height: 50px;
			span {
				font-size: 20px;
				color: #333;
				line-height: 50px;
			}
			a {
				padding-right: 15px;
				float: right;
				font-size: 16px;
				line-height: 50px;
				cursor: pointer;
			}
		}
		.hotSellItem {
			float: left;
			margin-right: 21px;
			padding: 16px;
			width: 192px;
			height: 260px;
			border: 1px solid #d1d1d1;
			img {
				width: 192px;
				height: 192px;
			}
			.goodsName {
				margin-top: 10px;
				font-size: 18px;
				color: #333;
			}
			p {
				margin-top: 10px;
				.red {
					color: red;
					font-size: 12px;
				}
			}
			.green {
				float: right;
				padding: 4px 5px 3px;
				background: #4BD663;
				font-size: 12px;
				color: #fff;
				border-radius: 3px;
			}
			.gray {
				float: right;
				padding: 4px 5px 3px;
				background: #ccc;
				font-size: 12px;
				color: #fff;
				border-radius: 3px;
			}
		}
		div.hotSellItem:nth-child(3) {
			margin-right: 0;
		}
	}
</style>
