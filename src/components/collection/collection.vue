<template>
	<div class="collection" @click="clickMethod">
		<i class="icon-已收藏"></i>
		<span>收藏</span>
	</div>
</template>

<script>
	export default {
		methods: {
			clickMethod() {
				this.$emit('clickMethod');
			}
		}
	};
</script>

<style lang="scss" scoped>
.collection {
	cursor: pointer;
	i::before {
		color: #FF8400 !important;
		font-size: 16px;
		line-height: 18px;
	}
	span {
		position: relative;
		top: -2px;
		font-size: 14px;
		color: #666;
	}
}
</style>
