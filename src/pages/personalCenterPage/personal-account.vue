<template>
	<div class="personal-account">
		<div class="personal-account-item headImg personal-form">
			<label>头像</label>
			<aliUpload :multiple="false" :id="id" v-on:doUpload="uploadImg"></aliUpload>
			<div class="headImgSee">
				<label for="headImg" class="lb">重新上传</label>
				<img :src="userHeadUrl" alt="头像" />
			</div>
		</div>
		<div class="personal-account-item personal-form">
			<label for="fullName">姓名</label>
			<input type="text" name="fullName" id="fullName" placeholder="请填写您的姓名" v-model="param.userName" v-on:blur="checkName()"/>
			<p v-show="!check.p1">请输入2-8位长度的名称</p>
		</div>
		<div class="personal-account-item personal-form">
			<label for="QQ">QQ</label>
			<input type="text" name="QQ" id="QQ" placeholder="请填写您的QQ号码" v-model="param.qq" v-on:blur="checkQQ()"/>
			<p v-show="!check.p2">您输入的QQ格式错误</p>
		</div>
		<div class="personal-account-item personal-form">
			<label for="email">邮箱</label>
			<input type="text" name="email" id="email" placeholder="请填写您的邮箱地址" v-model="param.email" v-on:blur="checkEmail()"/>
			<p v-show="!check.p3">您输入的Email格式错误</p>
		</div>
		<button class="personal-btn" @click="updateUserMethod">保存</button>
	</div>
</template>

<script>
	import { updateUser } from '@/common/api/api';
	import { aliUpload } from '@/components';
	import * as reg from '@/common/js/regExp';
	import store from '@/store/store';
	import * as types from '@/store/types';

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
				check: {
					p1: true,
					p2: true,
					p3: true
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
				if (!(_.check.p1 && _.check.p2 && _.check.p3)) {
					store.commit(types.MODEL_SHOW, true);
					store.commit(types.MODEL_OPTION, {type: 2, title: '提示', content: '您的输入有误，请检查'});
					return;
				}
				updateUser(this.param).then((res) => {
					if (res.data.code === 0) {
						store.commit(types.MODEL_SHOW, true);
						store.commit(types.MODEL_OPTION, {type: 1, title: '提示', content: '您的信息更新成功'});
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
			},
			checkName() {
				if (this.param.userName.length < 2 || this.param.userName.length > 8) {
					this.check.p1 = false;
				} else {
					this.check.p1 = true;
				}
			},
			checkQQ() {
				if (!reg.testQQ(this.param.qq)) {
					this.check.p2 = false;
				} else {
					this.check.p2 = true;
				}
			},
			checkEmail() {
				if (!reg.testQQ(this.param.email)) {
					this.check.p3 = false;
				} else {
					this.check.p3 = true;
				}
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
		position: relative;
		margin-bottom: 25px;
		p {
			position: absolute;
			left: 105px;
			bottom: -18px;
			font-size: 14px;
			color: #FF0000;
		}
	}
	
	.headImg {
		height: 110px;
		label {
			line-height: 110px;
			vertical-align: top;
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
