<template>
	<div class="release-purchase-page">
		<v-header>
			<search></search>
		</v-header>
		<v-nav></v-nav>
		<div class="release-purchase-page-box">
			<h4 class="title">{{title}}</h4>
			<div class="ts-form-box">
				<ts-form :model="addBuyForm" :rules="rules" ref="addBuyForm" label-width="140px" label-position="left">
					<ts-form-item label="花型分类：" prop="buyType">
						<ts-radio-group bordered v-model="addBuyForm.buyType">
							<ts-radio @change.native="handleSelect" origin :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">{{item.name}}</ts-radio>
						</ts-radio-group>
					</ts-form-item>
					<ts-form-item label="大货类型：" prop="buyShapes">
						<ts-radio-group bordered v-model="addBuyForm.buyShapes">
							<ts-radio @change.native="handleSelect" origin :label="item.dicValue" :key="item.dicValue" v-for="item in dicTree.PRODUCT_SHAPE">{{item.name}}</ts-radio>
						</ts-radio-group>
					</ts-form-item>
					<ts-form-item label="是否接受开机：" prop="isStartUp">
						<ts-radio-group bordered v-model="addBuyForm.isStartUp">
							<ts-radio @change.native="handleSelect" origin :label="item.dicValue" :key="item.dicValue" v-for="item in DICT.BuyStatus">{{item.label}}</ts-radio>
						</ts-radio-group>
					</ts-form-item>
					<ts-form-item label="求购数量：" prop="buyNum">
						<ts-input :maxlength='9' v-model="addBuyForm.buyNum" style="width:320px"></ts-input>
						<ts-select style="width:12%" data-key-name="name" data-val-name="dicValue" :options='CopyDICTUnit' v-model="addBuyForm.buyUnit"></ts-select>
					</ts-form-item>
					<ts-form-item label="花型图片：" prop="buyPicUrl">
						<ts-image width="200" height="200" :src="addBuyForm.buyPicUrl" v-show='Pic.show' type="local"></ts-image>
						<label class="add-upload-button" for="addPic">{{Pic.text}}</label>
						<aliUpload id="addPic" @doUpload="uploadImg"></aliUpload>
					</ts-form-item>
					<ts-form-item label="求购说明：" prop="buyDesc">
						<ts-input type="textarea" :rows="4" :maxlength='200' v-model="addBuyForm.buyDesc" placeholder="请输入求购说明"></ts-input>
					</ts-form-item>
				</ts-form>
				<div slot="footer" style="margin-left: 140px;">
					<ts-button type="primary" class="add-bottom-button" @click="submitForm('addBuyForm')">{{title}}</ts-button>
				</div>
			</div>
		</div>
		<div class="prompt-box" v-if="modelShow">
			<customModel>
				<h5>提示</h5>
				<div class="model-content">
					<i class="icon-chenggongfabu"></i>
					<p>已成功发布求购</p>
				</div>
				<div class="btn-group">
					<button class="btn btn-blue" @click="againRelease">继续发布</button>
					<button class="btn btn-write" @click="myBuy">我的求购</button>
				</div>
			</customModel>
		</div>
	</div>
