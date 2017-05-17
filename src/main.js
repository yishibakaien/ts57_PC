// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import Vuex from 'vuex';
import App from './App';
import router from './router/router';
import store from './store/store';
import * as filters from './filter/';
import * as utils from '@/common/js/utils';
import {GAODE_MAP_KEY} from '@/common/dict/const';
import VueLazyload from 'vue-lazyload';
// import models from '@/common/js/tipsModels';
// import axios from 'axios';

import '!style-loader!css-loader!sass-loader!./common/css/index.css';
// HZC公共组件
import jhComponents from '@/Components/common/index.js';
// 高德地图
import AMap from 'vue-amap';
Vue.use(AMap);
Vue.use(jhComponents);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495606067&di=0b9d830f466d3569bce60fb77597aae3&imgtype=jpg&er=1&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150906%2Fmp30743538_1441527062905_24.jpeg',
  loading: '/static/images/clock.svg',
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
// Vue.use(Vuex);

// 状态检查，未登陆时路由至登陆/注册 界面
// axios.interceptors.response.use(response => {
//     switch (response.status) {
//       case 200:
//         router.push({
//           path: '/login'
//         });
//       break;
//     }
//     return response;
//   }, (error) => {
//     console.log(error);
// if (error.response) {
//     switch (error.response.status) {
//         case 401:
//             // 返回 401 清除token信息并跳转到登录页面
//             store.commit(types.LOGOUT);
//             router.replace({
//                 path: 'login',
//                 query: {redirect: router.currentRoute.fullPath}
//             })
//     }
// }
// return Promise.reject(error.response.data)   // 返回接口返回的错误信息
// });

// 使用axios request
// Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
   store,
  // axios,
  render: h => h(App)
});
// Vue.http.interceptors.push((request, next) => {
//   vue.showLoading = true;
//   next((response) => {
//     vue.showLoading = false;
//     return response;
//   });
// });
