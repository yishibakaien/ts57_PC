<template>
	<div class="personal-message">
		<div class="personal-message-info">
			<p>系统在以下几种情况会发送业务短信给您：</p>
			<p>1、<span>花价查询</span>：有买家对您店铺的某款花型发起询价时回发送短信；</p>
			<p>2、<span>花型索样</span>：有买家对您店铺的某款花型发起寄样请求时会发送短信；</p>
			<p>3、<span>求购接单</span>：有厂家对您发布的求购接单时会发送短信；</p>
			<p>4、<span>搜花查看花型</span>：有买家快照找花查看您店铺的某款花型时会发送短信；</p>
			<p>您可以对应设置是否接受以上几类短信</p>
		</div>
		<div class="personal-message-conten">
			<p v-for="(item,index) of messageItems"><span>{{item.title}}</span><i @click="messageOnOff(index)"><img src="./yunxu.png" v-show="item.onOff" /><img src="./jujue.png" v-show="!item.onOff"/></i></p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				messageItems: [{
						title: '花型询价短信',
						onOff: true
					},
					{
						title: '花型索样短信',
						onOff: false
					},
					{
						title: '求购接单短信',
						onOff: true
					},
					{
						title: '搜花查看花型短信',
						onOff: true
					}
				]
			};
		},
		methods: {
			messageOnOff(index) {
				let _ = this;
				_.messageItems[index].onOff = !_.messageItems[index].onOff;
			}
		}
	};
</script>

<style lang="scss" scoped="scoped">
	.personal-message-info {
		margin: 0 auto; 
		padding-top: 20px;
		width: 884px;
		background: #FFF7E3;
		border: 1px solid #d1d1d1;
		border-top: 0;
		p {
			padding-left: 120px;
			font-size: 14px;
			color: #666;
			line-height: 28px;
			span {
				color: #FF494F;
			}
			&:last-of-type {
				padding-bottom: 20px;
			}
		}
	}
	
	.personal-message-conten {
		margin-top: 50px;
		p {
			margin-top: 20px;
			span {
				display: inline-block;
				margin-left: 120px;
				width: 180px;
				font-size: 16px;
				line-height: 19px;
				color: #333;
			}
			i {
				cursor: pointer;
			}
			img {
				width: 56px;
				height: 20px;
			}
		}
	}
</style>
