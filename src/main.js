// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import Vuex from 'vuex';
import App from './App';
import router from './router/router';
import store from './store/store';
// import axios from 'axios';

import '!style-loader!css-loader!sass-loader!./common/css/index.css';
// HZC公共组件
<<<<<<< HEAD
import jhComponents from '@/Components/common/index.js';
=======
import jhComponents from '@/components/common/';
>>>>>>> all_hzc
Vue.use(jhComponents);
Vue.config.productionTip = false;

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
