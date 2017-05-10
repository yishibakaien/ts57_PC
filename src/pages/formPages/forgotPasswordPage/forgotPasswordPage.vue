<template>
	<div class="forgotPassword">
		<v-header></v-header>
		<div class="fgPwd-box">
			
		</div>
	</div>
</template>

<script>
	import { header } from '@/components';
	export default {
		data() {
			return {

			};
		},
		components: {
			'vHeader': header
		}
	};
</script>

<style lang="stylus" scoped>
.fgPwd-box {
	width: 100%;
	height: 732px;
	background: url(../../../../static/images/beijing.jpg);
}
</style>
