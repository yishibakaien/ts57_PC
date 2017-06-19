<template>
<div class="introPic-wrapper">
  <img v-lazy="companyPro" width="670" height="250" class="introPic-wrapper-left">
  <div class="introPic-wrapper-right">
    <div class="introPic-company-header">
      <!-- 公司名称 -->
      <div class="introPic-company-header--title">
        <ts-image shape="round" :canView="false" disabledHover width="50" height="50" :src="companyInfo.companyHeadIcon"></ts-image>
        <p class="introPic-company-title">{{companyInfo.companyName}}</p>
        <span class="introPic-storeType" :style="{'background':getIsStore?'#13ce66':'#50BFFF'}">
            {{getIsStore?'贸':'厂'}}
          </span>
      </div>
      <!-- 三个菜单：电话联系，收藏，店铺 -->
      <ul>
        <ts-popover trigger="hover" :options="{placement: 'bottom'}">
          <div class="popper introPic-popper-phone">
            <p class="introPic-popper-phone-user">
              <strong>{{companyInfo.phone}}</strong>
            </p>
            <p class="introPic-popper-phone-tip">老板，拨打电话时，记得说明
              <br> 是坐视布管的客户哦～
            </p>
          </div>
          <li class="introPic-phone introPic-tip" slot="reference">
            <i class="icon-dianhua"></i>电话联系
          </li>
        </ts-popover>
        <li @click="handleCollectStore" v-if="userInfo.companyId!==$route.params.id">
          <i :class="getIsCollect?'icon-yishoucang':'icon-shoucang'"></i> {{getIsCollect?'已收藏店铺':'收藏店铺'}}
        </li>
        <ts-popover trigger="hover" :options="{placement: 'right'}">
          <div class="popper introPic-popper-qrcode">
            <ts-image :canView="false" disabledHover width="150" height="150" :src="Qrcode"></ts-image>
            <p class='introPic-popper-qrcode-tip'>扫描二维码，在手机上访问店铺</p>
          </div>
          <li class="introPic-phone introPic-tip" slot="reference">
            <i class="icon-erweima"></i>店铺二维码
          </li>
        </ts-popover>
      </ul>
    </div>
    <!-- 主营 -->
    <p class="introPic-company is-line3">
      公司主营：{{companyBusiness}}
    </p>
    <!-- 地址 -->
    <p class="introPic-company is-line">
      公司地址：{{companyInfo.address}}
    </p>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import {
  favoriteBus,
  getCompanyQRcode
} from '@/common/api/api';
export default {
  data() {
    return {
      // 二维码
      Qrcode: '',
      companyPro: {
        src: '',
        error: '/static/images/default.jpg',
        loading: ''
      },
      companyBusiness: ''
    };
  },
  async created() {
    this.Qrcode = 'data:image/png;base64,' + (await getCompanyQRcode({
      companyId: this.$route.params.id
    })).data.data;
  },
  methods: {
    // 收藏店铺
    async handleCollectStore() {
      let res = (await favoriteBus({
        businessId: this.$route.params.id,
        businessType: 2
      })).data;
      this.companyInfo.favoriteSatus = res.message.indexOf('收藏') >= 0 ? 1 : 0;
    }
  },
  watch: {
    companyInfo: {
      handler(val) {
        if (val.companyExtendBO) {
          this.companyBusiness = val.companyExtendBO.companyBusiness;
        }

        this.companyPro.src = val.companyBanner;
        if (val.address.indexOf('/.') >= 0) {
          val.address = val.address.split('/.')[0];
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['companyInfo', 'userInfo']),
    // 是否档口
    getIsStore() {
      return this.companyInfo.companyType === 2;
    },
    // 收藏状态 0未收藏 1已收藏
    getIsCollect() {
      return this.companyInfo.favoriteSatus === 1;
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace introPic{
  @component tip{
    position: relative;
    @descendent container{
      position: absolute * 0 0 *;
      background: #fff;
      border: 1px dotted #eaeaea;
    }
  }
  @component company{
    max-width: 500px;
    margin-top: 15px;
    font-size: 14px;
    line-height: 140%;
    padding-left: 17px;
    @utils-ellipsis 2;
    @descendent title{
      font-size: 24px;
      padding-left: 8px;
      font-weight: bold;
      padding-right: 4px;
      display: inline-block;
      max-width: 500px;
      @utils-ellipsis;
    }
    @descendent header{
      padding: 16px;
      border: 1px solid rgba(155,155,155,.1);
      border-right: none;
      background: #fff;
      margin-top: 16px;
      flex:1;
      @modifier title{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
    }
    @descendent content{
      @when line{
        @utils-ellipsis;
      }
      @when line3{
        @utils-ellipsis 2;
      }
    }
  }
  @component popper-phone{
    line-height: 140%;
    padding: 15px;
    @descendent user{
      margin: 10px 0;
      font-size: 23px;
    }
    @descendent tip{
      color: #999;
    }
  }
  @component popper-qrcode{
    line-height: 140%;
    padding: 12px;
    @descendent tip{
      color: red;
      margin: 10px 0;
    }
  }
  @component storeType{
    display: inline-block;
    font-size: x-small;
    text-align: center;
    color: #fff;
    width: 14px;
    height: 14px;
    padding: 1px;
    line-height: 14px;
  }
  @component wrapper{
    backface-visibility: hidden;
    max-width: 1200px;
    margin: 1em auto;
    height: 250px;
    display: flex;
    justify-content: flex-start;
    background-color: #F0F2F4;
    @descendent left{
      min-width: 670px;
      flex: 1;
    }
    @descendent right{
      margin-left: 16px;
      flex:1;
    }
    li{
      display: inline-block;
      cursor: pointer;
      font-size: 14px;
      padding-right: 50px;
      i{
        vertical-align: baseline;
        display: inline-block;
        margin-right: 4px;
      }
      &+li{
          border-left: 1px solid;
          padding-left: 20px;
      }
    }
  }
}
</style>
