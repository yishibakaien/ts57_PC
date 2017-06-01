<template>
	<div v-if="obj.isShow">
		<div class="overlay"></div>
		<div>
			<div class="flashModel animated zoomIn">
				<h4>提示<i @click="close" class="icon-guanbi2 fr"></i></h4>
				<p><i class="icon-xuanze"></i> {{obj.content}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			obj: {
				type: Object
			}
		},
		methods: {
			close() {
				this.obj.isShow = false;
				this.$emit('close');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
		z-index: 999;
	}
	
	.flashModel {
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -190px;
		margin-left: -190px;
		width: 380px;
		min-height: 166px;
		background: #fff;
		z-index: 9999;
		color: #333;
	}
	
	.flashModel h4 {
		padding: 0 15px;
		color: #666;
		font-size: 14px;
		line-height: 36px;
		i {
			padding-top: 12px;
			cursor: pointer;
		}
	}
	
	.flashModel h4::after {
		content: '';
		display: block;
		margin: 0 auto;
		width: 350px;
		height: 1px;
		background: #d1d1d1;
	}
	
	.flashModel p {
		font-size: 14px;
		color: #333;
		text-align: center;
		line-height: 130px;
		i {
			vertical-align: middle;
			font-size: 18px;
			color: #4BD663;
		}
	}
	
	.animated {
		-webkit-animation-duration: 0.5s;
		animation-duration: 0.5s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	
	@-webkit-keyframes zoomIn {
		0% {
			-webkit-transform: scale3d(0.3, 0.3, 0.3);
			transform: scale3d(0.3, 0.3, 0.3);
		}
		50% {}
	}
	
	@keyframes zoomIn {
		0% {
			-webkit-transform: scale3d(0.3, 0.3, 0.3);
			-ms-transform: scale3d(0.3, 0.3, 0.3);
			transform: scale3d(0.3, 0.3, 0.3);
		}
		50% {}
	}
	
	.zoomIn {
		-webkit-animation-name: zoomIn;
		animation-name: zoomIn;
	}
</style>
