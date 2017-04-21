<template>
	<div class="personal-flower">
		<div class="personal-flower-class clearfix">
			<span class="title">分类</span>
			<p>
				<span class="selected">全部 {{'(' +a+ ')' }}</span>
				<span>大边 {{'(' +a+ ')' }}</span>
				<span>小边 {{'(' +a+ ')' }}</span>
				<span>睫毛 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-flower-class clearfix">
			<span class="title">筛选条件</span>
			<p>
				<span class="selected">全部 {{'(' +a+ ')' }}</span>
				<span>有库存 {{'(' +a+ ')' }}</span>
				<span>需要开机 {{'(' +a+ ')' }}</span>
			</p>
		</div>
		<div class="personal-flower-wrap clearfix">
			<div class="personal-flower-item">
				<div class="personal-flower-item-img">
					<img src="../../../static/timg.jpg" alt="求购" />
					<span class="states green">有库存</span>
					<!--<span class="states gray">没库存</span>-->
					<p><span>找相似</span><span>试衣</span></p>
				</div>
				<p class="info">大量求购，有多少要多少大量求购，有多少要多少大量求购，有多少要多少</p>
				<p><span>求购 <i>200</i> 码</span><span class="time">1小时前</span></p>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				a: 1,
				b: 2
			};
		}
	};
</script>

<style lang="scss" scoped="scoped">
	.personal-flower {
		margin-top: 25px;
		padding: 0 15px;
		.personal-flower-class {
			border: 1px solid #d1d1d1;
			.title {
				float: left;
				width: 130px;
				height: 56px;
				background: #f8f8f8;
				font-size: 14px;
				color: #666;
				text-align: center;
				line-height: 56px;
			}
			p {
				float: left;
				height: 56px;
				font-size: 14px;
				color: #333;
				line-height: 56px;
				border-left: 1px solid #d1d1d1;
				span {
					margin-left: 20px;
					padding: 3px 8px;
					cursor: pointer;
				}
				.selected {
					border: 1px solid #4c93FD;
					color: #4C93FD;
				}
			}
		}
		.personal-flower-wrap {
			margin-top: 20px;
			.personal-flower-item {
				float: left;
				margin-bottom: 20px;
				margin-right: 20px;
				width: 204px;
				height: 280px;
				border: 1px solid #d1d1d1;
				cursor: pointer;
				&:hover {
					border: 1px solid #4C93FD;
				}
				.personal-flower-item-img {
					position: relative;
					overflow: hidden;
					&:hover p {
						bottom: 0;
					}
					img {
						width: 204px;
						height: 204px;
					}
					.states {
						position: absolute;
						top: 10px;
						left: 15px;
						width: 56px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						font-size: 12px;
						color: #fff;
					}
					.green {
						background: #4BD663;
					}
					.yellow {
						background: #FF8400;
					}
					.gray {
						background: #999999;
					}
					p {
						position: absolute;
						bottom: -28px;
						width: 100%;
						height: 16px;
						line-height: 16px;
						font-size: 12px;
						color: #fff;
						text-align: center;
						background: #000;
						opacity: 0.4;
						transition: .3s;
					}
				}
				.info {
					font-size: 14px;
					line-height: 24px;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				p {
					padding: 6px 4px;
				}
				span {
					font-size: 12px;
					color: #666;
					i {
						font-style: normal;
						color: #4C93FD;
					}
				}
				.time {
					float: right;
				}
			}
		}
	}
	
	div.personal-flower-class:nth-child(2) {
		border-top: 0;
	}
	
	div.personal-flower-item:nth-child(4n) {
		margin-right: 0 !important;
	}
</style>
