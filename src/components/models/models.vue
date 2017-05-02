<template>
	<div v-if="isShow">
		<div class="overlay"></div>
		<div v-if="modelOption.type === 1">
			<div class="flashModel animated zoomIn">
				<h4>提示<i @click="close()">x</i></h4>
				<p><span>{{ modelOption.content }}</span></p>
			</div>
		</div>
		<div v-if="modelOption.type === 2">
			<div class="tipModel animated zoomIn">
				<h4>{{modelOption.title}}</h4>
				<p>{{ modelOption.content }}</p>
				<button @click="close()">我知道了</button>
			</div>
		</div>
		<div v-if="modelOption.type === 3">
			<div class="actionModel animated zoomIn">
				<h4>{{modelOption.title}}</h4>
				<p>{{ modelOption.content }}</p>
				<button class="cancel" @click="close()">取消</button>
				<button @click="close()">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	/* 调用弹窗只需更改store里的两个值即可
	 * store.commit(types.MODEL_SHOW, true);  //显示弹窗
	 * store.commit(types.MODEL_OPTION, {type: 2, title: 'aaa', content: res.data.message});  //type控制类型，title控制标题，content为提示信息；
	 * */
	import * as types from '../../store/types';
	export default {
		updated() {
//			if (modelOption.type === 1) {
//				setTimeout(() => {
//					this.$store.commit(types.MODEL_SHOW, false);
//				}, 1500);
//			}
		},
		computed: {
			isShow() {
				return this.$store.state.modelShow;
			},
			modelOption() {
				return this.$store.state.modelOption;
			}
		},
		methods: {
			close() {
				this.$store.commit(types.MODEL_SHOW, false);
			}
		}
	};
</script>

<style scoped>
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
	
	.flashModel,
	.tipModel,
	.actionModel {
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
	
	.flashModel h4,
	.tipModel h4,
	.actionModel h4 {
		padding: 0 15px;
		color: #666;
		font-size: 14px;
		line-height: 36px;
	}
	
	.flashModel h4::after,
	.tipModel h4::after,
	.actionModel h4::after {
		content: '';
		display: block;
		margin: 0 auto;
		width: 350px;
		height: 1px;
		background: #d1d1d1;
	}
	
	.flashModel h4 i {
		float: right;
		font-style: normal;
		font-size: 14px;
		cursor: pointer;
	}
	
	.flashModel p,
	.tipModel p,
	.actionModel p {
		font-size: 14px;
		color: #333;
		text-align: center;
		line-height: 130px;
	}
	
	.tipModel button {
		width: 100%;
		height: 40px;
		font-size: 16px;
		color: #4c93fd;
		border: 0;
		border-top: 1px solid #D1D1D1;
		background: #f8f8f8;
	}
	
	.actionModel button {
		float: left;
		width: 189px;
		height: 40px;
		font-size: 16px;
		color: #4c93fd;
		background: #f8f8f8;
		border-top: 1px solid #D1D1D1;
	}
	
	.cancel {
		position: relative;
	}
	
	.cancel::after {
		position: absolute;
		top: 5px;
		right: 1px;
		content: '';
		display: block;
		height: 30px;
		width: 1px;
		background: #D1D1D1;
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
