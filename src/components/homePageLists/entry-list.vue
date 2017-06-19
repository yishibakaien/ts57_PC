<template>
	<div class="entry-list">
		<div class="left-brand">
			<div class="brand-header">
				<div class="brand-name">
					<i class="arrow"></i>
					<i class="arrow-bg"></i>
					<div class="left">
						<p class="brand-title">入驻企业</p>
						<p class="brand-desc">布容错过 坐视布管</p>
					</div>
					<div class="right">
						<i class="iconfont icon-ruzhu"></i>
					</div>
				</div>
			</div>
			<div class="brand-body">
				<!-- <textarea class="input" maxlength="60" placeholder="请填写需求购买花型的详细描述，如花高，宽幅等信息"></textarea> -->
				<!--<div class="entry-nav-box clearfix">
        <div class="entry-nav-item">
          <i class="iconfont entry-nav-icon icon-huaxin"></i>
          <p class="entry-nav-text">卖花型</p>
        </div>
        <div class="entry-nav-item">
          <i class="iconfont entry-nav-icon icon-dingdan"></i>
          <p class="entry-nav-text">找订单</p>
        </div>
        <div class="entry-nav-item">
          <i class="iconfont entry-nav-icon icon-hezuo"></i>
          <p class="entry-nav-text">谈合作</p>
        </div>
        <div class="entry-nav-item">
          <i class="iconfont entry-nav-icon icon-dangkou"></i>
          <p class="entry-nav-text">找客户</p>
        </div>
      </div>
      <div class="entry-button-box">
        <ts-button type="plain" size="large" class="addProduct--button button" @click="handleGotoAddProduct">新增花型</ts-button>
      </div>-->
				<p>平台线下配套服务</p>
				<div>
					<img src="/static/images/wuqigongyi.png" alt="物齐工艺" />
				</div>
				<div>
					<img src="/static/images/wuqikuaidi.png" alt="物齐快递" />
				</div>
			</div>
		</div>
		<div class="right-list">
			<!--<div class="entry-flexbox">
      <entry-list-item :item="item" v-for="item in newCompanyList"></entry-list-item>
    </div>-->
			<list-tile :title-text="titleText"></list-tile>
			<div class="item-wrapper clearfix">
				<ts-carousel height="546px" autoplay-speed="6000" dots="none" autoplay arrow="always" easing='linear'>
					<ts-carousel-item v-for="(company,index) in companys" :key="index">
						<ts-grid>
							<ts-grid-item style="width:311px;height:183px" v-for="item in company" @click="handleViewProduct(item.companyId)">
								<ts-image width="268" height="150" :canView="false" disabledHover :src="item.pic">
								</ts-image>
							</ts-grid-item>
						</ts-grid>
					</ts-carousel-item>
				</ts-carousel>
			</div>
		</div>
	</div>
</template>

<script>
	import listTile from './list-title';
	import entryListItem from './entry-list-item';
	import {
		qualityCompanyList1
	} from '@/common/api/api';
	export default {
		data() {
			return {
				titleText: {
					title: '入驻信息',
					extend: '更多惊喜',
					type: 'entry'
				},
				CompanyListParam: {
					pageNo: 1,
					pageSize: 50
				},
				companys: []
			};
		},
		async created() {
			let data = (await qualityCompanyList1(this.CompanyListParam)).data.data.list;
			let result = [];
			for (var i = 0, len = data.length; i < len; i += 9) {
				result.push(data.slice(i, i + 9));
			};
			this.companys = result;
		},
		methods: {
			handleViewProduct(id) {
				this.goto(`/shop/${id}`);
			}
		},
		components: {
			listTile,
			entryListItem
		},
		props: {
			newCompanyList: {
				type: Array
			}
		}
	};
</script>
<style lang="scss" scoped>
	.entry-flexbox {
		display: flex;
		flex-wrap: wrap;
		background-color: #fff;
	}
	
	.brand-body {
		text-align: center;
		p {
			font-size: 16px;
			line-height: 85px;
		}
		img {
			margin-bottom: 40px;
			width: 235px;
		}
	}
</style>
<style lang="stylus" scoped>
basecolor = #4c93fd
.entry-list
  display flex
  box-sizing border-box
  width 100%
  min-height 318px
  background #fff
  /*overflow hidden*/
  .addProduct--button.button
    height 48px
    margin-top 24px
    border-color #4c93fd
    border-radius 4px
    color #4c93fd
    font-size 20px
    border-radius 4px
    letter-spacing 1px
  .left-brand
    flex 0 0 267px 164 +322
    width 267px
    /*height: 454px*/
    background: #fff
    .brand-header
      height 86px
      padding 12px
      color #fff
      font-family 'Microsoft YaHei'
      background basecolor
      width 243px
      .brand-name
        display flex
        position relative
        .arrow
        	position absolute
        	top -12px
        	left -12px
        	width 0
        	height 0
        	border-top 27px solid #f6f6f6
        	border-right 27px solid transparent
        .arrow-bg
        	position absolute
        	top -12px
        	left -12px
        	width 30px
        	height 30px
        	background url('/static/images/assets/icon/arrow.png')
        .left
          flex 1
          .brand-title
            font-size 28px
            height 45px
            line-height 45px
          .en
            font-size 24px
            height 25px
            line-height 30px
            color rgba(255, 255, 255, 0.6)
        .right
          flex 0 0 60px
          width 60px
          height 75px
          line-height 75px
          .iconfont
            font-size 44px
            color rgba(255, 255, 255, 0.6)
          .icon-ruzhu::before
          	position relative
          	top 14px
          	color rgba(255,255,255,.3)
      .brand-desc
        height 40px
        line-height 40px
        font-size 16px
        color rgba(255, 255, 255, 0.6)
  .right-list
    flex 1
    max-width 933px
</style>
