<template>
	<div class="entry-list-item">
		<div class="entry-base-item" :companyId="item.id" title="查看厂家详情" @click="goStore">
			<div class="img-container">
				<div class="img-wrapper">
					<img class="item-image" v-lazy="item.productPics[0]">
				</div>
				<div class="img-wrapper">
					<img class="item-image" v-lazy="item.productPics[1]">
				</div>
			</div>
			<div class="item-desc">
				<div class="company-avatar">
					<img :src="item.companyHeadIcon" v-errorImg width="31" height="31">
				</div>
				<h2 class="desc-title">{{item.companyName}}</h2>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			}
		},
		methods: {
			goStore() {
				this.$router.push({
					name: 'shop',
					params: {
						id: this.item.id
					}
				});
			}
		}
	};
</script>
<style lang="stylus" scoped>
.entry-list-item
  box-sizing border-box
  width 311px
  height 203px
  padding 12px 16px
  background #fff
  border-left 1px solid #eaeaea
  border-bottom 1px solid #eaeaea
  cursor pointer
  &:hover
    position relative
    box-shadow 0 2px 4px 0 rgba(76,147,253,0.30), 0 0 6px 0 rgba(76,147,253,0.30)
    z-index 1
  .entry-base-item
    width 278px
    height 210px
    .img-container
      width 278px
      height 127.5px
      overflow hidden
      .img-wrapper
        width 132px
        height 127.5px
        overflow hidden
        background #f2f2f2
        &:first-child
          float left
        &:last-child
          float right
        .item-image
          width 100%
          position relative
          top 50%
          transform translateY(-50%)
    .item-desc
      display flex
      padding 16px 0
      .company-avatar
        flex 0 0 31px
        width 31px
        height 31px
      .desc-title
        flex 1
        font-weight 200
        height 31px
        line-height 31px
        margin-left 10px
        font-size 20px
        color #333
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
</style>
