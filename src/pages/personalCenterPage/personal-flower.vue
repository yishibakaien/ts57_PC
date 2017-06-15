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
			<ts-filter title="库存">
				<ts-radio-group v-model="Filter.fabricType" @change="hanleFilterFabric">
					<ts-radio label="-1">全部({{classes.totalNum}})</ts-radio>
					<ts-radio label="1">有库存({{classes.statusYes}})</ts-radio>
					<ts-radio label="0">需要开机({{classes.statusNo}})</ts-radio>
				</ts-radio-group>
			</ts-filter>
		</div>
		<div class="personal-flower-wrap clearfix" v-show='!defaultShow'>
			<div v tag="div" class="personal-goods-item" v-for="(item, index) in items" @click="handleGotoDetail(item)">
				<div class="personal-goods-item-img">
					<img v-lazy="item.defaultPicUrl" />
					<span class="states green" v-if="item.isStock === 1">有库存</span>
					<span class="states gray" v-else>需要开机</span>
					<p class="p3">
						<span class="borderS" @click.stop="handleGotoFind(item)">找相似</span><span @click.stop="handleGoto3DDress(item)">试衣</span>
					</p>
				</div>
				<p class="info">{{item.companyName}}</p>
				<p><span>#{{item.productNo}}</span><span class="time">{{item.createDate | customTime}}</span></p>
				<i class="dele icon-shanchu_hui" @click.stop="openModel(index)"></i>
				<div class="tipsModel" v-show="item.tipShow">
					<div>
						<p>从花型收藏中删除？</p>
						<div class="menu-button">
							<ts-button type="primary" @click.stop="deleFlower(index)">确认</ts-button>
							<ts-button type="cancel" @click.stop="closeModel">取消</ts-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="default-page" v-show='defaultShow'>
			暂无数据
		</div>
		<pageBar v-if="classes.totalNum > 1" :pageNum="pageNum" :pageMax="pageMax" :number="pageSize" v-on:upPage="upPage" v-on:downPage="downPage" v-on:selectFirstPage="selectFirstPage" v-on:selectLastPage="selectLastPage" v-on:selectNumber="selectNumber"></pageBar>
		<cropper-dialog :dialog="Cropper" :imageUrl="Pic.url" @check="handleLookProduct" @change="handleGetResult">
		</cropper-dialog>
	</div>
</template>

