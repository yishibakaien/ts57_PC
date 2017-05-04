<template>
	<div class="page-bar fr">
		<a href="javascript:;" @click="selectFirstPage()">首页</a>
		<a href="javascript:;" @click="upPage()">上一页</a>
		<span><em>{{pageNum1}}</em>/{{pageMax1}}</span>
		<a href="javascript:;" @click="downPage()">下一页</a>
		<a href="javascript:;" @click="selectLastPage()">尾页</a>

		<span>每页显示
			<select v-model="number1"  @change="selectNumber()">
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
				options: [
					{ num: 8 },
					{ num: 16 },
					{ num: 32 }
				],
				pageNum1: this.pageNum,
				pageMax1: this.pageMax,
				'number1': this.number
			};
		},
		beforeUpdate() {
			this.pageNum1 = this.pageNum;
			this.pageMax1 = this.pageMax;
			this.number1 = this.number;
		},
		props: ['pageNum', 'pageMax', 'number'],
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
