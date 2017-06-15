<template>
	<div class="topbar">
		<div class="content">
			<div class="left">
				<span class="welcome">坐视布管欢迎你!</span>
				<span v-if="isLogin">
        <router-link  to="/loginPage" class="link">登录</router-link>
        <router-link to="/registerPage" class="link">免费注册</router-link>
      </span>
				<span v-else>
      <span class="username">{{userInfo.userName}}</span>
				<span class="logout" @click="handleLogout">[退出]</span>
				</span>
			</div>
			<div class="right">
				<a @click="handleGotoPerson" class="link">我的网店</a>
				<div class="app-qrcode">
					<!-- 坐视不管 -->
					<i class="iconfont icon-shouji"></i>
					<span>坐视布管</span>
					<div class="qrcode-content">
						<div class="qrcode clearfix">
							<div class="img-wrapper">
								<qrcode-vue :value="getAppLink" size="50" level="M"></qrcode-vue>
							</div>
							<div class="desc">
								<p class="title">坐视布管APP</p>
								<p class="red">扫码即可下载</p>
								<div class="app-type clearfix">
									<div class="andriod">
										<i class="iconfont icon-anzhuo"></i>
									</div>
									<div class="ios">
										<i class="iconfont icon-iOS" style="font-size:17px"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="app-qrcode">
					<i class="iconfont icon-weixin"></i>
					<span>公众号</span>
					<div class="qrcode-content">
						<div class="qrcode clearfix">
							<div class="img-wrapper">
								<qrcode-vue :value="getWebLink" size="50" level="H"></qrcode-vue>
							</div>
							<div class="desc">
								<p class="title">关注微信公众号</p>
								<p class="red">扫码即可关注</p>
								<div class="text"></div>
							</div>
						</div>
					</div>
				</div>
				<a href="http://www.57lace.com/" class="link" target="_blank">
					<img src="/static/images/leisikong.png" width="10" class="leisikong">
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		APP_LINK
	} from '@/common/dict/const';
	import {
		loginOut
	} from '@/common/api/api';
	import QrcodeVue from 'qrcode.vue';
	export default {
		computed: {
			...mapGetters(['userInfo', 'token']),
			isLogin() {
				return !this.token;
			},
			getAppLink() {
				return APP_LINK.app;
			},
			getWebLink() {
				return APP_LINK.web;
			}
		},
		components: {
			QrcodeVue
		},
		methods: {
			// 个人中心
			handleGotoPerson() {
				this.$router.push({
					path: !this.isLogin ? `/shop/${this.$store.state.user.userInfo.companyId}` : '/loginPage'
				});
			},
			// 退出
			async handleLogout() {
				await loginOut();
				await this.$store.commit('LOGIN_OUT');
				await this.$store.commit('CLEAR_USERINFO');
				await this.$router.push({
					path: '/homePage'
				});
			}
		}
	};
