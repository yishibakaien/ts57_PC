<template>
	<div class="personal-account">
		<div class="personal-account-item headImg personal-form">
			<label>头像</label>
			<input type="file" name="headImg" id="headImg" @change="uploadImg" />
			<div class="headImgSee">
				<label for="headImg" class="lb">重新上传</label>
				<img :src="param.userHeadIcon" alt="头像" />
			</div>
		</div>
		<div class="personal-account-item personal-form">
			<label for="fullName">姓名</label>
			<input type="text" name="fullName" id="fullName" placeholder="请填写您的姓名" v-model="param.userName" />
		</div>
		<div class="personal-account-item personal-form">
			<label for="QQ">QQ</label>
			<input type="text" name="QQ" id="QQ" placeholder="请填写您的QQ号码" />
		</div>
		<div class="personal-account-item personal-form">
			<label for="email">邮箱</label>
			<input type="text" name="email" id="email" placeholder="请填写您的邮箱地址" />
		</div>
		<button class="personal-btn" @click="updateUserMethod">保存</button>
	</div>
</template>

<script>
//	import * as types from '../../store/types';
	import { updateUser } from '../../common/api/api';
	import uploadPicture from '../../common/js/uploadPicture';

	export default {
		data() {
			return {
				param: {
					userHeadIcon: '',
					userName: '',
					'x-token': ''
				}
			};
		},
		created() {
			console.log(this.$store.state.userInfo);
			this.param['x-token'] = this.$store.state.token;
			this.param['userHeadIcon'] = this.$store.state.userInfo.userHeadIcon;
			this.param['userName'] = this.$store.state.userInfo.userName;
		},
		methods: {
			uploadImg(e) {
				let _ = this;
				uploadPicture(e).then((result) => {
					_.param.userHeadIcon = result;
				});
			},
			updateUserMethod() {
				updateUser(this.param).then((res) => {
					console.log('成功');
				}, (res) => {
					console.log(this.param);
					console.log('失败');
				});
			}
		}
	};
</script>

<style lang="scss" scoped="scoped">
	.personal-account {
		margin-top: 40px;
		padding-left: 120px;
	}
	
	.personal-account-item {
		margin-bottom: 20px;
	}
	
	.headImg {
		height: 110px;
		label {
			line-height: 110px;
			vertical-align: top;
		}
		input {
			position: absolute;
			opacity: 0;
		}
	}
	
	.headImgSee {
		position: relative;
		display: inline-block;
		width: 106px;
		height: 106px;
		border-radius: 3px;
		overflow: hidden;
		cursor: pointer;
		img {
			width: 100%;
			height: 100%;
		}
		&:hover .lb {
			bottom: 0;
		}
		.lb {
			position: absolute;
			bottom: -33px;
			width: 106px;
			height: 33px;
			line-height: 35px;
			background: #333333;
			opacity: 0.8;
			text-align: center;
			color: #FFFFFF;
			font-size: 16px;
			transition: .2s;
		}
	}
</style>
