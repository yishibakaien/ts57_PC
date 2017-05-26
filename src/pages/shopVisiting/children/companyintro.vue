<template lang="html">
<div class="companyIntro-wrapper">
  <ts-section pageTitle="企业信息" class="companyIntro-section">
    <div class="grid-row-fluid">
      <div class="grid-col-3">
        公司名称：
      </div>
      <div class="grid-col-9">
        {{companySimpleInfo.companyName}}
      </div>
      <div class="grid-col-3">
        公司简称：
      </div>
      <div class="grid-col-9">
        {{companySimpleInfo.companyAbbreviation}}
      </div>
      <div class="grid-col-3">
        公司简介：
      </div>
      <div class="grid-col-9">
        {{companySimpleInfo.companyProfile}}
      </div>
      <div class="grid-col-3">
        座机号码：
      </div>
      <div class="grid-col-9">
        {{companySimpleInfo.contactTel}}
      </div>
      <div class="grid-col-3">
        传真号码：
      </div>
      <div class="grid-col-9">
        {{companySimpleInfo.fax}}
      </div>
    </div>
  </ts-section>
  <pre>{{companySimpleInfo.presence}}</pre>
  <ts-section pageTitle="企业风采" class="companyIntro-section">
      <div class="grid-col-3" v-for="i in companySimpleInfo.presence">
        <ts-image width="170" height="170" :src="i"></ts-image>
      </div>
      <div v-if="!companySimpleInfo.presence||!companySimpleInfo.presence.length">
        暂无企业风采照片
      </div>
  </ts-section>
  <ts-section pageTitle="地址信息" class="companyIntro-section">
    <div class="grid-row-fluid">
      <div class="grid-col-3">
        城市：
      </div>
      <div class="grid-col-9">
        {{companySimpleInfo.province}} - {{companySimpleInfo.city}}
      </div>
      <div class="grid-col-3">
        详细地址：
      </div>
      <div class="grid-col-9">
        {{companySimpleInfo.address}}
      </div>
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
import {
  getAreabyLevel,
  getAreabyParent
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
  async created() {
    this.Area.province = (await getAreabyLevel(0)).data.data;
  },
  watch: {
    // companyExtendBO的数据要深拷贝获取
    companySimpleInfo: {
      async handler(val) {
        this.Area.city = (await getAreabyParent({
          areaCode: val.city
        })).data.data;
          this.map.mapCenter = ((val.lng + val.lat).length === 0) ? this.map.mapCenter : [Number(val.lng), Number(val.lat)];
        this.map.markers.push(this.map.mapCenter);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['companySimpleInfo', 'CompanyInfoByUserId'])
  }
};
</script>

<style lang="css" scoped>
@component-namespace grid{
  @component row-fluid{
    @neat-outer-container;
  }
  @component col-3{
    @neat-span-columns 3;
  }
  @component col-9{
    @neat-span-columns 8;
    @neat-omega;
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
