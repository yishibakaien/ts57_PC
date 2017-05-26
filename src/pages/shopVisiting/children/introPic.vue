<template>
<div class="introPic-bg">
  <div class="introPic-wrapper">
    <div class="introPic-wrapper-left onepx">
      <ts-image :canView="false" disabledHover width="500" height="200" class="factory-company--cover" :src="companySimpleInfo.companyBanner"></ts-image>
    </div>
    <div class="introPic-wrapper-right">
      <div class="introPic-company-header onepx">
        <p class="introPic-company-title">{{companySimpleInfo.companyName}}</p>
        <ul>
          <ts-popover trigger="click" :options="{placement: 'bottom'}">
            <div class="popper introPic-popper-phone">
              <p class="introPic-popper-phone-user">
                <strong>谭华美</strong>
                <span>1332132312</span>
              </p>
              <p class="introPic-popper-phone-tip">老板，拨打电话时，记得说明
                <br> 是坐视不管的客户哦～
              </p>
            </div>
            <li class="introPic-phone introPic-tip" slot="reference">
              <i class="icon-dianhua"></i>电话联系
            </li>
          </ts-popover>
          <li>
            <i class="icon-shoucang"></i>收藏店铺(12)
          </li>
          <ts-popover trigger="click" :options="{placement: 'bottom'}">
            <div class="popper introPic-popper-qrcode">
              <qrcode-vue :value="Qrcode.value" :size="Qrcode.size" level="H"></qrcode-vue>
              <p class='introPic-popper-qrcode-tip'>扫描二维码，在手机上访问店铺</p>
            </div>
            <li class="introPic-phone introPic-tip" slot="reference">
              <i class="icon-erweima"></i>店铺二维码
            </li>
          </ts-popover>
        </ul>
      </div>
      <p class="introPic-company is-line3">
        公司主营：{{companySimpleInfo.companyBusiness}}
      </p>
      <p class="introPic-company is-line">
        公司地址：{{companySimpleInfo.address}}
      </p>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import QrcodeVue from 'qrcode.vue';
export default {
  data() {
    return {
      // 二维码
      Qrcode: {
        value: 'https://www.baidu.com',
        size: 40
      }
    };
  },
  computed: {
    ...mapGetters(['companySimpleInfo'])
  },
  components: {
    QrcodeVue
  }
};
</script>

<style lang="css" scoped>
@component-namespace introPic{
  @component bg{
    width: 100%;
    overflow: hidden;
    position: relative;
    background-repeat: no-repeat;
    margin-bottom: 6px;
  }
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
    font-size: 15px;
    line-height: 140%;
    @descendent title{
      font-size: 24px;
      margin-bottom: 16px;
      font-weight: bold;
    }
    @descendent header{
      padding: 16px;
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
  @component wrapper{
    backface-visibility: hidden;
    max-width: 1200px;
    margin: 1em auto;
    height: 200px;
    display: flex;
    justify-content: flex-start;
    background-color: #fff;
    @descendent left{
      max-width: 500px;
      flex: 1;
    }
    @descendent right{
      margin-left: 16px;
    }
    li{
      display: inline-block;
      cursor: pointer;
      font-size: 18px;
      padding-right: 20px;
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
