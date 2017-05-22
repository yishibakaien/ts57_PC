<template>
	<div class="prompt-down">
		<v-header>
			<div class="" v-if="isLogin">
			</div>
			<div class="" v-else>
			</div>
			<search></search>
		</v-header>
		<div class="container">
			
		</div>
	</div>
</template>

<script>
	import {
		header,
		search
	} from '@/components';
	export default {
		data() {
			return {
				isLogin: true
			};
		},
		components: {
			'vHeader': header,
			search
		},
		created() {
			if (this.$store.state.accessToken) {
				this.isLogin = true;
			}
		}
	};
</script>

<style>
	.container {
		width: 100%;
		height: 730px;
		background: url(../../../static/images/prompt.png) no-repeat;
	}
</style>
