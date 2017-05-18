<template>
	<div class="release-supply-page">
		<v-header>
			<search></search>
		</v-header>
		<v-nav></v-nav>
		<div class="release-supply-page-box">
			<h4 class="title">{{title}}</h4>
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
					<label class="add-upload-button">
              {{Pic.text}}
              <aliUpload id="addPic" @doUpload="uploadImg"></aliUpload>
        </label>
				</ts-form-item>
				<ts-form-item label="供应说明：" prop="supplyDesc">
					<ts-input type="textarea" :rows="4" :maxlength='50' v-model="addSupplyForm.supplyDesc" placeholder="请输入供应说明"></ts-input>
				</ts-form-item>
			</ts-form>
			<div slot="footer">
				<ts-button type="primary" class="add-bottom-button" @click="submitForm('addSupplyForm')">{{title}}</ts-button>
				<ts-button type="cancel" @click="$router.go(-1)">取消</ts-button>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import {
		header,
		nav,
		search
	} from '@/components';

	export default {
		data() {
			return {
				text: ''
			};
		},
		created() {
			this.text = this.$route.query.text;
		},
		components: {
			'vHeader': header,
			'vNav': nav,
			search
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
					color: #4c93fd;
					cursor: pointer;
					border: 1px solid #b0b0b0;
				}
			}
		}
	}
</style>
