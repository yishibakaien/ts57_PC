<template>
	<div class="personal-account">
		<div class="personal-account-item headImg personal-form">
			<label>头像</label>
			<aliUpload :multiple="true" :id="id" v-on:doUpload="uploadImg"></aliUpload>
			<div class="headImgSee">
				<label for="headImg" class="lb">重新上传</label>
				<img :src="userHeadUrl" alt="头像" />
			</div>
		</div>
		<div class="personal-account-item personal-form">
			<label for="fullName">姓名</label>
			<input type="text" name="fullName" id="fullName" placeholder="请填写您的姓名" v-model="param.userName" />
		</div>
		<div class="personal-account-item personal-form">
			<label for="QQ">QQ</label>
			<input type="text" name="QQ" id="QQ" placeholder="请填写您的QQ号码" v-model="param.qq"/>
		</div>
		<div class="personal-account-item personal-form">
			<label for="email">邮箱</label>
			<input type="text" name="email" id="email" placeholder="请填写您的邮箱地址" v-model="param.email"/>
		</div>
		<button class="personal-btn" @click="updateUserMethod">保存</button>
	</div>
</template>

<script>
//  import * as reg from '@/common/js/regExp';
	import { updateUser } from '@/common/api/api';
	import { aliUpload } from '@/components';

	export default {
		data() {
			return {
				userHeadUrl: '',
				param: {
					qq: '',
					email: '',
					userHeadIcon: '',
					userName: ''
				},
				id: 'headImg'
			};
		},
		components: {
			aliUpload
		},
		created() {
			this.userHeadUrl = localStorage.getItem('userHeadIcon');
			this.param.userName = localStorage.getItem('userName');
			this.param.qq = localStorage.getItem('qq');
			this.param.email = localStorage.getItem('email');
		},
		methods: {
			uploadImg(e) {
				this.userHeadUrl = e.base64Url;
				this.param.userHeadIcon = e.ossUrl[0];
			},
			updateUserMethod() {
				let _ = this;
				console.log(_.param);
				updateUser(this.param).then((res) => {
					if (res.data.code === 0) {
						if (_.param.qq) {
							localStorage.setItem('qq', _.param.qq);
						};
						if (_.param.email) {
							localStorage.setItem('email', _.param.email);
						}
						if (_.param.userHeadIcon) {
							localStorage.setItem('userHeadIcon', 'http://zsbgdev.oss-cn-shenzhen.aliyuncs.com/' + _.param.userHeadIcon);
						}
						if (_.param.userName) {
							localStorage.setItem('userName', _.param.userName);
						}
					}
				}).catch();
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
			/*position: absolute;*/
			/*opacity: 0;*/
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
