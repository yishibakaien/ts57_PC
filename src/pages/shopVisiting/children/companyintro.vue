<template lang="html">
<div class="companyIntro-wrapper">
  <!--企业信息  -->
  <ts-section pageTitle="企业信息" class="companyIntro-section">
    <div class="grid-row-fluid">
      <div class="grid-col-3">
        公司名称：
      </div>
      <div class="grid-col-9 companyIntro-companyName">
      {{companyInfo.companyName}}&nbsp;&nbsp;&nbsp;
        <ts-button type="plain" style="border-radius: 4px;" class="companyIntro-companyName--button" @click="handleCollectStore">
          <i :class="getIsCollect?'icon-yishoucang':'icon-shoucang'"></i> &nbsp;
          {{getIsCollect?'已收藏店铺':'收藏店铺'}}
        </ts-button>
      </div>
      <div class="grid-col-3">
        公司简称：
      </div>
      <div class="grid-col-9">
        {{companyInfo.companyAbbreviation}}&nbsp;
      </div>
      <div class="grid-col-3">
        公司简介：
      </div>
      <div class="grid-col-9">
        {{companyInfo.companyProfile}}&nbsp;
      </div>
      <div class="grid-col-3">
        座机号码：
      </div>
      <div class="grid-col-9">
        {{companyInfo.contactTel}}&nbsp;
      </div>
      <div class="grid-col-3">
        传真号码：
      </div>
      <div class="grid-col-9">
        {{companyInfo.fax}}&nbsp;
      </div>
    </div>
    <div class="companyIntro-manage grid-row-table">
      <div class="grid-row-table-row">
          <div class="grid-col-tab-1 is-title">
            注册资本
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.registeredMoney | filterDict(DICT.RegisteredMoney)}}
          </div>
          <div class="grid-col-tab-1 is-title">
            地区
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.area}}
          </div>
          <div class="grid-col-tab-1 is-title">
            成立时间
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.companyCreateDate | filterDate('date')}}
          </div>
      </div>
      <div class="grid-row-table-row">
          <div class="grid-col-tab-1 is-title">
            企业类型
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.canpanyType | filterDict(DICT.CompanyType)}}
          </div>
          <div class="grid-col-tab-1 is-title">
            经营模式
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.businessModel}}
          </div>
          <div class="grid-col-tab-1 is-title">
            员工数量
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.nop | filterDict(DICT.Nop) }}
          </div>
      </div>
    </div>
    <!-- <div class="grid-row-table">
      <div class="grid-col-tab-1 is-title">
        经营地址
      </div>
      <div class="grid-col-tab-11 is-content">
        {{companyInfo.address}}
      </div>
    </div> -->
  </ts-section>
  <!-- 经营信息 -->
  <ts-section pageTitle="经营信息" class="companyIntro-section">
    <div class="grid-row-table companyIntro-manage">
      <div class="grid-row-table-row">
          <div class="grid-col-tab-1 is-title">
            主要客户
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.mainClient}}
          </div>
          <div class="grid-col-tab-1 is-title">
            年营业额
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.turnover | filterDict(DICT.Turnover)}}
          </div>
          <div class="grid-col-tab-1 is-title">
            主营产品
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.mainProduct}}
          </div>
      </div>
      <div class="grid-row-table-row">
          <div class="grid-col-tab-1 is-title">
            主要市场
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.mainMarket}}
          </div>
          <div class="grid-col-tab-1 is-title">
            厂房面积
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.plant}}
          </div>
          <div class="grid-col-tab-1 is-title">
            设备数量
          </div>
          <div class="grid-col-tab-3 is-content">
            {{companyExtendBO.machineNum | filterDict(DICT.MachineNum)}}
          </div>
      </div>

    </div>
  </ts-section>
  <!-- 企业风采 -->
  <ts-section pageTitle="企业风采" class="companyIntro-section">
      <div class="grid-row-fluid">
      <div class="grid-col-3" v-for="i in companyInfo.presence">
        <ts-image width="160" height="160" :src="i.picUrl"></ts-image>
      </div>
    </div>
      <div v-if="!companyInfo.presence||!companyInfo.presence.length">
        暂无企业风采照片
      </div>
  </ts-section>
  <!-- 地址信息 -->
  <ts-section pageTitle="地址信息" class="companyIntro-section">
    <div class="grid-row-fluid">
      <div class="grid-col-3">
        城市：
      </div>
      <div class="grid-col-9">
        {{companyInfo.province | filterArea(Area.province)}} - {{companyInfo.city | filterArea(Area.city)}}&nbsp;
      </div>
      <!-- <div class="grid-col-3">
        详细地址：
      </div>
      <div class="grid-col-9">
        {{companyInfo.address}}&nbsp;
      </div> -->
      <div class="grid-col-3">
        地图坐标：
      </div>
      <div class="grid-col-9">
        <div class="companyIntro-map">
          <el-amap :vid="'company-map'" :center="map.mapCenter" :zoom="map.zoom">
            <el-amap-marker v-for="marker in [map.mapCenter]" :key="marker" :position="marker"></el-amap-marker>
          </el-amap>
        </div>
      </div>
    </div>
  </ts-section>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import DICT from '@/common/dict';
