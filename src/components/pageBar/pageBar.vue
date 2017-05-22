<template>
	<div class="page-bar fr">
		<a @click="selectFirstPage">首页</a>
		<a @click="upPage">上一页</a>
		<span><em>{{pageNum1}}</em>/{{pageMax1}}</span>
		<a @click="downPage">下一页</a>
		<a @click="selectLastPage">尾页</a>

		<span v-if="!showOpt1">每页显示
			<select v-model="number1"  @change="selectNumber">
				<option v-for="(option, index) in options" :value="option.num">{{option.num}}</option>
			</select>
			条
	</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
						num: 8
					},
					{
						num: 16
					},
					{
						num: 32
					}
				],
				showOpt1: this.showOpt,
				pageNum1: this.pageNum,
				pageMax1: this.pageMax,
				'number1': this.number
			};
		},
		watch: {
			pageNum(val) {
				this.pageNum1 = val;
			},
			pageMax(val) {
				this.pageMax1 = val;
			},
			number(val) {
				this.number1 = val;
			},
			showOpt(val) {
				this.showOpt1 = val;
			}
		},
		props: ['pageNum', 'pageMax', 'number', 'showOpt'],
		methods: {
			selectFirstPage() {
				let _ = this;
				_.pageNum1 = 1;
				_.$emit('selectFirstPage');
			},
			selectLastPage() {
				let _ = this;
				_.pageNum1 = _.pageMax1;
				_.$emit('selectLastPage');
			},
			upPage() {
				let _ = this;
				if (_.pageNum1 <= 1) {
					return;
				};
				--_.pageNum1;
				_.$emit('upPage');
			},
			downPage() {
				let _ = this;
				if (_.pageNum1 >= _.pageMax1) {
					return;
				};
				++_.pageNum1;
				_.$emit('downPage');
			},
			selectNumber() {
				let _ = this;
				_.$emit('selectNumber', _.number1);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page-bar {
		margin: 35px 0;
	}
	
	a,
	span {
		display: inline-block;
		margin-right: 20px;
		font-size: 14px;
		color: #666;
	}
	
	span:last-child {
		margin-right: 8PX;
	}
	
	a:hover {
		text-decoration: underline;
	}
	
	em {
		color: #4C93FD;
	}
</style>
