<template>
	<div class="page-bar fr">
		<a href="javascript:;" @click="selectPageNum(1)">首页</a>
		<a href="javascript:;" @click="upPage()">上一页</a>
		<span><em>1</em>/3</span>
		<a href="javascript:;" @click="downPage()">下一页</a>
		<a href="javascript:;" @click="selectPageNum(pageMax)">尾页</a>
		
		<span>每页显示
			<select>
				<option>10</option>
				<option>20</option>
				<option>50</option>
			</select>
			条
		</span>
	</div>
</template>

<script>
	export default {
//		data() {
//			return {
//				pageNum: 1,  // 当前页
//				pageMax: 10  // 总共页码
//			};
//		},
		props: [ 'pageNum', 'pageMax' ],
		methods: {
			selectPageNum(num) {
				let _ = this;
				_.pageNum = num;
				console.log(_.pageNum);
				_.$emit('selectPageNum');
			},
			upPage() {
				let _ = this;
				if (_.pageNum <= 1) {
					return;
				};
				--_.pageNum;
				console.log(_.pageNum);
				_.$emit('upPage');
			},
			downPage() {
				let _ = this;
				if (_.pageNum >= _.pageMax) {
					return;
				};
				++_.pageNum;
				console.log(_.pageNum);
				_.$emit('downPage');
			}
		}
	};
</script>

<style lang="scss" scoped>
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
