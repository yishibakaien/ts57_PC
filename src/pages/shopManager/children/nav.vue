<template lang="html">
	<div class="shopManager-nav">
		<p class="shopManager-nav-title">
			店铺管理
			<i class="iconfont" @click="gotoStore"></i>
		</p>
		<ul>
			<router-link :to="item.path" tag="li" exact active-class="active" v-for="item in navItem" class="shopManager-nav-menu" :key="item.path" v-if="item.show">{{item.name}}</router-link>
		</ul>
	</div>
</template>

<script>
import nav from '../nav';
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      navItem: nav
    };
  },
  created() {
    // 根据userInfo判断
    // 如果用户类型为2（档口）=> 厂家供应隐藏
    this.navItem.forEach(item => {
      item.show = true;
      if (this.userInfo.userType === 2 && item.path === 'supply') {
        item.show = false;
      }
      if (!this.userInfo.hasWebsite && item.path === 'mircoSetting') {
        item.show = false;
      }
    });
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    gotoStore() {
      this.goto(`/shop/${this.userInfo.companyId}`);
    }
  }
};
</script>

<style lang="css" scoped>
	@import '../../../common/css/_var.css';
	@component-namespace shopManager {
		@component nav {
			/*店铺标题*/
			@descendent title {
				position: relative;
				font-size: 24px;
				margin: 50px 0 24px 0;
				text-align: center;
			}
			/*导航条*/
			@descendent menu {
				line-height: 40px;
				transition: 0.3s;
				cursor: pointer;
				padding-left: 85px;
				&:hover {
					color: var(--navHoverColor) var(--navHoverBg)
				}
			}
		}
	}

	.active {
		color: var(--navHoverColor) var(--navHoverBg)
	}

</style>
<style lang="scss" scoped>
.iconfont {
    position: absolute;
    top: 7px;
    margin-left: 6px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../store-2.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
}
.iconfont:hover {
    width: 22px;
    height: 22px;
    background: url("../store-1.png") no-repeat;
    background-size: 100% 100%;
}
</style>
