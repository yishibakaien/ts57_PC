<template lang="html">
	<div class="productIntro-wrapper">
		<div class="productIntro-wrapper-left onepx">
			<!-- 花型 -->
			<div class="productIntro-product-cover">
				<ts-image
				width="400"
				height="400"
				:canView="false"
				disabledHover
				:src="productDetail.defaultPicUrl">
				</ts-image>
				<div class="productIntro-product-share" @click="handleCollected" v-if="productDetail.userId!==userInfo.id">
						<i :class="Collect.isCollected?'icon-yishoucang':'icon-shoucang'"></i>
		        {{Collect.isCollected?'已收藏':'收藏'}}
				</div>
			</div>
			<!-- 简介 -->
			<div class="productIntro-product-intro">
				<p>{{productDetail.productNo}}</p>
				<p>
					<span class="grey">参考价：</span>
					<span class="productIntro-product-intro--price" v-if="!!productDetail.price">
						¥{{productDetail.price/100}}/{{productDetail.priceUnit | filterDict(dicTree.PRODUCT_UNIT,'name')}}
					</span>
					<span v-else class="productIntro-product-intro--price">
						价格面议
					</span>
				</p>
				<br>
				<p>
					<span class="grey">分&nbsp;&nbsp;&nbsp;类：</span>
					<span class="">{{productDetail.category | filterDict(dicTree.PRODUCT_TYPE,'name')}}</span>
				</p><p>
					<span class="grey">成&nbsp;&nbsp;&nbsp;分：</span>
					<span class="">{{productDetail.ingredient}}</span>
				</p><p>
					<span class="grey">库&nbsp;&nbsp;&nbsp;存：</span>
					<span v-if="productDetail.isStock===0">{{productDetail.isStock | filterDict(DICT.isStock,'label2')}}</span>
					<span v-else>{{productDetail.stock}}{{productDetail.stockUnit | filterDict(dicTree.PRODUCT_UNIT,'name')}}</span>
				</p><p>
					<span class="grey">货&nbsp;&nbsp;&nbsp;型：</span>
					<span class="">{{productDetail.productShape | filterDict(dicTree.PRODUCT_SHAPE,'name')}}</span>
				</p><p>
					<span class="grey">幅&nbsp;&nbsp;&nbsp;宽：</span>
					<span class="">{{productDetail.width}}</span>
				</p><p>
					<span class="grey">花&nbsp;&nbsp;&nbsp;高：</span>
					<span class="">{{productDetail.height}}</span>
				</p><p>
					<span class="grey">出码率：</span>
					<span class="">{{productDetail.outRate}}</span>
				</p>
				<!-- 菜单 -->
				<ts-grid class="productIntro-product-menu" v-if="productDetail.userId!==userInfo.id">
					<ts-popover trigger="click" :options="{placement: 'bottom'}" >
							<div class="popper productIntro-popper-phone">
		            <p class="productIntro-popper-phone-user">
		              <strong>{{companyInfo.phone}}</strong>
		            </p>
		            <div class="productIntro-popper-phone-tip">老板，拨打电话时，记得说明
		              <br> 是坐视布管的客户哦～
		            </div>
		          </div>
						<ts-grid-item slot="reference">
							<i class="icon-dianhua"></i>电话
						</ts-grid-item>
					</ts-popover>
					<ts-grid-item @click.native="Dialog.enquiry=!Dialog.enquiry">
						<i class="icon-xunjia"></i>询价
					</ts-grid-item>
				</ts-grid>
				<ts-grid class="productIntro-product-menu" v-if="productDetail.userId!==userInfo.id">
					<ts-grid-item @click.native="handleGoto3Ddress">
						<i class="icon-shiyihui"></i>试衣
					</ts-grid-item>
					<ts-grid-item @click.native="Dialog.sendSample=!Dialog.sendSample" v-if='getIsShowSample'>
						<i class="icon-suoyang"></i>索样
					</ts-grid-item>
				</ts-grid>
			</div>
		</div>
		<!-- 右侧 -->
		<div class="productIntro-wrapper-right onepx center">
				<ts-image shape="round" :src="CompanySimpleInfo.companyHeadIcon" width="100" height="100" :canView="false"
				disabledHover class="productIntro-company-cover">
				</ts-image>
				<p class="productIntro-company-name">{{CompanySimpleInfo.companyName}}</p>
				<div class="productIntro-company--type">
					<span>{{CompanySimpleInfo.companyType | filterDict(DICT.userType)}}</span>
				</div>
				<p class="productIntro-company-business">公司主营</p>
				<div class="productIntro-company--span">
					{{CompanySimpleInfo.companyBusiness}}
				</div>
				<router-link :to="{path:`/shop/${productDetail.companyId}`}">
					<ts-button type="primary"  class="productIntro-company--button">进入网店</ts-button>
				</router-link>
		</div>
		<!-- 对话框---寄样  -->
		<ts-dialog v-model="Dialog.sendSample" title="索样提示" width="25%" @confirm="handleConfirmSendSample" @close="Dialog.sendSample=false" @cancel="Dialog.sendSample=false">
			<div class="productIntro-dialog-sendSample">
				<p class="productIntro-dialog-sendSample--text">
				你的寄样需求系统将以短信方式通知厂家，厂家会尽快与你联系确认需求！
				</p>
				<p class="productIntro-dialog-sendSample--tip">本服务由物齐快递全程跟踪(限广州至长乐往返)</p>
			</div>
		</ts-dialog>
		<!-- 对话框---花型询价  -->
		<ts-dialog v-model="Dialog.enquiry" title='花型询价' @confirm="handleConfirmEnquiry('enquiryForm')" @cancel="handleCancelEnquiry" @close="handleCancelEnquiry" width="25%">
			<div class="center">
				<ts-form :model="enquiryForm" :rules="rules" ref="enquiryForm">
					<ts-form-item prop="purchaseType">
						<ts-radio-group bordered v-model="enquiryForm.purchaseType">
							<ts-radio :label="item.dicValue" v-for="item in DICT.purchaseType">{{item.label}}</ts-radio>
						</ts-radio-group>
					</ts-form-item>
					<ts-form-item prop="purchaseNum">
						<ts-input v-model="enquiryForm.purchaseNum" :maxlength="9" placeholder="请输入采购数量"></ts-input>
					</ts-form-item>
					<ts-form-item prop="phone">
						<ts-input v-model="enquiryForm.phone"  placeholder="请输入联系手机"></ts-input>
					</ts-form-item>
					<p class="productIntro-dialog-sendSample--tip">确认提交后系统将以短信方式通知到厂家</p>
				</ts-form>
			</div>
		</ts-dialog>
	</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import DICT from '@/common/dict/';
