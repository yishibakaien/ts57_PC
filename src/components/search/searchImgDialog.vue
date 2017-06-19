<template lang="html">
	<!-- @close="handleClose"  -->
	<ts-dialog :close-on-press-escape='false' v-model="dialog.show" width="70%" title="请框选图中要识别的区域" @close="handleClose">
		<div class="wrapper">
			<vueCropper ref="cropper" :img="Pic.url" :outputSize="example2.size" :outputType="example2.outputType" :info="example2.info" :canScale="example2.canScale" :autoCrop="example2.autoCrop" :autoCropWidth="example2.width" :autoCropHeight="example2.height"></vueCropper>
		</div>
		<div class="search-editPic--menu">
			<ts-button type="primary" v-for="item in DICT.productType" :key="item.dicValue" @click="handleLookProduct(item.dicValue)">搜{{item.label}}</ts-button>
		</div>
		<div slot='footer'>
		</div>
	</ts-dialog>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import DICT from '@/common/dict';
	// import Cropper from '@/components/cropper/cropper.vue';
	import VueCropper from 'vue-cropper';
	export default {
		data() {
			return {
				example2: {
					img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
					info: false,
					size: 1,
					outputType: 'png',
					canScale: false,
					autoCrop: true
				},
				// ========
				DICT: {
					productType: DICT.SupplyType
				},
				Progress: {
					interval: null
				},
				Pic: {
					destImg: '',
					url: ''
				}
			};
		},
		props: {
			imageUrl: String,
			dialog: {
				type: Object,
				default: function(argument) {
					return {
						show: false
					};
				}
			}
		},
		beforeDestroy() {
			this.$store.commit('SET_PROGRESS', 1);
			this.$store.commit('SET_HANDLE_STATUS', false);
			this.$store.commit('CLEAR_INTERVAL');
			this.$store.commit('SET_SEARCH_EMPTY');
			clearInterval(this.Progress.interval);
		},
		watch: {
			imageUrl(val) {
				this.Pic.url = val.indexOf('?') >= 0 ? val.split('?')[0] : val;
			},
			'search.id' (val) {
				this.$store.commit('SET_PROGRESS', 100);
				this.$store.commit('SET_HANDLE_STATUS', false);
				this.$store.commit('CLEAR_INTERVAL');
				clearInterval(this.Progress.interval);
				this.$emit('change', val);
			}
		},
		methods: {
			handleClose() {
				this.$emit('close');
			},
			handleLookProduct(e) {
				this.$refs.cropper.startCrop();
				this.$refs.cropper.getCropDate((img) => {
					let data = {
						encoded: img,
						category: e
					};
					this.$emit('check', data);
					sessionStorage.setItem('find-pic', JSON.stringify(data));
					// 选择图片区域的对话框关闭
					this.dialog.show = false;
					// 进度条显示
					this.$store.commit('SET_PROGRESS', 1);
					this.$store.commit('SET_HANDLE_STATUS', true);
					if (this.search.handleStatus) {
						this.Progress.interval = setInterval(() => {
							if (this.search.progress > 60) {
								this.$store.commit('SET_PROGRESS', 95);
								clearInterval(this.Progress.interval);
							} else {
								this.$store.commit('SET_PROGRESS', (Math.random() + (this.search.progress++) + (this.search.progress += 0.1)).toFixed(2));
							}
						}, 1000);
					}
				});
			}
			// handleGetImg(destImg) {
			//   this.Pic.destImg = destImg;
			// }
		},
		computed: {
			...mapGetters(['search', 'dicTree'])
		},
		components: {
			// Cropper,
			VueCropper
		}
	};
</script>

<style lang="css" scoped>
	@component-namespace search {
		@component editPic {
			@modifier menu {
				text-align: center;
				clear: both;
				padding-top: 16px;
				button {
					margin: 0 4px;
				}
			}
		}
	}
	
	.wrapper {
		width: 450px;
		height: 450px;
		margin: 0 auto;
	}
</style>
