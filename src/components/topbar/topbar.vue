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
				<!-- 个人中心 -->
				<a @click="handleGotoPerson" class="link">我的店铺</a>
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
					<img src="./leisikong.png" width="80" class="leisikong"> 蕾丝控
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
				//				console.log(this.$store.state.user.userInfo.id);
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
</script>
<style lang="scss" scoped>
.icon-shouji::before {
    color: #4c93fd;
}
</style>
<style lang="stylus" scoped>
  .topbar
    height 33px
    line-height 33px
    box-sizing border-box
    border-bottom 1px solid #eaeaea
    font-size 12px
    color #999
    background #f2f2f2
    .content
      width 1200px
      margin 0 auto
      .left
        height 33px
        float left
        .welcome
          display inline-block
          margin-right 12px
        .link
          display inline-block
          height 13px
          line-height 13px
          padding 0 8px
          &:last-child
            border-left 1px solid #ddd
        .logout
          cursor pointer
          &:hover
            color #3385ff
      .right
        float right
        height 33px
        .leisikong
          vertical-align initial
          margin-left 20px
        .app-qrcode
          display inline-block
          position relative
          margin-left 20px
          cursor pointer
          &:hover .qrcode-content
            display block
          .qrcode-content
            display none
            position absolute
            z-index 10
            line-height 1
            padding 0 12px
            right 0
            border 1px solid #eaeaea
            border-top none
            background #fff
            .qrcode
              width 100px
              height 100px
              margin 12px 0
              width 220px
              .img-wrapper
                float left
                width 100px
              .desc
                float left
                margin-left 12px
                height 100px
                .title
                  font-size 15px
                  line-height 30px
                .red
                  font-size 13px
                  color #f53535
                  line-height 30px
                .app-type
                  height 40px
                  .andriod,.ios
                    float left
                    line-height 40px
                  .icon-anzhuo::before
                  	color #38b338
                  	font-size 22px
                  	vertical-align middle
                  .icon-iOS::before
                  	position relative
                  	top 4px
                  	color #666
										font-size 24px
                  	vertical-align middle
                  .andriod
                  	margin-right 10px
</style>
