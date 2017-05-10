<template>
	<div class="personal-flower">
		<div>
			<ts-filter title="分类">
				<ts-radio-group v-model="Filter.sort" @change="hanleFilterSort">
					<ts-radio label="-1">全部({{classes.totalNum}})</ts-radio>
					<ts-radio label="100010">面料({{classes.mianliao}})</ts-radio>
					<ts-radio label="100011">大边({{classes.large}})</ts-radio>
					<ts-radio label="100012">小边({{classes.small}})</ts-radio>
					<ts-radio label="100013">睫毛({{classes.eyelash}})</ts-radio>
				</ts-radio-group>
			</ts-filter>
			<ts-filter title="筛选条件">
				<ts-radio-group v-model="Filter.fabricType" @change="hanleFilterFabric">
					<ts-radio label="-1">全部({{classes.totalNum}})</ts-radio>
					<ts-radio label="200010 ">胚布({{classes.statusPeibu}})</ts-radio>
					<ts-radio label="200011 ">成品({{classes.statusChengpin}})</ts-radio>
				</ts-radio-group>
			</ts-filter>
		</div>
		<div class="personal-flower-wrap clearfix">
			<div class="personal-goods-item personal-flower-item" v-for="(item, index) in items">
				<div class="personal-goods-item-img">
					<img src="item.productPicUrl" alt="求购" />
					<span class="states green" v-if="item.supplyShape === 200011">成品</span>
					<span class="states gray" v-if="item.supplyShape === 200010">胚布</span>
					<p class="p3"><span class="span1"> &nbsp;&nbsp;{{item.supplyNum}}码</span><span class="span2">昨天&nbsp;&nbsp; </span></p>
					<i class="dele" @click="deleSupply(index)">删除</i>
				</div>
				<p class="info" :title="item.supplyDesc">{{item.supplyDesc}}</p>
				<p class="company">
					<img src="item.companyHeadIcon" alt="company" />
					<span :title="item.companyName">{{item.companyName}}</span>
				</p>
			</div>
		</div>
		<pageBar v-if="pageMax >= 1" :pageNum="pageNum" :pageMax="pageMax" :number="pageSize" v-on:upPage="upPage" v-on:downPage="downPage" v-on:selectFirstPage="selectFirstPage" v-on:selectLastPage="selectLastPage" v-on:selectNumber="selectNumber"></pageBar>
	</div>
</template>

<script>
	import { pageBar } from '@/components';
	import { listSupply, countSupply, favoriteBus } from '@/common/api/api';
	export default {
		data() {
			return {
				Filter: {
					sort: '-1',
					fabricType: '-1'
				},
				pageNum: '',
				pageMax: '',
				pageSize: '',
				param: {
					pageNo: 1,
					pageSize: 8,
					supplyType: -1,
					supplyShape: -1
				},
				favorite: {
					businessId: '',
					businessType: 3
				},
				items: [],
				classes: {
					totalNum: 0,
					mianliao: 0,
					large: 0,
					small: 0,
					eyelash: 0,
					statusPeibu: 0,
					statusChengpin: 0
				}
			};
		},
		components: {
			pageBar
		},
		created() {
			let _ = this;
			listSupply(_.param).then((res) => {
				_.items = res.data.list;
				_.pageNum = res.data.pageNO;
				_.pageSize = res.data.pageSize;
				_.pageMax = res.data.totalPage;
			}).catch();
			countSupply().then((res) => {
				console.log(res.data.data);
				_.classes.totalNum = res.data.data.countSupply;
				_.classes.mianliao = res.data.data.countML;
				_.classes.large = res.data.data.countDB;
				_.classes.small = res.data.data.countXB;
				_.classes.eyelash = res.data.data.countJM;
				_.classes.statusPeibu = res.data.data.countPB;
				_.classes.statusChengpin = res.data.data.countCP;
			}).catch();
		},
		methods: {
			listSupplyMethod() {
				let _ = this;
				listSupply(_.param).then((res) => {
					_.items = res.data.list;
					_.pageNum = res.data.pageNO;
					_.pageSize = res.data.pageSize;
					_.pageMax = res.data.totalPage;
				}).catch();
			},
			hanleFilterFabric(e) {
				let _ = this;
				_.param.supplyShape = parseInt(e);
				_.pageMax = '';
				_.param.pageNo = 1;
				_.listSupplyMethod();
			},
			hanleFilterSort(e) {
				let _ = this;
				_.param.supplyType = parseInt(e);
				_.pageMax = '';
				_.param.pageNo = 1;
				_.listSupplyMethod();
			},
			deleSupply(index) {
				let _ = this;
				_.favorite.businessId = _.items[index].id;
				favoriteBus(_.favorite).then((res) => {
					console.log(res);
				}).catch();
				_.listSupplyMethod();
			},
			selectFirstPage() {
				let _ = this;
				_.param.pageNo = 1;
				this.listSupplyMethod();
			},
			selectLastPage() {
				let _ = this;
				_.param.pageNo = _.pageMax;
				this.listSupplyMethod();
			},
			upPage() {
				let _ = this;
				if (_.pageNum <= 1) {
					return;
				};
				--_.pageNum;
				_.param.pageNo = _.pageNum;
				this.listSupplyMethod();
			},
			downPage() {
				let _ = this;
				if (_.pageNum >= _.pageMax) {
					return;
				};
				++_.pageNum;
				_.param.pageNo = _.pageNum;
				this.listSupplyMethod();
			},
			selectNumber(num) {
				let _ = this;
				_.param.pageNo = 1;
				_.param.pageSize = num;
				this.listSupplyMethod();
			}
		}
	};
</script>

<style lang="scss" scoped="scoped">
	.personal-flower {
		margin-top: 25px;
		padding: 0 15px;
		.personal-flower-wrap {
			margin-top: 20px;
		}
	}
	
	.p3 {
		bottom: 0;
		padding: 0 15px;
		opacity: 0.4;
		span {
			color: #fff;
			/*opacity: 0.4;*/
		}
		.span1 {
			text-align: left;
		}
		.span2 {
			text-align: right;
		}
	}
	
	.personal-flower-item {
		position: relative;
	}
	.dele {
		position: absolute;
		top: 10px;
		right: 10px;
	    width: 20px;
	    height: 20px;
	    background: #000;
	    opacity: .4;
		display: none;
	}
	.personal-flower-item:hover .dele {
		display: block;
	}
	
	.company {
		border-top: 1px solid #d1d1d1;
		img {
			width: 30px;
			height: 30px;
			border-radius: 50%;
		}
		span {
			display: inline-block;
			padding-left: 10px;
			width: 150px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 10px;
			line-height: 30px;
		}
	}
</style>
