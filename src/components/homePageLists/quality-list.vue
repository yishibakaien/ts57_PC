<template lang="html">
	<!-- 优质厂家 -->
	<div class="quality-company-list">
		<div class="left-brand onepx-r">
			<img src="/static/images/lace.jpg">
		</div>
		<div class="right-list">
			<list-tile :title-text="titleText"></list-tile>
			<div class="entry-flexbox">
				<entry-list-item :item="item" v-for="item in newCompanyList"></entry-list-item>
			</div>
			<!--<div class="item-wrapper">
        <ts-carousel height="546px" autoplay-speed="6000" dots="none" autoplay arrow="always" easing='linear'>
          <ts-carousel-item v-for="(company,index) in companys" :key="index">
            <ts-grid>
              <ts-grid-item style="width:300px;height:183px" v-for="item in company" @click="handleViewProduct(item.companyId)">
                <ts-image width="268" height="150" :canView="false" disabledHover :src="item.pic">
                </ts-image>
              </ts-grid-item>
            </ts-grid>
          </ts-carousel-item>
        </ts-carousel>
      </div>-->
		</div>
	</div>
</template>

<script>
	import entryListItem from './entry-list-item';
	import listTile from './list-title';
	export default {
		data() {
			return {
				titleText: {
					title: '新增热搜',
					extend: '更多新花',
					type: 'hot'
				}
			};
		},
		methods: {
			handleGotoAddProduct() {
				this.$router.push({
					path: '/product/add'
				});
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
<style lang="stylus" scoped>
.quality-company-list
  width 100%
  background #fff
  .left-brand
    float left
    img
    	box-sizing border-box
    	border 1px soild #f2f2f2
  .right-list
    padding-left 267px
   .entry-flexbox
   	display flex
   	flex-wrap wrap
</style>
