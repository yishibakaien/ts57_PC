// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/router';
import store from './store/store';
import * as filters from './filter/';
import * as utils from '@/common/js/utils';
import {GAODE_MAP_KEY} from '@/common/dict/const';
import VueLazyload from 'vue-lazyload';
import '!style-loader!css-loader!sass-loader!./common/css/index.css';
// HZC公共组件
import jhComponents from '@/Components/common/index.js';
// 高德地图
import AMap from 'vue-amap';
Vue.use(AMap);
Vue.use(jhComponents);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/images/assets/shibaitupian.svg',
  loading: '/static/images/assets/clock.svg',
  attempt: 1
});
Vue.config.productionTip = false;
// 注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Object.keys(utils).forEach(k => { Vue.prototype[k] = utils[k]; });
Object.keys(filters).forEach(k => { Vue.prototype[k] = filters[k]; });
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: GAODE_MAP_KEY,
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
   store,
  // axios,
  render: h => h(App)
});
