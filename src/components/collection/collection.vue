<template>
	<div class="collection" @click="clickMethod">
		<i class="icon-yishoucang" :class="show?'yesCollection':'noCollection'"></i>
		<span>收藏</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			};
		},
		watch: {
			yes(val) {
				this.show = val;
			}
		},
		created() {
			this.show = this.yes;
		},
		props: {
			yes: {
				type: Boolean
			}
		},
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
		font-size: 16px;
		line-height: 18px;
	}
	.yesCollection::before {
		color: #FF8400 !important;
	}
	.noCollection::before {
		color: #666 !important;
	}
	span {
		position: relative;
		top: -2px;
		font-size: 14px;
		color: #666;
	}
}
</style>