<script>
	import {
		pageBar
	} from '@/components';
	import CropperDialog from '@/components/search/searchImgDialog.vue';
	import {
		listProduct,
		countProduct,
		favoriteBus
	} from '@/common/api/api';
	export default {
		data() {
			return {
				Cropper: {
					show: false
				},
				Filter: {
					sort: -1,
					fabricType: -1
				},
				pageNum: '',
				pageMax: '',
				pageSize: '',
				param: {
					category: -1,
					isStock: -1,
					pageNo: 1,
					pageSize: 8
				},
				items: [],
				classes: {
					totalNum: 0,
					mianliao: 0,
					large: 0,
					small: 0,
					eyelash: 0,
					statusYes: 0,
					statusNo: 0
				},
				Pic: {
					url: ''
				},
				defaultShow: false
			};
		},
		components: {
			pageBar,
			CropperDialog
		},
		created() {
			let _ = this;
			//			console.log(listProduct);
			listProduct(_.param).then((res) => {
				if (res.data.code === 0) {
					if (res.data.data.list.length === 0) {
						_.defaultShow = true;
						return;
					};
					res.data.data.list.forEach((item) => {
						item.tipShow = false;
					});
					_.items = res.data.data.list;
					_.pageNum = res.data.data.pageNO;
					_.pageSize = res.data.data.pageSize;
					_.pageMax = res.data.data.totalPage;
				}
			}).catch((res) => {});
			countProduct().then((res) => {
				_.classes.totalNum = res.data.data.countProduct;
				_.classes.mianliao = res.data.data.countML;
				_.classes.large = res.data.data.countDB;
				_.classes.small = res.data.data.countXB;
				_.classes.eyelash = res.data.data.countJM;
				_.classes.statusYes = res.data.data.countYKC;
				_.classes.statusNo = res.data.data.countXYKJ;
			}).catch();
		},
		methods: {
			listProductMethod() {
				let _ = this;
				listProduct(_.param).then((res) => {
					res.data.data.list.forEach((item) => {
						item.tipShow = false;
					});
					_.items = res.data.data.list;
					_.pageNum = res.data.data.pageNO;
					_.pageSize = res.data.data.pageSize;
					_.pageMax = res.data.data.totalPage;
				}).catch((res) => {
					console.log(res.data);
				});
			},
			// 裁剪---选择分类的时候
			async handleLookProduct(item) {
				await this.$store.dispatch('getSearchEncoded', {
					category: item.category,
					encoded: item.encoded,
					searchType: 300
				});
			},
			hanleFilterFabric(e) {
				let _ = this;
				_.param.isStock = parseInt(e);
				_.pageMax = '';
				_.param.pageNo = 1;
				_.listProductMethod();
			},
			hanleFilterSort(e) {
				let _ = this;
				_.param.category = parseInt(e);
				_.pageMax = '';
				_.param.pageNo = 1;
				_.listProductMethod();
			},
			// 去花型详情
			handleGotoDetail(item) {
				this.goto(`/product/${item.id}`);
			},
			// 找相似
			handleGotoFind(item) {
				this.Pic.url = item.defaultPicUrl;
				this.Cropper.show = true;
			},
			handleGetResult(val) {
				this.$router.push({
					path: '/search/image',
					query: {
						imgId: val
					}
				});
			},
			// 去3D试衣
			handleGoto3DDress(item) {
				sessionStorage['flowerUrl'] = item.defaultPicUrl;
				this.$router.push({
					path: `/threeDDressPage`
				});
			},
			selectFirstPage() {
				let _ = this;
				_.param.pageNo = 1;
				this.listProductMethod();
			},
			selectLastPage() {
				let _ = this;
				_.param.pageNo = _.pageMax;
				this.listProductMethod();
			},
			upPage() {
				let _ = this;
				if (_.pageNum <= 1) {
					return;
				};
				--_.pageNum;
				_.param.pageNo = _.pageNum;
				this.listProductMethod();
			},
			downPage() {
				let _ = this;
				if (_.pageNum >= _.pageMax) {
					return;
				};
				++_.pageNum;
				_.param.pageNo = _.pageNum;
				this.listProductMethod();
			},
			selectNumber(num) {
				let _ = this;
				_.param.pageNo = 1;
				_.param.pageSize = num;
				this.listProductMethod();
			},
			openModel(index) {
				let _ = this;
				_.closeModel();
				_.items[index].tipShow = true;
			},
			closeModel() {
				let _ = this;
				_.items.forEach((item) => {
					item.tipShow = false;
				});
			},
			deleFlower(index) {
				let _ = this;
				favoriteBus({
					businessId: _.items[index].id,
					businessType: 1
				}).then((res) => {
					if (res.data.code === 0) {
						_.$toast({
							type: 'success',
							message: '已成功删除该收藏'
						});
						_.listProductMethod();
						countProduct().then((res) => {
							_.classes.totalNum = res.data.data.countProduct;
							_.classes.mianliao = res.data.data.countML;
							_.classes.large = res.data.data.countDB;
							_.classes.small = res.data.data.countXB;
							_.classes.eyelash = res.data.data.countJM;
							_.classes.statusYes = res.data.data.countYKC;
							_.classes.statusNo = res.data.data.countXYKJ;
						}).catch();
					}
				}).catch();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.personal-flower {
		margin-top: 25px;
		padding: 0 15px;
		.personal-flower-wrap {
			margin-top: 20px;
		}
	}
	
	.p3 {
		opacity: 0.4;
		span {
			color: #fff;
		}
		.borderS {
			position: rrelative;
			&::after {
				content: '';
				position: absolute;
				left: 50%;
				top: 3px;
				width: 2px;
				height: 22px;
				background: #fff;
				opacity: 0.7;
			}
		}
	}
	
	.personal-goods-item {
		position: relative;
		.dele {
			position: absolute;
			top: 10px;
			right: 10px;
			width: 20px;
			height: 20px;
			text-align: center;
			line-height: 20px;
			color: #fff;
			background: #000;
			opacity: .4;
			display: none;
			&:before {
				color: #fff;
			}
		}
		&:hover .dele {
			display: block;
		}
	}
	
	.menu-button {
		position: absolute;
		bottom: 20px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-around;
	}
</style>
