<template>
<div class="supply-list">
  <div class="title title2" v-if="userType">
    <p class="buyNum">我的所有供应：<em>{{obj.totalNum}}个</em></p>
  </div>
  <div class="title title1" v-else>
    <img :src="item.userHeadIcon" v-errorImg class="fl" alt="用户头像" />
    <p class="name">{{item.userName}}</p>
    <p class="buyNum">Ta的总供应数：<em>{{obj.totalNum}}个</em> <span class="entryShop" @click="goStore">进店逛逛</span></p>
  </div>
  <div class="content">
    <div class="listImg" v-for="(e, index) in obj.list" @click="goDetail(index)">
      <img v-lazy="e.productPicUrl" alt="花型展示图片" />
      <div :class="{'forbideen': e.supplyStatus !== 1}" class="listImgBg" v-if="e.supplyStatus !== 1">
        {{e.supplyStatus |supplyStatus}}
      </div>
    </div>
    <pageBar :showOpt="true" :pageNum="pageNum" :pageMax="pageMax" @upPage="upPage" @downPage="downPage" @selectFirstPage="selectFirstPage" @selectLastPage="selectLastPage" style="margin-right: 20px;"></pageBar>
  </div>
</div>
</template>

<script>
import {
  pageBar
} from '@/components';
import {
  listUserCompanySupplys
} from '@/common/api/api';
export default {
  data() {
    return {
      userType: false,
      pageNum: 1,
      pageMax: 10,
      paramListSupply: {
        pageNo: 1,
        pageSize: 8,
        userId: ''
      },
      obj: {}
    };
  },
  props: {
    item: {
      type: Object
    }
  },
  watch: {
    item(val) {
      // 1工厂 2档口
      if (this.$store.state.user.userInfo.userType === 1) {
        this.userType = true;
      }
      if (this.$store.state.user.userInfo.userType === 2) {
        this.userType = false;
      }
      // 获取用户供应列表
      this.paramListSupply.userId = this.item.userId;
      listUserCompanySupplys(this.paramListSupply).then((res) => {
        if (res.data.code === 0) {
          this.obj = res.data.data;
          this.pageNum = res.data.data.pageNO;
          this.pageMax = res.data.data.totalPage;
        }
      }).catch();
    }
  },
  components: {
    pageBar
  },
  created() {},
  methods: {
    listUserCompanySupplysMethod() {
      this.paramListSupply.userId = this.item.userId;
      listUserCompanySupplys(this.paramListSupply).then((res) => {
        if (res.data.code === 0) {
          this.obj = res.data.data;
          this.pageNum = res.data.data.pageNO;
          this.pageMax = res.data.data.totalPage;
        }
      }).catch();
    },
    // 首页
    selectFirstPage() {
      let _ = this;
      _.paramListSupply.pageNo = 1;
      this.listUserCompanySupplysMethod();
    },
    // 尾页
    selectLastPage() {
      let _ = this;
      _.paramListSupply.pageNo = _.pageMax;
      this.listUserCompanySupplysMethod();
    },
    // 上一页
    upPage() {
      let _ = this;
      if (_.pageNum <= 1) {
        return;
      };
      --_.pageNum;
      _.paramListSupply.pageNo = _.pageNum;
      this.listUserCompanySupplysMethod();
    },
    // 下一页
    downPage() {
      let _ = this;
      if (_.pageNum >= _.pageMax) {
        return;
      };
      ++_.pageNum;
      _.paramListSupply.pageNo = _.pageNum;
      this.listUserCompanySupplysMethod();
    },
    // 跳转详情页
    goDetail(e) {
      window.open('#/supplyDetailPage?supplyId=' + this.obj.list[e].id);
    },
    // 访问店铺
    goStore() {
      this.$router.push({
        path: `/shop/${this.item.companyId}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.supply-list {
    box-sizing: border-box;
    width: 360px;
    /*height: 870px;*/
    border: 1px solid #e5e5e5;
    .title {
        background: #F8F8F8;
        border-bottom: 1px solid #e5e5e5;
        .buyNum {
            color: #999;
            font-size: 14px;
            em {
                color: #4c93fd;
            }
        }
    }
    .title1 {
        height: 110px;
        img {
            margin: 15px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        .name {
            padding-top: 25px;
            color: #333;
            line-height: 24px;
            font-size: 16px;
        }
        .mobile {
            color: #333;
            font-size: 14px;
            line-height: 22px;
        }
        .buyNum {
            line-height: 22px;
        }
        .entryShop {
            position: relative;
            left: 20px;
            padding: 3px 7px;
            color: #fff;
            font-size: 12px;
            background: #4C93FD;
            cursor: pointer;
        }
    }
    .title2 {
        height: 50px;
        padding-left: 25px;
        line-height: 50px;
    }
    .content {
        padding-bottom: 80px;
        .listImg {
            position: relative;
            margin: 15px 0 0 15px;
            width: 156px;
            height: 156px;
            display: inline-block;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .forbideen {
            cursor: not-allowed;
        }
        .listImgBg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            color: #FFF;
            font-size: 16px;
            line-height: 150px;
            text-align: center;
            background: rgba(0,0,0,.4);
        }
    }
}
</style>
