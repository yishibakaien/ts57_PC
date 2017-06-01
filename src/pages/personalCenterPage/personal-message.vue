<template>
	<div class="personal-message">
		<div class="personal-message-info personal-info">
			<p>系统在以下几种情况会发送业务短信给您：</p>
			<p>1、<span>花价查询</span>：有买家对您店铺的某款花型发起询价时回发送短信；</p>
			<p>2、<span>花型索样</span>：有买家对您店铺的某款花型发起寄样请求时会发送短信；</p>
			<p>3、<span>求购接单</span>：有厂家对您发布的求购接单时会发送短信；</p>
			<p>4、<span>搜花查看花型</span>：有买家快照找花查看您店铺的某款花型时会发送短信；</p>
			<p>您可以对应设置是否接受以上几类短信</p>
		</div>
		<div class="personal-message-conten">
			<p>
				<span>花型询价短信</span>
				<i @click="messageOnOff(1)">
					<img src="./yunxu.png" v-show="param.isReceiveMsg" />
					<img src="./jujue.png" v-show="!param.isReceiveMsg"/>
				</i>
			</p>
			<p>
				<span>花型索样短信</span>
				<i @click="messageOnOff(2)">
					<img src="./yunxu.png" v-show="param.isSyMsg" />
					<img src="./jujue.png" v-show="!param.isSyMsg""/>
				</i>
			</p>
			<p v-if="isShow">
				<span>求购接单短信</span>
				<i @click="messageOnOff(3)">
					<img src="./yunxu.png" v-show="param.isBuyMsg" />
					<img src="./jujue.png" v-show="!param.isBuyMsg"/>
				</i>
			</p>
			<p>
				<span>搜花查看花型短信</span>
				<i @click="messageOnOff(4)">
					<img src="./yunxu.png" v-show="param.isLookMsg" />
					<img src="./jujue.png" v-show="!param.isLookMsg"/>
				</i>
			</p>
		</div>
	</div>
</template>

<script>
	import { getMsgSetting, setMsg } from '@/common/api/api';
	import Toast from '@/components/common/toast/toast';
	export default {
		data() {
			return {
				param: {
					isBuyMsg: '',
					isLookMsg: '',
					isReceiveMsg: '',
					isSyMsg: ''
				},
				isShow: false
			};
		},
		created() {
			this.getMsgSettingMethod();
			if (localStorage.userType === 0) {
				this.isShow = true;
			}
		},
		methods: {
			messageOnOff(index) {
				let _ = this;
				if (index === 1) {
					_.param.isReceiveMsg = !_.param.isReceiveMsg;
				} else if (index === 2) {
					_.param.isSyMsg = !_.param.isSyMsg;
				} else if (index === 3) {
					_.param.isBuyMsg = !_.param.isBuyMsg;
				} else if (index === 4) {
					_.param.isLookMsg = !_.param.isLookMsg;
				}
				_.setMsgMethod();
			},
			getMsgSettingMethod() {
				let _ = this;
				getMsgSetting().then((res) => {
					if (res.data.code === 0) {
						_.param.isBuyMsg = res.data.data.isBuyMsg;
						_.param.isLookMsg = res.data.data.isLookMsg;
						_.param.isReceiveMsg = res.data.data.isReceiveMsg;
						_.param.isSyMsg = res.data.data.isSyMsg;
					}
				}).catch();
			},
			setMsgMethod() {
				let _ = this;
				setMsg(_.param).then((res) => {
					if (res.data.code === 0) {
						Toast({
							type: 'success',
							message: '设置成功'
						});
					}
				}).catch();
			}
		}
	};
</script>

<style lang="scss" scoped="scoped">
	.personal-message-info {
		span {
			color: #FF494F;
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