import {
  getCompanySimpleInfo,
  sampleAskFor,
  enquiryAskPrice,
  favoriteIsFavorite,
  favoriteBus
} from '@/common/api/api';
export default {
  data() {
    return {
      companyExtendBO: {},
      CompanySimpleInfo: {},
      DICT: {
        purchaseType: DICT.purchaseType,
        isStock: DICT.isStock,
        userType: DICT.userType
      },
      Dialog: {
        sendSample: false,
        enquiry: false
      },
      enquiryForm: {
        phone: '',
        purchaseType: '',
        purchaseNum: ''
      },
      Collect: {
        isCollected: false
      },
      rules: {
        purchaseNum: [{
          pattern: /^[0-9]*[1-9][0-9]*$/,
          message: '请输入正确的采购数量',
          min: 1,
          required: true
        }],
        purchaseType: [{
          message: '请选择采购类型',
          required: true
        }],
        phone: [{
          pattern: /^1[34578]\d{9}$/,
          required: true,
          message: '请输入正确的手机号码'
        }]
      }
    };
  },
  methods: {
    // 去3D试衣
    handleGoto3Ddress() {
      sessionStorage.setItem('flowerUrl', this.productDetail.defaultPicUrl);
      this.$router.push({
        path: `/threeDDressPage`
      });
    },
    handleLogin() {
      this.$router.push({
        path: '/loginPage'
      });
    },
    // 取消询价
    handleCancelEnquiry() {
      this.Dialog.enquiry = false;
      this.enquiryForm = {
        phone: '',
        purchaseType: '',
        purchaseNum: ''
      };
    },
    // 收藏花型
    async handleCollected() {
      let res = (await favoriteBus({
        businessId: this.$route.params.id,
        businessType: 1
      })).data;
      this.Collect.isCollected = res.message.indexOf('收藏') >= 0;
    },
    // 确定询价=>提交表单
    handleConfirmEnquiry(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.enquiryForm.productId = this.$route.params.id;
          for (let i in this.enquiryForm) {
            this.enquiryForm[i] = Number(this.enquiryForm[i]);
          }
          let res = await enquiryAskPrice(this.enquiryForm);
          if (!res.data.code) {
            this.$toast('询价成功');
          }
          this.Dialog.enquiry = false;
        } else {
          return false;
        }
      });
    },
    // 确定索样
    async handleConfirmSendSample() {
      let res = await sampleAskFor({
        companyId: this.productDetail.companyId,
        productId: this.productDetail.id
      });
      if (!res.data.code) {
        this.$toast('索样成功');
      }
      this.Dialog.sendSample = false;
    }
  },
  computed: {
    ...mapGetters(['dicTree', 'productDetail', 'userInfo', 'companyInfo']),
    // 是否显示索样
    getIsShowSample() {
      return this.userInfo.userType === 1 && this.companyInfo.city === 440100 && this.companyInfo.province === 440000;
    }
  },
  async created() {
    // 是否收藏
    let res = (await favoriteIsFavorite({
      businessId: this.$route.params.id,
      businessType: 1
    })).data.data;
    this.Collect.isCollected = res !== 0;
    this.$store.dispatch('getCompanyInfo', this.userInfo.companyId);
  },
  watch: {
    productDetail: {
      async handler(val) {
        this.CompanySimpleInfo = (await getCompanySimpleInfo({
          id: val.companyId
        })).data.data;
      },
      deep: true
    },
    companyInfo: {
      async handler(val) {
        this.companyExtendBO = val.companyExtendBO;
      },
      deep: true
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace productIntro{
	@component wrapper{
		display: flex;
		margin-bottom: 10px;
		@descendent left{
			flex: calc(840/1200);
			padding: 14px;
		}
		@descendent right{
			padding: 14px;
			flex:calc(360/1200);
			margin-left: 10px;
			padding-top: 70px;
		}
	}
	@component dialog-sendSample{
		text-align: center;
		@modifier text{
			font-weight: bold;
			margin-bottom: 12px;
		}
		@modifier tip{
			color:grey;
			font-size: 12px;
		}
	}
	@component company{
		@descendent name{
			padding: 35px 0 10px 0;
			font-size: 18px;
			position: relative;
		}
		@descendent cover{
			 box-shadow: 0px 0px 20px 2px rgba(155,155,155,0.4);
		}
		@descendent business{
			position: relative;
			color:#999999;
			line-height: 34px;
			&:before{
				content:' ';
				position: absolute 50% * * 0;
				background: #eaeaea;
				size: 50px 1px;
				transform: translate(150%,-50%);
			}
			&:after{
				content:' ';
				position: absolute 50% 0 * *;
				background: #eaeaea;
				size: 50px 1px;
				transform: translate(-150%,-50%);
			}
		}
		@modifier button{
			position: absolute;
			bottom:50px;
			left:50%;
			transform: translate(-50%,-50%);
		}
		@modifier span {
			color: #666;
			margin: 10px 0;
		}
		@modifier type{
			color: #4C93FD;
			border: 1px solid;
			padding: 0 10px;
			margin-bottom: 30px;
			display: inline-block;
			text-align: center;
		}
	}
	@component popper-phone{
    line-height: 140%;
    padding: 15px;
    @descendent user{
      margin: 10px 0;
      font-size: 23px;
    }
    @descendent tip{
      color: #999;
    }
  }
	@component product{
		@descendent cover{
			float: left;
			position: relative;
			padding-bottom: 80px;
		}
		@descendent share{
			text-align: center;
			margin: 30px 0;
			font-size: 18px;
			position: absolute * * -15px 50%;
			transform: translate(-50%,-50%);
			cursor: pointer;
			transition: .8s;
			&:hover{
				color:#4C93FD;
			}
			i{
				padding: 0 10px;
			}
		}
		@descendent menu{
			border-left: 1px solid #eaeaea;
			i{
				padding-right:20px;
			}
			.ts-grid{
				background-color: #F8F8F8;
				cursor: pointer;
				padding: 15px 30px;
    		width: 123px;
				white-space: nowrap;
				&:hover{
					box-shadow:none;
					background-color: #eaeaea;
				}
			}
		}
		@descendent intro{
			margin-left: 20px;
			float: left;
			@modifier price{
				color: red;
				font-size: 20px;
			}
			p{
				line-height: 250%;
				&:nth-last-of-type(1){
					margin-bottom: 20px;
				}
				&:nth-of-type(1){
					font-size: 22px;
					word-break: break-all;
					max-width: 350px;
					line-height: 150%;
				}
			}
		}
	}
}
.grey{
	color: #999;
}
.center{
	text-align: center;
}
.popper-tip{
	line-height: 40px;
	color:grey;
}
</style>
