<template lang="html">
  <ts-section pageTitle="地址信息">
    <div slot="menu">
      <ts-button type="primary" @click="handleEditAddress">{{Text.show?'编辑':'保存'}}</ts-button>
    </div>
    <ts-form :model="addressInfoForm" label-width="125px">
      <ts-form-item label="城市：">
        <p v-if="Text.show" class="addressinfo-formItem-text">{{companyInfo.province | filterArea(Area.province)}} - {{companyInfo.city | filterArea(Area.city)}}</p>
        <div v-else>
          <ts-select style="width:20%" data-key-name="areaName" data-val-name="areaCode" placeholder="选择省份" :options='Area.province' v-model="addressInfoForm.province"></ts-select>
          <ts-select style="width:20%" data-key-name="areaName" data-val-name="areaCode" placeholder="选择城市"
            :options='Area.city'
            v-model="addressInfoForm.city"></ts-select>
        </div>
      </ts-form-item>
      <ts-form-item label="详细地址：">
        <p v-if="Text.show" class="addressinfo-formItem-text">{{companyInfo.address}}</p>
        <ts-input v-else v-model="addressInfoForm.address" style="width:312px"></ts-input>
      </ts-form-item>
      <ts-form-item label="地图坐标：">
        <div class="addressinfo-map">
          <el-amap :vid="'company-map'" :center="map.mapCenter" :zoom="map.zoom">
            <el-amap-marker v-for="marker in [map.mapCenter]" :key="marker" :position="marker"></el-amap-marker>
          </el-amap>
        </div>
        <ts-button type="primary" @click="handleMapXY" v-if="!Text.show" class="addressinfo-map--button">修改地图坐标</ts-button>
      </ts-form-item>
    </ts-form>
    <ts-dialog v-model="map.show" width="70%" @cancel="handleCancelEditMap" @confirm="handleConfirmEditMap" @close="handleCancelEditMap">
      <div :style="getDocumentSize">
        <el-amap-search-box class="addressinfo-map--search" :on-search-result="onSearchResult" :events="map.events"></el-amap-search-box>
        <el-amap vid="edit-company-map" :center="map.mapCenter" :zoom="map.zoom" :map-manager="map.amapManager" :plugin="map.plugin">
          <el-amap-marker v-for="marker in [map.mapCenter]" :key="marker" :position="marker"></el-amap-marker>
        </el-amap>
      </div>
    </ts-dialog>
  </ts-section>
</template>

<script>
import {
  getAreabyLevel,
  getAreabyParent,
  updateCompany
} from '@/common/api/api';
import {
  AMapManager
} from 'vue-amap';
let amapManager = new AMapManager();
import {
  mapGetters
} from 'vuex';
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
        show: false,
        markers: [],
        plugin: ['ToolBar', {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {}
          }
        }],
        amapManager: amapManager,
        events: {
          init(o) {}
        }
      },
      addressInfoForm: {
        province: '',
        city: '',
        lat: '',
        address: '',
        fax: ''
      },
      // 深拷贝之后的企业详细信息数据
      // CompanyInfo: {},
      Text: {
        show: true
      }
    };
  },
  watch: {
    async 'addressInfoForm.province' (val) {
      this.Area.city = (await getAreabyParent({
        areaCode: val
      })).data.data;
      this.addressInfoForm.city = this.Area.city[0].areaCode;
    },
    // companyExtendBO的数据要深拷贝获取
    companyInfo: {
      handler(val) {
        this.addressInfoForm = val;
        this.map.mapCenter = ((val.lng + val.lat).length === 0) ? this.map.mapCenter : [Number(val.lng), Number(val.lat)];
        this.map.markers.push(this.map.mapCenter);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['companyInfo', 'dicTree']),
    getDocumentSize() {
      let size = {};
      size.width = `${document.body.clientWidth / 1.5}px`;
      size.height = `${document.body.clientHeight / 1.5}px`;
      return size;
    }
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
  methods: {
    async handleEditAddress() {
      this.Text.show = !this.Text.show;
      if (this.Text.show) {
        updateCompany(this.addressInfoForm);
      }
    },
    addMarker() {
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
      this.map.markers.push([lng, lat]);
    },
    handleCancelEditMap() {
      this.map.show = false;
      this.map.mapCenter = [Number(this.companyInfo.lng), Number(this.companyInfo.lat)];
    },
    handleConfirmEditMap() {
      this.map.show = false;
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let {
            lng,
            lat
          } = poi;
          lngSum += lng;
          latSum += lat;
          this.map.markers.push([poi.lng, poi.lat]);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.map.mapCenter = [center.lng, center.lat];
        this.addressInfoForm.lng = center.lng;
        this.addressInfoForm.lat = center.lat;
      }
    },
    handleMapXY() {
      this.map.show = true;
    }
  },
  async created() {
    this.Area.province = (await getAreabyLevel(0)).data.data;
    this.addressInfoForm.province = this.Area.province[0].areaCode;
  }
};
</script>
<style lang="css" scoped>
  @component-namespace addressinfo{
    @component map{
      width: 312px;
      height: 212px;
      display: inline-block;
      @modifier button{
        display: inline-block;
        vertical-align: bottom;
      }
      @modifier search{
        position: fixed 80px * * 90px;
      }
    }
    @component formItem{
      @descendent text{
        padding-top: 10px;
      }
    }
  }
</style>
