<template>
	<div>
		<div class="overlay"></div>
		<div class="flashModel animated zoomIn">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {};
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
		margin-top: -160px;
		margin-left: -230px;
		width: 460px;
		min-height: 320px;
		background: #fff;
		z-index: 9999;
		color: #333;
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