import {
  getAreabyLevel,
  getAreabyParent,
  favoriteBus
} from '@/common/api/api';
import {
  AMapManager
} from 'vue-amap';
let amapManager = new AMapManager();
export default {
  data() {
    return {
      Area: {
        province: [],
        city: []
      },
      DICT: {
        Nop: DICT.Nop,
        MachineNum: DICT.MachineNum,
        RegisteredMoney: DICT.RegisteredMoney,
        Turnover: DICT.Turnover,
        CompanyType: DICT.CompanyType
      },
      companyExtendBO: {},
      map: {
        mapCenter: [113.275, 23.11],
        zoom: 15,
        markers: [],
        amapManager: amapManager,
        events: {
          init(o) {}
        }
      }
    };
  },
  filters: {
    filterArea(val, $arr) {
      try {
        if (!val && val.length === 0) {
          return val;
        }
        let filter = $arr.filter(item => item.areaCode === val);
        return filter[0]['areaName'];
      } catch (e) {}
    }
  },
  created() {
    this.index();
  },
  watch: {
    // companyExtendBO的数据要深拷贝获取
    companyInfo: {
      handler(val) {
        this.index();
        this.map.mapCenter = ((val.lng + val.lat).length === 0) ? this.map.mapCenter : [Number(val.lng), Number(val.lat)];
        this.map.markers.push(this.map.mapCenter);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['companyInfo']),
    // 收藏状态 0未收藏 1已收藏
    getIsCollect() {
      return this.companyInfo.favoriteSatus === 1;
    }
  },
  methods: {
    // 进来加载数据
    async index() {
      if (this.companyInfo.province) {
        this.Area.province = (await getAreabyLevel(0)).data.data;
      }
      if (this.companyInfo.city) {
        this.Area.city = (await getAreabyParent({
          areaCode: this.companyInfo.province
        })).data.data;
      }
      if (this.companyInfo.companyExtendBO) {
        this.companyExtendBO = JSON.parse(JSON.stringify(this.companyInfo.companyExtendBO));
      }
    },
    // 收藏店铺
    async handleCollectStore() {
      let res = (await favoriteBus({
        businessId: this.$route.params.id,
        businessType: 2
      })).data;
      this.companyInfo.favoriteSatus = res.message.indexOf('收藏') >= 0 ? 1 : 0;
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace grid{
  @component row-fluid{
    @neat-outer-container;
  }
  @component row-table{
    @neat-fill-parent;
    @neat-row table;
  }
  @component row-table-row{
    display: table-row;
  }
  @component col-3{
    @neat-span-columns 3;
    @neat-omega;
  }
  @component col-9{
    @neat-span-columns 8;
    @neat-omega;
  }
  @component col-tab-1{
    @neat-span-columns 1 12 table;
  }
  @component col-tab-11{
    @neat-span-columns 11 12 table;
  }
  @component col-tab-3{
    @neat-span-columns 3 12 table;
  }
}
@component-namespace companyIntro{
  @component wrapper{
    .grid-col-3{
      color:#666;
      text-align: right;
      margin-bottom: 8px;
    }
    .grid-col-9{
      padding-left: 10px;
      margin-bottom: 20px;
    }
  }
  div[class*='col-tab'],.grid-col-12{
    text-align: center;
   &.is-title{
      background: #b0b0b0;
      color: #fff;
      padding: 10px;
      border: 1px solid #fff;
    }
    &.is-content{
      background: #eaeaea;
      border: 1px solid #fff;
    }
  }
  @component companyName{
    position: relative;
    @modifier button{
      position: absolute -5px * * *;
    }
  }
  @component section{
    clear: both;
    margin-bottom: 20px;
  }
  @component map{
    width: 400px;
    height: 300px;
    display: inline-block;
  }
}
</style>