</template>
<script>
	import DICT from '@/common/dict';
	import {
		aliUpload,
		header,
		nav,
		search,
		customModel
	} from '@/components';
	import { releaseProductBuy } from '@/common/api/api';
	import { ALI_DOMAIN } from '@/common/dict/const';
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				modelShow: false,
				// 数据字典
				DICT: {
					SupplyShapes: DICT.SupplyShapes,
					StockUnits: DICT.StockUnits,
					SupplyType: DICT.SupplyType,
					BuyStatus: DICT.BuyStatus,
					PublishStatus: DICT.PublishStatus,
					isStock: DICT.isStock
				},
				rules: {
					buyType: [{
						required: true,
						message: '请选择花边分类'
					}],
					buyNum: [{
						required: true,
						pattern: /^[0-9]*$/,
						message: '请输入正确的求购数量'
					}],
					isStartUp: [{
						required: true,
						message: '请选择是否接受开机'
					}],
					buyShapes: [{
						required: true,
						message: '请选择大货类型'
					}],
					buyDesc: [{
						required: true,
						message: '请输入求购说明（最多50个字）'
					}, {
						min: 1,
						max: 50,
						message: '请输入1-50个字'
					}],
					buyPicUrl: [{
						required: true,
						trigger: 'change',
						message: '请上传花型图片'
					}]
				},
				Pic: {
					show: false,
					text: '添加图片'
				},
				// 深拷贝复制一份库存单位
				CopyDICTUnit: [],
				addBuyForm: {
					buyType: '',
					buyUnit: '',
					buyShapes: '',
					isStartUp: '',
					buyNum: '',
					buyDesc: '',
					buyPicUrl: ''
				}
			};
		},
		watch: {
			addBuyForm: {
				handler(val, oldVal) {
					let PTJM = '100013';
					let PUT = '400012';
					let PSPB = '200010';
					let PUSG = '400011';
					// ========
					// 1.上传图片
					if (val.buyPicUrl) {
						this.Pic.text = val.buyPicUrl ? '修改图片' : '添加图片';
						this.Pic.show = !!val.buyPicUrl;
					}
					// ==========
					// 4.面料改变的时候
					if (val.buyType !== PTJM) {
						this.CopyDICTUnit = this.CopyDICTUnit.filter(item => item.dicValue !== PUT);
					} else if (val.buyShapes === PSPB) {
						// 如果有选了胚布 => 那就只显示公斤
						this.CopyDICTUnit = this.CopyDICTUnit.filter(item => item.dicValue === PUSG);
					} else {
						// 如果不是睫毛 => 显示所有
						this.CopyDICTUnit = JSON.parse(JSON.stringify(this.dicTree.PRODUCT_UNIT));
					}
					// =========
					// 5.如果是胚布 => 只显示公斤
					if (val.buyShapes === PSPB) {
						this.CopyDICTUnit = this.CopyDICTUnit.filter(item => item.dicValue === PUSG);
					} else if (val.buyType === PTJM) {
						// 如果面料是睫毛 => 把‘条’也显示
						this.CopyDICTUnit = this.dicTree.PRODUCT_UNIT;
					} else {
						// 什么没选的情况下 => 条是隐藏的
						this.CopyDICTUnit = this.dicTree.PRODUCT_UNIT.filter(item => item.dicValue !== PUT);
					}
					val.stockUnit = this.CopyDICTUnit[0].dicValue;
				},
				deep: true
			}
		},
		async created() {
			if (this.$route.query.text) {
				this.addBuyForm.buyDesc = this.$route.query.text;
			};
			if (this.$route.query.obj) {
				this.addBuyForm.buyPicUrl = this.$route.query.obj.buyPicUrl;
				this.addBuyForm.buyNum = this.$route.query.obj.buyNum;
				this.addBuyForm.buyDesc = this.$route.query.obj.buyDesc;
				this.addBuyForm.isStartUp = this.$route.query.obj.isStartUp;
				this.addBuyForm.buyUnit = this.$route.query.obj.buyUnit.toString();
				this.addBuyForm.buyType = this.$route.query.obj.buyType.toString();
				this.addBuyForm.buyShapes = this.$route.query.obj.buyShape.toString();
			};
			// 默认选择公斤
			this.addBuyForm.buyUnit = 400011;
			// TODO:编辑页面 => 后台并没有提供接口
			// if (this.$route.query.id) {
			//   let data = await getCompanySupply(this.$route.query.id);
			//   this.addBuyForm = data.data.data;
			// }
			// ======
			// 库存单位 首先隐藏条 当选择面料为睫毛的时候才显示
			//			console.log(this.dicTree.PRODUCT_UNIT);
			let units = JSON.parse(JSON.stringify(this.dicTree.PRODUCT_UNIT));
			this.CopyDICTUnit = units.filter(item => item.dicValue !== '400012');
			// ======
			// 默认会选中第一个值
			this.addBuyForm = Object.assign({}, this.addBuyForm, {
				buyUnit: DICT.StockUnits[0].dicValue
			});
		},
		components: {
			'vHeader': header,
			search,
			'vNav': nav,
			aliUpload,
			customModel
		},
		computed: {
			...mapGetters(['dicTree']),
			title() {
				return this.$route.query.id ? '修改供应' : '发布贸易商求购';
			}
		},
		methods: {
			handleSelect() {
				this.$nextTick(() => {
					this.addBuyForm.buyUnit = this.CopyDICTUnit[0].dicValue;
				});
			},
			// 上传图片
			uploadImg(e) {
				// 显示Base64
				// this.Pic.src = e.base64Url[e.base64Url.length - 1];
				// 放到表单
				this.addBuyForm.buyPicUrl = ALI_DOMAIN + e.ossUrl[e.ossUrl.length - 1];
			},
			// 提交表单
			submitForm(formName) {
				this.$refs[formName].validate(async(valid) => {
					if (valid) {
						await releaseProductBuy(this.addBuyForm);
						this.modelShow = true;
					} else {
						return false;
					}
				});
			},
			// 继续发布
			againRelease() {
				this.modelShow = false;
				location.reload();
			},
			// 我的求购
			myBuy() {
				this.$router.push({
					path: '/personalCenterPage',
					query: {
						subPath: '4'
					}
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.release-purchase-page {
		background: #fff;
		.release-purchase-page-box {
			padding: 20px 50px;
			.title {
				margin: 30px 200px 20px 200px;
				padding: 0 100px 36px;
				border-bottom: 1px solid #d1d1d1;
				font-size: 24px;
			}
			.ts-form-box {
				margin: 50px auto;
				width: 1000px;
				min-height: 500px;
				.add-upload-button {
					padding: 5px 8px;
					line-height: 32px;
					color: #fff;
					background: #4c93fd;
					cursor: pointer;
				}
			}
		}
		.prompt-box {
			h5 {
				padding-left: 12px;
				height: 38px;
				line-height: 38px;
				font-size: 16px;
				color: #666;
				border-bottom: 1px solid #e5e5e5;
			}
			.model-content {
				padding-top: 60px;
				text-align: center;
				.icon-chenggongfabu {
					&::before {
						font-size: 44px;
					}
				}
				p {
					margin-top: 16px;
					font-size: 22px;
					color: #666;
				}
			}
			.btn-group {
				margin-top: 50px;
				.btn {
					border: 0;
					width: 120px;
					height: 40px;
					text-align: center;
					font-size: 16px;
				}
				.btn-blue {
					margin: 0 70px;
					background: #4C93FD;
					color: #fff;
				}
				.btn-write {
					background: #fff;
					color: #666;
					border: 1px solid #e5e5e5;
				}
			}
		}
	}
</style>
