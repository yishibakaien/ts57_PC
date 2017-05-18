<template>
	<div class="release-supply-page">
		<v-header>
			<search></search>
		</v-header>
		<v-nav></v-nav>
		<div class="release-supply-page-box">
			<h4 class="title">{{title}}</h4>
			<div class="ts-form-box">
				<ts-form :model="addSupplyForm" :rules="rules" ref="addSupplyForm" label-width="125px" label-position="left">
					<ts-form-item label="花型分类：" prop="supplyType">
						<ts-radio-group bordered v-model="addSupplyForm.supplyType">
							<ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">{{item.name}}</ts-radio>
						</ts-radio-group>
					</ts-form-item>
					<ts-form-item label="大货类型：" prop="supplyShapes">
						<ts-radio-group bordered v-model="addSupplyForm.supplyShapes">
							<ts-radio origin :label="item.dicValue" :key="item.dicValue" v-for="item in dicTree.PRODUCT_SHAPE">{{item.name}}</ts-radio>
						</ts-radio-group>
					</ts-form-item>
					<ts-form-item label="供应数量：" prop="supplyNum">
						<ts-input v-model="addSupplyForm.supplyNum" style="width:320px"></ts-input>
						<ts-select style="width:12%" data-key-name="name" data-val-name="dicValue" :options='CopyDICTUnit' v-model="addSupplyForm.supplyUnit"></ts-select>
					</ts-form-item>
					<ts-form-item label="花型图片：" prop="productPicUrl">
						<ts-image width="200" height="200" :src="addSupplyForm.productPicUrl" v-show='Pic.show' type="local"></ts-image>
						<label class="add-upload-button" for="addPic">{{Pic.text}}</label>
						<aliUpload id="addPic" @doUpload="uploadImg"></aliUpload>
						</label>
					</ts-form-item>
					<ts-form-item label="供应说明：" prop="supplyDesc">
						<ts-input type="textarea" :rows="4" :maxlength='50' v-model="addSupplyForm.supplyDesc" placeholder="请输入供应说明"></ts-input>
					</ts-form-item>
				</ts-form>
				<div slot="footer">
					<ts-button type="primary" class="add-bottom-button" @click="submitForm('addSupplyForm')" style="margin-left: 125px;">{{title}}</ts-button>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import DICT from '@/common/dict';
	import {
		aliUpload,
		header,
		nav,
		search
	} from '@/components';
	import {
		releaseCompanySupply
	} from '@/common/api/api';
	import {
		ALI_DOMAIN
	} from '@/common/dict/const';
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				// 数据字典
				DICT: {
					SupplyShapes: DICT.SupplyShapes,
					StockUnits: DICT.StockUnits,
					SupplyType: DICT.SupplyType,
					PublishStatus: DICT.PublishStatus,
					isStock: DICT.isStock
				},
				rules: {
					supplyType: [{
						required: true,
						message: '请选择花边分类'
					}],
					supplyNum: [{
						required: true,
						pattern: /^[0-9]*[1-9][0-9]*$/,
						message: '请输入正确的供应数量'
					}],
					supplyShapes: [{
						required: true,
						message: '请选择大货类型'
					}],
					supplyDesc: [{
						required: true,
						message: '请输入供应说明（最多50个字）'
					}, {
						min: 1,
						max: 50,
						message: '请输入1-50个字'
					}],
					productPicUrl: [{
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
				addSupplyForm: {
					supplyType: '',
					supplyUnit: '',
					supplyShapes: '',
					supplyNum: '',
					supplyDesc: '',
					productPicUrl: ''
				}
			};
		},
		watch: {
			'addSupplyForm.productPicUrl' (val) {
				this.Pic.text = val ? '修改图片' : '添加图片';
				this.Pic.show = !!val;
			},
			'addSupplyForm.supplyType' (val) {
				let PTJM = '100013';
				let PUT = '400012';
				let PSPB = '200010';
				let PUSG = '400011';
				// 如果面料是睫毛 => 那就显示‘条’单位
				if (val !== PTJM) {
					this.CopyDICTUnit = this.CopyDICTUnit.filter(item => item.dicValue !== PUT);
				} else if (this.addSupplyForm.productShape === PSPB) {
					// 如果有选了胚布 => 那就只显示公斤
					this.CopyDICTUnit = this.CopyDICTUnit.filter(item => item.dicValue === PUSG);
				} else {
					// 如果不是睫毛 => 显示所有
					this.CopyDICTUnit = JSON.parse(JSON.stringify(this.dicTree.PRODUCT_UNIT));
				}
				this.addSupplyForm = Object.assign({}, this.addSupplyForm, {
					stockUnit: this.CopyDICTUnit[0].dicValue
				});
			},
			'addSupplyForm.supplyShapes' (val) {
				let PSPB = '200010';
				let PUSG = '400011';
				let PUT = '400012';
				let PTJM = '100013';
				// 如果是胚布 => 只显示公斤
				if (val === PSPB) {
					this.CopyDICTUnit = this.CopyDICTUnit.filter(item => item.dicValue === PUSG);
				} else if (this.addSupplyForm.category === PTJM) {
					// 如果面料是睫毛 => 把‘条’也显示
					this.CopyDICTUnit = this.dicTree.PRODUCT_UNIT;
				} else {
					// 什么没选的情况下 => 条是隐藏的
					this.CopyDICTUnit = this.dicTree.PRODUCT_UNIT.filter(item => item.dicValue !== PUT);
				}
				this.addSupplyForm = Object.assign({}, this.addSupplyForm, {
					supplyUnit: this.CopyDICTUnit[0].dicValue
				});
			}
		},
		async created() {
			// 默认选择公斤
			this.addSupplyForm.supplyUnit = 400011;
			// TODO:编辑页面 => 后台并没有提供接口
			// if (this.$route.query.id) {
			//   let data = await getCompanySupply(this.$route.query.id);
			//   this.addSupplyForm = data.data.data;
			// }
			// ======
			// 库存单位 首先隐藏条 当选择面料为睫毛的时候才显示
			let units = JSON.parse(JSON.stringify(this.dicTree.PRODUCT_UNIT));
			this.CopyDICTUnit = units.filter(item => item.dicValue !== `400012`);
			// ======
			// 默认会选中第一个值
			this.addSupplyForm = Object.assign({}, this.addSupplyForm, {
				supplyUnit: DICT.StockUnits[0].dicValue
			});
		},
		components: {
			'vHeader': header,
			search,
			'vNav': nav,
			aliUpload
		},
		computed: {
			...mapGetters(['dicTree']),
			title() {
				return this.$route.query.id ? '修改供应' : '发布供应';
			}
		},
		methods: {
			// 上传图片
			uploadImg(e) {
				// 显示Base64
				// this.Pic.src = e.base64Url[e.base64Url.length - 1];
				// 放到表单
				this.addSupplyForm.productPicUrl = ALI_DOMAIN + e.ossUrl[e.ossUrl.length - 1];
			},
			// 提交表单
			submitForm(formName) {
				this.$refs[formName].validate(async(valid) => {
					if (valid) {
						await releaseCompanySupply(this.addSupplyForm);
						await this.$router.go(-1);
					} else {
						return false;
					}
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.release-supply-page {
		background: #fff;
		.release-supply-page-box {
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
	}
</style>
