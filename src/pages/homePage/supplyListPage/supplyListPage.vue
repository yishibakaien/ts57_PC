<template>
	<div class="supply-list-page">
		<v-header>
			<search></search>
		</v-header>
		<v-nav></v-nav>
		<div class="supply-list-page-box">
			<!-- 筛选器 -->
			<!--<div class="filter-container">
        <div class="category filter-list">
          <p class="filter-title">供应分类</p>
          <p class="filter-detail">
            <span class="item" v-for="item in categoryItems" :class="{active: categoryActiveItem===item}">{{item}}</span>
          </p>
        </div>
        <div class="component filter-list">
          <p class="filter-title">供应布样</p>
          <p class="filter-detail">
            <span class="item" v-for="item in componentItems" :class="{active: componentActiveItem===item}">{{item}}</span>
          </p>
        </div>
      </div>-->
			<div>
				<ts-filter title="求购分类">
					<ts-radio-group v-model="Filter.sort" @change="hanleFilterSort">
						<ts-radio label="null">全部</ts-radio>
						<ts-radio label="100010">面料</ts-radio>
						<ts-radio label="100011">大边</ts-radio>
						<ts-radio label="100012">小边</ts-radio>
						<ts-radio label="100013">睫毛</ts-radio>
					</ts-radio-group>
				</ts-filter>
				<ts-filter title="求购布样">
					<ts-radio-group v-model="Filter.fabricType" @change="hanleFilterFabric">
						<ts-radio label="null">全部</ts-radio>
						<ts-radio label="200011">成品</ts-radio>
						<ts-radio label="200010">胚布</ts-radio>
					</ts-radio-group>
				</ts-filter>
			</div>
			<!-- 列表 -->
			<div class="supply-list-item-wrapper clearfix">
				<div class="item-wrapper" v-for="(item, index) in items">
					<supply-item :item="item" @clickMethod="goDetail(index)"></supply-item>
				</div>
			</div>
			<pagination :page="pageData" @selectedPageNum="selectedPageNum1"></pagination>
		</div>
	</div>
</template>

<script>
	import {
		header,
		nav,
		search,
		pagination
	} from '@/components';
	import supplyItem from './supplyItem';
	import { listCompanySupplys } from '@/common/api/api';
	export default {
		data() {
			return {
				Filter: {
					sort: 'null',
					fabricType: 'null'
				},
				param: {
					supplyShapes: null,
					supplyStatus: 1,
					supplyTypes: null,
					pageNo: 1,
					pageSize: 25
				},
				pageData: {
					pageNumArr: [],
					maxNum: 1,
					pageNO: 1
				},
				items: []
			};
		},
		components: {
			'vHeader': header,
			'vNav': nav,
			search,
			pagination,
			supplyItem
		},
		created() {
			listCompanySupplys(this.param).then((res) => {
				this.items = res.data.data.list;
				this.pageData.maxNum = res.data.data.totalPage;
				this.pageData.pageNO = res.data.data.pageNO;
			}).catch();
		},
		methods: {
			listCompanySupplysMethod() {
				listCompanySupplys(this.param).then((res) => {
					this.items = res.data.data.list;
					this.pageData.maxNum = res.data.data.totalPage;
					this.pageData.pageNO = res.data.data.pageNO;
				}).catch();
			},
			hanleFilterSort(e) {
				console.log(e);
				if (e === 'null') {
					this.param.supplyTypes = null;
				} else {
					this.param.supplyTypes = parseInt(e);
				}
				this.param.pageNo = 1;
				this.listCompanySupplysMethod();
			},
			hanleFilterFabric(e) {
				console.log(e);
				if (e === 'null') {
					this.param.supplyShapes = null;
				} else {
					this.param.supplyShapes = parseInt(e);
				}
				this.param.pageNo = 1;
				this.listCompanySupplysMethod();
			},
			selectedPageNum1(e) {
				this.param.pageNo = e;
				this.listCompanySupplysMethod();
			},
			// 跳转详情页
			goDetail(e) {
				this.$router.push({
					path: '/supplyDetailPage',
					query: {
						supplyId: this.items[e].id
					}
				});
			}
		}
	};
</script>
<style lang="stylus" scoped>
  .supply-list-page
    background #fff
    .supply-list-page-box
      width 1200px
      margin 0 auto
      padding 16px 0
      background #fff
      .filter-container
        .filter-list
          display flex
          width 100%
          height 40px
          line-height 40px
          font-size 16px
          border-top 1px solid #d8d8d8
          &:last-child
            border-bottom 1px solid #d8d8d8
          .filter-title
            flex 0 0 200px
            box-sizing border-box
            width 200px
            height 40px
            text-align center
            background #e5e5e5
            color #666
            border-left 1px solid #d8d8d8
          .filter-detail
            flex 1
            box-sizing border-box
            height 40px
            background #fff
            border-right 1px solid #d8d8d8
            .item
              display inline-block
              height 40px
              line-height 40px
              width 80px
              text-align center
              cursor pointer
              &:hover
                color #4c93fd
              &.active
                color #4c93fd
      .supply-list-item-wrapper
        margin-top 32px
        .item-wrapper
          float left
          margin-left 10px
          margin-top 10px
          &:nth-of-type(5n + 1)
            margin-left 0
</style>
